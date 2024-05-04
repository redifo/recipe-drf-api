import React from 'react';
import { Container } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import styles from './App.module.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import RecipeCreateForm from './pages/recipes/RecipeCreateForm';
import RecipeGrid from './pages/recipes/RecipeGrid';
import RecipePage from './pages/recipes/RecipePage';
import RecipeEditForm from './pages/recipes/RecipeEditForm';

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container fluid className={styles.Main}>
        <Switch>
          <Route path="/" exact render={() => <h1>Welcome to the app!</h1>} />
          <Route path="/signin" exact render={() => <SignInForm />} />
          <Route path="/signup" exact render={() => <SignUpForm />} />
          <Route path="/profile" exact render={() => <h1>Your Profile</h1>} />
          <Route path="/recipes" exact render={() => <RecipeGrid />} />
          <Route path="/recipes/:id" exact render={() => <RecipePage />} />
          <Route path="/recipes/edit/:id" exact render={() => <RecipeEditForm />} />
          <Route path="/action" exact render={() => <h1>Perform an Action</h1>} />
          <Route path="/something" exact render={() => <h1>Something Else</h1>} />
          <Route path="/recipe/create" exact render={() => <RecipeCreateForm />} />
          {/* Fallback route for unmatched paths */}
          <Route render={() => <h1>404 Not Found</h1>} />
        </Switch>
      </Container>
      <Footer />
    </div>

  );
}

export default App;
