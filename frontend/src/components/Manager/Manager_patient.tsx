import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';

interface Meal {
  _id: string;
  name: string;
  // Add other meal properties as needed
}

interface Patient {
  _id?: string;
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
    meal: string;
    instructions: string;
  };
}

const Manager_patient: React.FC = () => {
  const [formData, setFormData] = useState<Patient>({
    name: '',
    diseases: [],
    allergies: [],
    roomNumber: 0,
    bedNumber: 0,
    floorNumber: 0,
    age: 0,
    gender: 'Male',
    contactInfo: '',
    emergencyContact: '',
    dietChart: {
      meal: '',
      instructions: ''
    }
  });

  const [patients, setPatients] = useState<Patient[]>([]);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [show, setshow] = useState(false);

  // Fetch patients and meals from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [patientsResponse, mealsResponse] = await Promise.all([
          axiosInstance.get('/patients'),
          axiosInstance.get('/meals')
        ]);
        setPatients(patientsResponse.data);
        setMeals(mealsResponse.data);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };
    fetchData();
  }, []);

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Handle arrays (diseases and allergies)
    if (name === 'diseases' || name === 'allergies') {
      setFormData({
        ...formData,
        [name]: value.split(',').map(item => item.trim())
      });
    }
    // Handle numbers
    else if (name === 'age' || name === 'roomNumber' || name === 'bedNumber' || name === 'floorNumber') {
      setFormData({
        ...formData,
        [name]: parseInt(value) || 0
      });
    }
    // Handle other fields
    else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Handle diet chart change
  const handleDietChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      dietChart: {
        ...formData.dietChart,
        [name]: value
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/patients', formData);
      setPatients([...patients, response.data]);
      alert('Patient added successfully');
      // Reset form
      setFormData({
        name: '',
        diseases: [],
        allergies: [],
        roomNumber: 0,
        bedNumber: 0,
        floorNumber: 0,
        age: 0,
        gender: 'Male',
        contactInfo: '',
        emergencyContact: '',
        dietChart: {
          meal: '',
          instructions: ''
        }
      });
    } catch (error) {
      console.error('Failed to add patient', error);
      alert('Failed to add patient');
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      <div className='flex justify-between pb-4 duration-300 transition-all'>
        <h1 className="text-xl md:text-2xl font-bold">Manage Patients</h1>
        <button className='bg-[#fb923c] font-bold p-2 rounded-md' onClick={()=>setshow(!show)}>Add Patients</button>
      </div>

      {show && <form onSubmit={handleSubmit} className="bg-white p-4 md:p-6 rounded shadow-md mb-6">
        <h2 className="text-lg md:text-xl font-bold mb-4">Add New Patient</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Patient Name"
            value={formData.name}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
          <input
            type="text"
            name="diseases"
            placeholder="Diseases (comma-separated)"
            value={formData.diseases.join(', ')}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
          <input
            type="text"
            name="allergies"
            placeholder="Allergies (comma-separated)"
            value={formData.allergies.join(', ')}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
          <input
            type="number"
            name="roomNumber"
            placeholder="Room Number"
            value={formData.roomNumber || ''}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
          <input
            type="number"
            name="bedNumber"
            placeholder="Bed Number"
            value={formData.bedNumber || ''}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
          <input
            type="number"
            name="floorNumber"
            placeholder="Floor Number"
            value={formData.floorNumber || ''}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age || ''}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            name="contactInfo"
            placeholder="Contact Info"
            value={formData.contactInfo}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
          <input
            type="text"
            name="emergencyContact"
            placeholder="Emergency Contact"
            value={formData.emergencyContact}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>

        <h3 className="text-lg font-bold mt-6 mb-3">Diet Chart</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            name="meal"
            value={formData.dietChart.meal}
            onChange={handleDietChange}
            className="border rounded p-2 w-full"
            required
          >
            <option value="">Select Meal</option>
            {meals.map(meal => (
              <option key={meal._id} value={meal._id}>
                {meal.name}
              </option>
            ))}
          </select>
          <textarea
            name="instructions"
            placeholder="Diet Instructions (e.g., low sugar, low salt)"
            value={formData.dietChart.instructions}
            onChange={handleDietChange}
            className="border rounded p-2 w-full h-24 resize-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
        >
          Add Patient
        </button>
      </form>}

      <div className="bg-white p-4 md:p-6 rounded shadow-md overflow-x-auto">
        <h2 className="text-lg md:text-xl font-bold mb-4">Patient List</h2>
        <div className="min-w-full overflow-x-auto">
          <table className="min-w-full bg-white border table-auto">
            <thead>
              <tr>
                <th className="py-2 px-4 border text-left text-sm md:text-base">Name</th>
                <th className="py-2 px-4 border text-left text-sm md:text-base">Diseases</th>
                <th className="py-2 px-4 border text-left text-sm md:text-base">Age</th>
                <th className="py-2 px-4 border text-left text-sm md:text-base">Room</th>
                <th className="py-2 px-4 border text-left text-sm md:text-base">Diet Instructions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border text-sm md:text-base">{patient.name}</td>
                  <td className="py-2 px-4 border text-sm md:text-base">
                    {patient.diseases.join(', ')}
                  </td>
                  <td className="py-2 px-4 border text-sm md:text-base">{patient.age}</td>
                  <td className="py-2 px-4 border text-sm md:text-base">{patient.roomNumber}</td>
                  <td className="py-2 px-4 border text-sm md:text-base">
                    {patient.dietChart.instructions}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Manager_patient;