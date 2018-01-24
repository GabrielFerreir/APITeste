CREATE OR REPLACE FUNCTION getData(

) RETURNS TABLE(
  "id" INTEGER,
  "nome" VARCHAR,
  "preco" NUMERIC(10,2)
) AS $$
  BEGIN
    RETURN QUERY
    SELECT i.id, i.nome, i.preco FROM item i;
  END;

$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION getDataId(
  pId INTEGER
) RETURNS TABLE(
  "id" INTEGER,
  "nome" VARCHAR,
  "preco" NUMERIC(10,2)
) AS  $$
        BEGIN
          IF SELECT i.id, i.nome, i.preco FROM item i WHERE i.id = pId
          THEN
            RETURN QUERY
            SELECT i.id, i.nome, i.preco FROM item i WHERE i.id = pId;
          ELSE
        END;
      $$
  LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insertData(
  pNome VARCHAR(50),
  pPreco NUMERIC(10,2)
) RETURNS json AS $$
    BEGIN
      INSERT  INTO item (nome, preco) VALUES (pNome, pPreco);
      RETURN
      json_build_object(
          'content', jsonb_build_object(
                        'nome', pNome,
                        'preco', pPreco
                      ),
          'message', 'Inserido com sucesso'
      );
      END;
  $$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION changeData(
  pId integer,
  pNome varchar(50),
  pPreco numeric(10,2)
) RETURNS json AS $$

  DECLARE
    vNomeAntigo varchar;
    vPrecoAntigo NUMERIC(10,2);
  BEGIN

--     SELECT * FROM public.changedata(1, 'aaa', 30.2);

    SELECT i.nome, i.preco INTO vNomeAntigo, vPrecoAntigo FROM item i WHERE i.id = pId;



    UPDATE item SET nome = pNome, preco = pPreco WHERE id = pId;
    RETURN
      json_build_object(
        'message', 'Deu certo',
        'nomeAntigo', vNomeAntigo,
        'precoAntigo', vPrecoAntigo
      );
  END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION deleteData(
  pId INTEGER
) RETURNS json as $$
  DECLARE
    vNome VARCHAR;
  BEGIN
--     SELECT i.nome FROM item i WHERE i.id = 2;
    SELECT i.nome INTO vNome FROM item i WHERE i.id = pId;

    DELETE FROM item WHERE id = pId;
    RETURN
      json_build_object(
        'message', 'Excluido com sucesso',
        'nomeDoProduto', vNome
    );
  END;
$$
LANGUAGE plpgsql;

