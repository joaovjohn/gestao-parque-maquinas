INSERT INTO public.pessoa (id, cpf, status, data_nasc, email, senha, login, nome) VALUES
    (1, '12345678913', 1, '2001-01-01', 'admin@gmail.com', '$2a$10$E5DKLfC/dcUN4ImIG2gsIetyOV2qTlko56CXgcbPUQFooSCfhacOK', 'Admin', 'Admin'),
    (2, '12345678914', 1, '1990-02-02', 'user1@gmail.com', '$2a$10$E5DKLfC/dcUN4ImIG2gsIetyOV2qTlko56CXgcbPUQFooSCfhacOK', 'user1', 'User One'),
    (3, '12345678915', 1, '1985-03-03', 'user2@gmail.com', '$2a$10$E5DKLfC/dcUN4ImIG2gsIetyOV2qTlko56CXgcbPUQFooSCfhacOK', 'user2', 'User Two'),
    (4, '12345678916', 1, '1992-04-04', 'user3@gmail.com', '$2a$10$E5DKLfC/dcUN4ImIG2gsIetyOV2qTlko56CXgcbPUQFooSCfhacOK', 'user3', 'User Three'),
    (5, '12345678917', 1, '1988-05-05', 'user4@gmail.com', '$2a$10$E5DKLfC/dcUN4ImIG2gsIetyOV2qTlko56CXgcbPUQFooSCfhacOK', 'user4', 'User Four'),
    (6, '12345678918', 1, '1995-06-06', 'user5@gmail.com', '$2a$10$E5DKLfC/dcUN4ImIG2gsIetyOV2qTlko56CXgcbPUQFooSCfhacOK', 'user5', 'User Five'),
    (7, '12345678919', 1, '1983-07-07', 'user6@gmail.com', '$2a$10$E5DKLfC/dcUN4ImIG2gsIetyOV2qTlko56CXgcbPUQFooSCfhacOK', 'user6', 'User Six'),
    (8, '12345678920', 1, '1980-08-08', 'user7@gmail.com', '$2a$10$E5DKLfC/dcUN4ImIG2gsIetyOV2qTlko56CXgcbPUQFooSCfhacOK', 'user7', 'User Seven'),
    (9, '12345678921', 1, '1975-09-09', 'user8@gmail.com', '$2a$10$E5DKLfC/dcUN4ImIG2gsIetyOV2qTlko56CXgcbPUQFooSCfhacOK', 'user8', 'User Eight'),
    (10, '12345678922', 1, '1982-10-10', 'user9@gmail.com', '$2a$10$E5DKLfC/dcUN4ImIG2gsIetyOV2qTlko56CXgcbPUQFooSCfhacOK', 'user9', 'User Nine')
ON CONFLICT (cpf) DO NOTHING;

INSERT INTO public.supervisor (pessoa_id, descricao) VALUES
    (1, 'Supervisor Geral'),
    (2, 'Supervisor de Operações'),
    (3, 'Supervisor de Manutenção')
ON CONFLICT (pessoa_id) DO NOTHING;

INSERT INTO public.motorista (pessoa_id, num_cnh, categoria_cnh) VALUES
    (4, 'AB123456789', 'D'),
    (5, 'BC123456789', 'D'),
    (6, 'CD123456789', 'D'),
    (7, 'DE123456789', 'D'),
    (8, 'EF123456789', 'D'),
    (9, 'FG123456789', 'D'),
    (10, 'GH123456789', 'D')
ON CONFLICT (pessoa_id) DO NOTHING;

INSERT INTO public.localidade (id, nome, cidade, uf, pais) VALUES
    (1, 'Linha Santo Antonio', 'São José do Inhacorá', 'RS', 'Brasil'),
    (2, 'Linha Ilha', 'São José do Inhacorá', 'RS', 'Brasil'),
    (3, 'Linha Central', 'São José do Inhacorá', 'RS', 'Brasil'),
    (4, 'Linha Nova', 'São José do Inhacorá', 'RS', 'Brasil'),
    (5, 'Linha Velha', 'São José do Inhacorá', 'RS', 'Brasil'),
    (6, 'Linha Alta', 'São José do Inhacorá', 'RS', 'Brasil'),
    (7, 'Linha Baixa', 'São José do Inhacorá', 'RS', 'Brasil')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.marca (id, sigla, nome) VALUES
    (1, 'VW', 'Volkswagen'),
    (2, 'MB', 'Mercedes-Benz'),
    (3, 'CAT', 'Caterpillar'),
    (4, 'JHN', 'John Deere'),
    (5, 'VOLVO', 'Volvo'),
    (6, 'FORD', 'Ford'),
    (7, 'IVECO', 'Iveco')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.veiculo (id, categoria, placa, status, nome, id_marca, ano_fabricacao) VALUES
    (1, 'Caminhão', 'AAA1234', 1, 'Caminhão de Entrega', 1, 2015),
    (2, 'Ônibus', 'BBB1234', 1, 'Ônibus Escolar', 2, 2018),
    (3, 'Van', 'CCC1234', 1, 'Van de Transporte', 3, 2020),
    (4, 'Trator', 'DDD1234', 1, 'Trator Agrícola', 4, 2017),
    (5, 'Retroescavadeira', 'EEE1234', 1, 'Retroescavadeira', 3, 2016),
    (6, 'Caminhão', 'FFF1234', 1, 'Caminhão Basculante', 5, 2019),
    (7, 'Escavadeira', 'GGG1234', 1, 'Escavadeira Hidráulica', 3, 2021)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.servico (id, status, dt_solicita, descricao, prioridade, localidade_id, motorista_id, veiculo_id, dt_inicio, dt_final) VALUES
    (1, 1, '2024-07-01 08:00:00', 'Entrega de mercadorias', 1, 1, 4, 1, NULL, NULL),
    (2, 2, '2024-07-02 09:00:00', 'Transporte escolar', 2, 2, 5, 2, '2024-07-02 10:00:00', NULL),
    (3, 3, '2024-07-03 10:00:00', 'Serviço de transporte', 3, 3, 6, 3, '2024-07-03 11:00:00', '2024-07-03 15:00:00'),
    (4, 1, '2024-07-04 11:00:00', 'Aragem de solo', 1, 4, 7, 4, NULL, NULL),
    (5, 2, '2024-07-05 12:00:00', 'Obra de construção', 2, 5, 8, 5, '2024-07-05 13:00:00', NULL),
    (6, 3, '2024-07-06 13:00:00', 'Transporte de materiais', 3, 6, 9, 6, '2024-07-06 14:00:00', '2024-07-06 18:00:00'),
    (7, 1, '2024-07-07 14:00:00', 'Terraplanagem', 1, 7, 10, 7, NULL, NULL),
    (8, 2, '2024-07-08 15:00:00', 'Transporte de cargas', 2, 1, 4, 1, '2024-07-08 16:00:00', NULL),
    (9, 3, '2024-07-09 16:00:00', 'Serviço de transporte', 3, 2, 5, 2, '2024-07-09 17:00:00', '2024-07-09 21:00:00'),
    (10, 1, '2024-07-10 17:00:00', 'Aragem de solo', 1, 3, 6, 3, NULL, NULL)
ON CONFLICT (id) DO NOTHING;

SELECT setval('pessoa_id_seq', (SELECT MAX(id) FROM pessoa));
SELECT setval('localidade_id_seq', (SELECT MAX(id) FROM localidade));
SELECT setval('marca_id_seq', (SELECT MAX(id) FROM marca));
SELECT setval('veiculo_id_seq', (SELECT MAX(id) FROM veiculo));
SELECT setval('servico_id_seq', (SELECT MAX(id) FROM servico));
