import {config} from 'dotenv';
config()
export const DBPORT= process.env.DB_PORT
export const DBHOST= process.env.DB_HOST
export const DBNAME= process.env.DB_NAME
export const DBUSER= process.env.DB_USER
export const DBUSERPASSWORD= process.env.DB_USER_PASSWORD

export const EMAILHOST= process.env.EMAIL_HOST
export const EMAILAPPKEY= process.env.EMAIL_APP_KEY