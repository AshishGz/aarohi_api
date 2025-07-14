import * as modulesUseCases from './usecases/modules.usecase.js';



export const getAll = (req, res, next) => {
    const pageNumber = parseInt(req.query.pageNumber) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status || null;

    cohortUseCase
        .getAll(pageNumber, limit, status)
        .then((data) => res.json({ success: true, ...data }))
        .catch(next);
};




