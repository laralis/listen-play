import Interaction from '#models/interaction'
import type { HttpContext } from '@adonisjs/core/http'

export default class InteractionsController {
  async index() {
    const interactions = await Interaction.all()
    return interactions
  }

  async store({ request }: HttpContext) {
    const interactions = await Interaction.create(request.body())
    return interactions
  }

  async show({ params }: HttpContext) {
    const interaction = await Interaction.findOrFail(+params.id)
    return interaction
  }

  async update({ params, request }: HttpContext) {
    const interaction = await Interaction.findOrFail(+params.id)
    interaction.merge(request.body())
    await interaction.save()
    return interaction
  }

  async destroy({ params }: HttpContext) {
    const interaction = await Interaction.findOrFail(+params.id)
    await interaction.delete()
    return
  }
}
