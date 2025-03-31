import Axios from 'axios';
import {
  ShowErrorMessage,
  ShowSuccessMessage,
  ShowErrorTaskMessage,
} from '../utils/logMessge';

const API_URL = process.env.REACT_APP_API_URL;

// Function To Register
export const handleRegisterSubmit = async (
  e,
  userLoginData,
  setUserLoginData,
  setSpinner
) => {
  e.preventDefault();
  setSpinner('block');
  try {
    const response = await Axios.post(
      `${API_URL}/auth/register`,
      userLoginData
    );
    ShowSuccessMessage(response.data.message);
  } catch (error) {
    ShowErrorMessage(error);
  } finally {
    setSpinner('invisible');
    setUserLoginData({
      userEmail: '',
      userPassword: '',
      confirmPassword: '',
    });
  }
};

// Function To Login
export const handleLoginSubmit = async (
  e,
  userLoginData,
  setUserLoginData,
  setSpinner
) => {
  e.preventDefault();
  setSpinner('block');
  try {
    const response = await Axios.post(`${API_URL}/auth/login`, userLoginData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      ShowSuccessMessage('Login Successfully');
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 500);
    }
  } catch (error) {
    ShowErrorMessage(error);
  } finally {
    setSpinner('invisible');
    setUserLoginData({
      userEmail: '',
      userPassword: '',
    });
  }
};

// Function To Logout
export const handleLogout = async () => {
  localStorage.removeItem('token');
  window.location.href = '/';
};

// Function To Verify User
export const verifyUser = async (setAuth, setUserEmail) => {
  try {
    const option = {
      method: 'get',
      url: `${API_URL}/auth/verify`,
      headers: {
        authorization: localStorage.getItem('token'),
      },
    };
    const res = await Axios(option);
    setAuth(true);
    setUserEmail(res.data.userEmail);
  } catch (error) {
    ShowErrorMessage(error);
  }
};
//Function To Login Check
export const loginUserCheck = async () => {
  try {
    const option = {
      method: 'get',
      url: `${API_URL}/auth/user_login`,
      headers: {
        authorization: localStorage.getItem('token'),
      },
    };
    await Axios(option);
    return true;
  } catch (error) {
    return false;
  }
};

//Function To GetUser Data
export const getUserData = async (setUserData, userEmail) => {
  try {
    const res = await Axios.post(
      `${API_URL}/auth/user_data`,
      { userEmail },
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('token'),
        },
      }
    );
    setUserData(res.data.documents);
  } catch (error) {
    ShowErrorMessage(error);
  }
};

// Function To Upload Document
export const handleDocumentSubmit = async (
  e,
  file,
  name,
  docType,
  description,
  setLoading,
  userEmail,
  clearData
) => {
  e.preventDefault();
  setLoading(true);

  if (!file) {
    setLoading(false);
    ShowErrorTaskMessage('Please select a file to upload.');
    return;
  }

  const maxSize = 50 * 1024 * 1024;
  if (file.size > maxSize) {
    setLoading(false);
    ShowErrorTaskMessage(
      'File size exceeds the 50 MB limit. Please select a smaller file.'
    );
    return;
  }

  try {
    // Create FormData to send the file and other details
    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentName', name);
    formData.append('userEmail', userEmail);
    formData.append('documentType', docType);
    formData.append('documentDescription', description);

    const response = await Axios.post(
      `${API_URL}/auth/upload_document`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: localStorage.getItem('token'),
        },
      }
    );
    ShowSuccessMessage(response.data.message);
    clearData();
  } catch (error) {
    ShowErrorMessage(error);
  } finally {
    setLoading(false);
  }
};

// Function To Delete Document
export const handleDocumentDelete = async (
  e,
  editFormData,
  setLoading,
  handleClose,
  userEmail,
  setLoadingMessage
) => {
  e.preventDefault();
  setLoading(true);
  setLoadingMessage('Please Wait Document Is Delete for CloudDocs');

  if (!editFormData.documentName) {
    setLoading(false);
    ShowErrorTaskMessage('Please Enter Document Name.');
    return;
  }

  try {
    const response = await Axios.post(
      `${API_URL}/auth/delete_document`,
      { userEmail, documentName: editFormData.documentName },
      {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      }
    );
    ShowSuccessMessage(response.data.message);
    setTimeout(() => {
      handleClose();
    },1000);
  } catch (error) {
    ShowErrorMessage(error);
  } finally {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }
};

// Function To Update Document
export const handleDocumentUpdate = async (
  e,
  editFormData,
  setLoading,
  handleClose,
  docType,
  description,
  userEmail,
  setLoadingMessage
) => {
  e.preventDefault();
  setLoading(true);
  setLoadingMessage('Please Wait Document Is Updating for CloudDocs');

  if (!docType || !description) {
    setLoading(false);
    ShowErrorTaskMessage('Please Enter Document Type and Document Description');
    return;
  }

  try {
    const response = await Axios.post(
      `${API_URL}/auth/update_document`,
      {
        userEmail,
        documentType: docType,
        documentDescription: description,
        documentName: editFormData.documentName,
      },
      {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      }
    );

    ShowSuccessMessage(response.message);
    setTimeout(() => {
      handleClose();
    }, 1500);
  } catch (error) {
    ShowErrorMessage(error);
  } finally {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }
};
