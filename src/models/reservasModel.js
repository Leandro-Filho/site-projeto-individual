const Joi = require("joi");

module.exports = Joi.object({
  id: Joi.number().integer().positive(),
  id_sala: Joi.number().integer().positive().required(),
  id_user: Joi.number().integer().positive().required(),
  titulo: Joi.string().required(),

  status: Joi.string()
    .valid("pendente", "confirmada", "cancelada", "rejeitada")
    .required()
    .messages({
      "any.only": "O status deve ser 'pendente', 'confirmada', 'cancelada' ou 'rejeitada'."
    }),

  horario_inicio: Joi.string()
    .pattern(/^([01]\d|2[0-3]):[0-5]\d$/)
    .required()
    .messages({
      "string.pattern.base": "O horário de início deve estar no formato HH:mm."
    }),

  horario_final: Joi.string()
    .pattern(/^([01]\d|2[0-3]):[0-5]\d$/)
    .required()
    .messages({
      "string.pattern.base": "O horário final deve estar no formato HH:mm."
    }),
});
