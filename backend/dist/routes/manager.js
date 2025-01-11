"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDiet = exports.updateDiet = exports.getDietById = exports.getAllDiets = exports.addDiet = exports.deletePatient = exports.updatePatient = exports.getPatientById = exports.getAllPatients = exports.addPatient = void 0;
const express_1 = __importDefault(require("express"));
const patients_1 = __importDefault(require("../models/patients"));
const diet_1 = __importDefault(require("../models/diet"));
const middleware_1 = require("../middleware");
const router = express_1.default.Router();
// Add a new patient
const addPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patient = new patients_1.default(req.body);
        const savedPatient = yield patient.save();
        res.status(201).json(savedPatient);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to add patient', error });
    }
});
exports.addPatient = addPatient;
// Get all patients
const getAllPatients = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patients = yield patients_1.default.find();
        res.status(200).json(patients);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch patients', error });
    }
});
exports.getAllPatients = getAllPatients;
// Get a single patient by ID
const getPatientById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const patient = yield patients_1.default.findById(id);
        if (!patient) {
            res.status(404).json({ message: 'Patient not found' });
            return;
        }
        res.status(200).json(patient);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch patient', error });
    }
});
exports.getPatientById = getPatientById;
// Update patient details
const updatePatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedPatient = yield patients_1.default.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedPatient) {
            res.status(404).json({ message: 'Patient not found' });
            return;
        }
        res.status(200).json(updatedPatient);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to update patient', error });
    }
});
exports.updatePatient = updatePatient;
// Delete a patient
const deletePatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedPatient = yield patients_1.default.findByIdAndDelete(id);
        if (!deletedPatient) {
            res.status(404).json({ message: 'Patient not found' });
            return;
        }
        res.status(200).json({ message: 'Patient deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to delete patient', error });
    }
});
exports.deletePatient = deletePatient;
// Add a new diet
const addDiet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const diet = new diet_1.default(req.body);
        const savedDiet = yield diet.save();
        res.status(201).json(savedDiet);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to add diet', error });
    }
});
exports.addDiet = addDiet;
// Get all diets
const getAllDiets = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const diets = yield diet_1.default.find();
        res.status(200).json(diets);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch diets', error });
    }
});
exports.getAllDiets = getAllDiets;
// Get a single diet by ID
const getDietById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const diet = yield diet_1.default.findById(id);
        if (!diet) {
            res.status(404).json({ message: 'Diet not found' });
            return;
        }
        res.status(200).json(diet);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch diet', error });
    }
});
exports.getDietById = getDietById;
// Update diet details
const updateDiet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedDiet = yield diet_1.default.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedDiet) {
            res.status(404).json({ message: 'Diet not found' });
            return;
        }
        res.status(200).json(updatedDiet);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to update diet', error });
    }
});
exports.updateDiet = updateDiet;
// Delete a diet
const deleteDiet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedDiet = yield diet_1.default.findByIdAndDelete(id);
        if (!deletedDiet) {
            res.status(404).json({ message: 'Diet not found' });
            return;
        }
        res.status(200).json({ message: 'Diet deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to delete diet', error });
    }
});
exports.deleteDiet = deleteDiet;
// Define routes
router.post('/diets', middleware_1.authenticate, (0, middleware_1.authorizeRole)('manager'), exports.addDiet);
router.get('/diets', middleware_1.authenticate, (0, middleware_1.authorizeRole)('manager'), exports.getAllDiets);
router.get('/diets/:id', middleware_1.authenticate, (0, middleware_1.authorizeRole)('manager'), exports.getDietById);
router.put('/diets/:id', middleware_1.authenticate, (0, middleware_1.authorizeRole)('manager'), exports.updateDiet);
router.delete('/diets/:id', middleware_1.authenticate, (0, middleware_1.authorizeRole)('manager'), exports.deleteDiet);
router.get('/', (req, res) => {
    res.send("checing");
});
router.post('/patients', middleware_1.authenticate, (0, middleware_1.authorizeRole)('manager'), exports.addPatient);
router.get('/patients', middleware_1.authenticate, (0, middleware_1.authorizeRole)('manager'), exports.getAllPatients);
router.get('/patients/:id', middleware_1.authenticate, (0, middleware_1.authorizeRole)('manager'), exports.getPatientById);
router.put('/patients/:id', middleware_1.authenticate, (0, middleware_1.authorizeRole)('manager'), exports.updatePatient);
router.delete('/patients/:id', middleware_1.authenticate, (0, middleware_1.authorizeRole)('manager'), exports.deletePatient);
exports.default = router;
//# sourceMappingURL=manager.js.map