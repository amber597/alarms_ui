import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function BasicPie({ byDuration, categoryData }) {
  return (
    <PieChart
      series={[
        {
          data: byDuration ? categoryData['duration'] : categoryData['frequency'],
        },
      ]}
      width={1000} // Increased the width
      height={500} // Increased the height
      sx={{
        '.MuiChartSeries-label': {
          fontSize: '14px', // Adjust font size of labels
          textOverflow: 'ellipsis', // Prevent labels from overflowing
          whiteSpace: 'nowrap', // Ensure the text doesn't wrap
          transform: 'translate(10px, 0)', // Move the labels a bit to avoid overlapping
        },
      }}
    />
  );
}
