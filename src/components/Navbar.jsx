import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router';
import RealEstateAgentIcon from '@mui/icons-material/RealEstateAgent';

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" className='bg-success'>
        <Toolbar>
          <RealEstateAgentIcon fontSize='large'/>       
          <Typography variant="h6" component="div" style={{marginLeft : "5px"}} sx={{ flexGrow: 1 }}>
            Loan Page
          </Typography>
          <Link  className='btn btn-sm btn-light' style={{marginRight : "10px"}} to="/signUp"><Button>Sign Up</Button></Link>
          <Link className='btn btn-sm btn-light' to="/login"><Button>Login</Button></Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
