import Router from '@koa/router'
import * as ListControllers from '#components/list/list-controllers.js'

const lists = new Router()

lists.get('/', ListControllers.get)
lists.get('/:id', ListControllers.id)
lists.post('/', ListControllers.create)
lists.put('/:id', ListControllers.update)
lists.del('/:id', ListControllers.remove)

export default lists
