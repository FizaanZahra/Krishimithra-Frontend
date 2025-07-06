import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Avatar } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login first');
        navigate('/l');
        return;
      }

      try {
        // First try to get from localStorage for faster loading
        const cachedUser = localStorage.getItem('user');
        if (cachedUser) {
          setProfile(JSON.parse(cachedUser));
        }

        // Then fetch fresh data from server
        const res = await axios.get('http://localhost:5000/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        setProfile(res.data);
        // Update localStorage with fresh data
        localStorage.setItem('user', JSON.stringify(res.data));
        setLoading(false);
      } catch (err) {
        console.error('Error fetching profile', err);
        setLoading(false);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          alert('Session expired. Please login again.');
          navigate('/l');
        }
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put('http://localhost:5000/api/profile', profile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data);
      // Update localStorage with new data
      localStorage.setItem('user', JSON.stringify(res.data));
      setEditing(false);
      alert('✅ Profile updated successfully!');
    } catch (err) {
      console.error('Update failed', err);
      alert('❌ Failed to update profile. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    alert('✅ Logged out successfully');
    navigate('/l');
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete('http://localhost:5000/api/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      alert('Profile deleted successfully');
      navigate('/l');
    } catch (err) {
      console.error('Delete failed', err);
      alert('❌ Failed to delete profile. Please try again.');
    }
  };

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
      <Typography variant="h6">Loading profile...</Typography>
    </Box>
  );

  if (!profile) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
      <Typography variant="h6" color="error">No profile data found</Typography>
    </Box>
  );

  return (
    <Paper sx={{ maxWidth: 600, mx: 'auto', mt: 8, p: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Avatar sx={{ width: 60, height: 60, mr: 2, bgcolor: 'primary.main' }}>
          {profile.avatar ? (
            <img src={`http://localhost:5000/uploads/${profile.avatar}`} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <PersonIcon sx={{ fontSize: 30 }} />
          )}
        </Avatar>
        <Typography variant="h4" fontWeight="bold">
          Your Profile
        </Typography>
      </Box>

      <TextField
        label="Username"
        value={profile.username || ''}
        fullWidth
        margin="normal"
        disabled={true}
        sx={{ '& .MuiInputBase-input.Mui-disabled': { WebkitTextFillColor: '#666' } }}
      />
      
      <TextField
        label="Name"
        value={profile.name || ''}
        fullWidth
        margin="normal"
        disabled={!editing}
        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
      />
      
      <TextField
        label="Email"
        value={profile.email || ''}
        fullWidth
        margin="normal"
        disabled={!editing}
        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
      />
      
      <TextField
        label="Contact"
        value={profile.contact || ''}
        fullWidth
        margin="normal"
        disabled={!editing}
        onChange={(e) => setProfile({ ...profile, contact: e.target.value })}
      />
      
      <TextField
        label="Place"
        value={profile.place || ''}
        fullWidth
        margin="normal"
        disabled={!editing}
        onChange={(e) => setProfile({ ...profile, place: e.target.value })}
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        {editing ? (
          <>
            <Button variant="contained" color="primary" onClick={handleUpdate}>
              Save Changes
            </Button>
            <Button variant="outlined" onClick={() => setEditing(false)}>
              Cancel
            </Button>
          </>
        ) : (
          <Button variant="outlined" color="primary" onClick={() => setEditing(true)}>
            Edit Profile
          </Button>
        )}
        <Button color="secondary" variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
        <Button color="error" variant="outlined" onClick={handleDelete}>
          Delete Profile
        </Button>
      </Box>
    </Paper>
  );
};

export default Profile;



