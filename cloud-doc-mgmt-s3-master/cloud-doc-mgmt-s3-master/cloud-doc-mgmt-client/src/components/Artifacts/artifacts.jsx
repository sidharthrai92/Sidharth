import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import usePagination from '../../hooks/usePaginations';
import EditArtifactData from '../EditArtifactData/editArtifactData';

const Artifacts = ({ userData, userEmail, setUserData, fetchUserData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [editSection, setEditSection] = useState(false);
  const [artifactsSection, setArtifactsSection] = useState(true);
  const [editFormData, setEditFormData] = useState([]);

  const filteredDocuments = userData.filter(
    (document) =>
      document.documentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      document.documentType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const {
    currentPage,
    entriesPerPage,
    currentEntries,
    handlePageChange,
    handleEntriesChange,
    totalEntries,
    startEntry,
    endEntry,
    totalPages,
  } = usePagination(filteredDocuments, 10);

  const editArtifact = (editData) => {
    setEditFormData(editData);
    setEditSection(true);
    setArtifactsSection(false);
  };

  const handleClose = async () => {
    setEditSection(false);
    setArtifactsSection(true);
    setTimeout(() => {
      window.location.reload();
    }, 200);
  };

  const handleShare = (documentLink) => {
    const fullLink = `https://d1i3jk8v3nrjwc.cloudfront.net/${documentLink}`;
    const textarea = document.createElement('textarea');
    textarea.value = fullLink;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    toast.success('Link copied to clipboard!');
  };

  return (
    <div>
      {editSection && (
        <EditArtifactData
          editFormData={editFormData}
          handleClose={handleClose}
          fetchUserData={fetchUserData}
          userEmail={userEmail}
          setUserData={setUserData}
        />
      )}
      {artifactsSection && (
        <div className="artifacts-container">
          <ToastContainer />
          <header className="artifacts-header">
            <h1>My Artifacts</h1>
          </header>
          <div className="artifacts-table-container">
            <div className="header-select-entries">
              <th className="select-entries">
                Show
                <select onChange={handleEntriesChange} value={entriesPerPage}>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                entries
              </th>
              <th colSpan="4">
                <div className="table-buttons">
                  {/* <button onClick={() => exportToCSV(filteredArtifacts, 'DMS My Artifacts.csv')}>CSV</button>
                                    <button onClick={() => exportToExcel(filteredArtifacts, 'DMS My Artifacts.xlsx')}>Excel</button>
                                    <button onClick={() => exportToPDF('.artifacts-table', 'DMS My Artifacts.pdf')}>PDF</button>
                                    <button onClick={() => handlePrint('.artifacts-table-container')}>Print</button> */}
                </div>
              </th>
              <th className="user-search">
                <label>Search</label>
                <input
                  type="text"
                  placeholder="Type name or type..."
                  className="user-search-bar"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </th>
            </div>
            <div className="artifacts-table-view">
              <table className="document-table">
                <thead className="table-header">
                  <tr>
                    <th className="header-cell">Sr.</th>
                    <th className="header-cell">Document Name</th>
                    <th className="header-cell">Document Type</th>
                    <th className="header-cell">Uploaded Date</th>
                    <th className="header-cell">Document Description</th>
                    <th className="header-cell">View</th>
                    <th className="header-cell">Action</th>
                    <th className="header-cell">Share</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {currentEntries.map((document, index) => (
                    <tr key={index} className="table-row">
                      <td className="table-cell">{index + 1}</td>
                      <td className="table-cell">{document.documentName}</td>
                      <td className="table-cell">{document.documentType}</td>
                      <td className="table-cell">
                        {new Date(document.uploadDate).toLocaleDateString()}
                      </td>
                      <td className="table-cell">
                        {document.documentDescription}
                      </td>
                      <td className="table-cell">
                        <div className="tooltip">
                          <a
                            className="view-link"
                            href={`https://d1i3jk8v3nrjwc.cloudfront.net/${document.documentLink}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span className="material-symbols-outlined">
                              visibility
                            </span>
                          </a>
                          <span className="tooltiptext">View Document</span>
                        </div>
                      </td>
                      <td className="table-cell">
                        <div className="tooltip">
                          <span
                            class="material-symbols-outlined"
                            onClick={() => editArtifact(document)}
                            style={{ color: 'green' }}
                          >
                            edit
                          </span>
                          <span className="tooltiptext">Edit Document</span>
                        </div>
                      </td>
                      <td className="table-cell">
                        <div className="tooltip">
                          <button className="share-button">
                            <span
                              className="material-symbols-outlined"
                              onClick={() => handleShare(document.documentLink)}
                            >
                              share
                            </span>
                          </button>
                          <span className="tooltiptext">Copy Link Share</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pagination">
              <p>
                Showing {startEntry} to {endEntry} of {totalEntries} entries
              </p>
              <div className="pagination-buttons">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    className={currentPage === i + 1 ? 'active' : ''}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
          <div className="usage-instructions">
            <h2>📢 Usage Instructions</h2>
            <ul>
              <li>
                <i className="bx bx-paper-plane"></i> All documents/urls
                uploaded by you will be listed here in descending order, i.e.,
                latest first.
              </li>
              <li>
                <i className="bx bx-paper-plane"></i> All Active and published
                documents will be eligible for end-user searches.
              </li>
              <li>
                <i className="bx bx-paper-plane"></i> Color Legend:{' '}
                <span className="active">Published and Search Ready</span>,{' '}
                <span className="inactive">
                  Not published and Not Search Ready
                </span>
              </li>
              <li>
                <i className="bx bx-paper-plane"></i> To read the description,
                hover your cursor on the document name.
              </li>
              <li>
                <i className="bx bx-paper-plane"></i> Symbol 🔗 after the
                document name shows that it's a URL and 📄 shows that it's an
                uploaded document.
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Artifacts;