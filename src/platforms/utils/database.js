import { DBUSER, DBUSERPASSWORD, DBNAME } from "./constant.js";

export default {
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5432,
    user: DBUSER,
    password: DBUSERPASSWORD,
    database: DBNAME,
  },
}
