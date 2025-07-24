import {Model} from "objection";
import LearningPathRelation from "./learningPathResource.model.js";

class LearningPath extends Model {
    static get tableName() {
        return 'learning_paths';
    }

    static get relationMappings() {
        return {
            relations: {
                relation: Model.HasManyRelation,
                modelClass: LearningPathRelation,
                join: {
                    from: 'learning_paths.id',
                    to: 'learning_path_resources.learning_path_id'
                }
            }
        };
    }
}

export default LearningPath;



