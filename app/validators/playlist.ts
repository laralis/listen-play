import vine from '@vinejs/vine'

export const createPlaylistValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
  })
)

export const updatePlaylistValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
  })
)
