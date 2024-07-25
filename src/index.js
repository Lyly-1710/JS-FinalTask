import express from 'express';
import routers from './apis';
import bodyParser from 'body-parser';
import errorHandler from './middleware/error.handling';

const app = express()

app.use(bodyParser.json())
app.use('/', routers);

app.use(errorHandler)

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});