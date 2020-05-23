import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStateValue, updatePatient } from "../state";
import { Patient, Gender } from '../types';
import axios from 'axios';
import { apiBaseUrl } from "../constants";
import { Container, Header, Icon } from "semantic-ui-react";
import { Entry } from '../types';

const PatientDetailsPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  
  const { id } = useParams<{ id: string }>();
  const patient: Patient = patients[id];

  useEffect(() => {
    const checkPatientData = async () => {
      try {
        if (patient && !patient['ssn']) {
          const { data: patientFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${patient.id}`
          );
          console.log('Patient info updated');
          dispatch(updatePatient(patientFromApi));
        }
      } catch (e) {
        console.error(e);
      }
    };
    checkPatientData();
  }, [dispatch, patient]);

  if (!patient || !patient['ssn']) return (
    <div>Loading patient information...</div>
  );

  enum GenderIcon {
    Male = 'mars',
    Female = 'venus',
    Other = 'genderless'
  }

  let iconName: GenderIcon = GenderIcon.Other;
  if (patient.gender === Gender.Male) iconName = GenderIcon.Male;
  if (patient.gender === Gender.Female) iconName = GenderIcon.Female;

  return (
    <Container>
      <Header as='h2'>
        {patient.name}
        <Icon name={iconName} />
      </Header>
      
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      
      <Header as='h3'>entries</Header>
      {patient.entries?.map(entry =>
        <EntryDetails key={entry.id} entry={entry}/>
      )}
    </Container>
  );
};

interface EntryDetailsProps {
  entry: Entry;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discrimitated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<EntryDetailsProps> = ({ entry }) => {
  const [{ diagnosis },] = useStateValue();

  switch (entry.type) {
    case 'HealthCheck':
      return (
        <div>
          <p>{entry.date} <span style={{fontStyle: 'italic'}}>{entry.description}</span></p>
          <ul>
            {entry.diagnosisCodes?.map(code =>
              <li key={code}>
                {code} {diagnosis[code].name}
              </li>
            )}
          </ul>
        </div>
      );
    case 'OccupationalHealthcare':
      return (
        <div>
          <p>{entry.date} <span style={{fontStyle: 'italic'}}>{entry.description}</span></p>
          <ul>
            {entry.diagnosisCodes?.map(code =>
              <li key={code}>
                {code} {diagnosis[code].name}
              </li>
            )}
          </ul>
        </div>
      );
    case 'Hospital':
     return (
        <div>
          <p>{entry.date} <span style={{fontStyle: 'italic'}}>{entry.description}</span></p>
          <ul>
            {entry.diagnosisCodes?.map(code =>
              <li key={code}>
                {code} {diagnosis[code].name}
              </li>
            )}
          </ul>
       </div>
     );
     default:
      return assertNever(entry);
  }
};

export default PatientDetailsPage;