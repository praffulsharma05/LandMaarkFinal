import React from 'react';

const QASection = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm mt-6">
      <h2 className="text-xl font-semibold mb-4">Questions and Answers</h2>
      <div className="space-y-4">
        <div className="border-b pb-4">
          <p className="font-medium">Q: What is the total carpet area of units in the project?</p>
          <p className="text-gray-600 mt-1">A: Carpet area of 1 BHK flat starts from 248.86 sqft, 2 BHK flat starts from 407.74 sqft.</p>
          <p className="text-xs text-gray-500 mt-2">Answered 6 years ago</p>
        </div>
        <div className="border-b pb-4">
          <p className="font-medium">Q: Is there water harvesting in the society?</p>
          <p className="text-gray-600 mt-1">A: Yes, water harvesting facility is available.</p>
          <p className="text-xs text-gray-500 mt-2">Answered 6 years ago</p>
        </div>
      </div>
      <button className="mt-4 text-blue-600 font-medium hover:text-blue-800">
        View All Questions →
      </button>
    </div>
  );
};

export default QASection;