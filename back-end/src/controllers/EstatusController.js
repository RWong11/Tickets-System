const connection = require("../config/connection");

function obtener(req, res) {
  if (connection) {
    let sql = "SELECT * FROM Cat_EstatusTicket";
    connection.query(sql, (err, estatus) => {
      if (err) res.json(err);
      else {
        res.json(estatus);
      }
    });
  }
}

module.exports = {
  obtener
}