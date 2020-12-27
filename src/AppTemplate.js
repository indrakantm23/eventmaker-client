import React from 'react';
import lodable from '@loadable/component';

import { Switch, Route } from './routing/Routing';
import * as Routes from './routing/routes';


const AsyncAbout = lodable(() => import('./components/About'))
const AsyncContact = lodable(() => import('./components/Contact'))
const AsyncDashboard = lodable(() => import('./components/Dashboard'))
const AsyncCreateAnEvent = lodable(() => import('./components/CreateEvent'))

const AppTemplate = () => (
    <React.Fragment>
        <Switch>
            <Route exact path={Routes.Home} component={AsyncDashboard} />
            <Route exact path={Routes.About} component={AsyncAbout} />
            <Route exact path={Routes.Contact} component={AsyncContact} />
            <Route exact path={Routes.CreateEvent} component={AsyncCreateAnEvent} />
        </Switch>
    </React.Fragment>
);

export default AppTemplate;