import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function TileComponent({ overViewData }) {
  return (
    <Box
      sx={{
        display: 'flex', // Flex container for side-by-side layout
        flexWrap: 'wrap', // Allow wrapping if screen width is too small
        gap: 2, // Spacing between cards
        justifyContent: 'center', // Center the cards horizontally
        alignItems: 'stretch', // Make cards equal height
        padding: 2, // Add some padding around the container
      }}
    >
      {[
        { label: 'Total Duration', value: overViewData['total_duration'] },
        { label: 'Total Count of Alarms', value: overViewData['total_alarms'] },
        { label: 'Device with Max Duration', value: overViewData['device_max_duration'] },
        { label: 'Max Duration Alarm Time', value: overViewData['max_duration_alarm_time'] },
      ].map((item, index) => (
        <Card
          key={index}
          sx={{
            minWidth: 250,
            flex: '1 1 calc(25% - 16px)', // Makes cards flexible and responsive
            boxShadow: 3, // Slight shadow for a subtle 3D effect
          }}
        >
          <CardContent>
            <Typography
              gutterBottom
              sx={{
                color: 'text.secondary',
                fontSize: 16,
                fontWeight: 'bold',
              }}
            >
              {item.label}
            </Typography>
            <Typography
              sx={{
                color: 'text.primary',
                fontSize: 14,
              }}
            >
              {item.value}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
