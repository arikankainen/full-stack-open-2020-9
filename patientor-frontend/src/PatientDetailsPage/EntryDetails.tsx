import React from 'react';
import { Entry } from '../types';
import HealthCheckElement from './HealthCheckElement';
import OccupationalHealthcareElement from './OccupationalHealthcareElement';
import HospitalElement from './HospitalElement';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discrimitated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheckElement entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareElement entry={entry} />;
    case 'Hospital':
      return <HospitalElement entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;