import React, { useState, useEffect } from 'react';
import { verifyUser, handleLogout, getUserData } from '../../server/server';
import MyArtifacts from '../../components/Artifacts/artifacts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UploadDocument from '../../components/uploadDocument/uploadDocument';

const Dashboard = () => {
  const [active, setActive] = useState('myArtifacts');
  const [auth, setAuth] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await verifyUser(setAuth, setUserEmail);
    };
    fetchData();
  }, []);

  const fetchUserData = async () => {
    if (userEmail) await getUserData(setUserData, userEmail);
  };

  useEffect(() => {
    fetchUserData();
  }, [userEmail]);

  return (
    <>
      <ToastContainer />
      {auth ? (
        <div className="dashboard-container">
          <aside className="sidebar">
            <h3>CloudDocs</h3>
            <ul>
              <li
                className={active === 'myArtifacts' ? 'active' : ''}
                onClick={() => setActive('myArtifacts')}
              >
                <span className="material-symbols-outlined">folder_open</span>{' '}
                My Artifacts
              </li>
              <li
                className={active === 'uploadDocument' ? 'active' : ''}
                onClick={() => setActive('uploadDocument')}
              >
                <span className="material-symbols-outlined">upload_file</span>{' '}
                Upload Document
              </li>
              <li
                className={active === 'logout' ? 'active' : ''}
                onClick={() => {
                  setActive('logout');
                  handleLogout();
                }}
              >
                <span className="material-symbols-outlined">logout</span> Logout
              </li>
            </ul>
          </aside>
          <main className="content">
            {active === 'myArtifacts' ? (
              <div>
                {userData ? (
                  <MyArtifacts
                    userData={userData}
                    userEmail={userEmail}
                    setUserData={setUserData}
                    fetchUserData={fetchUserData}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '100vh',
                      display: 'flex',
                      padding: '5vh',
                      textAlign: 'center',
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <h3>
                      Please Wait For Some Time We are Getting User Data for S3
                      Cloud You ...
                    </h3>
                  </div>
                )}
              </div>
            ) : active === 'uploadDocument' ? (
              <UploadDocument userEmail={userEmail} />
            ) : (
              ''
            )}
          </main>
        </div>
      ) : (
        <div
          style={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            padding: '5vh',
            textAlign: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}
        >
          <h3>Please Wait For Some Time We are Authorizing You ...</h3>
        </div>
      )}
    </>
  );
};

export default Dashboard;
