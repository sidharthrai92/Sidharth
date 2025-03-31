import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import docTypes from '../../config/docTypes';
import Modal from '../Modal/modal';
import {
  handleDocumentDelete,
  handleDocumentUpdate,
} from '../../server/server';

const EditMetaData = ({ editFormData, handleClose, userEmail }) => {
  const [docType, setDocType] = useState(editFormData.documentType);
  const [description, setDescription] = useState(
    editFormData.documentDescription
  );
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(null);

  return (
    <div className="edit-document-container">
      <ToastContainer />
      <header className="upload-document-header">
        <h1>Edit Metadata</h1>
      </header>
      <form
        className="edit-document-form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="form-group">
          <label>Document Name</label>
          <span className="document-id">{editFormData.documentName}</span>
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
            maxLength={500}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-actions">
          <div>
            <button type="button" className="cancel-btn" onClick={handleClose}>
              Cancel
            </button>
            <button
              type="button"
              className="update-btn"
              onClick={async (e) =>
                await handleDocumentUpdate(
                  e,
                  editFormData,
                  setLoading,
                  handleClose,
                  docType,
                  description,
                  userEmail,
                  setLoadingMessage
                )
              }
            >
              Update
            </button>
          </div>
          <button
            type="button"
            className="delete-btn"
            disabled={loading}
            onClick={async (e) => {
              if (
                window.confirm(`Are you sure you want to delete the document`)
              ) {
                await handleDocumentDelete(
                  e,
                  editFormData,
                  setLoading,
                  handleClose,
                  userEmail,
                  setLoadingMessage
                );
              }
            }}
          >
            {loading ? 'Deleting...' : 'Delete Artifact'}
          </button>
        </div>
      </form>
      <div className="usage-instructions">
        <h2>📢 Usage Instructions</h2>
        <ul>
          <li>
            <i className="bx bx-paper-plane"></i> You may select existing tag(s)
            for your document. If no suitable tag available then key in a new
            tag and hit enter.
          </li>
          <li>
            <i className="bx bx-paper-plane"></i> If you select new tags then
            new tags will be updated against the document.
          </li>
          <li>
            <i className="bx bx-paper-plane"></i> You may select maximum of 10
            tags per document.
          </li>
          <li>
            <i className="bx bx-paper-plane"></i> If you choose to Archive the
            document, it will be set to Un-publish state and all tags will be
            removed.
          </li>
          <li>
            <i className="bx bx-paper-plane"></i> You may choose a new document
            type for the same document.
          </li>
          <li>
            <i className="bx bx-paper-plane"></i> You need to Publish the
            document to be search ready for the end user. You may Publish /
            Un-publish any document later as well.
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
              <p>{loadingMessage}</p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default EditMetaData;
