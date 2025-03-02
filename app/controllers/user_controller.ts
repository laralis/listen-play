import User from '#models/user'
import { createUserValidator, updateUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import mail from '@adonisjs/mail/services/main'

export default class UsersController {
  async index({}: HttpContext) {
    const users = await User.all()
    return users
  }

  async store({ request }: HttpContext) {
    const user = await createUserValidator.validate(request.body())
    if (request.body().type === 'customer') {
      await mail.send((message) => {
        message
          .to(user.email)
          .from('listen_play@mail.com')
          .subject('Welcome to ListenPlay')
          .htmlView('emails/welcome', { name: user.name })
      })
    }
    return await User.create(user)
  }

  async show({ params }: HttpContext) {
    const user = await User.findOrFail(+params.id)
    return user
  }

  async update({ params, request }: HttpContext) {
    const user = await User.findOrFail(+params.id)
    const payload = await updateUserValidator.validate(request.body())
    user.merge(payload)
    await user.save()
    return user
  }

  async destroy({ params }: HttpContext) {
    const user = await User.findOrFail(+params.id)
    user.delete()
  }

  async topListener({}: HttpContext) {
    const user = await db
      .from('interactions')
      .select('user_id', db.raw('count(interactions.id) as value'))
      .groupBy('user_id')

    return user
  }
}
