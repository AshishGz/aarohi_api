import express from 'express';
import * as cohortCtrl from './cohort.controller.js';
import validate from '../platforms/config/joi.validate.js'; // adjust if path differs
import cohortValidator from './cohort.validator.js';

const router = express.Router();

router.post('/add', validate(cohortValidator.add, 'body'), cohortCtrl.add);
router.put('/edit/:id', validate(cohortValidator.update, 'body'), cohortCtrl.update);
router.delete('/delete/:id', cohortCtrl.remove); // Optional: add ID validation
router.get('/all', validate(cohortValidator.getAll, 'query'), cohortCtrl.getAll);
router.get('/stats', cohortCtrl.getCohortStats);

router.get('/:id', validate(cohortValidator.getById, 'params'), cohortCtrl.getById);

export default router;
