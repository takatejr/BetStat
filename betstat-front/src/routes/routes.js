import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import WelcomePage from '../components/WelcomePage';
import SkillsPage from '../components/SkillsPage';
import ProjectsPage from '../components/ProjectsPage';
import ContactPage from '../components/ContactPage';
import NotFoundPage from '../components/NotFoundPage';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path='/' component={WelcomePage} exact={true} />
        <Route path='/skills' component={SkillsPage} />
        <Route path='/projects' component={ProjectsPage} />
        <Route path='/contact' component={ContactPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
