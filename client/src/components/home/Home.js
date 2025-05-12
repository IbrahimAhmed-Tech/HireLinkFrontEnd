import SearchIcon from '@mui/icons-material/Search';
import { Box, CircularProgress, Container, Grid, InputAdornment, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import JobCard from './jobCard/JobCard';
const Home = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

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
                placeholder="Search jobs..."
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
