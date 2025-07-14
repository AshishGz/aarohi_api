import express from 'express';
import * as cohortCtrl from './cohort.controller.js';
import validate from '../platforms/config/joi.validate.js'; // adjust if path differs
import modulesValidator from "./modules.validator.js";

const router = express.Router();

router.post('/add', validate(modulesValidator.add, 'body'), cohortCtrl.add);
router.put('/edit/:id', validate(modulesValidator.update, 'body'), cohortCtrl.update);
router.delete('/delete/:id', modulesValidator.remove); // Optional: add ID validation
router.get('/all', validate(modulesValidator.getAll, 'query'), cohortCtrl.getAll);
router.get('/stats');

router.get('/:id', validate(modulesValidator.getById, 'params'), cohortCtrl.getById);

export default router;
