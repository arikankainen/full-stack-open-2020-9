import React from 'react';
import { CoursePart } from '../types';

interface ContentProps {
  coursePart: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discrimitated union member: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<ContentProps> = ({ coursePart }) => {
  switch (coursePart.name) {
    case 'Fundamentals':
      return (
        <div>
          <p>Name: {coursePart.name}</p>
          <p>Exercises: {coursePart.exerciseCount}</p>
          <p>Description: {coursePart.description}</p>
          <hr />
        </div>
      )
    case 'Using props to pass data':
      return (
        <div>
          <p>Name: {coursePart.name}</p>
          <p>Exercises: {coursePart.exerciseCount}</p>
          <p>Group projects: {coursePart.groupProjectCount}</p>
          <hr />
        </div>
      )
    case 'Deeper type usage':
     return (
        <div>
          <p>Name: {coursePart.name}</p>
          <p>Exercises: {coursePart.exerciseCount}</p>
          <p>Description: {coursePart.description}</p>
          <p>
            Submission link: <a href={coursePart.exerciseSubmissionLink}>
              {coursePart.exerciseSubmissionLink}
            </a>
          </p>
          <hr />
       </div>
     )
     case 'My own course':
      return (
         <div>
           <p>Name: {coursePart.name}</p>
           <p>Exercises: {coursePart.exerciseCount}</p>
           <p>Description: {coursePart.description}</p>
           <hr />
        </div>
      )
     default:
      return assertNever(coursePart);
  }
}

export default Part;