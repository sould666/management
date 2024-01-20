import React from 'react';
import logo from './logo.svg';
import './App.css';
import CustomerScreen from './customers/CustomerScreen';
import backgroundImage from './customer pulse tracker background.webp';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
      isLoggedIn: false,
      showRegisterForm: false,
      showCustomerScreen: false,
    };
    //Bind methods
    this.handleLogin = this.handleLogin.bind(this);
    this.toggleRegisterForm = this.toggleRegisterForm.bind(this);
  }

  componentDidMount() {
    // Set a timer to change the state after 3 seconds
    this.timer = setTimeout(() => {
      this.setState({showCustomerScreen: true});
    }, 3000);
  }

  componentWillUnmount() {
    // Clear the timer
    clearTimeout(this.timer);
  }

  toggleRegisterForm() {
    this.setState(prevState => ({
      showRegisterForm: !prevState.showRegisterForm
    }));
  }

  handleLogin(event) {
    event.preventDefault();
    const {email, password} = this.state;

    fetch('/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password}),
    })
        .then(response => response.text())
        .then(result => {
          if (result === 'Logged in successfully') {
            this.setState({isLoggedIn: true});
          } else {
            console.error('Login failed:', result);
            // Optionally, add error handling here
          }
        })
        .catch(error => console.error('Error:', error));
  }

  handleRegister = (event) => {
    event.preventDefault();
    const { username, email, password } = this.state;

    // Reset validation errors
    this.setState({
      usernameError: '',
      emailError: '',
      passwordError: '',
      registerError: '',
      registerSuccess: ''
    });

    // Validate input
    let isValid = true;
    if (!username) {
      this.setState({ usernameError: 'Username is required' });
      isValid = false;
    }
    if (!email) {
      this.setState({ emailError: 'Email is required' });
      isValid = false;
    }
    if (!password) {
      this.setState({ passwordError: 'Password is required' });
      isValid = false;
    }

    if (!isValid) {
      return; // Stop the function if validation fails
    }

    // Proceed with fetch request if validation is successful
    fetch('/register.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    })
        .then(response => response.text())
        .then(result => {
          if (result === 'User registered successfully') {
            // Set a state variable to show a success message
            this.setState({
              registerSuccess: result,
              registerError: '',
              username: '', // Resetting the form fields
              email: '',
              password:'',
              usernameError: '',
              emailError: '',
              passwordError: ''
            });
            // Validate input
            let isValid = true;
            if (!username) {
              this.setState({ usernameError: 'Username is required' });
              isValid = false;
            }
            if (!email) {
              this.setState({ emailError: 'Email is required' });
              isValid = false;
            }
            if (!password) {
              this.setState({ passwordError: 'Password is required' });
              isValid = false;
            }

            if (!isValid) {
              return; // Stop the function if validation fails
            }
            // Optional: Redirect to the login page or auto-login the user
          } else {
            // Set a state variable to show the error message
            this.setState({
              registerError: result,
              registerSuccess: '' // Clear any previous success messages
            });
          }
        })
        .catch(error => {
          console.error('Registration error:', error);
          this.setState({ registerError: 'An error occurred during registration.' });
        });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  // ... previous code ...

  render() {
    // Define background style
    const backgroundStyle = {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
    };

    if (this.state.isLoggedIn) {
      return <CustomerScreen/>;
    }

    if (this.state.showRegisterForm) {
      return (
          <div className="App" style={backgroundStyle}>
            <header className="App-header">
              {this.state.registerSuccess ? (
                  <div>
                    <div className="success-message">{this.state.registerSuccess}</div>
                    <button onClick={this.toggleRegisterForm}>Back to Login</button>
                  </div>
              ) : (
                  <div>
                    <p>Register for Customer Pulse Tracker</p>
                    <form onSubmit={this.handleRegister}>
                      <input
                          type="text"
                          name="username"
                          className={this.state.usernameError ? 'input-error' : ''}
                          placeholder="Username"
                          value={this.state.username}
                          onChange={this.handleInputChange}
                      />
                      {this.state.usernameError && <div className="error-message">{this.state.usernameError}</div>}

                      <input
                          type="email"
                          name="email"
                          className={this.state.emailError ? 'input-error' : ''}
                          placeholder="Email"
                          value={this.state.email}
                          onChange={this.handleInputChange}
                      />
                      {this.state.emailError && <div className="error-message">{this.state.emailError}</div>}

                      <input
                          type="password"
                          name="password"
                          className={this.state.passwordError ? 'input-error' : ''}
                          placeholder="Password"
                          value={this.state.password}
                          onChange={this.handleInputChange}
                      />
                      {this.state.passwordError && <div className="error-message">{this.state.passwordError}</div>}

                      <button type="submit">Register</button>
                    </form>
                    {this.state.registerError && <div className="error-message">{this.state.registerError}</div>}
                    <button onClick={this.toggleRegisterForm}>Back to Login</button>
                  </div>
              )}
            </header>
          </div>
      );
    }

    // Render the login form
    return (
        <div className="App" style={backgroundStyle}>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>Login to Customer Pulse Tracker</p>
            <form onSubmit={this.handleLogin}>
              <input
                  type="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={e => this.setState({ email: e.target.value })}
              />
              <input
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={e => this.setState({ password: e.target.value })}
              />
              <button className={"login-submit-button"} type="submit">Login</button>
            </form>
            <button onClick={this.toggleRegisterForm}>Don't have an account? Create one.</button>
          </header>
        </div>
    );
  }
}
export default App;