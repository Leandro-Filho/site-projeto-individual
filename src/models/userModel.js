const Joi = require("joi");

module.exports = Joi.object({
  id: Joi.number().integer().positive(),
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  senha: Joi.string()
    .min(6)
    .pattern(new RegExp("^(?=.*[a-zA-Z])(?=.*\\d).+$"))
    .required()
    .messages({
      "string.pattern.base":
        "A senha deve conter pelo menos uma letra e um número.",
    }),
  empresa_escola: Joi.string().required(),
  celular: Joi.string().length(11).pattern(/^\d+$/).required()
    .messages({
      "string.length": "O celular deve conter exatamente 11 dígitos.",
      "string.pattern.base": "O celular deve conter apenas números.",
    }),
});
