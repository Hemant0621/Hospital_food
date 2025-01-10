import mongoose, { Schema } from "mongoose";

interface IStaff extends Document {
    name: string;
    role: "pantry" | "delivery";
    contact: string;
    assignedPatients: mongoose.Schema.Types.ObjectId[]; // Array of patient references (optional)
  }
  
  const StaffSchema: Schema = new Schema({
    name: { type: String, required: true },
    role: { type: String, enum: ["pantry", "delivery"], required: true },
    contact: { type: String, required: true },
    assignedPatients: { type: [Schema.Types.ObjectId], ref: "Patient", default: [] },
  });
  
  export default mongoose.model<IStaff>("Staff", StaffSchema);
  