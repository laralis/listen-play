import Interaction from '#models/interaction'
import { createInteractionValidator } from '#validators/interaction'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class InteractionsController {
  async index({ request }: HttpContext) {
    const top5 = request.input('top5')
    const interactions = db
      .from('interactions')
      .join('musics', 'musics.id', '=', 'interactions.music_id')
      .select('musics.name')
      .select('interactions.*')
    if (top5) {
      interactions.orderBy('play', 'desc').limit(5)
    }

    return interactions
  }

  async store({ request }: HttpContext) {
    const payload = await createInteractionValidator.validate(request.body())
    const interactions = await Interaction.create(payload)
    return interactions
  }

  async show({ params }: HttpContext) {
    const interaction = await Interaction.findOrFail(+params.id)
    return interaction
  }

  async update({ params, request }: HttpContext) {
    const interaction = await Interaction.findOrFail(+params.id)
    const payload = await createInteractionValidator.validate(request.body())
    interaction.merge(payload)
    await interaction.save()
    return interaction
  }

  async destroy({ params }: HttpContext) {
    const interaction = await Interaction.findOrFail(+params.id)
    await interaction.delete()
    return
  }
}
