import { Model } from 'objection';
import knex from '../platforms/utils/knex.js';

Model.knex(knex);

class userModel extends Model {
    static get tableName() {
        return 'userInfo'
    }
}

export default userModel;