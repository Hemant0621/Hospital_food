import express from 'express';
import { Request, Response } from 'express';
import Patient, { IPatient } from '../models/patients';
const router = express.Router();

// Add a new patient
export const addPatient = async (req: Request, res: Response): Promise<void> => {
  try {
    const patient: IPatient = new Patient(req.body);
    const savedPatient = await patient.save();
    res.status(201).json(savedPatient);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add patient', error });
  }
};

// Get all patients
export const getAllPatients = async (_req: Request, res: Response): Promise<void> => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch patients', error });
  }
};

// Get a single patient by ID
export const getPatientById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const patient = await Patient.findById(id);
    if (!patient) {
      res.status(404).json({ message: 'Patient not found' });
      return;
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch patient', error });
  }
};

// Update patient details
export const updatePatient = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedPatient = await Patient.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedPatient) {
      res.status(404).json({ message: 'Patient not found' });
      return;
    }
    res.status(200).json(updatedPatient);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update patient', error });
  }
};

// Delete a patient
export const deletePatient = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedPatient = await Patient.findByIdAndDelete(id);
    if (!deletedPatient) {
      res.status(404).json({ message: 'Patient not found' });
      return;
    }
    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete patient', error });
  }
};


router.post('/patients', addPatient);
router.get('/patients', getAllPatients);
router.get('/patients/:id', getPatientById);
router.put('/patients/:id', updatePatient);
router.delete('/patients/:id', deletePatient);

export default router;
