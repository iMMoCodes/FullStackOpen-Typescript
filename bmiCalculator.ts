interface BmiValues {
  height: number;
  weight: number;
}

const parseBmiArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('Not enought arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return { height: Number(args[2]), weight: Number(args[3]) };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (height: number, weight: number) => {
  const bmi: number = weight / Math.pow(height / 100, 2);
  if (bmi < 16.0) {
    console.log('Underweight (Severe thinness)');
    return 'Underweight (Severe thinness)';
  }
  if (bmi <= 16.9) {
    console.log('Underweight (Moderate thinness)');
    return 'Underweight (Moderate thinness)';
  }
  if (bmi <= 18.4) {
    console.log('Underweight (Mild thinness)');
    return 'Underweight (Mild thinness)';
  }
  if (bmi <= 24.9) {
    console.log('Normal range');
    return 'Normal range';
  }
  if (bmi <= 29.9) {
    console.log('Overweight (Pre-obese)');
    return 'Overweight (Pre-obese)';
  }
  if (bmi <= 34.9) {
    console.log('Obese (Class I)');
    return 'Obese (Class I)';
  }
  if (bmi <= 39.9) {
    console.log('Obese (Class II)');
    return 'Obese (Class II)';
  }
  if (bmi >= 40) {
    console.log('Obese (Class III)');
    return 'Obese (Class III)';
  }
  return null;
};

const runCalculations = () => {
  try {
    const { height, weight } = parseBmiArguments(process.argv);
    calculateBmi(height, weight);
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
};

runCalculations();
