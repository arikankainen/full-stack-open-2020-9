import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStateValue, updatePatient } from "../state";
import { Patient } from '../types';
import axios from 'axios';
import { apiBaseUrl } from "../constants";
import { Container, Header, Button } from "semantic-ui-react";
import EntryDetails from './EntryDetails';
import GenderIcon from './GenderIcon';
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../types';

const PatientDetailsPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  
  const { id } = useParams<{ id: string }>();
  const patient: Patient = patients[id];

  const [healthCheckModalOpen, setHealthCheckModalOpen] = React.useState<boolean>(false);
  const [occupationalHealthCareModalOpen, setOccupationalHealthCareModalOpen] = React.useState<boolean>(false);
  const [hospitalModalOpen, setHospitalModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openHealthCheckModal = (): void => setHealthCheckModalOpen(true);
  const openOccupationalHealthCareModal = (): void => setOccupationalHealthCareModalOpen(true);
  const openHospitalModal = (): void => setHospitalModalOpen(true);

  const closeHealthCheckModal = (): void => {
    setHealthCheckModalOpen(false);
    setError(undefined);
  };

  const closeOccupationalHealthCareModal = (): void => {
    setOccupationalHealthCareModalOpen(false);
    setError(undefined);
  };

  const closeHospitalModal = (): void => {
    setHospitalModalOpen(false);
    setError(undefined);
  };

  const submitEntryForm = async (values: EntryFormValues) => {
    try {
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      if (!updatePatient) throw new Error(`Patient with id ${id} not found`);
      dispatch(updatePatient(updatedPatient));
      closeHealthCheckModal();
      closeOccupationalHealthCareModal();
      closeHospitalModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

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

  const buttonMargin = {
    marginTop: '3px',
    marginBottom: '3px'
  };

  return (
    <Container>
      <Header as='h2'>
        {patient.name}
        <GenderIcon patient={patient} />
      </Header>
      
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      
      <Header as='h3'>entries</Header>
      
      <AddEntryModal
        modalOpen={healthCheckModalOpen}
        onSubmit={submitEntryForm}
        error={error}
        onClose={closeHealthCheckModal}
        entryType='HealthCheck'
      />

      <AddEntryModal
        modalOpen={occupationalHealthCareModalOpen}
        onSubmit={submitEntryForm}
        error={error}
        onClose={closeOccupationalHealthCareModal}
        entryType='OccupationalHealthcare'
      />

      <AddEntryModal
        modalOpen={hospitalModalOpen}
        onSubmit={submitEntryForm}
        error={error}
        onClose={closeHospitalModal}
        entryType='Hospital'
      />

      <div style={buttonMargin}>
        <Button onClick={() => openHealthCheckModal()}>Add New Health Check Entry</Button>
      </div>
      <div style={buttonMargin}>
        <Button onClick={() => openOccupationalHealthCareModal()}>Add New Occupational Healthcare Entry</Button>
      </div>
      <div style={buttonMargin}>
        <Button onClick={() => openHospitalModal()}>Add New Hospital Entry</Button>
      </div>

      {patient.entries?.map(entry =>
        <EntryDetails key={entry.id} entry={entry}/>
      )}
    </Container>
  );
};

export default PatientDetailsPage;