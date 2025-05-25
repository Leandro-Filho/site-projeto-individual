const salaRepository = require('../repositories/salaRepository');

module.exports = {
  // Cria uma nova sala com validação via repository
  async create(salaData) {
    // Aqui você pode adicionar validações extras ou regras de negócio
    if (!salaData.local || !salaData.capacidade) {
      throw new Error('Local e capacidade são obrigatórios');
    }

    // Chama o repository para criar a sala no banco
    const novaSala = await salaRepository.create(salaData);
    return novaSala;
  },

  // Retorna todas as salas cadastradas
  async getAll() {
    const salas = await salaRepository.getAll();
    return salas;
  },

  // Busca sala por ID
  async getById(id) {
    if (!id) throw new Error('ID da sala é obrigatório');

    const sala = await salaRepository.getById(id);
    if (!sala) throw new Error('Sala não encontrada');
    return sala;
  },

  // Atualiza uma sala existente
  async update(id, salaData) {
    if (!id) throw new Error('ID da sala é obrigatório');
    // Pode validar os dados também aqui antes de atualizar

    const salaAtualizada = await salaRepository.update(id, salaData);
    if (!salaAtualizada) throw new Error('Sala não encontrada para atualizar');
    return salaAtualizada;
  },

  // Remove uma sala pelo ID
  async remove(id) {
    if (!id) throw new Error('ID da sala é obrigatório');
    await salaRepository.remove(id);
  },

  // Busca salas com filtros (ex: local)
  async getByFilter(filter) {
    const salas = await salaRepository.getByFilter(filter);
    return salas;
  },
};
