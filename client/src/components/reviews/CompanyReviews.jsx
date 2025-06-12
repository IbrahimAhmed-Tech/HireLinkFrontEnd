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
} from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import toast from "react-hot-toast";
import axios from 'axios';

const CompanyReviews = () => {
    const token = localStorage.getItem('token'); // or however you're storing it
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
        if (!newReview.companyName || !newReview.rating || !newReview.text)
        {
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
            console.log("response.data",response.data);
            if (response.data.status === 'success') {         
            toast.success("Review posted successfully");
            setNewReview({
                companyName: '',
                rating: 0,
                text: '',
            });
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
            console.log("Fetched Reviews:-------", data);


            
            setReviews(data.reviews || []);
        } catch (error) {
            console.error("Failed to fetch jobs:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchReviews();
    }, []);
    return (
        <Box sx={{ maxWidth: 700, mx: 'auto', mt: 4, mb:4, px: 2 }}>
            <Typography variant="h4" fontWeight={600} mb={3}>
                Company Reviews
            </Typography>

            {reviews.map((review) => (
                <Card key={review._id} sx={{ mb: 2 }}>
                    <CardContent>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar sx={{ bgcolor: deepPurple[500] }}>
                                {review.postedBy.fullName.charAt(0).toUpperCase()}
                            </Avatar>
                            <Box sx={{display:"flex", flexDirection:"column"}}>
                                <Typography >{review.postedBy.fullName}</Typography>
                                <Typography   fontWeight={600}>
                                    {review.companyName}
                                </Typography>
                                <Rating value={review.rating} readOnly size="small" sx={{ mt: 0.5 }} />
                                <Typography variant="body2" mt={1}>
                                    {review.text}
                                </Typography>
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>
            ))}



            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
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

                <Rating
                    name="rating"
                    value={newReview.rating}
                    onChange={(e, newValue) =>
                        setNewReview((prev) => ({ ...prev, rating: newValue }))
                    }
                    size="large"
                />

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

                <Button type="submit" variant="contained" color="secondary"
                 >
                    Submit Review
                </Button>
            </Box>
        </Box>
    );
};

export default CompanyReviews;
