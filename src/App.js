import React from 'react';
import logo from './logo.svg';
import './App.css';
import CustomerScreen from './customers/CustomerScreen';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCustomerScreen: false,
    };
  }

  componentDidMount() {
    // Set a timer to change the state after 3 seconds
    this.timer = setTimeout(() => {
      this.setState({ showCustomerScreen: true });
    }, 3000);
  }

  componentWillUnmount() {
    // Clear the timer
    clearTimeout(this.timer);
  }

  render() {
    if (this.state.showCustomerScreen) {
      // Show the CustomerScreen
      return <CustomerScreen />;
    }

    // Show the main screen
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>Customer Pulse Management</p>
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
}

export default App;
