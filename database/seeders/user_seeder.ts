import Interaction from '#models/interaction'
import Music from '#models/music'
import Playlist from '#models/playlist'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.create({
      name: 'Luiza',
      email: 'luiza@mail.com',
      type: 'customer',
      password: '1234',
    })
    await Playlist.create({
      name: 'Favoritas',
      userId: 1,
    })
    await Music.create({
      author: 'Beyonce',
      date: '2020-12-12',
      gender: 'pop',
      name: 'Crazy in love',
      url: '/ulr.com',
    })
    await Interaction.create({
      play: 3,
      musicId: 1,
      userId: 1,
    })
  }
}
