interface ExerciseValues {
  list: number[],
  target: number
}

const parseExerciseArguments = (args: Array<string>): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enought arguments!');

  args.slice(2).map((value: any) => {
    if (isNaN(Number(value))) {
      throw new Error('Provided values were not numbers!');
    }
  })

  const list: number[] = args.slice(3).map((value: string) => Number(value));
  const target: number = Number(args[2]);

  return {
    list,
    target
  }
}

interface ExerciseObject {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (list: number[], target: number): ExerciseObject => {
  const periodLength: number = list.length;
  const trainingDays: number = list.filter((value: number) => value > 0).length;
  const average: number = list.reduce((sum: number, value: number) => sum + value) / list.length;
  const success: boolean = average >= target;
  
  let rating: number;
  let ratingDescription: string;
  
  if (average >= target) {
    rating = 3;
    ratingDescription = 'great work, you reach the target';
  } else if (average + (target / 5) > target) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'you were too lazy this time';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
}

try {
  const { list, target } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(list, target));
} catch (error) {
  console.log('Error:', error.message);
}