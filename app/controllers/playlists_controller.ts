import Playlist from '#models/playlist'
import type { HttpContext } from '@adonisjs/core/http'

export default class PlaylistsController {
  async index({}: HttpContext) {
    const playlists = await Playlist.all()
    return playlists
  }

  async store({ request }: HttpContext) {
    const playlists = await Playlist.create(request.body())
    return playlists
  }

  async show({ params }: HttpContext) {
    const playlist = await Playlist.findOrFail(+params.id)
    return playlist
  }

  async update({ params, request }: HttpContext) {
    const playlist = await Playlist.findOrFail(+params.id)
    playlist.merge(request.body())
    await playlist.save()
    return playlist
  }

  async destroy({ params }: HttpContext) {
    const playlist = await Playlist.findOrFail(+params.id)
    await playlist.delete()
    return
  }

  async musics({ auth, request }: HttpContext) {
    const user = auth.user!

    const { playlistId, musicId } = request.all()

    const playlist = await Playlist.query().where({ userId: 1, playlistId }).firstOrFail()

    await playlist.related('musics').attach([musicId])
  }
}
