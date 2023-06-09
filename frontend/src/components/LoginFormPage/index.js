import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';
import { NavLink} from "react-router-dom";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const demoLogin = (e) => {
        e.preventDefault();
        return dispatch(sessionActions.login({ credential: 'demoman', password: 'password' }))
    }

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentErrors = {};
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }
        if (data?.errors) {
          data.errors.map(error => {
              return currentErrors['LoginError'] = error
        })
        setErrors(currentErrors);
      }
      });
  };

  return (
    <>
      <div className='logo_header'>
              <i className="fa-brands fa-spotify"></i>
              <h2>Jamify</h2>
          </div>
          <div className='login'>
              <form onSubmit={handleSubmit} className="forms" id="login_form">
                  <h2>Log In To Your Account</h2>
                  <div className='login-fields'>
                      <label>
                          Email address or Username
                          <input
                              type='text'
                              value={credential}
                              placeholder='Enter your email or username'
                              onChange={(e) => setCredential(e.target.value)}
                              required
                          />
                      </label>
                      <label>
                          Password
                          <input
                              type="password"
                              value={password}
                              placeholder='Enter your password'
                              onChange={(e) => setPassword(e.target.value)}
                              required
                          />
                      </label>
                  </div>
                  <p className='signup-errors'>{errors['LoginError']}</p>
                  <button type="submit">Log In</button>
                  <button onClick={demoLogin}>Demo Login</button>
                  
              </form>
              <div className='signup_link'>
                <span>Don't have an account? <NavLink to="/signup">Sign up for Jamify</NavLink></span>
            </div>
          </div>
      </>
    );
};

export default LoginFormPage;