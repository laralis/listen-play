import vine from '@vinejs/vine'

export const createMusicValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    author: vine.string().trim(),
    date: vine.date(),
    url: vine.string(),
    gender: vine.string(),
  })
)

export const updateMusicValidator = vine.compile(
  vine.object({
    name: vine.string().trim().optional(),
    author: vine.string().trim().optional(),
    gender: vine.string().optional(),
  })
)
