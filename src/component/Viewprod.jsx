import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Typography, Box, Card, CardContent, CardMedia, Grid } from '@mui/material';

const Viewprod = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/view');
      setData(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete/${id}`);
      fetchDetails(); // Refresh data after delete
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleEdit = (item) => {
    alert(`Edit clicked for: ${item.name}`); // Add real navigation or modal later
  };

  return (
    <Box sx={{ padding: 4, background: 'rgba(255,255,255,0.85)', borderRadius: 2, boxShadow: 3, maxWidth: '95vw', margin: 'auto', mt: 6 }}>
      <Typography variant="h4" gutterBottom>All Uploaded Products</Typography>
      <Grid container spacing={3}>
        {data.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
            <Card sx={{ maxWidth: 345, margin: 'auto', boxShadow: 3 }}>
              {item.image && (
                <CardMedia
                  component="img"
                  height="180"
                  image={`http://localhost:5000/uploads/${item.image}`}
                  alt={item.name}
                />
              )}
              <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold', mb: 1, mt: 1, textAlign: 'center' }}>
                {item.tools}
              </Typography>
              <CardContent>
                <Typography gutterBottom variant="subtitle2" component="div" sx={{ fontWeight: 'bold', color: '#333', textAlign: 'center' }}>
                  Name of holder: {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <b>Contact:</b> {item.contact}<br />
                  <b>Place:</b> {item.place}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(item._id)}
                    style={{ marginRight: 8 }}
                  >
                    DELETE
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleEdit(item)}
                  >
                    EDIT
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Viewprod;
