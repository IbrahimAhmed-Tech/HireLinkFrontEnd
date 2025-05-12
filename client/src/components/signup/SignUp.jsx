import React, { useState } from "react";
import styles from "./SignUp.module.scss";
import {
    Button, TextField, Typography, Box, Grid,
    InputAdornment, IconButton, ToggleButtonGroup, ToggleButton,
    OutlinedInput,
    MenuItem,
    Checkbox,
    ListItemText,
    Select
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";

const SignUp = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [role, setRole] = useState("candidate");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const [selected, setSelected] = useState([]);

    const handleSkillChange = (event) => {
        setSelected(event.target.value);
    };
    const handleRoleChange = (event, newRole) => {
        if (newRole !== null) setRole(newRole);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const { fullName, email, password, confirmPassword } = formData;
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/create-user`, {
                fullName, email, password, role
            });
            setSuccess(response.data.message);
            setFormData({ fullName: "", email: "", password: "", confirmPassword: "" });
        } catch (err) {
            const msg = err.response?.data?.message || "Something went wrong.";
            setError(msg);
        }
    };
    const options = ["React", "Vue", "Angular", "Svelte"];

    return (
        <Grid container className={styles.container}>
            <Grid item xs={12} sm={8} md={4} className={styles.formSection}>
                <Box className={styles.formBox}>
                    <Typography variant="h5" align="center" gutterBottom>
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
                            <ToggleButton value="candidate" sx={{ px: 3 }}>Candidate</ToggleButton>
                            <ToggleButton value="hiringManager" sx={{ px: 3 }}>Hiring Manager</ToggleButton>
                        </ToggleButtonGroup>
                    </Box>

                    <form onSubmit={handleSubmit}>
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

                        {error && <Typography color="error" variant="body2">{error}</Typography>}
                        {success && <Typography color="primary" variant="body2">{success}</Typography>}
                       { role === "hiringManager" && (
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
                        {role === "hiringManager" && (
                            <TextField
                                label="Job Title"
                                name="jobTitle"
                                value={formData.jobTitle}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                required
                            />
                        )}
                        {role === "hiringManager" && (
                            <TextField
                                label="Job Description"
                                name="jobDescription"
                                value={formData.jobDescription}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                required
                            />
                        )}
                        {role === "hiringManager" && (
                            <TextField
                                label="Location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                required
                            />
                        )}
                        {role === "hiringManager" && (
                            <TextField
                                label="Salary Range"
                                name="salaryRange"
                                value={formData.salaryRange}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                required
                            />
                        )}
                        
                        
                       
                        {role === "candidate" && (
                            <Select
                                labelId="multi-select-label"
                                multiple
                                value={selected}
                                onChange={handleSkillChange}
                                input={<OutlinedInput label="Technologies" />}
                                renderValue={(selected) => selected.join(", ")}
                            >
                                {options.map((tech) => (
                                    <MenuItem key={tech} value={tech}>
                                        <Checkbox checked={selected.indexOf(tech) > -1} />
                                        <ListItemText primary={tech} />
                                    </MenuItem>
                                ))}
                          </Select>
                        )}
                       
                     
                        
                      
                      
                      
                        
                     
                        <TextField
                            label="Expected Salary Range"
                            name="expectedSalary"
                            value={formData.fullName}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                        />
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

                    <Typography variant="body2" className={styles.loginText} sx={{ mt: 2, textAlign: "center" }}>
                        Already have an account? <a href="/">Sign In</a>
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
};

export default SignUp;
