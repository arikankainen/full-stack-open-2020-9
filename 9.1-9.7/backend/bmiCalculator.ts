interface BmiValues {
  height: number;
  weight: number;
}

const parseBmiArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = weight / ((height / 100) * (height / 100));

  if (bmi >= 40) return 'Obese Class III (Very severely obese)';
  else if (bmi >= 35) return 'Obese Class II (Severely obese)';
  else if (bmi >= 30) return 'Obese Class I (Moderately obese)';
  else if (bmi >= 25) return 'Overweight';
  else if (bmi >= 18.5) return 'Normal (healthy weight)';
  else if (bmi >= 16) return 'Underweight';
  else if (bmi >= 15) return 'Severely underweight';
  else return 'Very severely underweight';
};

try {
  const { height, weight } = parseBmiArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error) {
  console.log('Error:', error.message);
}

export default calculateBmi;