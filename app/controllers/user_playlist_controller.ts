import Playlist from '#models/playlist'
import type { HttpContext } from '@adonisjs/core/http'

export default class UserPlaylistController {
  async index({ auth }: HttpContext) {
    const user = auth.user!
    const playlists = await Playlist.query().where({ user_id: user.id })
    return playlists
  }
  async store({ request, auth }: HttpContext) {
    const user = auth.user!
    const playlist = request.body()
    const playlists = await Playlist.create({ ...playlist, userId: user.id })
    return playlists
  }

  async update({ params, request, auth }: HttpContext) {
    const user = auth.user!
    const playlist = await Playlist.query().where({ user_id: user.id, id: params.id }).firstOrFail()
    playlist.merge(request.body())
    await playlist.save()
    return playlist
  }

  async destroy({ params }: HttpContext) {
    const playlist = await Playlist.findOrFail(+params.id)
    await playlist.delete()
  }

  async addMusics({ auth, request, params }: HttpContext) {
    const user = auth.user!
    const playlistId = params.id
    const { musicId } = request.body()
    const playlist = await Playlist.query().where({ userId: user.id, id: playlistId }).firstOrFail()
    await playlist.related('musics').attach([musicId])
  }

  async deleteMusic({ auth, params }: HttpContext) {
    const user = auth.user!
    const musicId = params.musicId
    const playlistId = params.id
    const playlist = await Playlist.query().where({ userId: user.id, id: playlistId }).firstOrFail()
    await playlist.related('musics').detach([musicId])
  }
}
