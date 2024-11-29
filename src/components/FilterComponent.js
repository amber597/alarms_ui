import * as React from 'react';
import { FormControl, InputLabel, MenuItem, Select, Checkbox, ListItemText, Button, Grid, TextField } from '@mui/material';
import axios from 'axios';

export default function FilterComponent({ onApplyFilters }) {
  const [selectedFiltersState, setSelectedFiltersState] = React.useState([]);
  const [selectedFiltersDevice, setSelectedFiltersDevice] = React.useState([]);
  const [selectedFiltersFault, setSelectedFiltersFault] = React.useState([]);
  const [selectedFiltersCode, setSelectedFiltersCode] = React.useState([]);
  const [timeRange, setTimeRange] = React.useState({ start: '', end: '' });
  
  // State for storing the filter options fetched from API
  const [filterOptions, setFilterOptions] = React.useState({
    states: [],
    devices: [],
    fault_types: [],
    codes: []
  });

  // Fetch filter options from API on component mount
  React.useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/filters/')
      .then(response => {
        // Set the filter options into state
        setFilterOptions(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the filter options!', error);
      });
  }, []);

  const handleFilterChange = (event, filterType) => {
    const { value } = event.target;
    if (filterType === 'state') setSelectedFiltersState(value);
    if (filterType === 'device') setSelectedFiltersDevice(value);
    if (filterType === 'fault') setSelectedFiltersFault(value);
    if (filterType === 'code') setSelectedFiltersCode(value);
  };

  const handleTimeRangeChange = (event) => {
    const { name, value } = event.target;
    setTimeRange((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApplyFilters = () => {
    // Apply filters logic (you can pass the selected filters to another component or API)
    onApplyFilters({
        state: selectedFiltersState,
        device: selectedFiltersDevice,
        fault: selectedFiltersFault,
        code: selectedFiltersCode,
        timeRange
      });
  };

  return (
    <div>
      <Grid container spacing={2} alignItems="center">
        {/* State Filter */}
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel id="state-label">State</InputLabel>
            <Select
              labelId="state-label"
              multiple
              value={selectedFiltersState}
              onChange={(event) => handleFilterChange(event, 'state')}
              renderValue={(selected) => selected.join(', ')}
            >
              {filterOptions.states.map((option) => (
                <MenuItem key={option} value={option}>
                  <Checkbox checked={selectedFiltersState.indexOf(option) > -1} />
                  <ListItemText primary={option} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Device Filter */}
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel id="device-label">Device Name</InputLabel>
            <Select
              labelId="device-label"
              multiple
              value={selectedFiltersDevice}
              onChange={(event) => handleFilterChange(event, 'device')}
              renderValue={(selected) => selected.join(', ')}
            >
              {filterOptions.devices.map((option) => (
                <MenuItem key={option} value={option}>
                  <Checkbox checked={selectedFiltersDevice.indexOf(option) > -1} />
                  <ListItemText primary={option} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Fault Type Filter */}
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel id="fault-label">Fault Type</InputLabel>
            <Select
              labelId="fault-label"
              multiple
              value={selectedFiltersFault}
              onChange={(event) => handleFilterChange(event, 'fault')}
              renderValue={(selected) => selected.join(', ')}
            >
              {filterOptions.fault_types.map((option) => (
                <MenuItem key={option} value={option}>
                  <Checkbox checked={selectedFiltersFault.indexOf(option) > -1} />
                  <ListItemText primary={option} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Code Filter */}
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel id="code-label">Code</InputLabel>
            <Select
              labelId="code-label"
              multiple
              value={selectedFiltersCode}
              onChange={(event) => handleFilterChange(event, 'code')}
              renderValue={(selected) => selected.join(', ')}
            >
              {filterOptions.codes.map((option) => (
                <MenuItem key={option} value={option}>
                  <Checkbox checked={selectedFiltersCode.indexOf(option) > -1} />
                  <ListItemText primary={option} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Time Range Filter */}
        <Grid item xs={2}>
          <TextField
            label="Start Date"
            type="datetime-local"
            value={timeRange.start}
            onChange={handleTimeRangeChange}
            name="start"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        <Grid item xs={2}>
          <TextField
            label="End Date"
            type="datetime-local"
            value={timeRange.end}
            onChange={handleTimeRangeChange}
            name="end"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="primary"
        onClick={handleApplyFilters}
        sx={{ marginTop: '20px' }}
      >
        Apply Filters
      </Button>
    </div>
  );
}
