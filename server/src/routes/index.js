import taskRoutes from '#components/task/task-routes.js'
import listRoutes from '#components/list/list-routes.js'
import Router from '@koa/router'

const API_ROUTER = new Router({ prefix: '/api' })

API_ROUTER.use('/tasks', taskRoutes.routes(), taskRoutes.allowedMethods())
API_ROUTER.use('/lists', listRoutes.routes(), listRoutes.allowedMethods())

export { API_ROUTER }
