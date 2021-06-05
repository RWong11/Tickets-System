const connection = require('../config/connection');

function obtener(req, res) {
    if (connection) {
        let sql = "SELECT ID, Nombre FROM Cat_CategoriasTicket WHERE Baja = 0";
        connection.query(sql, (err, categorias) => {
            if (err)
                res.json(err);
            else {
                res.json(categorias);
            }
        });
    }
}

function capturar(req, res) {
    if (connection) {
        const categoria = req.body;

        if (!categoria.nombre)
            return res.status(400).send({ error: true, mensaje: "El nombre es obligatorio" });

        if (categoria.nombre.length > 50)
            return res.status(400).send({ error: true, mensaje: "Has sobrepasado la longitud maxima (50)" });

        let sql = "INSERT INTO Cat_CategoriasTicket set ?";

        connection.query(sql, [categoria], (err, data) => {
            if (err)
                console.log(err);
            else
                res.json({ error: false, data, mensaje: "Categoria capturada con exito." });
        })
    }
}

function eliminar(req, res) {
    if (connection) {
        const { id } = req.params;
        let sql = "UPDATE Cat_CategoriasTicket SET Baja = 1 WHERE ID = ?";
        connection.query(sql, [id], (err, data) => {
            if (err)
                res.json(err);
            else {
                let mensaje = data.affectedRows === 0 ? "No se pudo eliminar la Categoria" : "Categoria eliminada con éxito";
                res.json({ error: false, data, mensaje });
            }
        })
    }
}

module.exports = {
    obtener,
    capturar,
    eliminar
}
