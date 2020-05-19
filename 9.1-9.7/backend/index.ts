import express from 'express';
import calculateBmi from './bmiCalculator';
import { ExerciseObject, calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (!req.query.height || !req.query.weight) {
    return res.status(400).send({ error: 'missing parameters' });
  }

  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    return res.status(400).send({ error: 'malformatted parameters' });
  }

  const bmi: string = calculateBmi(height, weight);

  return res.send({
    height,
    weight,
    bmi
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const body: any = req.body;

  if (!body.daily_exercises || !body.target) {
    return res.status(400).send({ error: 'missing parameters' });
  }

  const list: number[] = body.daily_exercises;
  const target: number = body.target;

  let malformatted = false;

  if (isNaN(target)) {
    malformatted = true;
  }

  list.forEach((value: number) => {
    if (isNaN(value)) {
      malformatted = true;
    }
  });

  if (malformatted) {
     return res.status(400).send({ error: 'malformatted parameters' });
  }

  const result: ExerciseObject = calculateExercises(list, target);
  return res.send(result);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});