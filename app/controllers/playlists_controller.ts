import Playlist from '#models/playlist'
import type { HttpContext } from '@adonisjs/core/http'

export default class PlaylistsController {
  async index({}: HttpContext) {
    const playlists = await Playlist.all()
    return playlists
  }

  async show({ params }: HttpContext) {
    const playlistId = params.id
    const playlist = await Playlist.query()
      .where({ id: playlistId })
      .select('id', 'name')
      .preload('musics', (builder) => {
        builder.select('id', 'author', 'name')
      })
      .firstOrFail()
    return playlist
  }
}
