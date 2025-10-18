import express from 'express';
import sequelize from './config/database';

import catalogRoutes from "./routes/catalogRoutes";
import inventoryRoutes from "./routes/inventoryRoutes";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Part-Stash API v0.1');
})

app.use('api/catalog', catalogRoutes);
app.use('api/invetory', inventoryRoutes);

sequelize.sync({force: false}).then(() => {
  console.log('Database connected and Models Synced.');
  app.listen(PORT, () => {
    console.log(`Server is operational on http:localhost:${PORT}`)
  })
}).catch(err => {
  console.error('Unable to connect to the database:', err);
})