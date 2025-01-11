import mongoose, { Schema, Document } from 'mongoose';

export interface IDietChart {
  name : string,
  morningMeal: {
    ingredients: string[];
  };
  eveningMeal: {
    ingredients: string[];
  };
  nightMeal: {
    ingredients: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const DietChartSchema = new Schema<IDietChart>(
  {
    name : {type : String, required : true},
    morningMeal: {
      ingredients: { type: [String], required: true },
    },
    eveningMeal: {
      ingredients: { type: [String], required: true },
    },
    nightMeal: {
      ingredients: { type: [String], required: true },
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const DietChart = mongoose.model<IDietChart>('DietChart', DietChartSchema);

export default DietChart;
