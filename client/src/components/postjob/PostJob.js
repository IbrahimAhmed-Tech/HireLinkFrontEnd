import React, { useState } from 'react';
import {
    Box,
    Button,
    Stepper,
    Step,
    StepLabel,
    TextField,
    MenuItem,
    Typography,
    Paper,
    FormControlLabel,
    Checkbox,
} from '@mui/material';
import axios from 'axios';
import styles from './PostJob.module.scss';
import { jobTypes, workTypes, categories, steps } from './helper';
const token = localStorage.getItem('token');


const PostJob = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        jobType: '',
        workLocationType: '',
        description: '',
        responsibilities: '',
        requirements: '',
        salary: '',
        benefits: '',
        category: '',
        applicationDeadline: '',
        isUrgent: false,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = () => {
        setActiveStep((prev) => prev + 1);
    };

    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
    };


    const handleSubmit = async () => {
        console.log("formData",formData)
        
        try {
    const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/api/jobs/post-job`,
     formData,
     {
       headers: {
         Authorization: `Bearer ${token}`,
          },
         }
        );   
         console.log('Job posted successfully:', response.data);
            setFormData({
            title: '',
            company: '',
            location: '',
            jobType: '',
            workLocationType: '',
            description: '',
            responsibilities: '',
            requirements: '',
            salary: '',
            benefits: '',
            category: '',
            applicationDeadline: '',
        });
        } catch (error) {
            console.error('Failed to submit job:', error.response?.data || error.message);
        }
    };

    const renderStep = () => {
        switch (activeStep) {
            case 0:
                return (
                    <>
                        <TextField name="title" label="Job Title" value={formData.title} onChange={handleChange} fullWidth margin="normal" />
                        <TextField name="company" label="Company" value={formData.company} onChange={handleChange} fullWidth margin="normal" />
                        <TextField name="location" label="Location" value={formData.location} onChange={handleChange} fullWidth margin="normal" />
                        <TextField name="jobType" label="Job Type" select value={formData.jobType} onChange={handleChange} fullWidth margin="normal">
                            {jobTypes.map((type) => <MenuItem key={type} value={type}>{type}</MenuItem>)}
                        </TextField>
                        <TextField name="workLocationType" label="Work Location Type" select value={formData.workLocationType} onChange={handleChange} fullWidth margin="normal">
                            {workTypes.map((type) => <MenuItem key={type} value={type}>{type}</MenuItem>)}
                        </TextField>
                    </>
                );
            case 1:
                return (
                    <>
                        <TextField name="description" label="Job Description" value={formData.description} onChange={handleChange} fullWidth margin="normal" multiline rows={4} />
                        <TextField name="responsibilities" label="Responsibilities" value={formData.responsibilities} onChange={handleChange} fullWidth margin="normal" multiline rows={3} />
                        <TextField name="requirements" label="Requirements" value={formData.requirements} onChange={handleChange} fullWidth margin="normal" multiline rows={3} />
                    </>
                );
            case 2:
                return (
                    <>
                        <TextField name="salary" label="Salary Range" value={formData.salary} onChange={handleChange} fullWidth margin="normal" />
                        <TextField name="benefits" label="Benefits" value={formData.benefits} onChange={handleChange} fullWidth margin="normal" multiline rows={2} />
                        <TextField name="category" label="Category" select value={formData.category} onChange={handleChange} fullWidth margin="normal">
                            {categories.map((cat) => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
                        </TextField>
                    </>
                );
            case 3:
                return (
                    <>
                
                        <TextField name="applicationDeadline" label="Application Deadline" type="date" value={formData.applicationDeadline} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formData.isUrgent}
                                    onChange={(e) =>
                                        setFormData({ ...formData, isUrgent: e.target.checked })
                                    }
                                />
                            }
                            label="Urgent Hiring"
                        />
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <Box className={styles.container}>
            <Paper elevation={3} className={styles.wrapper}>
                <Typography variant="h5" className={styles.title}>Post a Job</Typography>

                <Stepper activeStep={activeStep} alternativeLabel className={styles.stepper}>
                    {steps.map((label) => (
                        <Step key={label}><StepLabel>{label}</StepLabel></Step>
                    ))}
                </Stepper>

                <Box className={styles.formData}>{renderStep()}</Box>

                <Box className={styles.buttons}>
                    {activeStep > 0 && <Button onClick={handleBack} variant="outlined">Back</Button>}
                    {activeStep < steps.length - 1 ? (
                        <Button onClick={handleNext} variant="contained">Next</Button>
                    ) : (
                        <Button variant="contained" color="success" onClick={handleSubmit}>Submit</Button>
                    )}
                </Box>
            </Paper>
        </Box>
    );
};

export default PostJob;
