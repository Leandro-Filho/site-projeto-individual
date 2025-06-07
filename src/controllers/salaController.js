const Sala = require('../models/salaModel');
const UsuarioSala = require('../models/usuarioSala');

const salaController = {
  // Criar uma nova sala
  async create(req, res) {
    try {
      const novaSala = await Sala.create(req.body);
      res.status(201).json(novaSala);
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  },

  // Buscar todas as salas
  async getAll(req, res) {
    try {
      const salas = await Sala.findAll();
      res.status(200).json(salas);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  },

  // Buscar sala por ID
  async getById(req, res) {
    try {
      const sala = await Sala.findById(req.params.id);
      if (!sala) {
        return res.status(404).json({ erro: 'Sala não encontrada' });
      }
      res.status(200).json(sala);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  },

  // Buscar salas por filtro (capacidade mínima)
  async getByFilter(req, res) {
    try {
      let salas = [];
      
      // Filtrar por capacidade mínima
      if (req.query.capacidade) {
        salas = await Sala.findByCapacidade(req.query.capacidade);
      } else {
        // Se não houver filtro, retornar todas
        salas = await Sala.findAll();
      }
      
      res.status(200).json(salas);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  },

  // Atualizar sala
  async update(req, res) {
    try {
      const salaAtualizada = await Sala.update(req.params.id, req.body);
      if (!salaAtualizada) {
        return res.status(404).json({ erro: 'Sala não encontrada' });
      }
      res.status(200).json(salaAtualizada);
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  },

  // Deletar sala
  async delete(req, res) {
    try {
      await Sala.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  },

  // Verificar disponibilidade da sala
  async verificarDisponibilidade(req, res) {
    try {
      const { id_sala, data, horario_inicio, horario_final } = req.query;
      
      if (!id_sala || !data || !horario_inicio || !horario_final) {
        return res.status(400).json({ 
          erro: 'Parâmetros incompletos. Forneça id_sala, data, horario_inicio e horario_final' 
        });
      }
      
      const disponivel = await Sala.verificarDisponibilidade(
        id_sala, data, horario_inicio, horario_final
      );
      
      res.status(200).json({ disponivel });
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  },

  // Associar usuário a uma sala
  async associarUsuario(req, res) {
    try {
      const { id_user, id_salas } = req.body;
      
      if (!id_user || !id_salas) {
        return res.status(400).json({ erro: 'ID do usuário e ID da sala são obrigatórios' });
      }
      
      // Verificar se a sala existe
      const sala = await Sala.findById(id_salas);
      if (!sala) {
        return res.status(404).json({ erro: 'Sala não encontrada' });
      }
      
      const associacao = await UsuarioSala.create({ id_user, id_salas });
      res.status(201).json(associacao);
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  },

  // Desassociar usuário de uma sala
  async desassociarUsuario(req, res) {
    try {
      const { id_salas, id_user } = req.params;
      
      await UsuarioSala.delete(id_user, id_salas);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  },

  // Listar usuários de uma sala
  async getUsuarios(req, res) {
    try {
      const usuarios = await UsuarioSala.findUsuariosBySala(req.params.id);
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  },

  async viewSalas(req, res) {
  try {
    const { local, horario_inicio, horario_fim } = req.query;

    const filtro = {};
    if (local) filtro.local = local;
    if (horario_inicio) filtro.horario_inicio = horario_inicio;
    if (horario_fim) filtro.horario_fim = horario_fim;

    const salas = await Sala.findByFilter(filtro);
    res.render('sala', { salas }); // renderiza a view 'views/salas.ejs'
  } catch (error) {
    res.status(500).send('Erro ao buscar salas');
  }
},

async showForm(req, res) {
  try {
    res.render('form'); // form.ejs
  } catch (error) {
    res.status(500).send('Erro ao exibir o formulário');
  }
},

  async showReservaForm(req, res) {
    try {
      const { id } = req.params;
      const sala = await Sala.findById(id); // método que busca sala pelo ID no banco

      if (!sala) {
        return res.status(404).send('Sala não encontrada');
      }

      // Renderiza a view de reserva, enviando os dados da sala
      res.render('reservaForm', { sala });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao carregar formulário de reserva');
    }
  },

};

module.exports = salaController;