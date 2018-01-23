CREATE OR REPLACE FUNCTION changeData(
  pId integer,
  pNome varchar(50),
  pPreco numeric(10,2)
) RETURNS json AS $$

  DECLARE
    vNomeAntigo varchar;
  BEGIN

    SELECT i.nome INTO vNomeAntigo FROM item i WHERE i.id = pId;

    UPDATE item SET nome = pNome, preco = pPreco WHERE id = pId;
    RETURN
      json_build_object(
        'message', 'Deu certo',
        'nomeAntigo', vNomeAntigo
      );
  END;
$$
LANGUAGE plpgsql;
