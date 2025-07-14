import Cohort from '../cohort.model.js';
import UserInfo from '../../user/user.model.js';
import Boom from '@hapi/boom';
import {uuid} from "../../platforms/utils/common.js";
import { raw} from "objection";


export const getAll = async (pageNumber = 1, limit = 10, status = null) => {
    try {
        const offset = (pageNumber - 1) * limit;
        const query = Cohort.query().withGraphFetched('members');

        if (status) {
            query.where('status', status);
        }

        const [cohorts] = await Promise.all([
            query.clone().offset(offset).limit(limit).orderBy('created_at', 'desc'),
        ]);
        const [total]=await Promise.all([
            Cohort.query().count('id as count').first()
        ])

        return {
            status: 200,
            success: true,
            data: cohorts,
            pagination: {
                total: total.count,
                page: pageNumber,
                limit,
                totalPages: Math.ceil(total.count / limit),
            },
        };
    } catch (err) {
        throw err;
    }
};


export const getById = async (id) => {
    const cohort = await Cohort.query().findById(id);
    if (!cohort) throw Boom.notFound('Cohort not found');

    const members = await UserInfo.query().where('cohort_id', id);

    return {
        ...cohort,
        members,
    };
};



export const getCohortStats = async () => {
    const [totalCohorts, activeCohorts, members] = await Promise.all([
        Cohort.query().count('id as count').first(),
        Cohort.query().where('end_date', '>=', raw('CURRENT_DATE')).count('id as count').first(),
        UserInfo.query().whereNotNull('cohort_id').select('role'),
    ]);

    // Count mentors and mentees from members list
    let mentorCount = 0;
    let menteeCount = 0;

    members.forEach((m) => {
        if (m.role === 'MENTOR') mentorCount++;
        if (m.role === 'MENTEE') menteeCount++;
    });

    return {
        totalCohorts: parseInt(totalCohorts.count, 10),
        activeCohorts: parseInt(activeCohorts.count, 10),
        mentors: mentorCount,
        mentees: menteeCount,
    };
};