const Joi = require("joi");

module.exports = Joi.object({
  id: Joi.number().integer().positive(),
  id_user: Joi.number().integer().positive().required(),
  id_sala: Joi.number().integer().positive().required(),
});