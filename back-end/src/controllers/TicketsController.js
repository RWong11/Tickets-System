const connection = require('../config/connection');

function obtener(req, res) {
    if(connection) {
        let sql = "SELECT * FROM VI_Tickets WHERE TicketBaja = 0";
        connection.query(sql, (err, tickets) => {
            if(err) 
                res.json(err);
            else {
                console.log(tickets);
                res.json(tickets);
            }
        });
    }
}

function obtenerUno(req, res) {
    if(connection) {
        const {id} = req.params
        let sql = "SELECT * FROM VI_Tickets WHERE TicketBaja = 0 AND IDTicket = ?";
        connection.query(sql, [id], (err, tickets) => {
            if(err) 
                res.json(err);
            else {
                console.log(tickets);
                res.json(tickets);
            }
        });
    }
}

function capturar(req, res){
    if(connection){
        console.log("BODY: ", req.body);
        const {Nombre, Descripcion, Prioridad, Personal, Categoria} = req.body;
        const Estatus = 'ABT';
        const Baja = 0;

        if(!Nombre)
            return res.status(400).send({error: true, mensaje: "El nombre es obligatorio"});

        if(Nombre.length > 50)
            return res.status(400).send({error: true, mensaje: "El nombre ha sobrepasado la longitud máxima (50)"});
            
        if(Descripcion.length > 100)
            return res.status(400).send({error: true, mensaje: "La descripción ha sobrepasado la longitud máxima (100)"});
            
        if(!Prioridad)
            return res.status(400).send({error: true, mensaje: "La prioridad es necesaria"});
        
        if(!Personal)
            return res.status(400).send({error: true, mensaje: "El personal es obligatorio"});

        if(!Categoria)
            return res.status(400).send({error: true, mensaje: "La categoria es obligatoria"});

        let sql = "INSERT INTO Tickets set ?";
            
            connection.query(sql, [{Nombre, Descripcion, Prioridad, Personal, Categoria, Estatus, Baja}], (err, data) => {
                if(err)
                console.log(err);
                else 
                res.json({error: false, data, mensaje: "Ticket capturado con éxito."});
            })
        }
    }
    
    function editar(req, res){
        if(connection){
            const {id} = req.params;
            const {Descripcion, Prioridad, Personal, Categoria, Estatus} = req.body;
            
        if(Descripcion.length > 100)
            return res.status(400).send({error: true, mensaje: "El nombre ha sobrepasado la longitud máxima (50)"});

        let sql = "UPDATE Tickets set ? WHERE ID = ?;";

        connection.query(sql, [{Descripcion, Prioridad, Personal, Categoria, Estatus}, id], (err, data) => {
            if(err)
                console.log(err);
            else 
                res.json({error: false, data, mensaje: "Ticket editado con éxito."});
        })
    }
}

function eliminar(req, res) {
    if(connection) {
        const {id} = req.params;
        let sql = "UPDATE Tickets SET Baja = 1 WHERE ID = ?";
        connection.query(sql, [id], (err, data) => {
            if(err)
                res.json(err);
            else {
                let mensaje = data.affectedRows === 0 ? "No se pudo eliminar el ticket" : "Ticket eliminado con éxito";
                res.json({error: false, data, mensaje});
            }
        })
    }
}

module.exports = {
    obtener,
    obtenerUno,
    capturar,
    editar,
    eliminar
}