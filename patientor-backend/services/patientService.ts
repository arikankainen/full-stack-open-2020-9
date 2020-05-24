import patientData from '../data/patients';
import { Patient, NonSensitivePatient, NewPatient, NewEntry } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Array<Patient> = patientData;

const getPatients = (): Array<Patient> => {
  return patients;
};

const getPatientsNonSensitive = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patientId: string, entry: NewEntry): Patient => {
  const newEntry = {
    id: uuid(),
    ...entry
  };

  const existingPatient: Patient | undefined = patients.find(p => p.id === patientId);
  if (!existingPatient) {
    throw new Error(`Patient with id '${patientId}' not found`);
  }
  existingPatient.entries.push(newEntry);
  return existingPatient;
};

export default {
  getPatients,
  getPatientsNonSensitive,
  addPatient,
  addEntry,
};