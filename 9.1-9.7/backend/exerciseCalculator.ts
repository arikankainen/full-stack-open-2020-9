interface ReturnValues {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (list: number[], target: number): ReturnValues => {
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));