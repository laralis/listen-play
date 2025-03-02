import vine from '@vinejs/vine'

export const createInteractionValidator = vine.compile(
  vine.object({
    play: vine.number(),
    like: vine.boolean(),
    musicId: vine.number(),
    userId: vine.number(),
  })
)
export const updateInteractionValidator = vine.compile(
  vine.object({
    play: vine.number().optional(),
    like: vine.boolean().optional(),
  })
)
