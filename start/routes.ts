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
router.resource('/musics', '#controllers/music_controller').apiOnly()
router.resource('/interactions', '#controllers/interactions_controller').apiOnly()
router.resource('/playlists', '#controllers/playlists_controller').apiOnly()
router.post('/playlists/musics', '#controllers/playlists_controller.musics')
router.get('/playlists/musics/:id', '#controllers/playlists_controller.getMusics')
router.post('/login', '#controllers/auth_controller.store')
