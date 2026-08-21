import {resolve} from 'node:path'
import{config} from'dotenv'
export const NODE_ENV=process.env.NODE_ENV??'development'
config({path:resolve(`.env.${NODE_ENV}`)})
export const PORT =parseInt(process.env.PORT??'9000')

export const DB_PASSWOR=process.env.DB_PASSWOR
export const DB_NAME=process.env.DB_NAME
export const DB_USER=process.env.DB_USER
