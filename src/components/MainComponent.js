import React, { useState, useEffect } from 'react';  
import { CssBaseline } from '@mui/material';
import axios from 'axios';  

import Table from './Table'; 
import ChartComponent from './ChartComponent';
import FilterComponent from './FilterComponent';
import TileComponent from './TileComponent';

import './MainComponent.css';

export default function MainComponent() {
  const [filters, setFilters] = useState({}); // State to hold filters
  const [tableData, setTableData] = useState([]);  // State to store API response data
  const [isLoading, setIsLoading] = useState(false);  // Loading state
  const [deviceData, setDeviceData] = useState(null); // Initially null for check
  const [categoryData, setCategoryData] = useState(null);
  const [overViewData, setOverViewData] = useState(null);

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters); // Update the filters state
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { state, device, fault, code, timeRange } = filters;
        const params = {};

        // Include query parameters based on the filters
        if (state && state.length > 0) params.state = state.join(',');
        if (device && device.length > 0) params.device = device.join(',');
        if (fault && fault.length > 0) params.fault = fault.join(',');
        if (code && code.length > 0) params.code = code.join(',');
        if (timeRange && timeRange.start) params.start_time = timeRange.start;
        if (timeRange && timeRange.end) params.end_time = timeRange.end;

        const response = await axios.get('http://127.0.0.1:8000/api/faults/', { params });
        setTableData(response.data['faults']);
        setDeviceData(response.data['device_data']);
        setCategoryData(response.data['category_data']);
        setOverViewData(response.data['overview_data']);
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  const hasData = deviceData && categoryData && overViewData && deviceData['duration'] && deviceData['frequency'];

  return (
    <div className="App">
      <>
        <div className="filter-container">
          <FilterComponent onApplyFilters={handleApplyFilters} />
        </div>
        <CssBaseline />
        {isLoading ? (
          <p>Loading...</p> // Show loading message
        ) : hasData ? (
          <>
            <TileComponent overViewData={overViewData} />
            <ChartComponent deviceData={deviceData} categoryData={categoryData} />
          </>
        ) : (
          <p>No data available</p> // Fallback message if no data is found
        )}
        <Table data={tableData} style={{ padding: '20px' }} />
      </>
    </div>
  );
}
