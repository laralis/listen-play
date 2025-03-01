import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class FriendsController {
  async index({ auth }: HttpContext) {
    const user = auth.user!
    const friends = await User.query()
      .where({ id: user.id })
      .select('id', 'name')
      .preload('friends', (builder) => {
        builder.select('name', 'id', 'email')
      })

    return friends
  }

  async store({ request, auth, response }: HttpContext) {
    const user = auth.user!
    const friendId = request.input('friend_id')
    const queryUser = await User.query().where({ id: user.id }).firstOrFail()
    return response.status(201).send(await queryUser.related('friends').attach([friendId]))
  }

  async destroy({ params, auth }: HttpContext) {
    const user = auth.user!
    const friendId = params.id
    const queryUser = await User.query().where({ id: user.id }).firstOrFail()
    return await queryUser.related('friends').detach([friendId])
  }
}
