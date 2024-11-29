import React, { useState } from 'react';
import BarChart from './BarChart';
import PieChart from './PieChart';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

export default function ChartComponent({ deviceData, categoryData }) {
  const [byAlarmCode, setByAlarmCode] = useState(true);
  const [byDuration, setByDuration] = useState(true);

  return (
    <Box sx={{ padding: '20px' }}>
      {/* Container for button groups to align them */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        {/* Buttons for Alarm Code/Category */}
        <ButtonGroup
          variant="contained"
          aria-label="Chart selection button group"
        >
          <Button
            onClick={() => setByAlarmCode(true)}
            sx={{
              backgroundColor: byAlarmCode ? '#1976d2' : '#fff',
              color: byAlarmCode ? '#fff' : '#1976d2',
              border: '1px solid #1976d2',
              '&:hover': {
                backgroundColor: byAlarmCode ? '#1565c0' : '#f1f1f1',
              },
            }}
          >
            By Alarm Code
          </Button>
          <Button
            onClick={() => setByAlarmCode(false)}
            sx={{
              backgroundColor: !byAlarmCode ? '#1976d2' : '#fff',
              color: !byAlarmCode ? '#fff' : '#1976d2',
              border: '1px solid #1976d2',
              '&:hover': {
                backgroundColor: !byAlarmCode ? '#1565c0' : '#f1f1f1',
              },
            }}
          >
            By Category
          </Button>
        </ButtonGroup>

        {/* "By Duration/Frequency" Button Group aligned to the right */}
        <ButtonGroup variant="contained" aria-label="Chart type button group">
          <Button
            onClick={() => setByDuration(true)}
            sx={{
              backgroundColor: byDuration ? '#1976d2' : '#fff',
              color: byDuration ? '#fff' : '#1976d2',
              border: '1px solid #1976d2',
              '&:hover': {
                backgroundColor: byDuration ? '#1565c0' : '#f1f1f1',
              },
            }}
          >
            By Duration
          </Button>
          <Button
            onClick={() => setByDuration(false)}
            sx={{
              backgroundColor: !byDuration ? '#1976d2' : '#fff',
              color: !byDuration ? '#fff' : '#1976d2',
              border: '1px solid #1976d2',
              '&:hover': {
                backgroundColor: !byDuration ? '#1565c0' : '#f1f1f1',
              },
            }}
          >
            By Frequency
          </Button>
        </ButtonGroup>
      </Box>

      {/* Charts with equal size */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#fff',
          padding: '20px',
          borderRadius: '8px',
          height: '400px', // Set height to standardize chart size
          maxWidth: '800px', // Set width to standardize chart size
          margin: '0 auto', // Center the charts horizontally
        }}
      >
        {byAlarmCode ? (
          <BarChart byDuration={byDuration} deviceData={deviceData} />
        ) : (
          <PieChart byDuration={byDuration} categoryData={categoryData} />
        )}
      </Box>
    </Box>
  );
}
