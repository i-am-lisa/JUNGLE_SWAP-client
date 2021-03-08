import React from 'react';
import {Link} from 'react-router-dom'


function SignUp(props){

    return (
        <form onSubmit={props.onSignUp}>
            <div className="form-group">
                <label htmlFor="InputUsername">Username</label>
                <input type="text" className="form-control" id="InputUsername" name="username" />
            </div>
            <div className="form-group">
                <label htmlFor="InputEmail">Email address</label>
                <input type="email" className="form-control" id="InputEmail" name="email" />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label htmlFor="InputPassword">Password</label>
                <input name="password" type="password" className="form-control" id="InputPassword" />
            </div>
            {
                props.error ? (
                    <p style={{color: 'red'}}>{ props.error.errorMessage}</p>
                ) : null
            }
            <button type="submit" className="btn btn-primary">Submit</button>
            <p>Already have an account?</p>
            <Link to={'/signin'}>Sign in</Link>
        </form>
        
    )
}

export default SignUp