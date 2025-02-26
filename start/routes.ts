/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.resource('/users', '#controllers/user_controller').apiOnly()
router.resource('/musics', '#controllers/music_controller').apiOnly()
router.resource('/interactions', '#controllers/interactions_controller').apiOnly()
router.resource('/playlists', '#controllers/playlists_controller').apiOnly()
router.post('/playlists/musics', '#controllers/playlists_controller.musics')
