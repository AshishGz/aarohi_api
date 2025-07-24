import * as moduleUseCase from './usecases/modules.usecase.js';


export const add = (req, res, next) => {
    moduleUseCase
        .add(req.body)
        .then(data => res.json({ success: true, data }))
        .catch(next);
};

export const update = (req, res, next) => {
    moduleUseCase
        .update(req.params.id, req.body)
        .then(data => res.json({ success: true, data }))
        .catch(next);
};
export const remove = (req, res, next) => {
    moduleUseCase
        .remove(req.params.id)
        .then(data => res.json({ success: true, data }))
        .catch(next);
};







