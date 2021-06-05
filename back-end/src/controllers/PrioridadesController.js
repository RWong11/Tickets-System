const connection = require("../config/connection");

function obtener(req, res) {
  if (connection) {
    let sql = "SELECT * FROM Cat_PrioridadesTicket";
    connection.query(sql, (err, prioridades) => {
      if (err) res.json(err);
      else {
        res.json(prioridades);
      }
    });
  }
}

module.exports = {
  obtener
}