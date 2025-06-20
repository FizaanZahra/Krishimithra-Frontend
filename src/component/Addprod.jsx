import { Button, TextField, Typography } from '@mui/material'
import React from 'react'

const Addprod = () => {
  return (
   <div>
      <br />
      <Typography variant='h3' color='black'>Details</Typography>
      <br />
     <TextField id="outlined-basic" label="Name of holder" variant="outlined" />
     <br /><br />
     <TextField id="outlined-basic" label="Contact Number" variant="outlined"/>
     <br /><br />
     <TextField id="outlined-basic" label="Tools Available" variant="outlined"/>
     <br /><br />
     <TextField id="outlined-basic" label="Place" variant="outlined"/>
     <br /><br />
     <Button variant='contained' color='success' >Submit</Button>
    </div>
  )
}

export default Addprod
