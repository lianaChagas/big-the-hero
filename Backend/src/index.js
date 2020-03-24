const express = require('express'); //importando o express
const cors = require ('cors');
const routes =  require('./routes');


const app = express(); //instanciando a aplicacao

app.use(cors());
app.use(express.json()); // usando json para criar o usuário
app.use(routes);

app.listen(3333);
