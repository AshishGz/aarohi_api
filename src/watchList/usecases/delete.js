import knex from "../../platforms/utils/knex.js";

export const deleteWatchList = async (payload, res) => {
  try {
    const { script, user_id } = payload;
    await knex("watchlist").where({ script, user_id }).delete();
    return {
      status: 200,
      success: true,
      message: "Watchlist deleted successfull",
    };
  } catch (err) {
    throw err;
  }
};