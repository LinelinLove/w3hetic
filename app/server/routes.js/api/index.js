import express from 'express';
import apiUserRouter from './server/routes/api/user.js';

const app = express();

app.use(express.json());

app.use('/api/users', apiUserRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
