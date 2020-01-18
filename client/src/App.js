import React from 'react';
import Container from '@material-ui/core/Container';
import SignUp from './components/SignUp'
import './App.css';

function App() {
  return (
    <div className="App">
      <Container maxWidth="sm">
        Share your itinerary with the people you travel with. Travel with ease. 
      </Container>
      <SignUp />
    </div>
  );
}

export default App;