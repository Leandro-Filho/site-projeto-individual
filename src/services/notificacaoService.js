const notificacaoRepository = require('../repositories/notificacaoRepository');

const notificacaoService = {
  async create(data) {
    if (!data.titulo || !data.mensagem) {
      throw new Error('Título e mensagem são obrigatórios.');
    }
    return await notificacaoRepository.create(data);
  },

  async getAll() {
    return await notificacaoRepository.findAll();
  },

  async getById(id) {
    const noti = await notificacaoRepository.findById(id);
    if (!noti) throw new Error('Notificação não encontrada.');
    return noti;
  },

  async update(id, data) {
    const updated = await notificacaoRepository.update(id, data);
    if (!updated) throw new Error('Não foi possível atualizar a notificação.');
    return updated;
  },

  async remove(id) {
    await notificacaoRepository.remove(id);
  }
};

module.exports = notificacaoService;
