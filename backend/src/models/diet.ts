import mongoose, { Schema, Document } from 'mongoose';

export interface IDietChart {
  morningMeal: {
    ingredients: string[];
  };
  eveningMeal: {
    ingredients: string[];
  };
  nightMeal: {
    ingredients: string[];
  };
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const DietChartSchema = new Schema<IDietChart>(
  {
    morningMeal: {
      ingredients: { type: [String], required: true },
    },
    eveningMeal: {
      ingredients: { type: [String], required: true },
    },
    nightMeal: {
      ingredients: { type: [String], required: true },
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const DietChart = mongoose.model<IDietChart>('DietChart', DietChartSchema);

export default DietChart;
