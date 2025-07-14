import { Model } from 'objection';
import knex from '../platforms/utils/knex.js';

Model.knex(knex);

class watchListModel extends Model {
    static get tableName() {
        return 'watchList'
    }
}

export default watchListModel;