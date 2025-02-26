import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'friends'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE') // Chave estrangeira para o usuário
      table.integer('friend_id').unsigned().references('id').inTable('users').onDelete('CASCADE') // Chave estrangeira para o amigo
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.unique(['user_id', 'friend_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
