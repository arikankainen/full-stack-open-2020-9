import React from 'react';
import { CoursePart } from '../types';
import Part from './Part';

interface ContentProps {
  courseParts: CoursePart[];
}

const Content: React.FC<ContentProps> = ({ courseParts }) => {
  
  return (
    <div>
      {courseParts.map(coursePart => 
        <Part key={coursePart.name} coursePart={coursePart} />
      )}
    </div>
  )
}

export default Content;