import { Model } from 'objection';
import Cohort from '../cohort/cohort.model.js'; // Adjust path if needed

class Module extends Model {
    static get tableName() {
        return 'modules';
    }

    static get idColumn() {
        return 'id'; // UUID primary key
    }

    static get relationMappings() {
        return {
            cohorts: {
                relation: Model.ManyToManyRelation,
                modelClass: Cohort,
                join: {
                    from: 'modules.id',
                    through: {
                        from: 'cohort_modules.module_id',
                        to: 'cohort_modules.cohort_id',
                    },
                    to: 'cohorts.id',
                },
            },
        };
    }
}

export default Module;
