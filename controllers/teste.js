var db = require('../db-config');

var getData = (req, res) => {
  console.log(req.body);
  db.any('SELECT * FROM item')
    .then((data) => res.json(data));
}

var insertData = (req, res) => {
  console.log(req.body);
  let err = {
    condition:  false,
    msg: []
  };
  if(!req.body.nome) {
    err.condition = true;
    err.msg.push('Nome é requirido')
  }
  if(!req.body.preco) {
    err.condition = true;
    err.msg.push('Preco é requirido');
  }
  if(err.condition) {
    res.status(400).json({
      error: err.msg.join(', ')
    })
  }

  db.any(`INSERT INTO item (nome, preco) VALUES ($1,$2)`, [req.body.nome, req.body.preco])
    .then((data) => res.json({
      message: 'Inserido com sucesso'
    }));
}

var changeData = (req, res) => {
  const id = req.params.id;
  let err = {
    condition:  false,
    msg: []
  };
  if(!id) {
    err.condition = true;
    err.msg.push('ID é requirido');
  }
  if(err.condition) {
    res.status(400).json({
      error: err.msg.join(', ')
    });
  }

  var resposta = db.any('SELECT * FROM changeData', [
    id,
    req.body.nome,
    req.body.preco
  ]);

  res.json(resposta);
}

module.exports = {
  getData,
  insertData,
  changeData
}
