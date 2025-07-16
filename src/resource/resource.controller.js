import * as lookupUseCase from "./usecases/lookup.data.usecase.js";
import * as resourceUseCase from "./usecases/resource.usecase.js";
import {getAll} from "./usecases/resource.usecase.js";

export const lookUpData = (req, res, next) => {
    lookupUseCase
        .getLookUpData()
        .then(data => res.json({ success: true, data }))
        .catch(next);
};

export const addResource = (req, res, next) => {
    resourceUseCase
        .create(req.body)
        .then(data => res.json({ success: true, data }))
        .catch(next);
};

export const updateResource = (req, res, next) => {

    resourceUseCase
        .update(req.params.id,req.body)
        .then(data => res.json({ success: true, data }))
        .catch(next);
};

export const removeResource = (req, res, next) => {

    resourceUseCase
        .remove(req.params.id)
        .then(data => res.json({ success: true, data }))
        .catch(next);
};

export const getResource = (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    resourceUseCase
        .getAll(page,pageSize)
        .then(data => res.json({ success: true, data }))
        .catch(next);
};
export const getStats = (req, res, next) => {
    resourceUseCase
        .getStats()
        .then(data => res.json({ success: true, data }))
        .catch(next);
};



export const downloadResourceFile = async (req, res, next) => {
    const { fileId } = req.params;

    try {
        const file = await resourceUseCase.incrementDownload(fileId);

        // Redirect to file URL (if stored on cloud or external)
        return res.redirect(file.file_url);

        // OR: If file is local, use res.download or stream:
        // return res.download(path.resolve('uploads/', file.file_name));

    } catch (err) {
        next(err);
    }
};
