import React from 'react';
import {Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Upload from './pages/Upload';

const BaseRouter = () => {
    return (
        <div className="container">
             <Switch>
                 <Route exact path='/' component={Home} />
                 <Route exact path='/register' component={Register} />
                 <Route exact path='/login' component={Login} />
                 <Route exact path='/upload' component={Upload} />
             </Switch>
        </div>
    )
}

export default BaseRouter;