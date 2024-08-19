import React from 'react';
import './App.css';
import Greeting from './components/Greeting';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>¡Bienvenido a mi aplicación React!</h1>
        <Greeting name="Pamela" />
        <p>
          ¡Estamos empezando a desarrollar algo genial!
        </p>
      </header>
    </div>
  );
}

export default App;
