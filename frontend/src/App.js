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
import ProfilePage from './pages/profiles/ProfilePage';
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import Home from './pages/home/HomePage';

import NotFound from "./components/NotFound";
import FollowedProfiles from './pages/profiles/FollowedProfiles';

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container fluid className={styles.Main}>
          <Switch>
            <Route path="/" exact render={() => <Home />} />
            <Route path="/signin" exact render={() => <SignInForm />} />
            <Route path="/signup" exact render={() => <SignUpForm />} />
            
            <Route path="/recipes" exact render={() => <RecipeGrid />} />
            <Route path="/recipes/:id" exact render={() => <RecipePage />} />
            <Route path="/recipes/edit/:id" exact render={() => <RecipeEditForm />} />
            <Route path="/favorited" exact render={() => <h1>Perform an Action</h1>} />
            <Route path="/profiles/followed" exact render={() => <FollowedProfiles />} />
            <Route path="/recipe/create" exact render={() => <RecipeCreateForm />} />
            <Route path="/profiles/:id" exact render={() => <ProfilePage />} />
            <Route
            exact
            path="/profiles/:id/edit/username"
            render={() => <UsernameForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit/password"
            render={() => <UserPasswordForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit"
            render={() => <ProfileEditForm />}
          />
            {/* Fallback route for unmatched paths */}
            <Route render={() => <NotFound />} />
          </Switch>
      </Container>
      <Footer />
    </div>

  );
}

export default App;
