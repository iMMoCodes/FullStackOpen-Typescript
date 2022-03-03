import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  try {
    const height = req.query.height;
    const weight = req.query.weight;

    if (isNaN(Number(height)) || isNaN(Number(weight))) {
      return res.status(400).json({
        error: 'malformatted parameters',
      });
    }
    const result = calculateBmi(Number(height), Number(weight));
    return res.status(200).json({
      height,
      weight,
      bmi: result,
    });
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
    return res.status(500).send('Error happened');
  }
});

app.post('/exercises', (req, res) => {
  //eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).json({
      error: 'parameters missing',
    });
  }

  if (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    daily_exercises.every((e: any) => isNaN(Number(e))) ||
    isNaN(Number(target))
  ) {
    return res.status(400).json({
      error: 'malformatted parameters',
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(target, daily_exercises);
  return res.status(200).json({ result });
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
