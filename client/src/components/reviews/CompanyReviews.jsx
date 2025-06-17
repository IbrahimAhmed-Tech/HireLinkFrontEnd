import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Rating,
    Card,
    CardContent,
    Avatar,
    Stack,
    IconButton
} from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import toast from "react-hot-toast";
import axios from 'axios';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';


const CompanyReviews = () => {
    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);

    const [newReview, setNewReview] = useState({
        companyName: '',
        rating: 0,
        text: '',
    });

    const handleChange = (e) => {
        setNewReview((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newReview.companyName || !newReview.rating || !newReview.text) {
            toast.error("Please fill all the fields");
            return;
        }
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/reviews/post-review`,
                newReview,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (response.data.status === 'success') {
                toast.success("Review posted successfully");
                setNewReview({
                    companyName: '',
                    rating: 0,
                    text: '',
                });
                fetchReviews(); // Refresh list
            }
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    const fetchReviews = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/reviews/fetch-reviews`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer mysecrettoken"
                }
            });
            const data = await res.json();
            setReviews(data.reviews || []);
        } catch (error) {
            console.error("Failed to fetch reviews:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    return (
        <Box
            sx={{
                maxWidth: 700,
                mx: 'auto',
                mt: 5,
                mb: 5,
                px: { xs: 2, sm: 4 },
                py: 4,
                backgroundColor: '#f9f9fb',
                borderRadius: 3,
                boxShadow: 3,
            }}
        >
            <Typography variant="h4" fontWeight={600} mb={4}>
                Company Reviews
            </Typography>

            {reviews.map((review) => (
                <Card key={review._id} sx={{ mb: 3, borderRadius: 3, boxShadow: 2, p: 1 }}>
                    <CardContent>
                        <Stack direction="row" spacing={2}>
                            <Avatar sx={{ bgcolor: deepPurple[500], width: 48, height: 48 }}>
                                {review.postedBy.fullName.charAt(0).toUpperCase()}
                            </Avatar>

                            <Box sx={{ flexGrow: 1 }}>
                               <Box sx={{display:"flex"}}>
                                <Typography variant="subtitle1" fontWeight={600}>
                                    {review.postedBy.fullName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" >
                                    {review.companyName}
                                </Typography>
                                </Box>
                                <Rating value={review.rating} readOnly size="small" sx={{ mb: 1 }} />
                                <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                                    "{review.text}"
                                </Typography>

                                <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                                    <IconButton size="small">
                                        <ThumbUpAltOutlinedIcon fontSize="small" />
                                    </IconButton>
                                    <Typography variant="caption" color="text.secondary">
                                        Helpful
                                    </Typography>
                                    
                                </Stack>
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>
            ))}

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 5 }}>
                <Typography variant="h6" mb={2}>
                    Submit Your Review
                </Typography>

                <TextField
                    label="Company Name"
                    name="companyName"
                    value={newReview.companyName}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />

                <Box sx={{ mt: 2, mb: 2 }}>
                    <Rating
                        name="rating"
                        value={newReview.rating}
                        onChange={(e, newValue) =>
                            setNewReview((prev) => ({ ...prev, rating: newValue }))
                        }
                        size="large"
                    />
                </Box>

                <TextField
                    label="Your Review"
                    name="text"
                    value={newReview.text}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                    required
                />

                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        mt: 3,
                        px: 4,
                        py: 1,
                        borderRadius: 2,
                        backgroundColor: deepPurple[500],
                        '&:hover': {
                            backgroundColor: deepPurple[700],
                        },
                    }}
                >
                    Submit Review
                </Button>
            </Box>
        </Box>
    );
};

export default CompanyReviews;
