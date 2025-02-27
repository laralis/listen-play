import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'interactions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('play').unsigned().defaultTo(1)
      table.boolean('like').nullable()
      table
        .integer('music_id')
        .unsigned()
        .references('id')
        .inTable('musics')
        .onDelete('CASCADE')
        .notNullable()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.unique(['user_id', 'music_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
