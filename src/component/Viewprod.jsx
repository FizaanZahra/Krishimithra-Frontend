import { Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'

const Viewprod = () => {
  return (
    <div>
      <TableContainer>
        <Table>
            <TableHead>
            <TableRow>
                <TableCell>Name of Holder</TableCell>
                <TableCell>Contact Number</TableCell>
                <TableCell>Tools Available</TableCell>
                <TableCell>Place/Location</TableCell>
            </TableRow>
            </TableHead>
            </Table>
       </TableContainer>
      
             
    </div>
  )
}

export default Viewprod
