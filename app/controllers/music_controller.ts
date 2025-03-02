import Music from '#models/music'
import { createMusicValidator, updateMusicValidator } from '#validators/music'
import cache from '@adonisjs/cache/services/main'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'

export default class MusicController {
  async index({ request }: HttpContext) {
    const gender = request.input('gender')
    const top5 = request.input('top5')
    const top5musics = await cache.getOrSet({
      key: 'interactions',
      factory: () =>
        db
          .from('musics')
          .join('interactions', 'musics.id', '=', 'interactions.music_id')
          .groupBy('musics.id')
          .sum('interactions.play', 'played_times')
          .orderBy('played_times', 'desc')
          .select('musics.name', 'musics.gender', 'musics.author'),
      ttl: '5m',
    })

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

  async store({ request, response, auth }: HttpContext) {
    const user = auth.user!
    if (user.type === 'admin') {
      const payload = await createMusicValidator.validate(request.body())
      const music = await Music.create({
        ...payload,
        date: DateTime.fromISO(payload.date.toISOString()),
      })
      const musicUrl = request.file('music', {
        size: '40mb',
        extnames: ['mp3', 'wav'],
      })
      if (!musicUrl) {
        return response.badRequest({ error: 'music url missing' })
      }
      const key = `uploads/${cuid()}.${musicUrl.extname}`
      await musicUrl.moveToDisk(key)

      return music
    } else {
      response.status(400).send('Usuário customer não pode acessar esse recurso')
    }
  }

  async show({ params }: HttpContext) {
    const music = await Music.findOrFail(+params.id)
    return music
  }

  async update({ params, request, auth, response }: HttpContext) {
    const user = auth.user!
    if (user.type === 'admin') {
      const music = await Music.findOrFail(+params.id)
      const payload = await updateMusicValidator.validate(request.body())
      music.merge(payload)
      await music.save()
      return music
    } else {
      response.status(400).send('Usuário customer não pode acessar esse recurso')
    }
  }

  async destroy({ params, response, auth }: HttpContext) {
    const user = auth.user!
    if (user.type === 'admin') {
      const music = await Music.findOrFail(+params.id)
      await music.delete()
    } else {
      response.status(400).send('Usuário customer não pode acessar esse recurso')
    }
  }
}
