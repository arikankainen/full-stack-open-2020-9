export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface CoursePartBase2 extends CoursePartBase {
  description: string;
}

export interface CoursePartOne extends CoursePartBase2 {
  name: "Fundamentals";
}

export interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

export interface CoursePartThree extends CoursePartBase2 {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

export interface CoursePartFour extends CoursePartBase2 {
  name: "My own course";
  description: string;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;