import mongoose, { Schema } from "mongoose";

interface IPatient extends Document {
    name: string;
    room: string;
    dietaryRestrictions: string[];
    dietChartId: mongoose.Schema.Types.ObjectId; // Reference to diet chart
}

const PatientSchema: Schema = new Schema({
    name: { type: String, required: true },
    room: { type: String, required: true },
    dietaryRestrictions: { type: [String], default: [] },
    dietChartId: { type: Schema.Types.ObjectId, ref: "DietChart", required: true },
});

export default mongoose.model<IPatient>("Patient", PatientSchema);
