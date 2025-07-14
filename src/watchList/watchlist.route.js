import express from "express";

import * as watchlistCtrl from "./watchlist.controller.js";
import validate from "../platforms/config/joi.validate.js";
import watchlistValidator from "./watchlist.validator.js";

const router = express.Router();

router
  .route("/")
  .post(
    validate(watchlistValidator.watchlist, "body"),
    watchlistCtrl.addWatchList
  );

router
  .route("/:user_id")
  .get(
    validate(watchlistValidator.userId, "params"),
    watchlistCtrl.getWatchListByUserId
  );

router
  .route("/")
  .delete(
    validate(watchlistValidator.watchlist, "body"),
    watchlistCtrl.deleteWatchList
  );

export default router;
