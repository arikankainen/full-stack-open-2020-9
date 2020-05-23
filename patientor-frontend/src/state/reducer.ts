import { State } from "./state";
import { Patient, Diagnosis } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
    type: "UPDATE_PATIENT";
    payload: Patient;
    }
    | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
      case "UPDATE_PATIENT":
        return {
          ...state,
          patients: {
            ...state.patients,
            [action.payload.id]: action.payload
          }
        };
        case "SET_DIAGNOSIS_LIST":
          return {
            ...state,
            diagnosis: {
              ...action.payload.reduce(
                (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
                {}
              ),
              ...state.diagnosis
            }
          };
          default:
      return state;
  }
};

export const setPatientList = (content: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: content,
  };
};

export const addPatient = (content: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: content,
  };
};

export const updatePatient = (content: Patient): Action => {
  return {
    type: 'UPDATE_PATIENT',
    payload: content,
  };
};

export const setDiagnosisList = (content: Diagnosis[]): Action => {
  return {
    type: 'SET_DIAGNOSIS_LIST',
    payload: content,
  };
};
