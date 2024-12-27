import * as joi from 'joi'

export const joiValidationSchema = joi.object({
    MONGDB: joi.required(),
    PORT:joi.number().default(3005),
    DEFAULT_LIMIT:joi.number().default(5)
})