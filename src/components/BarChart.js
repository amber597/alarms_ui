import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

// Custom value formatters
const valueFormatterHours = (value) => `${value}`;
const valueFormatterFrequency = (value) => `${value / 100000}`;

const chartSetting = {
  width: 800,
  height: 400,
};

export default function VerticalBars({ byDuration, deviceData }) {
  return (
    <BarChart
      dataset={byDuration ? deviceData['duration'] : deviceData['frequency']}
      xAxis={[
        {
          scaleType: 'band',
          dataKey: 'label',
          label: 'Devices',
        },
      ]}
      yAxis={[
        {
          label: byDuration ? 'Hours' : 'Frequency (100k)',
          valueFormatter: byDuration ? valueFormatterHours : valueFormatterFrequency,
          sx: {
            '.MuiChartAxis-label': {
              transform: 'translate(-40px, 0)', // Move the Y-axis label left
            },
            '.MuiChartAxis-tickLabel': {
              marginLeft: '10px', // Add space between numbers and label
            },
          },
        },
      ]}
      series={[
        {
          dataKey: 'value',
          label: byDuration ? 'Hours' : 'Frequency',
        },
      ]}
      layout="vertical" // Vertical layout for bars
      {...chartSetting}
    />
  );
}
