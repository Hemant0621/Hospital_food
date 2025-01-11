import mongoose, { Schema, Document, Mongoose, mongo } from 'mongoose';


export interface IPatient extends Document {
    name: string;
    diseases: string[];
    allergies: string[];
    roomNumber: number;
    bedNumber: number;
    floorNumber: number;
    age: number;
    gender: 'Male' | 'Female' | 'Other';
    contactInfo: string;
    emergencyContact: string;
    dietChart: {
        meal: mongo.ObjectId;
        ingredients: string;
    };
}

const DietPlanSchema: Schema = new Schema({
    meal: { type: mongo.ObjectId, required: true },
    ingredients: { type: [String], required: true },
});

const PatientSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        diseases: { type: [String], required: true },
        allergies: { type: [String], required: true },
        roomNumber: { type: Number, required: true },
        bedNumber: { type: Number, required: true },
        floorNumber: { type: Number, required: true },
        age: { type: Number, required: true },
        gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
        contactInfo: { type: String, required: true },
        emergencyContact: { type: String, required: true },
        dietChart: { type: DietPlanSchema, required: true },
    },
    { timestamps: true }
);

export default mongoose.model<IPatient>('Patient', PatientSchema);
