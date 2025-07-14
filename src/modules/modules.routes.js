import express from 'express';
import * as modulesCtrl from './modules.controller.js';
import validate from '../platforms/config/joi.validate.js'; // adjust if path differs
import modulesValidator from "./modules.validator.js";
import * as cohortCtrl from "../cohort/cohort.controller.js";

const router = express.Router();

router.post('/add', validate(modulesValidator.add, 'body'), modulesCtrl.add);
router.put('/edit/:id', validate(modulesValidator.update, 'body'), modulesCtrl.update);
router.delete('/delete/:id', modulesCtrl.remove); // Optional: add ID validation

// router.put('/edit/:id', validate(modulesValidator.update, 'body'), cohortCtrl.update);
// router.delete('/delete/:id', modulesValidator.remove); // Optional: add ID validation
// router.get('/all', validate(modulesValidator.getAll, 'query'), cohortCtrl.getAll);
// router.get('/stats');
//
// router.get('/:id', validate(modulesValidator.getById, 'params'), cohortCtrl.getById);

export default router;
