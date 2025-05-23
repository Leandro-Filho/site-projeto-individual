const Joi = require("joi");

module.exports = Joi.object({
  id: Joi.number().integer().positive(),
  titulo: Joi.string().required(),
  mensagem: Joi.string().required()
});
