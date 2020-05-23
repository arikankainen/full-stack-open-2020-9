import React from 'react';
import { HealthCheckEntry } from '../types';
import { Segment, Header, Icon } from "semantic-ui-react";
import HealthIcon from './HealthIcon';
import DiagnosisCodeElement from './DiagnosisCodeElement';

const HealthCheckElement: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  return (
    <Segment>
      <Header as='h3'>
        {entry.date} <Icon name='doctor' />
      </Header>
      <p style={{fontStyle: 'italic'}}>{entry.description}</p>
      <HealthIcon entry={entry} />
      <DiagnosisCodeElement entry={entry}/>
    </Segment>
  );
};

export default HealthCheckElement;