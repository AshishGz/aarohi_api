import express from "express";

import * as userCtrl from "./user.controller.js";
import validate from "../platforms/config/joi.validate.js";
import userValidator from "./user.validator.js";

const router = express.Router();

router
  .route("/add")
  .post(validate(userValidator.add, "body"), userCtrl.add);

router
    .route("/update/:id")
    .put(validate(userValidator.update, "body"), userCtrl.update);

router
    .route("/delete/:id")
    .delete(userCtrl.remove);

router
    .route("/change-role/:id")
    .patch(validate(userValidator.changeRole, "body"), userCtrl.changeRole);
router
    .route("/update-password")
    .patch(validate(userValidator.updatePassword, "body"), userCtrl.updatePassword);

router
    .route("/list")
    .get(validate(userValidator.list, "query"), userCtrl.list);

router.get('/stats', userCtrl.getUserStats);

router
    .route("/:id")
    .get(userCtrl.getById);







export default router;
