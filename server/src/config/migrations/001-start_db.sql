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
    status integer DEFAULT 0 NOT NULL, -- flag para tratar na aplicacao (1 - disponivel, 2 - em servico, 3 - inativo)
    data_nasc date NULL,
    email varchar(50) UNIQUE NOT NULL,
    senha varchar(100) NOT NULL,
    login varchar(50) UNIQUE NOT NULL,
    nome varchar(256) NOT NULL,
CONSTRAINT pk_pessoa PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.supervisor (
    id serial NOT NULL,
    pessoa_id integer NOT NULL,
    CONSTRAINT pk_supervisor PRIMARY KEY (id),
CONSTRAINT fk_supervisor_pessoa FOREIGN KEY (pessoa_id) REFERENCES public.pessoa(id)
);

CREATE TABLE IF NOT EXISTS public.veiculo (
    id serial NOT NULL,
    categoria varchar(50) NOT NULL,
    placa varchar(7) NULL,
    status integer NOT NULL DEFAULT 0, -- flag para tratar na aplicacao (1 - disponivel, 2 - em servico, 3 - em manutencao)
    nome varchar(256) NOT NULL,
    tipo_uso integer NOT NULL, -- flag para uso de tempo/quilometragem (1 - veiculo, 2 - maquina)
    id_marca integer NOT NULL,
CONSTRAINT pk_veiculo PRIMARY KEY (id),
CONSTRAINT fk_veiculo_marca FOREIGN KEY (id_marca) REFERENCES public.marca(id)
);

CREATE TABLE IF NOT EXISTS public.motorista (
    pessoa_id integer NOT NULL,
    num_cnh varchar(11) NOT NULL,
    categoria_cnh varchar(2) NOT NULL,
CONSTRAINT pk_motorista PRIMARY KEY (num_cnh),
CONSTRAINT fk_motorista_pessoa FOREIGN KEY (pessoa_id) REFERENCES public.pessoa(id)
);

CREATE TABLE IF NOT EXISTS public.servico (
    id serial NOT NULL,
    status integer NOT NULL, -- flag para tratar na aplicacao
    dt_solicita timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    descricao varchar (200) NOT NULL,
    prioridade integer NOT NULL,
    dt_aprovacao timestamp,
    usuario_aprovacao integer,
    supervisor_id integer,
    localidade_id integer NOT NULL,
    solicitante_id integer NOT NULL,
CONSTRAINT pk_servico PRIMARY KEY (id),
CONSTRAINT fk_servico_supervisor FOREIGN KEY (supervisor_id) REFERENCES public.supervisor(id),
CONSTRAINT fk_servico_localidade FOREIGN KEY (localidade_id) REFERENCES public.localidade(id),
CONSTRAINT fk_servico_solicitante FOREIGN KEY (solicitante_id) REFERENCES public.pessoa(id),
CONSTRAINT fk_servico_usuario_aprovacao FOREIGN KEY (usuario_aprovacao) REFERENCES public.supervisor(id)
);

CREATE TABLE IF NOT EXISTS public.veiculo_servico (
    id serial NOT NULL,
    veiculo_id integer NOT NULL,
    servico_id integer NOT NULL,
    tempo integer, -- tempo é utilizado para máquinas
    distancia integer, -- distancia é utilizado para veiculos (km)
CONSTRAINT pk_veiculo_servico PRIMARY KEY (id),
CONSTRAINT fk_veiculo_servico_veiculo FOREIGN KEY (veiculo_id) REFERENCES public.veiculo(id),
CONSTRAINT fk_veiculo_servico_servico FOREIGN KEY (servico_id) REFERENCES public.servico(id)
);

CREATE TABLE IF NOT EXISTS public.data_servico (
    id serial NOT NULL,
    id_servico integer NOT NULL,
    dt_cadastro timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    dt_inicio timestamp,
    dt_final timestamp,
CONSTRAINT pk_data_servico PRIMARY KEY (id),
CONSTRAINT fk_data_servico FOREIGN KEY (id_servico) REFERENCES public.servico(id)
);

CREATE TABLE IF NOT EXISTS public.motorista_servico (
    id serial NOT NULL,
    motorista_cnh varchar(11),
    servico_id integer NOT NULL,
CONSTRAINT pk_motorista_servico PRIMARY KEY (id),
CONSTRAINT fk_motorista_servico_motorista FOREIGN KEY (motorista_cnh) REFERENCES public.motorista(num_cnh),
CONSTRAINT fk_motorista_servico_servico FOREIGN KEY (servico_id) REFERENCES public.servico(id)
);
