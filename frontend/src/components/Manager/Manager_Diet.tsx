import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';

interface DietChart {
  _id?: string;
  morningMeal: {
    ingredients: string[];
  };
  eveningMeal: {
    ingredients: string[];
  };
  nightMeal: {
    ingredients: string[];
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const Manager_Diet: React.FC = () => {
  const [formData, setFormData] = useState<DietChart>({
    morningMeal: { ingredients: [] },
    eveningMeal: { ingredients: [] },
    nightMeal: { ingredients: [] }
  });

  const [dietCharts, setDietCharts] = useState<DietChart[]>([]);

  useEffect(() => {
    const fetchDietCharts = async () => {
      try {
        const response = await axiosInstance.get('/manager,diet');
        setDietCharts(response.data);
      } catch (error) {
        console.error('Failed to fetch diet charts:', error);
      }
    };
    fetchDietCharts();
  }, []);

  const handleIngredientChange = (
    mealType: 'morningMeal' | 'eveningMeal' | 'nightMeal',
    value: string
  ) => {
    setFormData({
      ...formData,
      [mealType]: {
        ingredients: value.split(',').map(item => item.trim()).filter(item => item)
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axiosInstance.post(
        '/manager/diets',
        formData,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
            Authorization: `Bearer ${token}`,
          },
  }
      );

setDietCharts([...dietCharts, response.data]);
alert('Diet chart created successfully');
setFormData({
  morningMeal: { ingredients: [] },
  eveningMeal: { ingredients: [] },
  nightMeal: { ingredients: [] },
});
    } catch (error) {
  console.error('Failed to create diet chart:', error);
  alert('Failed to create diet chart');
}
  };

return (
  <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
    <div className="max-w-6xl mx-auto">
      <h1 className="text-xl md:text-2xl font-bold mb-4">Manage Diet Charts</h1>

      {/* Create Diet Chart Form */}
      <form onSubmit={handleSubmit} className="bg-white p-4 md:p-6 rounded shadow-md mb-6">
        <h2 className="text-lg md:text-xl font-bold mb-4">Create New Diet Chart</h2>

        <div className="space-y-6">
          {/* Morning Meal */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Morning Meal Ingredients
            </label>
            <textarea
              value={formData.morningMeal.ingredients.join(', ')}
              onChange={(e) => handleIngredientChange('morningMeal', e.target.value)}
              placeholder="Enter ingredients (comma-separated)"
              className="w-full h-24 p-2 border rounded-md resize-none"
              required
            />
          </div>

          {/* Evening Meal */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Evening Meal Ingredients
            </label>
            <textarea
              value={formData.eveningMeal.ingredients.join(', ')}
              onChange={(e) => handleIngredientChange('eveningMeal', e.target.value)}
              placeholder="Enter ingredients (comma-separated)"
              className="w-full h-24 p-2 border rounded-md resize-none"
              required
            />
          </div>

          {/* Night Meal */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Night Meal Ingredients
            </label>
            <textarea
              value={formData.nightMeal.ingredients.join(', ')}
              onChange={(e) => handleIngredientChange('nightMeal', e.target.value)}
              placeholder="Enter ingredients (comma-separated)"
              className="w-full h-24 p-2 border rounded-md resize-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full md:w-auto bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
          >
            Create Diet Chart
          </button>
        </div>
      </form>

      {/* Diet Charts List */}
      <div className="bg-white p-4 md:p-6 rounded shadow-md overflow-x-auto">
        <h2 className="text-lg md:text-xl font-bold mb-4">Diet Charts</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dietCharts.map((diet, index) => (
            <div key={index} className="border rounded-md p-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-sm text-gray-600">Morning Meal</h3>
                  <ul className="list-disc pl-5 text-sm">
                    {diet.morningMeal.ingredients.map((ingredient, idx) => (
                      <li key={idx}>{ingredient}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-sm text-gray-600">Evening Meal</h3>
                  <ul className="list-disc pl-5 text-sm">
                    {diet.eveningMeal.ingredients.map((ingredient, idx) => (
                      <li key={idx}>{ingredient}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-sm text-gray-600">Night Meal</h3>
                  <ul className="list-disc pl-5 text-sm">
                    {diet.nightMeal.ingredients.map((ingredient, idx) => (
                      <li key={idx}>{ingredient}</li>
                    ))}
                  </ul>
                </div>

                <div className="text-xs text-gray-500">
                  Created: {new Date(diet.createdAt!).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>

        {dietCharts.length === 0 && (
          <p className="text-center text-gray-500">No diet charts available</p>
        )}
      </div>
    </div>
  </div>
);
};

export default Manager_Diet;