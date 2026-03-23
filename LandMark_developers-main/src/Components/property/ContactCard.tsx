import React from 'react';
import { Building, Award, Check, User, Phone, Mail } from 'lucide-react';

const ContactCard = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm sticky top-4">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <Building className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="font-semibold text-lg">Volt Group</h3>
        <p className="text-sm text-gray-500 flex items-center justify-center">
          <Award className="w-4 h-4 text-yellow-500 mr-1" />
          Housing Expert Pro
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-center space-x-2 text-sm bg-green-50 p-3 rounded-lg">
          <Check className="w-4 h-4 text-green-600" />
          <span className="text-green-700">Great choice! Nice neighborhood around</span>
        </div>

        <div className="border-t pt-4">
          <p className="text-sm font-medium mb-3">Please share your contact</p>
          <div className="space-y-3">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Name"
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="tel" 
                placeholder="Phone"
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="email" 
                placeholder="Email"
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <label className="flex items-center text-sm">
              <input type="checkbox" className="rounded text-blue-600 mr-2" />
              <span className="text-gray-600">I agree to be contacted by Housing and agents via WhatsApp, SMS, phone, email etc</span>
            </label>
            <label className="flex items-center text-sm">
              <input type="checkbox" className="rounded text-blue-600 mr-2" />
              <span className="text-gray-600">I am interested in Home Loans</span>
            </label>
          </div>

          <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition" style={{background:'#03a1fc'}}>
            Get Contact Details
          </button>

          <p className="text-xs text-gray-400 text-center mt-4">
            By proceeding, you consent to receive calls and texts at the number you provided.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;