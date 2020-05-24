import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient, toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatientsNonSensitive());
});

router.get('/:id', (req, res) => {
  const id: string = req.params.id;
  res.json(patientService.getPatients().find(e => e.id === id));
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const updatedPatient = patientService.addPatient(newPatient);
    res.json(updatedPatient);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const patientId: string = req.params.id;
    const newEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addEntry(patientId, newEntry);
    res.json(addedEntry);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default router;