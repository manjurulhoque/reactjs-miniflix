import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';

class Login extends Component {

    state = {
        email: '',
        password: '',
        error: null
    };

    onSubmit = (e) => {
        e.preventDefault();

        const { email, password } = this.state;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(res => {
                this.props.history.push('/');
            })
            .catch(err => {
                console.log(err);
                this.setState({error: err.message});
            });
    };

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    render() {
        return (
            <div className="col-md-6 col-md-offset-2">
                <form className="form-horizontal" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <h2 className="class-h2">Login</h2>
                    </div>
                    {
                        this.state.error &&
                        <div className="form-group">
                            <div class="alert alert-danger">
                                <strong>Oops!</strong> { this.state.error }
                            </div>
                        </div>
                    }
                    <div className="form-group">
                        <label className="label-control">Email</label>
                        <input onChange={this.onChange} name="email" className="form-control" type="email"
                                placeholder="Enter email"/>
                    </div>
                    <div className="form-group">
                        <label className="label-control">Password</label>
                        <input onChange={this.onChange} name="password" className="form-control" type="password"
                                placeholder="Enter password"/>
                    </div>
                    <div className="form-group">
                        <input className="btn btn-primary" type="submit" value="Login"/>
                        or
                        <Link to="register" className="btn btn-success">Register</Link>
                    </div>

                </form>
            </div>
        )
    }
}

export default Login;