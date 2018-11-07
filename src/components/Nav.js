import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import firebase from 'firebase';
import {withRouter} from 'react-router';

class Nav extends Component {

    constructor(props){
        super(props);

        this.state = {
            email: null
        };

        firebase.auth().onAuthStateChanged(user => {
            if(user){
                this.setState({email: user.email});
            }
        });
    }

    onLogout = () => {
        firebase.auth().signOut();
        this.props.history.push('login');
    }

    render() {
        const { email } = this.state;
        return (
            <nav className="navbar navbar-inverse">
                <div className="navbar-header">
                    <Link to="/" className="navbar-brand">Miniflix</Link>
                </div>
                <ul className="nav navbar-nav">
                    <li>
                        <Link to="/" >All Videos</Link>
                    </li>
                </ul>
                { !email &&
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <Link to="login">Log In</Link>
                        </li>
                        <li>
                            <Link to="register">Register</Link>
                        </li>
                    </ul>
                }
                { email &&
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <Link to="/upload">Upload Video</Link>
                        </li>
                        <li>
                            <a href="">{email}</a>
                        </li>
                        <li>
                            <a onClick={this.onLogout}>Logout</a>
                        </li>
                    </ul>
                }
            </nav>
        );
    }
}

export default withRouter(Nav);