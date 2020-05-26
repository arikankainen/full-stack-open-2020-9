export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

export interface DischargeEntry {
  date: string;
  criteria: string;
}

export interface SickLeaveEntry {
  startDate: string;
  endDate: string;
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthCareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: SickLeaveEntry;
}

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: DischargeEntry;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthCareEntry
  | HealthCheckEntry;


export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries?: Entry[];
}

export type HealthCheckFormValues = Omit<HealthCheckEntry, "id">;
export type OccupationalHealthCareFormValues = Omit<OccupationalHealthCareEntry, "id">;
export type HospitalFormValues = Omit<HospitalEntry, "id">;

export type EntryFormValues =
  | HealthCheckFormValues
  | OccupationalHealthCareFormValues
  | HospitalFormValues;
