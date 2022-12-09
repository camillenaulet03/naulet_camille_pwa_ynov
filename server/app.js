import '#config/database.js'
import { API_ROUTER } from '#routes/index.js'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import respond from 'koa-respond'
import cors from '@koa/cors'
import serve from 'koa-static'

const app = new Koa()

app
  .use(cors('*'))
  .use(bodyParser())
  .use(respond())
  .use(API_ROUTER.routes())
  .use(API_ROUTER.allowedMethods())


const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Started on port ${PORT}`))
