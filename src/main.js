import express from 'express';
import database from './config/db.js';
import dotenv from 'dotenv';
import productRoute from './routes/product.route.js'

dotenv.config();

const app = express();
const port = 9000;

// Middleware to parse JSON bodies
app.use(express.json());

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello World!');
});
await database();

app.use('/product',productRoute)

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
