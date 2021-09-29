
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const path = require("path");
const rateLimit = require("./middleware/rateLimit");
require('dotenv').config();



const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces');


mongoose.connect(process.env.DB, //Très important pour masquer son identifiant et mot de passe MongoDB!

  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();



app.use(rateLimit);  // Pour empêcher les attaques brutes
app.use(helmet()); //Tous les éléments plus bas sont intégrés à helmet mais cela permet de savoir exactement de quoi helmet protège
app.use(helmet.hidePoweredBy()); //On cache le powered by Express dans chaque entête de requête
app.use(helmet.frameguard({ action: 'deny' })); // On empêche le click jacking 
app.use(helmet.xssFilter({})); // On prévient les attaques xss
app.use(helmet.noSniff()); // On empêche le navigateur de contourner l'entête Content-Type
app.use(helmet.ieNoOpen()); //Empêche IE d'éxécuter des téléchargements provenant de page potentiellement malveillante 


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json()); // Permet d'extraire le format JSON de nos requêtes 


app.use('/images', express.static(path.join(__dirname, 'images'))); // On récupère les images dans notre dossier images


//Routes authentification et sauces 

app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);



module.exports = app;