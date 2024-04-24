// App.js

import React from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';

function App() {
    return (
        <div className="App">
          <h1>Conway's Game of Life</h1>
            <header className="App-header">
               <Outlet />
            </header>
        </div>
    );
}

export default App;
