/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  NewPatient,
  Gender,
  Entry,
  HealthCheckEntry,
  NewHealthCheckEntry,
  NewEntry,
  OccupationalHealthCareEntry,
  NewOccupationalHealthCareEntry,
  HospitalEntry,
  NewHospitalEntry,
} from './types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing social security number: ' + ssn);
  }
  return ssn;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateOfBirth = (dateOfBirth: any): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect or missing date of birth: ' + dateOfBirth);
  }
  return dateOfBirth;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

export const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: []
  };
};

const toNewHealthCheckEntry = (object: HealthCheckEntry): NewHealthCheckEntry => {
  if (!object.description) throw new Error(`Missing 'description' value`);
  if (!object.date) throw new Error(`Missing 'date' value`);
  if (!object.specialist) throw new Error(`Missing 'specialist' value`);
  if (object.healthCheckRating === undefined) throw new Error(`Missing 'health check rating' value`);

  return object;
};

const toNewOccupationalHealthCareEntry = (object: OccupationalHealthCareEntry): NewOccupationalHealthCareEntry => {
  if (!object.description) throw new Error(`Missing 'description' value`);
  if (!object.date) throw new Error(`Missing 'date' value`);
  if (!object.specialist) throw new Error(`Missing 'specialist' value`);
  if (!object.employerName) throw new Error(`Missing 'employer name' value`);

  return object;
};

const toNewHospitalEntry = (object: HospitalEntry): NewHospitalEntry => {
  if (!object.description) throw new Error(`Missing 'description' value`);
  if (!object.date) throw new Error(`Missing 'date' value`);
  if (!object.specialist) throw new Error(`Missing 'specialist' value`);
  if (!object.discharge) throw new Error(`Missing 'discharge' value`);

  return object;
};

const assertNever = (value: never): never => {
  throw new Error(
    `Incorrect 'type' value: ${JSON.stringify(value)}`
  );
};

export const toNewPatientEntry = (entry: Entry): NewEntry => {
  switch (entry.type) {
    case 'HealthCheck':
      return toNewHealthCheckEntry(entry);
    case 'OccupationalHealthcare':
      return toNewOccupationalHealthCareEntry(entry);
    case 'Hospital':
      return toNewHospitalEntry(entry);
    default:
      return assertNever(entry);
  }
};