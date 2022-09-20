import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

app.get('/', (req, resp) => {
  return resp.json({ message: 'Hello Foxter!'});
})

app.listen(3333, () => {
  console.log('Server Start...');
});
