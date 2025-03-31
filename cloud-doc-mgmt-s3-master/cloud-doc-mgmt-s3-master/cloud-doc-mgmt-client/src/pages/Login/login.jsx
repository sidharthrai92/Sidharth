import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  handleLoginSubmit,
  loginUserCheck,
  handleRegisterSubmit,
} from '../../server/server';

const Login = () => {
  const [userLoginData, setUserLoginData] = useState({
    userEmail: '',
    userPassword: '',
    confirmPassword: '',
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const [ConfirmpasswordVisible, setConfirmPasswordVisible] = useState(false);

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!ConfirmpasswordVisible);
  };
  const [spinner, setSpinner] = useState('invisible');
  const handleLoginChange = (e) => {
    const { value, name } = e.target;
    setUserLoginData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const [loginStatusCheck, setLoginStatusCheck] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const loginStatus = await loginUserCheck(); 
      if (loginStatus) window.location.href = '/dashboard';
    };
    fetchData();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginStatusCheck) {
      if (userLoginData.confirmPassword !== userLoginData.userPassword) {
        toast.error('Passwords do not match.');
        return;
      }
      handleRegisterSubmit(
        e,
        userLoginData,
        setUserLoginData,
        setSpinner,
        setLoginStatusCheck
      );
    } else {
      handleLoginSubmit(e, userLoginData, setUserLoginData, setSpinner);
    }
  };

  useEffect(() => {
    setUserLoginData({
      userEmail: '',
      userPassword: '',
      confirmPassword: '',
    });
  }, [loginStatusCheck]);
  return (
    <div className="login-container">
      <ToastContainer />
      <div className="login-box">
        <div className="login-left">
          <h1 className="login-title">
            {loginStatusCheck ? 'Register Here' : 'Sign In'}
          </h1>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <input
              name="userEmail"
              type="email"
              value={userLoginData.userEmail}
              placeholder="Enter Email"
              onChange={handleLoginChange}
              required
            />

            <div style={{ width: '100%', position: 'relative' }}>
              <input
                name="userPassword"
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Enter Password"
                required
                style={{ width: '100%' }}
                value={userLoginData.userPassword}
                onChange={handleLoginChange}
              />
              <span
                className="material-icons"
                onClick={togglePasswordVisibility}
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  paddingTop: '0.7vh',
                  paddingRight: '0.8vh',
                }}
              >
                {passwordVisible ? 'visibility' : 'visibility_off'}
              </span>
            </div>
            {loginStatusCheck && (
              <div style={{ width: '100%', position: 'relative' }}>
                <input
                  name="confirmPassword"
                  type={ConfirmpasswordVisible ? 'text' : 'password'}
                  value={userLoginData.confirmPassword}
                  placeholder="Enter Confirm Password"
                  onChange={handleLoginChange}
                  required
                  style={{ width: '100%' }}
                />
                <span
                  className="material-icons"
                  onClick={toggleConfirmPasswordVisibility}
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    paddingTop: '0.7vh',
                    paddingRight: '0.8vh',
                  }}
                >
                  {ConfirmpasswordVisible ? 'visibility' : 'visibility_off'}
                </span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span
                onClick={() => {
                  setLoginStatusCheck(!loginStatusCheck);
                }}
                className="forgot-password"
              >
                {!loginStatusCheck ? 'New Register' : 'Login'}
              </span>
            </div>
            {spinner === 'invisible' && (
              <button
                type="submit"
                className="login-button"
                style={{ marginRight: '2vh', margin: 'auto' }}
              >
                {!loginStatusCheck ? 'SIGN IN' : 'Register Now'}
              </button>
            )}
            {spinner !== 'invisible' && (
              <div
                className={spinner}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignContent: 'center',
                  marginTop: '2vh',
                }}
              >
                <div
                  className="spinner"
                  style={{
                    border: '4px solid #624FC2',
                    borderRightColor: 'white',
                  }}
                />
              </div>
            )}
          </form>
        </div>
        <div className="login-right">
          <h2 className="welcome-title">
            CloudDocs: AWS S3 Document Management System
          </h2>
          <p>
            Welcome to the demo of CloudDocs. Use the provided credentials below
            to explore the application's features, including secure document
            upload, storage, and management with AWS S3 integration.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;