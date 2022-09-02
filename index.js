const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

const productRouter = require('./router.js');

function serverTimeLog(req, res, next) {
  console.log('Time', Date.now())
  next();
}

function routeNotFound(req, res, next) {
  res.status(404).json({ message: 'Route not found' })
}
function errorHandler(err, req, res, next){
  console.log(err.stack);
  res.status(500).json({message:err.message, success:false})
}

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('server started');
});
app.use(serverTimeLog)
app.use('/hotels', productRouter);

app.use(routeNotFound)
app.use(errorHandler);

