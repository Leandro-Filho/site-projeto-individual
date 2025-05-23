const Joi = require("joi");

module.exports = Joi.object({
  id: Joi.number().integer().positive(),
  id_user: Joi.number().integer().positive().required(),
  id_notificacao: Joi.number().integer().positive().required(),
  visualizado: Joi.boolean().default(false)
});
