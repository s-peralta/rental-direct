import React, { useEffect, useState } from 'react';
import CompanyCard from './CompanyCard';

const Directory = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    fetch('/cra-list.json')
      .then((response) => response.json())
      .then((data) => {
        setCompanies(data);
        setFilteredCompanies(data);
        const uniqueProvinces = Array.from(new Set(data.map(company => {
          const province = company.address.split(', ')[1]?.split(' ')[0] || '';
          return province;
        })));
        setProvinces(uniqueProvinces);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    let filtered = companies.filter(company =>
      (company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.address.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedProvince === '' || company.address.includes(selectedProvince))
    );

    setFilteredCompanies(filtered);
  }, [searchTerm, selectedProvince, companies]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Construction Rental Companies Directory</h1>
      <div className="mb-6 flex flex-col md:flex-row justify-between items-center">
        <input
          type="text"
          placeholder="Search by name or address..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded mb-4 md:mb-0 md:mr-4 w-full md:w-1/2"
        />
        <select
          value={selectedProvince}
          onChange={handleProvinceChange}
          className="p-2 border border-gray-300 rounded mb-4 md:mb-0 md:mr-4 w-full md:w-1/2"
        >
          <option value="">All Provinces</option>
          {provinces.map((province, index) => (
            <option key={index} value={province}>{province}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.map((company, index) => (
          <CompanyCard key={index} company={company} />
        ))}
      </div>
    </div>
  );
};

export default Directory; 