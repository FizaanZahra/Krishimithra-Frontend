import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await axios.get('http://localhost:5000/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (err) {
        console.error('Error fetching profile', err);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put('http://localhost:5000/api/profile', profile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data);
      setEditing(false);
      alert('Profile updated!');
    } catch (err) {
      console.error('Update failed', err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your profile?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete('http://localhost:5000/api/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      alert('Profile deleted');
      navigate('/l');
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  if (!profile) return <Typography>Loading...</Typography>;

  return (
    <Paper sx={{ maxWidth: 500, mx: 'auto', mt: 8, p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Your Profile
      </Typography>

      <TextField
        label="Name"
        value={profile.name}
        fullWidth
        margin="normal"
        disabled={!editing}
        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
      />
      <TextField
        label="Email"
        value={profile.email}
        fullWidth
        margin="normal"
        disabled={!editing}
        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
      />
      <TextField
        label="Contact"
        value={profile.contact}
        fullWidth
        margin="normal"
        disabled={!editing}
        onChange={(e) => setProfile({ ...profile, contact: e.target.value })}
      />
      <TextField
        label="Place"
        value={profile.place}
        fullWidth
        margin="normal"
        disabled={!editing}
        onChange={(e) => setProfile({ ...profile, place: e.target.value })}
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        {editing ? (
          <Button variant="contained" onClick={handleUpdate}>Save</Button>
        ) : (
          <Button variant="outlined" onClick={() => setEditing(true)}>Edit</Button>
        )}
        <Button color="error" onClick={handleDelete}>Delete Profile</Button>
      </Box>
    </Paper>
  );
};

export default Profile;



