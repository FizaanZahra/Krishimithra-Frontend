import React, { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  Paper,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) {
      navigate('/l'); // Not logged in → redirect to login
    } else {
      setUser(JSON.parse(stored));
      setLoading(false);
    }
  }, [navigate]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    localStorage.setItem('user', JSON.stringify(user));
    setEditMode(false);
  };

  if (loading) return <CircularProgress sx={{ mt: 5 }} />;

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>

        <TextField
          fullWidth
          label="Name"
          name="name"
          value={user?.name || ''}
          onChange={handleChange}
          disabled={!editMode}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={user?.email || ''}
          onChange={handleChange}
          disabled={!editMode}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Place"
          name="place"
          value={user?.place || ''}
          onChange={handleChange}
          disabled={!editMode}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Contact"
          name="contact"
          value={user?.contact || ''}
          onChange={handleChange}
          disabled={!editMode}
          margin="normal"
        />

        <Box mt={3} textAlign="center">
          {editMode ? (
            <>
              <Button variant="contained" onClick={handleUpdate} sx={{ mr: 2 }}>
                Save
              </Button>
              <Button variant="outlined" onClick={() => setEditMode(false)}>
                Cancel
              </Button>
            </>
          ) : (
            <Button variant="contained" onClick={() => setEditMode(true)}>
              Edit Profile
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile;

