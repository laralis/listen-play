import Music from '#models/music'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class MusicController {
  async index({ request }: HttpContext) {
    const gender = request.input('gender')
    const top5 = request.input('top5')
    const top5musics = db
      .from('musics')
      .join('interactions', 'musics.id', '=', 'interactions.music_id')
      .groupBy('musics.id')
      .sum('interactions.play', 'played_times')
      .orderBy('played_times', 'desc')
      .select('musics.name', 'musics.gender', 'musics.author')

    const musics = await Music.query().where((builder) => {
      if (gender) {
        builder.where('gender', 'LIKE', `${gender}%`)
      }
    })
    if (top5) {
      return top5musics
    }
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
  }
}
