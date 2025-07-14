import { Model } from 'objection';
import knex from '../platforms/utils/knex.js';

Model.knex(knex);

class authModel extends Model {
    static get tableName() {
        return 'userInfo'
    }
}

export default authModel;