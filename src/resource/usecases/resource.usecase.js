import {Resource, ResourceFile} from '../resource.model.js';

export async function create(resourceData) {
    const {
        title,
        title_nepali,
        description,
        description_nepali,
        category_id,
        format_id,
        difficulty_id,
        is_public = false,
        tags,       // array of tag UUIDs
        files = []        // array of { file_url, file_name, file_type }
    } = resourceData;

    const inserted = await Resource.query().insertGraphAndFetch({
        title, title_nepali, description, description_nepali, category_id, format_id, difficulty_id, is_public, tags, // Link to existing tags
        files,
    });

    return inserted;
}

export async function update(id, resourceData) {
    const {
        title,
        title_nepali,
        description,
        description_nepali,
        category_id,
        format_id,
        difficulty_id,
        is_public = false,
        tags,   // array of tag UUIDs
        files = [],  // array of { id?, file_url, file_name, file_type }
    } = resourceData;



    // For files, if you want to update existing files, you can include 'id' in each file object
    // If files don't have 'id', Objection will insert them as new

    const updated = await Resource.query()
        .upsertGraphAndFetch({
            id, // important: pass the resource ID to update existing resource
            title,
            title_nepali,
            description,
            description_nepali,
            category_id,
            format_id,
            difficulty_id,
            is_public,
            tags,
            files,
        }, {
            relate: true,    // relate existing tags (by id)
            unrelate: true,  // remove tags not included in update (unlink)
            noDelete: false, // allow deleting files removed from the graph
        });

    return updated;
}

export async function remove(id) {
    // Option 1: Delete resource and cascade delete related files if you have DB-level cascade set

    // Option 2: If no cascade, delete files first, then resource and unlink tags

    // First, fetch the resource with relations (optional, to check existence)
    const resource = await Resource.query().findById(id);

    if (!resource) {
        throw new Error('Resource not found');
    }


    // Delete files related to this resource
    await resource.$relatedQuery('files').delete();

    // Finally delete the resource itself
    await Resource.query().deleteById(id);

    return { message: `Resource ${id} deleted successfully` };
}


export async function getAll({ page = 1, pageSize = 10 }) {
    const result = await Resource
        .query()
        .withGraphFetched('[category, format, difficulty, files]')
        .page(page - 1, pageSize); // Objection uses 0-based pages

    return {
        total: result.total,
        page,
        pageSize,
        results: result.results,
    };
}

export async function getStats() {
    const [
        totalResources,
        publicResources,
        privateResources,
        totalDownloads
    ] = await Promise.all([
        Resource.query().resultSize(),
        Resource.query().where('is_public', true).resultSize(),
        Resource.query().where('is_public', false).resultSize(),
        ResourceFile.query().sum('downloads as total').first()
    ]);

    return {
        totalResources,
        publicResources,
        privateResources,
        totalDownloads: totalDownloads?.total || 0
    };
}

// resource.usecase.js

export async function incrementDownload(fileId) {
    const file = await ResourceFile.query().findById(fileId);

    if (!file) {
        throw new Error('File not found');
    }

    // Increment the download count
    await ResourceFile.query()
        .findById(fileId)
        .patch({ downloads: file.downloads + 1 });

    return file; // return file URL or stream from here
}



