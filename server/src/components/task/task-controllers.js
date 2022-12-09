import Task from '#components/task/task-model.js'
import Joi from 'joi'

export async function id (ctx) {
  try {
    if(ctx.params.id.length <= 0) return ctx.notFound({ message: 'Id missing' })
    const task = await Task.findById(ctx.params.id).populate('list')
    ctx.ok(task)
  } catch (e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function create (ctx) {
  try {
    const TaskValidationSchema = Joi.object({
      title: Joi.string().required(),
      list: Joi.string().required(),
      description: Joi.string()
    })
    const { error, value } = TaskValidationSchema.validate(ctx.request.body)
    if(error) throw new Error(error)
    const task = await Task.create(value)
    ctx.ok(task)
  } catch (e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function update (ctx) {
  try {
    const TaskValidationSchema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string(),
      list: Joi.string().required(),
      done: Joi.boolean()
    })
    const { error, value } = TaskValidationSchema.validate(ctx.request.body)
    if(error) throw new Error(error)
    const task = await Task.findByIdAndUpdate(ctx.params.id, value, { runValidators: true, new: true })
    ctx.ok(task)
  } catch (e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function remove (ctx) {
  try {
    await Task.findByIdAndDelete(ctx.params.id)
    ctx.ok()
  } catch (error) {
    ctx.badRequest({ message: e.message })
  }
}

export async function listId (ctx) {
  try {
    const tasks = await Task.find({ "list": { _id: ctx.params.id }})
    ctx.ok(tasks)
  } catch (error) {
    ctx.badRequest({ message: e.message })
  }
}
