

require('dotenv').config();
const express = require('express');

const app = express();
// const swagger = require('./swagger');

// swagger(app)
const connectDB = require('./server/config/db');
const usersRoutes = require('./routes/users');
// const expressValidator = require('express-validator');
const cors=require('cors')
const cookieParser = require('cookie-parser');
const port = 8000;

connectDB();

app.use(express.json());

// app.use(expressValidator());
app.use(cors())



app.use(cookieParser());

// Routes middleware
app.use('/api/admins', usersRoutes);

app.get('/', (req, res) => {
  res.send('hello world'); // Fix: Use res.send() to send the response
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
