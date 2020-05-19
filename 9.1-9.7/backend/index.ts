import express from 'express';
import calculateBmi from './bmiCalculator'
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (req.query.height === undefined || req.query.weight === undefined) {
    return res.status(400).send({ error: 'missing parameters'});
  }

  const height: number = Number(req.query.height);
  const weight: number = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    return res.status(400).send({ error: 'malformatted parameters'});
  }

  const bmi: string = calculateBmi(height, weight);

  return res.send({
    height,
    weight,
    bmi
  });
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});