import React from 'react';
import { Calendar, Clock, User } from 'lucide-react';

const mockAppointments = [
  {
    id: '1',
    patientName: 'John Doe',
    date: '2024-03-20',
    time: '10:00 AM',
    status: 'confirmed',
    reason: 'Regular checkup'
  },
  {
    id: '2',
    patientName: 'Jane Smith',
    date: '2024-03-20',
    time: '11:30 AM',
    status: 'pending',
    reason: 'Follow-up consultation'
  }
];

export function DoctorDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Doctor Dashboard</h1>
        <p className="mt-2 text-gray-600">Manage your appointments and patient information</p>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg leading-6 font-medium text-gray-900">Today's Appointments</h2>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {mockAppointments.map((appointment) => (
              <li key={appointment.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <User className="h-6 w-6 text-gray-400" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{appointment.patientName}</p>
                      <p className="text-sm text-gray-500">{appointment.reason}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-5 w-5 mr-1.5 text-gray-400" />
                      {appointment.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-5 w-5 mr-1.5 text-gray-400" />
                      {appointment.time}
                    </div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        appointment.status === 'confirmed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-3">
                  <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    View Details
                  </button>
                  {appointment.status === 'pending' && (
                    <>
                      <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                        Accept
                      </button>
                      <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        Decline
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}