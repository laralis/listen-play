import Music from '#models/music'
import type { HttpContext } from '@adonisjs/core/http'

export default class MusicController {
  async index({}: HttpContext) {
    const musics = await Music.all()
    return musics
  }

  async store({ request }: HttpContext) {
    const music = await Music.create(request.body())
    return music
  }

  async show({ params }: HttpContext) {
    const music = await Music.findOrFail(+params.id)
    return music
  }

  async update({ params, request }: HttpContext) {
    const music = await Music.findOrFail(+params.id)
    music.merge(request.body())
    await music.save()
    return music
  }

  async destroy({ params }: HttpContext) {
    const music = await Music.findOrFail(+params.id)
    await music.delete()
    return
  }
}
