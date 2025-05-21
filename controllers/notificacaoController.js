const notificationService = require('../services/notificationService');

// Controlador para criar uma nova notificação
const createNotification = async (req, res) => {
  try {
    const { usuario_id, titulo, mensagem } = req.body;

    const created_at = new Date();
    const update_at = new Date();

    const novaNotificacao = await notificationService.createNotification({
      usuario_id,
      titulo,
      mensagem,
      created_at,
      update_at
    });

    res.status(201).json(novaNotificacao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para deletar uma notificação de um usuário específico
const deleteNotification = async (req, res) => {
  try {
    const { notificationId, userId } = req.params;

    const deleted = await notificationService.deleteNotification(notificationId, userId);

    if (deleted) {
      res.status(200).json({ message: 'Notificação deletada com sucesso' });
    } else {
      res.status(404).json({ error: 'Notificação não encontrada ou não pertence ao usuário' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createNotification,
  deleteNotification
};
