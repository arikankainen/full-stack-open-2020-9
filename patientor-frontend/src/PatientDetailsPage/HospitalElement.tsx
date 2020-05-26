import React from 'react';
import { HospitalEntry } from '../types';
import { Segment, Header, Icon } from "semantic-ui-react";
import DiagnosisCodeElement from './DiagnosisCodeElement';

const HospitalElement: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <Segment>
      <Header as='h3'>
        {entry.date} <Icon name='hospital' />
      </Header>
      <span style={{fontStyle: 'italic'}}>{entry.description}</span>
      <DiagnosisCodeElement entry={entry}/>
      <div>Discharge date: {entry.discharge.date}</div><div>Discharge criteria: {entry.discharge.criteria}</div>
    </Segment>
  );
};

export default HospitalElement;