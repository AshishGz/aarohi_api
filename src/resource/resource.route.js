import express from "express";
import * as resourceCtrl from "./resource.controller.js";
import validate from "../platforms/config/joi.validate.js";
import {getAllScheme, resourceSchema} from "./resource.validator.js";
import {updateResource} from "./resource.controller.js";

const router = express.Router();
router.get('/lookupData', resourceCtrl.lookUpData);
router.post('/add',validate(resourceSchema, 'body'), resourceCtrl.addResource);
router.put('/update/:id',validate(resourceSchema, 'body'), resourceCtrl.updateResource);
router.delete('/delete/:id',resourceCtrl.removeResource);
router.get('/all', validate(getAllScheme,'query'),resourceCtrl.getResource);
router.get('/stats', resourceCtrl.getStats);
router.get('/download/:fileId', resourceCtrl.downloadResourceFile);



export default router;
