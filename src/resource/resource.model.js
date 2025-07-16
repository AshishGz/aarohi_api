import { Model } from 'objection';

export class Category extends Model {
    static get tableName() {
        return 'categories';
    }
}



export class Difficulty extends Model {
    static get tableName() {
        return 'difficulties';
    }
}


export class Format extends Model {
    static get tableName() {
        return 'formats';
    }
}
export class ResourceFile extends Model {
    static get tableName() {
        return 'resource_files';
    }
}
export class Resource extends Model {
    static get tableName() {
        return 'resources';
    }

    static get relationMappings() {
        return {
            category: {
                relation: Model.BelongsToOneRelation,
                modelClass: Category,
                join: {
                    from: 'resources.category_id',
                    to: 'categories.id',
                },
            },
            format: {
                relation: Model.BelongsToOneRelation,
                modelClass: Format,
                join: {
                    from: 'resources.format_id',
                    to: 'formats.id',
                },
            },
            difficulty: {
                relation: Model.BelongsToOneRelation,
                modelClass: Difficulty,
                join: {
                    from: 'resources.difficulty_id',
                    to: 'difficulties.id',
                },
            },
            files: {
                relation: Model.HasManyRelation,
                modelClass: ResourceFile,
                join: {
                    from: 'resources.id',
                    to: 'resource_files.resource_id',
                },
            },
        };
    }
}



