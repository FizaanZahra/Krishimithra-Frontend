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
    <Box sx={{ overflowX: 'auto', borderRadius: '8px', boxShadow: 2 }}>
      <Table sx={{ minWidth: 650, border: '1px solid #ccc' }}>
        <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
          <TableRow>
            <TableCell align="center"><strong>Name</strong></TableCell>
            <TableCell align="center"><strong>Contact</strong></TableCell>
            <TableCell align="center"><strong>Tools</strong></TableCell>
            <TableCell align="center"><strong>Place</strong></TableCell>
            <TableCell align="center"><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item._id}>
              <TableCell align="center">{item.name}</TableCell>
              <TableCell align="center">{item.contact}</TableCell>
              <TableCell align="center">{item.tools}</TableCell>
              <TableCell align="center">{item.place}</TableCell>
              <TableCell align="center">
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(item._id)}
                  style={{ marginRight: 1 }}
                >
                  DELETE
                </Button>&nbsp;
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
    </Box>
  );
};

export default Viewprod;
