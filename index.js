const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();

/*
var config = {
  method: 'get',
  
url: 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=new&key=AIzaSyCtdaHsIicmzziPVLzBFe8RVKvXdZGHHFQ',
  headers: { }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data.predictions.map(item => item.description)));
})
.catch(function (error) {
  console.log(error);
});
*/

app.use(bodyParser.json());
app.use(cors());

const productRouter = require('./router.js');

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.use('/hotels', productRouter);

function routeNotFound(req, res, next) {
  res.status(404).json({ message: 'Route not found' })
}
function errorHandler(err, req, res, next){
  console.log(err.stack);
  res.status(500).json({message:err.message, success:false})
}

app.use(routeNotFound)
app.use(errorHandler);

app.listen(3000, () => {
  console.log('server started');
});
