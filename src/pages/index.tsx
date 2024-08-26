import React from 'react';
import { Redirect } from 'react-router-dom';

function Home() {
  // This makes the redirect happen immediately when the component renders
  return <Redirect to="/docs/home/welcome" />;
}

export default Home;
