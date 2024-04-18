'use client'

import React from 'react';
import List from './components/List/Index';
import Typography from '@mui/material/Typography';

export default function Home() {
  return (
    <div className='container mx-auto' style={{ textAlign: 'center', padding: '0 15rem 0' }}>
      <Typography variant="h2" gutterBottom style={{padding: '0px', margin: '20px 0px'}}>
        My List
      </Typography>
      <List />
    </div>
  );
}
