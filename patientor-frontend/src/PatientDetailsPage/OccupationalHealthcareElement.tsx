import React from 'react';
import { OccupationalHealthCareEntry } from '../types';
import { Segment, Header, Icon } from "semantic-ui-react";
import DiagnosisCodeElement from './DiagnosisCodeElement';

const OccupationalHealthcareElement: React.FC<{ entry: OccupationalHealthCareEntry }> = ({ entry }) => {
  return (
    <Segment>
      <Header as='h3'>
        {entry.date} <Icon name='stethoscope' />{entry.employerName}
      </Header>
      <span style={{fontStyle: 'italic'}}>{entry.description}</span>
      <DiagnosisCodeElement entry={entry}/>
      {entry.sickLeave?.startDate && <div>Sick leave: {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}</div>}
    </Segment>
  );
};


export default OccupationalHealthcareElement;