import React, { useState } from 'react';
import {
    Card, CardContent, Typography, Button, Chip, Box,
    Dialog, DialogTitle, DialogContent, IconButton
} from '@mui/material';
import styles from './JobCard.module.scss';
import CloseIcon from '@mui/icons-material/Close';
const JobCard = ({ job }) => {
    const [open, setOpen] = useState(false);

    const handleDialogOpen = () => setOpen(true);
    const handleDialogClose = () => setOpen(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const salaryRange = user?.salaryRange?.split('-').map(Number);
    const offeredSalary = Number(job.salary);
    console.log("salaryRange", salaryRange);
    console.log("offeredSalary", offeredSalary);
    const isInRange = salaryRange && offeredSalary >= salaryRange[0] && offeredSalary <= salaryRange[1];

    const chipClass = `${styles.chip} ${isInRange ? styles.green : styles.red}`;

    return (
        <>
            <Card className={styles.card}>
                <CardContent className={styles.cardContent}>
                    <Typography className={styles.cardTitle}>
                        {job.title}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" noWrap>
                        {job.company} – {job.location}
                    </Typography>
                    <Chip label={job.salary} size="small" className={chipClass} />
                    <Typography variant="body2" sx={{ mt: 2 }}><strong>Applicants:</strong> {job.applicants || 0} </Typography>
                        <Typography variant="body2" sx={{ mt: 2 }}><strong>Last date to apply:</strong> {new Date(job.applicationDeadline).toLocaleDateString()}</Typography>                    
                    <Box className={styles.chipBox}>
                        <Chip label={job.jobType} size="small" />
                        <Chip label={job.workLocationType} size="small" />
                    </Box>
                </CardContent>

                <Box className={styles.buttonBox}>
                    <Button variant="contained" fullWidth onClick={handleDialogOpen}>
                        Read Details
                    </Button>
                </Box>
                <Box className={styles.buttonBox}>
                    <Button variant="contained" fullWidth>
                        Apply Now
                    </Button>
                </Box>
            </Card>

            <Dialog open={open} onClose={handleDialogClose} fullWidth maxWidth="sm">
                <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Job Details
                    <IconButton
                        aria-label="close"
                        onClick={handleDialogClose}
                        sx={{
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>                <DialogContent dividers>
                    <Typography variant="body2" sx={{ mt: 2 }}><strong>Description:</strong> {job.description}</Typography>
                    <Typography variant="body2" sx={{ mt: 2 }}><strong>Requirements:</strong> {job.requirements}</Typography>
                    <Typography variant="body2" sx={{ mt: 2 }}><strong>Benefits:</strong> {job.benefits}</Typography>
                    <Typography variant="body2" sx={{ mt: 2 }}><strong>Responsibilities:</strong> {job.responsibilities}</Typography>
                </DialogContent>
               
            </Dialog>
        </>
    );
};

export default JobCard;
