--ativar extensão para gerar UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

--tabela: usuario
--armazena informações dos usuários do sistema
CREATE TABLE usuario (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL,
    empresa_escola TEXT,
    numero_celular TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--tabela: salas
--armazena detalhes das salas disponíveis para reserva
CREATE TABLE salas (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    local TEXT NOT NULL,
    descricao TEXT,
    capacidade INTEGER NOT NULL CHECK (capacidade > 0),
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--tabela: usuario_salas
--tabela de junção para relação N:N entre usuario e salas
CREATE TABLE usuario_salas (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    id_usuario UUID NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
    id_salas UUID NOT NULL REFERENCES salas(id) ON DELETE CASCADE,
    UNIQUE(id_usuario, id_salas) --essa parte garante que a combinação usuario-sala seja única
);

--tabela: reservas
--registra as reservas feitas por usuários para salas específicas
CREATE TABLE reservas (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    id_usuario UUID NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
    id_salas UUID NOT NULL REFERENCES salas(id) ON DELETE RESTRICT,
    titulo TEXT NOT NULL,
    data DATE NOT NULL,
    horario_inicio TIME NOT NULL,
    horario_final TIME NOT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_horarios CHECK (horario_final > horario_inicio)
);

--tabela: notificacoes
--armazena notificações enviadas pelo sistema
CREATE TABLE notificacoes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    titulo TEXT NOT NULL,
    mensagem TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--tabela: usuario_notificacao
--registra a relação entre usuários e notificações (relação RECEBE)
CREATE TABLE usuario_notificacao (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    id_usuario UUID NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
    id_notificacao UUID NOT NULL REFERENCES notificacoes(id) ON DELETE CASCADE,
    recebido_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    lido BOOLEAN DEFAULT FALSE,
    UNIQUE(id_usuario, id_notificacao) --igual a tabela usuarios-salas, essa parte garante que a combinação usuario-notificação seja única
);

--índices para otimizar consultas
CREATE INDEX idx_usuario_salas_usuario_id ON usuario_salas(id_usuario);
CREATE INDEX idx_usuario_salas_salas_id ON usuario_salas(id_salas);
CREATE INDEX idx_reservas_usuario_id ON reservas(id_usuario);
CREATE INDEX idx_reservas_salas_id ON reservas(id_salas);
CREATE INDEX idx_usuario_notificacao_usuario_id ON usuario_notificacao(id_usuario);
CREATE INDEX idx_usuario_notificacao_notificacao_id ON usuario_notificacao(id_notificacao);