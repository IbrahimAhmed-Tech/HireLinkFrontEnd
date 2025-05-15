import React, { useState } from "react";
import styles from "./SignUp.module.scss";
import {
    Button, TextField, Typography, Box, Grid,
    InputAdornment, IconButton, ToggleButtonGroup, ToggleButton,
    OutlinedInput,
    MenuItem,
    Checkbox,
    ListItemText,
    Select,
    Chip,
    InputLabel,
    FormControl
} from "@mui/material";
import toast from "react-hot-toast";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import UploadFileIcon from '@mui/icons-material/UploadFile';

const SignUp = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        skills: [],
        expectedSalary: "",
        companyName: "",
        companyWebsite: "",
    });
    const [role, setRole] = useState("candidate");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [open, setOpen] = useState(false);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const [selected, setSelected] = useState([]);
    const options = ["React", "Vue", "Angular", "Svelte"];

    const handleSkillChange = (event) => {
        const value = event.target.value;
        setSelected(value);
        setOpen(false);
        setFormData((prev) => ({
            ...prev,
            skills: value,
        }));
    };
    const handleRoleChange = (event, newRole) => {
        if (newRole !== null) {
            setRole(newRole);
            setFormData(prev => ({
                ...prev,
                skills: [],
                expectedSalary: "",
                companyName: "",
                companyWebsite: "",
            }));
            setSelected([]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        try {
            let resumeUrl = "";
            let profilePictureUrl = "";

            if (role === "candidate" && formData.resume) {
                const uploadData = new FormData();
                uploadData.append("resume", formData.resume);
                const uploadRes = await axios.post(
                    `${process.env.REACT_APP_API_URL}/api/uploads/upload-resume`,
                    uploadData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }
                );
                resumeUrl = uploadRes.data?.url;
                toast.success("Resume uploaded successfully!");
            }

            if (formData.profilePicture) {
                const uploadData = new FormData();
                uploadData.append("profilePicture", formData.profilePicture);
                const uploadRes = await axios.post(
                    `${process.env.REACT_APP_API_URL}/api/uploads/upload-profile-picture`,
                    uploadData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }
                );
                profilePictureUrl = uploadRes.data?.url;
                toast.success("Profile picture uploaded successfully!");
            }

            const payload = {
                ...formData,
                role,
                resume: resumeUrl,
                profilePicture: profilePictureUrl,
            };

            console.log("Payload:", payload);

            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/users/create-user`,
                { formData: payload }
            );

            toast.success(response.data.message);

            setFormData({
                fullName: "",
                email: "",
                password: "",
                confirmPassword: "",
                skills: [],
                expectedSalary: "",
                companyName: "",
                companyWebsite: "",
                resume: null,
                profilePicture: null,
            });
            setSelected([]);

        } catch (err) {
            const msg = err.response?.data?.message || "Something went wrong.";
            toast.error(msg);
        }
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            resume: e.target.files[0],
        });
    };
    const handleProfileFileChange = (e) => {
        setFormData({
            ...formData,
            profilePicture: e.target.files[0],
        });
    };
    return (
        <Grid container className={styles.container}>
            <Grid item xs={12} sm={8} md={4} className={styles.formSection}>
                <Box className={styles.formBox}>
                    <Typography gutterBottom className={styles.title}>
                        Create Your Profile
                    </Typography>


                    <Box display="flex" justifyContent="center" mb={2}>
                        <ToggleButtonGroup
                            value={role}
                            exclusive
                            onChange={handleRoleChange}
                            color="primary"
                            sx={{ backgroundColor: "#f5f5f5", borderRadius: 2 }}
                        >
                            <ToggleButton value="candidate" sx={{ px: 3, fontFamily: "rubik" }}>Candidate</ToggleButton>
                            <ToggleButton value="hiringManager" sx={{ px: 3, fontFamily: "rubik" }}>Hiring Manager</ToggleButton>
                        </ToggleButtonGroup>
                    </Box>

                    <form onSubmit={handleSubmit} style={{ fontFamily: 'Rubik, sans-serif' }}>
                        <TextField
                            label="Full Name"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required

                        />
                        <TextField
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            type={showPassword ? "text" : "password"}
                            fullWidth
                            margin="normal"
                            required
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(prev => !prev)} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            label="Confirm Password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            type={showConfirmPassword ? "text" : "password"}
                            fullWidth
                            margin="normal"
                            required
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowConfirmPassword(prev => !prev)} edge="end">
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        {role === "hiringManager" && (
                            <TextField
                                label="Company Name"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                required
                            />
                        )}
                        {role === "hiringManager" && (
                            <TextField
                                label="Company Website"
                                name="companyWebsite"
                                value={formData.companyWebsite}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                required
                            />
                        )}

                        {role === "candidate" && (
                            <>
                                <Box sx={{ marginTop: 2 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="skills-label">Select Skills</InputLabel>
                                        <Select
                                            labelId="skills-label"
                                            multiple
                                            value={selected}
                                            onChange={handleSkillChange}
                                            onOpen={() => setOpen(true)}
                                            onClose={() => setOpen(false)}
                                            open={open}
                                            input={<OutlinedInput label="Select Skills" />}
                                            renderValue={(selected) => (
                                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                                    {selected.map((value) => (
                                                        <Chip key={value} label={value} sx={{ borderRadius: 1 }} />
                                                    ))}
                                                </Box>
                                            )}
                                        >
                                            {options.map((tech) => (
                                                <MenuItem key={tech} value={tech}>
                                                    <Checkbox checked={selected.indexOf(tech) > -1} />
                                                    <ListItemText primary={tech} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>

                                <TextField
                                    label="Expected Salary Range"
                                    name="expectedSalary"
                                    value={formData.expectedSalary}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    required
                                />

                                <label htmlFor="resume-upload" className={styles.uploadLabel}>
                                    <input
                                        id="resume-upload"
                                        type="file"
                                        name="resume"
                                        accept=".pdf,.doc,.docx"
                                        onChange={handleFileChange}
                                        style={{ display: "none" }}
                                    />
                                    <Button
                                        variant="outlined"
                                        component="span"
                                        fullWidth
                                        startIcon={<UploadFileIcon />}
                                    >
                                        {formData.resume?.name || "Upload Resume"}
                                    </Button>
                                </label>
                            </>
                        )}



                        <label htmlFor="profile-picture-upload" className={styles.uploadLabel}>
                            <input
                                id="profile-picture-upload"
                                type="file"
                                name="profilePicture"
                                accept=".jpg,.jpeg,.png"
                                onChange={handleProfileFileChange}
                                style={{ display: "none" }}
                            />
                            <Button
                                variant="outlined"
                                component="span"
                                fullWidth
                                startIcon={<UploadFileIcon />}
                            >
                                {formData.profilePicture?.name || "Upload Profile Picture"}
                            </Button>
                        </label>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            className={styles.submitButton}
                            sx={{ mt: 2 }}
                        >
                            Sign Up as {role === "candidate" ? "Candidate" : "Hiring Manager"}
                        </Button>
                    </form>

                    <Typography variant="body2" className={styles.loginText} sx={{ mt: 2, textAlign: "center", fontFamily: "rubik" }}>
                        Already have an account? <a href="/">Sign In</a>
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
};

export default SignUp;
