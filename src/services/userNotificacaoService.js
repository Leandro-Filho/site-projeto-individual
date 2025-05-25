const userNotificacaoRepository = require('../repositories/userNotificacaoRepository');

module.exports = {
  // Cria um novo relacionamento entre usuário e notificação
  async create(data) {
    return await userNotificacaoRepository.create(data);
  },

  // Retorna todos os registros da tabela
  async getAll() {
    return await userNotificacaoRepository.findAll();
  },

  // Retorna um único registro pelo ID
  async getById(id) {
    const record = await userNotificacaoRepository.findById(id);
    if (!record) throw new Error('Relacionamento não encontrado');
    return record;
  },

  // Atualiza um registro existente
  async update(id, data) {
    const updated = await userNotificacaoRepository.update(id, data);
    if (!updated) throw new Error('Não foi possível atualizar');
    return updated;
  },

  // Remove um relacionamento pelo ID
  async remove(id) {
    await userNotificacaoRepository.remove(id);
  },

  // Retorna todas as notificações de um usuário específico
  async getByUserId(userId) {
    return await userNotificacaoRepository.findByUserId(userId);
  }
};
