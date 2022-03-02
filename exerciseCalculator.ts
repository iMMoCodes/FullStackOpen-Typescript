interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  exerciseHours: Array<number>,
  target: number
): Result => {
  const periodLength: number = exerciseHours.length;

  let trainingDays: number = 0;
  exerciseHours.map((hoursPerDay) => {
    if (hoursPerDay !== 0) {
      trainingDays++;
    }
  });

  const total: number = exerciseHours.reduce((prev, curr) => prev + curr, 0);
  const average: number = total / periodLength;

  let ratingDescription: string;
  let rating: number;
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
