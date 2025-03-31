import React from 'react';
import styles from './modal.module.css';
import { ToastContainer } from 'react-toastify';

const Modal = ({ isOpen, children }) => {
  const modalClass = `${styles.modalDiv} ${isOpen ? styles.modalOpen : ''}`;

  let modalContentStyle = {
    height: '40vh',
    width: '40vw',
  };

  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    modalContentStyle.width = '95vw';
  }

  return (
    <div className={modalClass}>
      <ToastContainer />
      <div className={styles.modalContent} style={modalContentStyle}>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
