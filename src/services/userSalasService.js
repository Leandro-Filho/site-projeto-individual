const userSalasRepository = require('../repositories/userSalasRepository');

const userSalasService = {
  // Cria nova associação
  async create(data) {
    return await userSalasRepository.create(data);
  },

  // Lista todas as associações
  async findAll() {
    return await userSalasRepository.findAll();
  },

  // Busca por ID
  async findById(id) {
    const item = await userSalasRepository.findById(id);
    if (!item) throw new Error('Associação não encontrada');
    return item;
  },

  // Atualiza uma associação
  async update(id, data) {
    const updated = await userSalasRepository.update(id, data);
    if (!updated) throw new Error('Associação não encontrada para atualizar');
    return updated;
  },

  // Remove uma associação
  async remove(id) {
    await userSalasRepository.remove(id);
  }
};

module.exports = userSalasService;
