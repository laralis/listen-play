import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    email: vine.string().email(),
    password: vine.string().minLength(6),
  })
)
export const updateUserValidator = vine.compile(
  vine.object({
    name: vine.string().trim().optional(),
    email: vine.string().email().optional(),
    password: vine.string().minLength(6).optional(),
  })
)
