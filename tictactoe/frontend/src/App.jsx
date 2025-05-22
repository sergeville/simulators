import React from 'react';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const App = () => {
  return (
    <AppContainer>
      <h1>Tic Tac Toe Simulator</h1>
    </AppContainer>
  );
};

export default App;
