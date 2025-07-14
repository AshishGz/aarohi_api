import knex from "../../platforms/utils/knex.js";

export const getWatchListByUserId = async (payload, res) => {
  try {
    const { user_id } = payload;
    const res = await knex("watchlist").where({ user_id });
    return {
      status: 200,
      success: true,
      data: res?.rows,
    };
  } catch (err) {
    throw err;
  }
};
