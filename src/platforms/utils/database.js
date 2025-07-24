import {DBUSER, DBUSERPASSWORD, DBNAME, DBHOST, DBPORT} from "./constant.js";

export default {
  client: 'pg',
  connection: {
    host: DBHOST,
    port: DBPORT,
    user: DBUSER,
    password: DBUSERPASSWORD,
    database: DBNAME,
  },
}
