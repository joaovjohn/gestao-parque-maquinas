DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM public.pessoa WHERE cpf = '12345678913') THEN
        INSERT INTO public.pessoa
        (id, cpf, status, data_nasc, email, senha, login, nome)
        VALUES(null, '12345678913', 1, '2001-01-01', 'admin@gmail.com', '$2a$10$E5DKLfC/dcUN4ImIG2gsIetyOV2qTlko56CXgcbPUQFooSCfhacOK', 'Admin', 'Admin');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM public.localidade WHERE nome = 'Linha Santo Antonio' AND cidade = 'São José do Inhacorá') THEN
        INSERT INTO public.localidade
        (id, nome, cidade, uf, pais)
        VALUES(null, 'Linha Santo Antonio', 'São José do Inhacorá', 'RS', 'Brasil');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM public.localidade WHERE nome = 'Linha Ilha' AND cidade = 'São José do Inhacorá') THEN
        INSERT INTO public.localidade
        (id, nome, cidade, uf, pais)
        VALUES(null, 'Linha Ilha', 'São José do Inhacorá', 'RS', 'Brasil');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM public.marca WHERE sigla = 'FORD') THEN
        INSERT INTO public.marca
        (id, sigla, nome)
        VALUES(null, 'FORD', 'Ford');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM public.marca WHERE sigla = 'VW') THEN
        INSERT INTO public.marca
        (id, sigla, nome)
        VALUES(null, 'VW', 'Volkswagen');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM public.veiculo WHERE placa = 'ABC1234') THEN
        INSERT INTO public.veiculo
        (id, categoria, placa, status, nome, id_marca, ano_fabricacao)
        VALUES(null, 'Caminhão', 'ABC1234', 1, 'Caminhão 1', 1, 2010);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM public.veiculo WHERE placa = 'DEF5678') THEN
        INSERT INTO public.veiculo
        (id, categoria, placa, status, nome, id_marca, ano_fabricacao)
        VALUES(null, 'Maquina', 'DEF5678', 1, 'Trator', 2, 2015);
    END IF;
END $$;