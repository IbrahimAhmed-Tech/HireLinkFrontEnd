import React from 'react';
import { Button, Typography, Container } from '@mui/material';
import './NotFound.scss';

const NotFound = () => {
    return (
        <Container className="not-found" maxWidth="sm">
            <Typography variant="h1" className="not-found__code">
                404
            </Typography>
            <Typography variant="h4" className="not-found__title">
                Page Not Found
            </Typography>
            <Typography variant="body1" className="not-found__message">
                Sorry, the page you are looking for does not exist.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                href="/"
                className="not-found__button"
            >
                Go Home
            </Button>
        </Container>
    );
};

export default NotFound;
