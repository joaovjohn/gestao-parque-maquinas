-- DATABASE: gestao_parque_maquinas

CREATE TABLE IF NOT EXISTS public.localidade (
    id serial NOT NULL,
    nome varchar(256) NOT NULL, -- nome do local, ex: fazenda, empresa, etc
    cidade varchar(256) NOT NULL,
    uf varchar(2) NOT NULL,
    pais varchar(50) NOT NULL,
    latitude varchar(50) NULL,
    longitude varchar(50) NULL,
CONSTRAINT pk_localidade PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.marca (
    id serial NOT NULL,
    sigla varchar(256) NOT NULL,
    nome varchar(256) NOT NULL,
CONSTRAINT pk_marca PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.pessoa (
    id serial NOT NULL,
    cpf varchar(11) UNIQUE NOT NULL,
    status integer DEFAULT 1 NOT NULL, -- flag para tratar na aplicacao (1 - disponivel, 2 - em servico, 3 - inativo)
    data_nasc date NULL,
    email varchar(50) UNIQUE NULL,
    senha varchar(100) NOT NULL,
    login varchar(50) UNIQUE NOT NULL,
    nome varchar(256) NOT NULL,
CONSTRAINT pk_pessoa PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.supervisor (
    pessoa_id integer NOT NULL UNIQUE,
    descricao varchar(256) NULL,
    CONSTRAINT fk_supervisor_pessoa FOREIGN KEY (pessoa_id) REFERENCES public.pessoa(id)
);

CREATE TABLE IF NOT EXISTS public.veiculo (
    id serial NOT NULL,
    categoria varchar(50) NOT NULL, -- trator, van, caminhao, etc
    placa varchar(7) NULL UNIQUE,
    status integer NOT NULL DEFAULT 1, -- flag para tratar na aplicacao (1 - disponivel, 2 - em servico, 3 - em manutencao)
    nome varchar(256) NOT NULL,
    id_marca integer NOT NULL,
CONSTRAINT pk_veiculo PRIMARY KEY (id),
CONSTRAINT fk_veiculo_marca FOREIGN KEY (id_marca) REFERENCES public.marca(id)
);

CREATE TABLE IF NOT EXISTS public.motorista (
    pessoa_id integer NOT NULL UNIQUE,
    num_cnh varchar(11) NOT NULL,
    categoria_cnh varchar(2) NOT NULL,
CONSTRAINT pk_motorista PRIMARY KEY (num_cnh),
CONSTRAINT fk_motorista_pessoa FOREIGN KEY (pessoa_id) REFERENCES public.pessoa(id)
);

CREATE TABLE IF NOT EXISTS public.servico (
    id serial NOT NULL,
    status integer NOT NULL DEFAULT 1, -- flag para tratar na aplicacao (1 - aguardando execucao, 2 - em andamento, 3 - concluido)
    dt_solicita timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    descricao varchar (200) NOT NULL,
    prioridade integer NOT NULL, -- flag (1 - alta, 2 - media, 3 - baixa)
    localidade_id integer NOT NULL,
    motorista_id INTEGER NOT NULL,
    veiculo_id INTEGER NOT NULL,
    dt_inicio timestamp NULL,
    dt_final timestamp NULL,
CONSTRAINT pk_servico PRIMARY KEY (id),
CONSTRAINT fk_servico_localidade FOREIGN KEY (localidade_id) REFERENCES public.localidade(id),
CONSTRAINT fk_servico_motorista FOREIGN KEY (motorista_id) REFERENCES public.motorista(pessoa_id),
CONSTRAINT fk_servico_veiculo FOREIGN KEY (veiculo_id) REFERENCES public.veiculo(id)
);
