import express from 'express';
import * as learningPathsCtrl from './learningPath.controller.js';
import validate from '../platforms/config/joi.validate.js'; // adjust if path differs
import * as learningPathValidator from './learningPath.validator.js';
import {getData} from "./learningPath.controller.js"; // adjust if path differs

const router = express.Router();

router.post('/create', validate(learningPathValidator.create, 'body'), learningPathsCtrl.create);
router.get('/list', learningPathsCtrl.getData);


export default router;
