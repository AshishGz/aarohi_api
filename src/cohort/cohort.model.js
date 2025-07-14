import { Model } from 'objection';
import UserInfo from '../user/user.model.js';


class Cohort extends Model {
    static get tableName() {
        return 'cohorts';
    }
    static get relationMappings() {
        return {
            members: {
                relation: Model.HasManyRelation,
                modelClass: UserInfo,
                join: {
                    from: 'cohorts.id',
                    to: 'userInfo.cohort_id',
                },
            },
        };
    }
}

export default Cohort;
