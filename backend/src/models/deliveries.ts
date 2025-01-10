import mongoose, { Schema } from "mongoose";

interface IDelivery extends Document {
    patientId: mongoose.Schema.Types.ObjectId; // Reference to patient
    mealType: "breakfast" | "lunch" | "dinner" | "snacks";
    deliveryTime: Date;
    status: "pending" | "in-progress" | "delivered" | "failed";
    deliveryPersonId: mongoose.Schema.Types.ObjectId; // Reference to staff
  }
  
  const DeliverySchema: Schema = new Schema({
    patientId: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
    mealType: { type: String, enum: ["breakfast", "lunch", "dinner", "snacks"], required: true },
    deliveryTime: { type: Date, required: true },
    status: { type: String, enum: ["pending", "in-progress", "delivered", "failed"], default: "pending" },
    deliveryPersonId: { type: Schema.Types.ObjectId, ref: "Staff", required: true },
  });
  
  export default mongoose.model<IDelivery>("Delivery", DeliverySchema);
  