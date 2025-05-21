const Sala = require('../models/Sala');

// Serviço para criar uma sala
const createSala = async (data) => {
  return await Sala.create(data);
};

// Serviço para atualizar uma sala
const updateSala = async (id, data) => {
  return await Sala.update(id, data);
};

// Serviço para deletar uma sala
const deleteSala = async (id) => {
  return await Sala.delete(id);
};

module.exports = {
  createSala,
  updateSala,
  deleteSala
};
