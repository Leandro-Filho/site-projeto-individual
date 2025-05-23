const Joi = require("joi");

module.exports = Joi.object({
  id: Joi.number().integer().positive(),
  local: Joi.string()
    .pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/)
    .required()
    .messages({
      "string.pattern.base": "O local deve conter apenas letras.",
    }),
  descricao: Joi.string(),
  capacidade: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "A capacidade deve ser um número.",
      "number.integer": "A capacidade deve ser um número inteiro.",
      "number.positive": "A capacidade deve ser positiva.",
    }),
});
