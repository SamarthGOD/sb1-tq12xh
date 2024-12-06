import React, { useState } from 'react';
import { Search, Filter, MapPin, Star, Clock, Calendar } from 'lucide-react';

const mockDoctors = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiologist',
    availability: ['Monday', 'Wednesday', 'Friday'],
    rating: 4.8,
    experience: '15 years',
    location: 'Downtown Medical Center',
    consultationFee: '500',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialization: 'Neurologist',
    availability: ['Tuesday', 'Thursday'],
    rating: 4.9,
    experience: '12 years',
    location: 'Central Hospital',
    consultationFee: '350',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialization: 'Pediatrician',
    availability: ['Monday', 'Tuesday', 'Thursday'],
    rating: 4.7,
    experience: '10 years',
    location: 'Children\'s Medical Center',
    consultationFee: '130',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    specialization: 'Orthopedic Surgeon',
    availability: ['Wednesday', 'Friday'],
    rating: 4.9,
    experience: '18 years',
    location: 'Sports Medicine Clinic',
    consultationFee: '200',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: '5',
    name: 'Dr. Lisa Chang',
    specialization: 'Dermatologist',
    availability: ['Monday', 'Thursday', 'Friday'],
    rating: 4.6,
    experience: '8 years',
    location: 'Skin Care Center',
    consultationFee: '160',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300'
  }
];

const specializations = [
  'All',
  'Cardiologist',
  'Neurologist',
  'Pediatrician',
  'Orthopedic Surgeon',
  'Dermatologist'
];

export function PatientDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('All');
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [sortBy, setSortBy] = useState<'rating' | 'experience' | 'fee'>('rating');

  const filteredDoctors = mockDoctors
    .filter(doctor =>
      (doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
       doctor.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedSpecialization === 'All' || doctor.specialization === selectedSpecialization)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'experience':
          return parseInt(b.experience) - parseInt(a.experience);
        case 'fee':
          return parseInt(b.consultationFee.slice(1)) - parseInt(a.consultationFee.slice(1));
        default:
          return 0;
      }
    });

  const handleAppointment = (doctorId: string) => {
    if (!appointmentDate || !appointmentTime) {
      alert('Please select both date and time for the appointment');
      return;
    }
    alert('Appointment requested successfully!');
    setSelectedDoctor(null);
    setAppointmentDate('');
    setAppointmentTime('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Find a Doctor</h1>
        
        {/* Search and Filter Section */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search doctors, specializations, locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <select
              value={selectedSpecialization}
              onChange={(e) => setSelectedSpecialization(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              {specializations.map((spec) => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'rating' | 'experience' | 'fee')}
              className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="rating">Sort by Rating</option>
              <option value="experience">Sort by Experience</option>
              <option value="fee">Sort by Fee</option>
            </select>
          </div>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredDoctors.map((doctor) => (
          <div key={doctor.id} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300">
            <div className="p-5">
              <div className="flex items-center">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{doctor.name}</h3>
                  <p className="text-sm text-gray-500">{doctor.specialization}</p>
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span>{doctor.rating} Rating</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 text-gray-400 mr-1" />
                  <span>{doctor.experience} Experience</span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                  <span>{doctor.location}</span>
                </div>
                <p className="text-sm font-medium text-blue-600">{doctor.consultationFee} per visit</p>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900">Available on:</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {doctor.availability.map((day) => (
                    <span
                      key={day}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSelectedDoctor(doctor.id)}
                className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Appointment Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Book Appointment</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select Date
                </label>
                <input
                  type="date"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select Time
                </label>
                <select
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Select a time</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedDoctor(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleAppointment(selectedDoctor)}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}