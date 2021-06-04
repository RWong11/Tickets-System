const express = require('express');
const cors = require('cors')

// INICIALIZARLO
const app = express();

// CONFIGURACIONES 
app.set('port', process.env.PORT || 3000);

// MIDDLEWARE
app.use(express.urlencoded({extended: false }));
app.use(express.json());
app.use(cors());

// BASE DE DATOS
require('./config/connection');

// RUTAS
app.use(require('./routes/CategoriasRoutes'));
app.use(require('./routes/PersonalRoutes'));
//app.use(require('./routes/TicketsRoutes'));

// LEVANTAR EL SERVIDOR
app.listen(app.get('port'), (error) => {
    if(error) {
        console.log(error);
    } else {
        console.log(`Servidor en puerto: ${app.get('port')}`)
    }
})