import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStateValue, updatePatient } from "../state";
import { Patient, Gender } from '../types';
import axios from 'axios';
import { apiBaseUrl } from "../constants";
import { Container, Header, Icon } from "semantic-ui-react";

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
    </Container>
  );
};

export default PatientDetailsPage;