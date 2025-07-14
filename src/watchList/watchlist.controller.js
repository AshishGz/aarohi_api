import * as createUseCase from "./usecases/create.js";
import * as searchUseCase from "./usecases/search.js";
import * as deleteUseCase from "./usecases/delete.js";
/**
 * Add watchlist.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const addWatchList = (req, res, next) => {
  createUseCase
    .addWatchList(req.body, res)
    .then((data) => res.json({ success: true, data }))
    .catch((err) => next(err));
};

/**
 * Get watchlist by user id.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const getWatchListByUserId = (req, res, next) => {
  searchUseCase
    .getWatchListByUserId(req.body, res)
    .then((data) => res.json({ success: true, data }))
    .catch((err) => next(err));
};

/**
 * Delete watchlist by user id and script.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const deleteWatchList = (req, res, next) => {
  deleteUseCase
    .deleteWatchList(req.body, res)
    .then((data) => res.json({ success: true, data }))
    .catch((err) => next(err));
};