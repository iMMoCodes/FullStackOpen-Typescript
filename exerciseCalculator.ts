interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  exerciseHours: Array<number>;
  target: number;
}

const parseExerciseArguments = (args: Array<string>): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enought arguments');
  const [, , target, ...rest] = args;
  const values: Array<number> = [];
  rest.map((i) => values.push(Number(i)));

  if (!isNaN(Number(args[2])) && rest.every((e) => !isNaN(Number(e)))) {
    return {
      target: Number(target),
      exerciseHours: values,
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateExercises = (
  target: number,
  exerciseHours: Array<number>
): Result => {
  const periodLength: number = exerciseHours.length;

  let trainingDays = 0;
  exerciseHours.map((hoursPerDay) => {
    if (hoursPerDay !== 0) {
      trainingDays++;
    }
  });

  const total: number = exerciseHours.reduce((prev, curr) => prev + curr, 0);
  const average: number = total / periodLength;

  let ratingDescription = '';
  let rating = 0;
  if (average <= 0.8 * target) {
    rating = 1;
    ratingDescription = 'You can do better!';
  }
  if (average > 0.8 * target) {
    rating = 2;
    ratingDescription = 'You did ok but you can still improve!';
  }
  if (average >= target) {
    rating = 3;
    ratingDescription = 'Perfect!';
  }

  const success: boolean = average >= target;

  console.log({
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  });
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { target, exerciseHours } = parseExerciseArguments(process.argv);
  calculateExercises(target, exerciseHours);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
