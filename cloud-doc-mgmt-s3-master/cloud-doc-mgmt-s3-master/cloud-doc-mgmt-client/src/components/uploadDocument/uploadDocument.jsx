import { useState, useRef } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import docTypes from '../../config/docTypes';
import { handleDocumentSubmit } from '../../server/server';
import Modal from '../Modal/modal';

const UploadDocument = ({ userEmail }) => {
  const [file, setFile] = useState(null);
  const [name, setname] = useState('');
  const [docType, setDocType] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const allowedExtensions = docTypes.map((type) => type.ext).join(',');

  const clearData = () => {
    setFile(null);
    fileInputRef.current.value = '';
    setname('');
    setDocType('');
    setDescription('');
    window.location.reload();
  };
  return (
    <div className="upload-document-container">
      <ToastContainer />
      <header className="upload-document-header">
        <h1>Upload Document</h1>
      </header>
      <form
        className="upload-document-form"
        onSubmit={(e) =>
          handleDocumentSubmit(
            e,
            file,
            name,
            docType,
            description,
            setLoading,
            userEmail,
            clearData
          )
        }
      >
        <div className="form-group">
          <label>Upload File</label>
          <input
            type="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
            accept={allowedExtensions}
            ref={fileInputRef}
            required
          />
          <small>Allowed File Size: 50 MB</small>
        </div>
        <div className="form-group">
          <label>Document Name</label>
          <input
            type="text"
            onChange={(e) => {
              setname(e.target.value);
            }}
            value={name}
            maxLength="50"
            placeholder="Enter Document Name"
            required
          />
          <small>Max length 50 Char</small>
        </div>
        <div className="form-group">
          <label>Document Type</label>
          <select
            value={docType}
            onChange={(e) => setDocType(e.target.value)}
            required
          >
            <option value="">Select</option>
            {docTypes.map((type) => (
              <option key={type.id} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Brief Description</label>
          <textarea
            placeholder="Type your menu Details"
            maxLength="500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <small>Max length 500 Char</small>
        </div>
        <div className="form-group">
          <button type="submit" disabled={loading}>
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </form>
      <div className="usage-instructions">
        <h2>📢 Usage Instructions</h2>
        <ul>
          <li>
            <i className="bx bx-paper-plane"></i> You may choose to 'Publish'
            the document at this stage. By default, the document would remain in
            Unpublished state.
          </li>
          <li>
            <i className="bx bx-paper-plane"></i> You need to 'Publish' the
            document to be search-ready for the end user. You may Publish /
            Unpublish any document later as well.
          </li>
          <li>
            <i className="bx bx-paper-plane"></i> To manage
            (publish/unpublish/archive/restore) artifacts, click here or go to
            Manage Artifacts.
          </li>
          <li>
            <i className="bx bx-paper-plane"></i> Allowed file document formats
            are 'jpg', 'png', 'jpeg', 'doc', 'docx', 'xls', 'xlsx', 'zip',
            'csv', 'ppt', 'pptx', 'txt'.
          </li>
        </ul>
      </div>
      {loading && (
        <Modal isOpen={loading}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              height: '30vh',
            }}
          >
            <div className="loadercomp">
              <div className="loader"></div>
              <p>Please Wait Document Is Uploading To CloudDocs</p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UploadDocument;
