import React from 'react'; 
import LoginFormContainer from '../session/login_form_container'; 
import SignupFormContainer from '../session/signup_form_container'; 

const Modal = ({ modalName, closeModal }) => {

  const handleModal = () => {
    document.body.style.overflow = 'unset';
    closeModal();
  }


  if (!modalName) return null; 
  
  let component; 
  switch (modalName) {
    case "signup":
      component = <SignupFormContainer />
      break; 

    case "login":
      component = <LoginFormContainer />
      break; 

    default: 
      component = null; 
      break; 
  }

  return (
    <div className="modal-container" onClick={handleModal}>
      <div className="modal-child" onClick={e => e.stopPropagation()}>
        { component }
      </div>
    </div>
  )
}; 

export default Modal; 