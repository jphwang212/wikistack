const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = 3000;

const { db } = require('./models');
const wikiRoute = require('./routes/wiki');
const userRoute = require('./routes/users');

db.authenticate()
  .then(() => {
    console.log('connected to the database');
  })

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));

app.use('/wiki', wikiRoute);
app.use('/users', userRoute);

app.get('/', (req, res) => {
  res.redirect('/wiki');
})

const init = async() => {
  await db.sync({ force: true });
  app.listen(PORT, () => {
    console.log('Connected Port 3000!');
  })
}

init();
