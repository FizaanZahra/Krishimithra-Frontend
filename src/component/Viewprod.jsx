import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table, TableHead, TableRow, TableCell, TableBody, Typography, Box } from '@mui/material';

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
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>All Uploaded Products</Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Contact</strong></TableCell>
            <TableCell><strong>Tools</strong></TableCell>
            <TableCell><strong>Place</strong></TableCell>
            <TableCell><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.contact}</TableCell>
              <TableCell>{item.tools}</TableCell>
              <TableCell>{item.place}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(item._id)}
                  style={{ marginRight: '10px' }}
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default Viewprod;
