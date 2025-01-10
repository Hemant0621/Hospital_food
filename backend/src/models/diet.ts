import mongoose, { Schema } from "mongoose";

interface IDietChart extends Document {
    patientId: mongoose.Schema.Types.ObjectId; // Reference to patient
    mealPlan: {
        breakfast: string;
        lunch: string;
        dinner: string;
        snacks: string;
    };
    startDate: Date;
    endDate: Date;
}

const DietChartSchema: Schema = new Schema({
    patientId: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
    mealPlan: {
        breakfast: { type: String, required: true },
        lunch: { type: String, required: true },
        dinner: { type: String, required: true },
        snacks: { type: String, required: true },
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
});

export default mongoose.model<IDietChart>("DietChart", DietChartSchema);
