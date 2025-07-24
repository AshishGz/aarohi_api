import * as learningPathUseCase from "./useCases/modules.usecase.js";

export const create = (req, res, next) => {
    learningPathUseCase
        .create(req.body)
        .then(data => res.json({ success: true, data }))
        .catch(next);
};

export const getData = (req, res, next) => {
    learningPathUseCase
        .get(req, res, next)
        .then(data => res.json({ success: true, data }))
        .catch(next);
}