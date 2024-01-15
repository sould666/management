import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Customer Pulse Management
        </p>
        <a
          className="App-link"
          href="https://menagement.semsos.eu"
          target="_blank"
          rel="noopener noreferrer"
        >
          Main Page
        </a>
      </header>
    </div>
  );
}

export default App;
