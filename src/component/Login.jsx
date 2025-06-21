import { TextField } from '@mui/material'
import React from 'react'
import Button from '@mui/material/Button';

const First = () => {
  return (
    <div>
       <h1>Welcome to KrishiMitra</h1> 
       <br />
       <TextField label='username' variant="outlined"/>
       <br /><br />
       <TextField label='password' variant="outlined"/>
       <br /><br />    
       <Button variant="contained" color='success'>Login</Button>
       <br /><br />
       <Button variant="text">OR</Button><br /><br />
       <Button variant="contained" color='Secondary'>Create an Account</Button>
       <br /><br />

       </div>
  )
}

export default First
