import React from 'react';
import { Container } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import styles from './App.module.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import SignUpForm from './pages/auth/SignUpForm';

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route path="/" exact render={() => <h1>Welcome to the app!</h1>} />
          <Route path="/login" exact render={() => <h1>Sign in</h1>} />
          <Route path="/signup" exact render={() => <SignUpForm/>} />
          <Route path="/profile" exact render={() => <h1>Your Profile</h1>} />
          <Route path="/recipes" exact render={() => <h1>Recipes</h1>} />
          <Route path="/action" exact render={() => <h1>Perform an Action</h1>} />
          <Route path="/something" exact render={() => <h1>Something Else</h1>} />
          {/* Fallback route for unmatched paths */}
          <Route render={() => <h1>404 Not Found</h1>} />
        </Switch>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
