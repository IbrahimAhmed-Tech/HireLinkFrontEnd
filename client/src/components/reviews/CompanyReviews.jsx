import React, { useState } from 'react';
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

const CompanyReviews = () => {
    const [reviews, setReviews] = useState([
        {
            id: 1,
            name: 'John Doe',
            rating: 4,
            comment: 'Great work environment!',
        },
        {
            id: 2,
            name: 'Jane Smith',
            rating: 5,
            comment: 'Amazing team and leadership.',
        },
    ]);

    const [newReview, setNewReview] = useState({
        name: '',
        rating: 0,
        comment: '',
    });

    const handleChange = (e) => {
        setNewReview((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newReview.name || !newReview.rating || !newReview.comment) return;

        setReviews([
            ...reviews,
            { ...newReview, id: Date.now() },
        ]);

        setNewReview({ name: '', rating: 0, comment: '' });
    };

    return (
        <Box sx={{ maxWidth: 700, mx: 'auto', mt: 4, px: 2 }}>
            <Typography variant="h4" fontWeight={600} mb={3}>
                Company Reviews
            </Typography>

            {reviews.map((review) => (
                <Card key={review.id} sx={{ mb: 2 }}>
                    <CardContent>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar sx={{ bgcolor: deepPurple[500] }}>
                                {review.name.charAt(0).toUpperCase()}
                            </Avatar>
                            <Box>
                                <Typography fontWeight={600}>{review.name}</Typography>
                                <Rating value={review.rating} readOnly size="small" />
                                <Typography variant="body2" mt={1}>
                                    {review.comment}
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
                    label="Your Name"
                    name="name"
                    value={newReview.name}
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
                    name="comment"
                    value={newReview.comment}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                    required
                />

                <Button type="submit" variant="contained" color="primary">
                    Submit Review
                </Button>
            </Box>
        </Box>
    );
};

export default CompanyReviews;
