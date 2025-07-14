import knex from "../../platforms/utils/knex.js";

export const addWatchList = async (payload, res) => {
  try {
    const { script, user_id } = payload;
    const isDuplicate = await knex("watchlist").where({ script, user_id }).first();

    if (isDuplicate) {
      return {
        status: 400,
        success: false,
        message: "Watchlist already exist",
      };
    }
    await knex("watchlist").insert({ script, user_id });
    return {
      status: 200,
      success: true,
      message: "Watchlist added successfull",
    };
  } catch (err) {
    throw err;
  }
};
