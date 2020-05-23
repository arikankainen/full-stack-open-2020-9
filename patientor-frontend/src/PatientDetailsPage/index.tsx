import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStateValue, updatePatient } from "../state";
import { Patient } from '../types';
import axios from 'axios';
import { apiBaseUrl } from "../constants";
import { Container, Header } from "semantic-ui-react";
import EntryDetails from './EntryDetails';
import GenderIcon from './GenderIcon';

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

  return (
    <Container>
      <Header as='h2'>
        {patient.name}
        <GenderIcon patient={patient} />
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

export default PatientDetailsPage;