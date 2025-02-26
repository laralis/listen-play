import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Music from './music.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Interaction extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare play: number

  @column()
  declare like: boolean

  @belongsTo(() => Music)
  declare musicId: BelongsTo<typeof Music>

  @belongsTo(() => User)
  declare userId: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
