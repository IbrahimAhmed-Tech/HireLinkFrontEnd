import React, { useState } from "react";
import styles from "./SignIn.module.scss";
import {
    Button,
    TextField,
    Typography,
    Box,
    Grid,
    Link,
    InputAdornment,
    IconButton
} from "@mui/material";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";

const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [signingIn, setSigningIn] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSigningIn(true);
    
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/login`, {
                email,
                password,
            });
    
            const { token, user } = response.data;
    
            
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
    
            toast.success("Login successful");
            navigate("/home");
        } catch (err) {
            if (err.response?.status === 401) {
                toast.error("Invalid email or password");
            } else {
                const message = err.response?.data?.error || "Something went wrong. Please try again.";
                toast.error(message);
            }
        } finally {
            setSigningIn(false);
        }
    };
    

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <Grid container className={styles.container}>
            <Grid item xs={12} sm={8} md={4} className={styles.formSection}>
                <Box className={styles.formBox}>
                    <Typography variant="h4" gutterBottom align="center">
                        Sign In
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            margin="normal"
                            required
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={togglePasswordVisibility}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            className={styles.submitButton}
                        >
                            {signingIn ? "Signing In..." : "Sign In"}
                        </Button>
                    </form>

                    

                    <Typography variant="body2" className={styles.registerText}>
                        Don't have an account? <Link href="/signup">Register</Link>
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
};

export default SignIn;
