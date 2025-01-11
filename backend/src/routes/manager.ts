import express from 'express';
import { Request, Response } from 'express';
import Patient, { IPatient } from '../models/patients';
import Diet, { IDietChart } from '../models/diet';
import { authenticate , authorizeRole } from '../middleware';
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


// Add a new diet
export const addDiet = async (req: Request, res: Response): Promise<void> => {
    try {
        const diet = new Diet(req.body);
        const savedDiet = await diet.save();
        res.status(201).json(savedDiet);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add diet', error });
    }
};

// Get all diets
export const getAllDiets = async (_req: Request, res: Response): Promise<void> => {
    try {
        const diets = await Diet.find();
        res.status(200).json(diets);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch diets', error });
    }
};

// Get a single diet by ID
export const getDietById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const diet = await Diet.findById(id);
        if (!diet) {
            res.status(404).json({ message: 'Diet not found' });
            return;
        }
        res.status(200).json(diet);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch diet', error });
    }
};

// Update diet details
export const updateDiet = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const updatedDiet = await Diet.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedDiet) {
            res.status(404).json({ message: 'Diet not found' });
            return;
        }
        res.status(200).json(updatedDiet);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update diet', error });
    }
};

// Delete a diet
export const deleteDiet = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const deletedDiet = await Diet.findByIdAndDelete(id);
        if (!deletedDiet) {
            res.status(404).json({ message: 'Diet not found' });
            return;
        }
        res.status(200).json({ message: 'Diet deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete diet', error });
    }
};

// Define routes
router.post('/diets', authenticate, authorizeRole('manager'), addDiet);
router.get('/diets', authenticate, authorizeRole('manager'), getAllDiets);
router.get('/diets/:id', authenticate, authorizeRole('manager'), getDietById);
router.put('/diets/:id', authenticate, authorizeRole('manager'), updateDiet);
router.delete('/diets/:id', authenticate, authorizeRole('manager'), deleteDiet);


router.post('/patients', authenticate , authorizeRole('manager'), addPatient);
router.get('/patients', authenticate , authorizeRole('manager'), getAllPatients);
router.get('/patients/:id', authenticate , authorizeRole('manager'), getPatientById);
router.put('/patients/:id', authenticate , authorizeRole('manager'), updatePatient);
router.delete('/patients/:id', authenticate , authorizeRole('manager'), deletePatient);

export default router;
