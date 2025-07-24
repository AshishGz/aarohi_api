import {Model} from "objection";

class LearningPathRelation extends Model {
    static get tableName() {
        return 'learning_path_resources';
    }
}

export default LearningPathRelation;
