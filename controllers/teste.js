var db = require('../db-config');

function getData(req, res) {
    console.log(req.body);
    db.func('getData')
        .then((data) => res.json(data[0]));
}

function getDataId(req, res) {
    const id = req.params.id;
    console.log(id);
    db.func('getDataId', [id])
        .then((data) => {
        if(!data.length) {
        res.status(404).json(
            {
                content: [],
            });
        return
        }
    res.status(200).json(
        {
            content: data[0],
            message: 'OK'
        });
    })
}

var insertData = (req, res) => {
    console.log(req.body);
    let err = {
        condition: false,
        msg: []
    };
    if (!req.body.nome) {
        err.condition = true;
        err.msg.push('Nome é requirido')
    }
    if (!req.body.preco) {
        err.condition = true;
        err.msg.push('Preco é requirido');
    }
    if (err.condition) {
        res.status(400).json({
            error: err.msg.join(', ')
        })
    }

    db.func(`insertData`, [req.body.nome, req.body.preco])
        .then((data) => res.json(
            {
                content: data[0].insertdata.content,
                message: data[0].insertdata.message
            }
            ));
}

function changeData(req, res) {
    const id = req.params.id;
    let err = {
        condition: false,
        msg: []
    };
    if (!id) {
        err.condition = true;
        err.msg.push('ID é requirido');
    }
    if (err.condition) {
        res.status(400).json({
            error: err.msg.join(', ')
        });
    }

    db.func('changeData', [
        id,
        req.body.nome,
        req.body.preco
    ]).then((data) => {
        res.status(200).json({
            message: data[0].changedata.message,
            nomeAntigo: data[0].changedata.nomeAntigo,
            precoAntigo: data[0].changedata.precoAntigo
        });
    });
}

function deleteData(req, res) {
    const id = req.params.id;


    db.func('deleteData', [
        id
    ]).then((data) => {
        res.status(200).json({
            message: data[0].deletedata.message,
            nomeProduto: data[0].deletedata.nomeDoProduto,
        });
    });

}

module.exports = {
    getData,
    getDataId,
    insertData,
    changeData,
    deleteData
}
