const express = require('express');
const cors= require('cors')
const routerApi= require('./routes');
//const router = require('./routes/products.routers');
//const router = require('./routes/users.routers');
//const faker= require('faker');
//const Faker = require('faker/lib');
const {logErrors, errorHandlers,boomerrorHandlers}= require('./middlewares/error.handler')
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
const whitelist=['http://localhost:8080','https://myapp.co'];
const option={
  origin:(origin,callback)=> {
    if (whitelist.includes(origin) || !origin){
      callback(null,true);
    } else {
      callback(new error('no permitido'));
    }
  }

}

app.use(cors());


app.get('/', (req,res) => {
  res.send('Hola mi server en Express')
})

app.get('/nueva-ruta', (req,res) => {
  res.send('Hola soy una nueva ruta')
})


routerApi(app);

app.use(logErrors);
app.use(boomerrorHandlers);
app.use(errorHandlers);



//



app.listen(port, () => {
 console.log ('mi puerto ' + port);
});
