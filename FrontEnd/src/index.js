import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.scss';
import App from './components/app';
import { ScrollContext } from 'react-router-scroll-4';

// Components
import Dashboard from './components/dashboard';

import Login from './components/auth/login';
import ListAlumno from './components/Customer/list';
import RegisterCustomer from './components/Customer/register';
import Update_Customer from './components/Customer/update';


                                                                                                                                      


class Root extends Component {
    render() {
        return (
            <BrowserRouter basename={'/'}>
                <ScrollContext>
                    <Switch>
                    <Route exact path={`${process.env.PUBLIC_URL}/`} component={Login} />
                        <Route exact path={`${process.env.PUBLIC_URL}/auth/login`} component={Login} />

                        <App>
                            <Route path={`${process.env.PUBLIC_URL}/dashboard`} component={Dashboard} />
                            <Route path={`${process.env.PUBLIC_URL}/Customer/list`} component={ListAlumno} />
                            <Route path={`${process.env.PUBLIC_URL}/Customer/register`} component={RegisterCustomer} />
                            <Route path={`${process.env.PUBLIC_URL}/Customer/update`} component={Update_Customer} />
                     
                           
                        </App>
                    </Switch>
                </ScrollContext>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<Root />, document.getElementById('root'));


