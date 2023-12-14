

require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

// const swagger = require('./swagger');

// swagger(app)
const connectDB = require('./server/config/db');
const usersRoutes = require('./routes/users');
const ownersRoutes = require('./routes/owners');
 const appartementsRoutes = require('./routes/appartements');
 const paymentsRoutes = require('./routes/payments');

// const expressValidator = require('express-validator');
const cors=require('cors')
const cookieParser = require('cookie-parser');
const port = 8000;

connectDB();


// app.use(expressValidator());
app.use(cors())



app.use(cookieParser());

// Routes middleware
app.use('/api/admins', usersRoutes);
app.use('/api/owners', ownersRoutes);
app.use('/api/appartements', appartementsRoutes);
app.use('/api/payments', paymentsRoutes);


app.get('/', (req, res) => {
  res.send('hello world'); // Fix: Use res.send() to send the response
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
