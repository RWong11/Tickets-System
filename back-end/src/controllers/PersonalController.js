const connection = require('../config/connection');

function listarPersonal(req, res) {
    if(connection) {
        let sql = "SELECT ID, Nombre, Apellidos, Telefono, Direccion, Baja FROM Personal WHERE Baja = 0";
        connection.query(sql, (err, personal) => {
            if(err) 
                res.json(err);
            else {
                console.log(personal);
                res.json(personal);
            }
        });
    }
}

function obtenerPersona(req, res) {
    if(connection){
        const { id } = req.params; 
        let sql = `SELECT * FROM Personal WHERE ID = ${connection.escape(id)}`;
        connection.query(sql, (err, persona) => {
            if(err){
                console.log(err);
            } else {
                var mensaje1 = "";
                if(persona === undefined || persona.length == 0)
                mensaje1 = "Esta persona no se encuentra activa";

                res.json({data: persona[0], mensaje: mensaje1});
            }
        })
    }

}

function insertarPersona(req, res){
    if(connection){
        console.log(req.body);
        const persona = req.body;

        if(!persona.nombre){
            return res.status(400).send({error: true, mensaje: "El nombre es obligatorio"});
        }

        if(persona.nombre && persona.nombre.length > 50){
            return res.status(400).send({error: true, mensaje: "El campo de nombre debe contener como máximo 50 caracteres"});
        }

        if(!persona.apellidos){
            return res.status(400).send({error: true, mensaje: "El apellido es obligatorio"});
        }

        if(persona.apellidos && persona.apellidos.length > 80){
            return res.status(400).send({error: true, mensaje: "El campo de apellidos debe contener como máximo 80 caracteres"});
        }

        if(persona.telefono && persona.telefono.length !== 10){
            return res.status(400).send({error: true, mensaje: "La longitud debe ser de 10 caracteres"});
        }

        let sql = "INSERT INTO Personal (Nombre, Apellidos, Telefono, Direccion, Baja) VALUES ('" 
        + persona.nombre + "', '" + persona.apellidos + "', '" + persona.telefono + "', '" + persona.direccion + "', 0)";

        connection.query(sql, [persona], (err, data) => {
            if(err){
                console.log(err);
            } else {
            
                res.json({error: false, data, mensaje: "Persona creada con exito."});
            }
        })
    }
}

function editarPersona(req, res) {
    if(connection){
        const { id } = req.params;
        const persona = req.body;

        let sql = "UPDATE Personal set ? WHERE id = ?";

        connection.query(sql, [persona, id], (err, data) => {
            if(err) {
                res.json(err);
            } else {
                let mensaje = "";
                if(data.changedRows === 0) {
                    mensaje = "La información es la misma"
                } else {
                    mensaje = "Persona actualizada con exito."
                }

                res.json({error: false, data, mensaje});
            }
        } )


    }
}

function eliminarPersona(req, res) {
    if(connection) {
        const { id } = req.params;
        let sql = "UPDATE Personal SET Baja = 1 WHERE ID = ?";
        connection.query(sql, [id], (err, data) => {
            if(err) {
                res.json(err);
            } else {
                let mensaje = "";
                if(data.affectedRows === 0) {
                    mensaje = "La persona que quieres eliminar no está activa";
                } else {
                    mensaje = "Persona eliminada con éxito";
                }

                res.json({error: false, data, mensaje});
            }
        })
    }
}

module.exports = {
    listarPersonal,
    obtenerPersona,
    insertarPersona,
    editarPersona,
    eliminarPersona
}