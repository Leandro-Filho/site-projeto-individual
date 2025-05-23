-- Ativar extensão para gerar UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela: users
-- Armazena informações dos usuários do sistema
CREATE TABLE "users" (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL,
    empresa_escola TEXT,
    numero_celular TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela: salas
-- Armazena detalhes das salas disponíveis para reserva
CREATE TABLE "salas" (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    local TEXT NOT NULL,
    descricao TEXT,
    capacidade INTEGER NOT NULL CHECK (capacidade > 0),
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela: user_salas
-- Tabela de junção para relação N:N entre users e salas
CREATE TABLE "user_salas" (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    id_user UUID NOT NULL REFERENCES "users"(id) ON DELETE CASCADE,
    id_salas UUID NOT NULL REFERENCES "salas"(id) ON DELETE CASCADE,
    UNIQUE(id_user, id_salas) -- Garante que a combinação user-sala seja única
);

-- Tabela: reservas
-- Registra as reservas feitas por usuários para salas específicas
CREATE TABLE "reservas" (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    id_user UUID NOT NULL REFERENCES "users"(id) ON DELETE CASCADE,
    id_salas UUID NOT NULL REFERENCES "salas"(id) ON DELETE RESTRICT,
    titulo TEXT NOT NULL,
    data DATE NOT NULL,
    horario_inicio TIME NOT NULL,
    horario_final TIME NOT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_horarios CHECK (horario_final > horario_inicio)
);

-- Tabela: notificacoes
-- Armazena notificações enviadas pelo sistema
CREATE TABLE "notificacoes" (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    titulo TEXT NOT NULL,
    mensagem TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela: user_notificacao
-- Registra a relação entre usuários e notificações (relação RECEBE)
CREATE TABLE "user_notificacao" (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    id_user UUID NOT NULL REFERENCES "users"(id) ON DELETE CASCADE,
    id_notificacao UUID NOT NULL REFERENCES "notificacoes"(id) ON DELETE CASCADE,
    recebido_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    lido BOOLEAN DEFAULT FALSE,
    UNIQUE(id_user, id_notificacao) -- Garante que a combinação user-notificação seja única
);

-- Índices para otimizar consultas
CREATE INDEX idx_user_salas_user_id ON "user_salas"(id_user);
CREATE INDEX idx_user_salas_salas_id ON "user_salas"(id_salas);
CREATE INDEX idx_reservas_user_id ON "reservas"(id_user);
CREATE INDEX idx_reservas_salas_id ON "reservas"(id_salas);
CREATE INDEX idx_user_notificacao_user_id ON "user_notificacao"(id_user);
CREATE INDEX idx_user_notificacao_notificacao_id ON "user_notificacao"(id_notificacao);