import React from 'react';

const CompanyCard = ({ company }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">{company.name}</h2>
      <p className="mb-2">
        <strong>Category:</strong> {company.category}
      </p>
      <p className="mb-2">
        <strong>Address:</strong> {company.address}
      </p>
      <p className="mb-2">
        <strong>Phone:</strong> {company.phone}
      </p>
      {company.website && (
        <p className="text-blue-500 hover:underline">
          <strong>Website:</strong> <a href={company.website} target="_blank" rel="noopener noreferrer">{company.website}</a>
        </p>
      )}
    </div>
  );
};

export default CompanyCard;