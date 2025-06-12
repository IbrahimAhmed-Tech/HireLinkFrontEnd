import SearchIcon from '@mui/icons-material/Search';
import { Box, Checkbox, Chip, CircularProgress, Container, FormControl, Grid, InputAdornment, InputLabel, ListItemText, Menu, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import JobCard from './jobCard/JobCard';
const Home = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uniqueLocations, setUniqueLocations] = useState([]);

    const fetchJobs = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/jobs/fetch-jobs`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer mysecrettoken"
                }
            });

            const data = await res.json();
            console.log("Fetched jobs:-------", data);
            const allLocations = data.jobs.map(job => job.location);

           
            const uniqueLocations = [...new Set(allLocations)];
            setUniqueLocations(uniqueLocations);
            
            setJobs(data.jobs || []);
        } catch (error) {
            console.error("Failed to fetch jobs:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    return (
        <Container className={styles.container}>
            <Box className={styles.searchBoxContainer}>
                <TextField
                    variant="outlined"
                    placeholder="Search jobs by title or company"
                    size="small"
                    className={styles.searchBox}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon style={{ marginRight: '8px' }} />
                            </InputAdornment>
                        ),
                    }}
                />
                <FormControl sx={{width: 200, marginLeft: 2}} size="small">
                    <InputLabel id="location-label">Location</InputLabel>
                    <Select
                        labelId="location-label"
                        id="skills"
                        input={<OutlinedInput label="Select Skills" />}
                    >
                        {uniqueLocations.map((location, index) => (
                            <MenuItem key={index} value={location}>
                                {location}
                            </MenuItem>
                        ))}                            
                    </Select>
                </FormControl>
            </Box>


            {loading ? (
                <div className={styles.loader}>
                    <CircularProgress />
                </div>
            ) : (
                <Grid container spacing={3} className={styles.cardsGrid}>
                    {jobs.map((job) => (
                        <Grid item xs={12} md={6} key={job._id} className={styles.cardssGrid}>
                            <JobCard job={job} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default Home;
