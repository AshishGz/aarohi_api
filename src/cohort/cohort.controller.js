import * as cohortUseCase from './usecases/cohort.usecase.js';

export const add = (req, res, next) => {
    cohortUseCase
        .add(req.body)
        .then(data => res.json({ success: true, data }))
        .catch(next);
};

export const update = (req, res, next) => {
    cohortUseCase
        .update(req.params.id, req.body)
        .then(data => res.json({ success: true, data }))
        .catch(next);
};

export const remove = (req, res, next) => {
    cohortUseCase
        .remove(req.params.id)
        .then(data => res.json({ success: true, data }))
        .catch(next);
};

export const getAll = (req, res, next) => {
    const pageNumber = parseInt(req.query.pageNumber) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status || null;

    cohortUseCase
        .getAll(pageNumber, limit, status)
        .then((data) => res.json({ success: true, ...data }))
        .catch(next);
};


export const getById = (req, res, next) => {
    cohortUseCase
        .getById(req.params.id)
        .then(data => res.json({ success: true, data }))
        .catch(next);
};/**
 * Get cohort statistics: total, active, mentor count, mentee count.
 */
export const getCohortStats = (req, res, next) => {
        cohortUseCase
            .getCohortStats()
            .then((data) => res.json({ success: true, data }))
            .catch(next);
    };


