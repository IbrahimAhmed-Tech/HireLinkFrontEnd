import CloseIcon from '@mui/icons-material/Close';
import {
    Box,
    Button,
    Card, CardContent,
    Chip,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography
} from '@mui/material';
import { useState } from 'react';
import styles from './JobCard.module.scss';
const JobCard = ({ job }) => {
   
    const [open, setOpen] = useState(false);
    console.log(job.applicationDeadline)
    const handleDialogOpen = () => setOpen(true);
    const handleDialogClose = () => setOpen(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const expectedSalary = Number(user?.expectedSalary); 
    const userRole= user?.role;
    let isInRange = false;
    
    if (userRole === 'candidate') {
    const rawSalary = job.salary || "";
    const cleanedSalary = rawSalary
        .replace(/PKR|\/month|\/Month|\/MONTH|Rs\.?|,/gi, "")
        .trim();

    const isRange = cleanedSalary.includes('-');


    if (!isNaN(expectedSalary)) {
        if (isRange) {
            const jobSalaryRange = cleanedSalary
                .split('-')
                .map(s => Number(s.trim()));

            if (
                jobSalaryRange.length === 2 &&
                !isNaN(jobSalaryRange[0])
            ) {
                isInRange = jobSalaryRange[0] >= expectedSalary;
            }
        } else {
            const jobSalary = Number(cleanedSalary);
            if (!isNaN(jobSalary)) {
                isInRange = jobSalary >= expectedSalary;
            }
        }
    }
}    
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
                    <Chip label={job.salary} size="small"
                    
                        sx={{ backgroundColor: isInRange ? '#4caf50' : '#f44336'}}
                    
                    />
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
