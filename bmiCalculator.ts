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

const calculateBmi = (height: number, weight: number) => {
  const bmi: number = weight / Math.pow(height / 100, 2);
  if (bmi < 16.0) {
    console.log('Underweight (Severe thinness)');
    return;
  }
  if (bmi <= 16.9) {
    console.log('Underweight (Moderate thinness)');
    return;
  }
  if (bmi <= 18.4) {
    console.log('Underweight (Mild thinness)');
    return;
  }
  if (bmi <= 24.9) {
    console.log('Normal range');
    return;
  }
  if (bmi <= 29.9) {
    console.log('Overweight (Pre-obese)');
    return;
  }
  if (bmi <= 34.9) {
    console.log('Obese (Class I)');
    return;
  }
  if (bmi <= 39.9) {
    console.log('Obese (Class II)');
    return;
  }
  if (bmi >= 40) {
    console.log('Obese (Class III)');
    return;
  }
};

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
