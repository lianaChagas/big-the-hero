const express = require ('express'); 
const OngController = require('./Controller/OngContoller');
const IncidentsController = require('./Controller/IncidentsController');
const ProfileController = require('./Controller/ProfileController');
const SessionController = require('./Controller/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index); 

routes.get('/incidents', IncidentsController.index);
routes.post('/incidents', IncidentsController.create);
routes.delete('/incidents/:id', IncidentsController.delete);

module.exports = routes; 