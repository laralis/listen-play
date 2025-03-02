/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import { middleware } from '#start/kernel'

import router from '@adonisjs/core/services/router'

router
  .resource('/users', '#controllers/user_controller')
  .apiOnly()
  .use(['destroy', 'index', 'show', 'update'], middleware.auth())

router
  .resource('/musics', '#controllers/music_controller')
  .apiOnly()
  .use(['store', 'update', 'destroy'], middleware.auth())

router.resource('/interactions', '#controllers/interactions_controller').apiOnly()

router.resource('/playlists', '#controllers/playlists_controller').only(['index', 'show'])

router
  .group(() => {
    router.resource('/playlist', '#controllers/user_playlist_controller').except(['show'])

    router.post('/playlist/:id/musics', '#controllers/user_playlist_controller.addMusics')

    router.delete(
      '/playlist/:id/musics/:musicId',
      '#controllers/user_playlist_controller.deleteMusic'
    )
    router
      .resource('/friends', '#controllers/friends_controller.index')
      .apiOnly()
      .except(['update', 'show'])
  })
  .prefix('/me')
  .use(middleware.auth())

router.post('/login', '#controllers/auth_controller.store')

router.get('/toplistener', '#controllers/user_controller.topListener')
