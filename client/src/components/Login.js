import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
} from 'mdb-react-ui-kit';

function Login() {
    const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Login successful');
        navigate('/faculty-dashboard');
        // Redirect to the dashboard page
        // You can use React Router or other navigation methods here
        // For example, window.location.href = '/dashboard';
      } else {
        console.error('Login failed:', result.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <>
      <MDBRow center>
        
        <MDBCol size='8'>
          <MDBContainer fluid>
            <MDBRow>
              <MDBCol sm='6'>
                <div className='d-flex flex-row ps-5 pt-5'>
                  <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#709085' }} />
                  <span className="h1 fw-bold mb-0">STMS</span>
                </div>

                <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>
                  <h3 className="fw-normal mb-3 ps-5 pb-3" style={{ letterSpacing: '1px' }}>Log in</h3>
                  <MDBInput
                    wrapperClass='mb-4 mx-5 w-100'
                    label='User Name'
                    id='formControlLg'
                    type='user'
                    size="lg"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <MDBInput
                    wrapperClass='mb-4 mx-5 w-100'
                    label='Password'
                    id='formControlLg'
                    type='password'
                    size="lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <MDBInput
                    wrapperClass='mb-4 mx-5 w-100'
                    label='Role'
                    id='formControlLg'
                    type='Role'
                    size="lg"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <MDBBtn className="mb-4 px-5 mx-5 w-100" color='info' size='log' onClick={handleLogin}>
                    Login
                  </MDBBtn>
                  <p className="small mb-5 pb-lg-3 ms-5"><a className="text-muted" href="#!">Forgot password?</a></p>
                  <p className='ms-5'>Don't have an account? <a href="#!" className="link-info">Register here</a></p>
                </div>
              </MDBCol>

              <MDBCol sm='6' className='d-none d-sm-block px-0'>
                <img
                  src="https://cdni.iconscout.com/illustration/premium/thumb/sign-up-8044864-6430773.png"
                  alt="Login image"
                  className="w-100"
                  style={{ objectFit: 'cover', objectPosition: 'left' }}
                />
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </>
  );
}

export default Login;
