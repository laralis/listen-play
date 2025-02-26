import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import Interaction from './interaction.js'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Playlist from './playlist.js'

export default class Music extends BaseModel {
  static table = 'musics'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare author: string

  @column.date()
  declare date: DateTime

  @column()
  declare url: string

  @column()
  declare gender: string

  @hasMany(() => Interaction)
  declare interations: HasMany<typeof Interaction>

  @manyToMany(() => Playlist)
  declare playlists: ManyToMany<typeof Playlist>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
