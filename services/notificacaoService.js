const Notificacao = require('../models/notificacao');

// Serviço para criar notificação para um usuário
const createNotification = async (data) => {
  return await Notificacao.create(data);
};

// Serviço para deletar uma notificação de um usuário específico
const deleteNotification = async (notificationId, userId) => {
  return await Notificacao.deleteByUser(notificationId, userId);
};

module.exports = {
  createNotification,
  deleteNotification
};
