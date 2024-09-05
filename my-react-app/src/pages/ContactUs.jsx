import React from 'react'
import '../Stlyles/Contact.css';
import ContactForm from '../Conponents/ContactForm'

function ContactUs() {
  return (
    <div>
    <div className="contact-form-container">
      <div className="contact-form-info">
        <h5>WE'RE HERE TO HELP</h5>
        <h2>Contact us</h2>
        <p>
          Please submit your inquiry using the form below and we will get in touch with you shortly.
        </p>
      </div>
      <ContactForm/>
    </div>
    <footer className="footer-image-container">
      <img 
        src="../Pictures/movies.jpg" 
        alt="Footer decorative image" 
        className="footer-image" 
      />
    </footer>
  </div>
  )
}

export default ContactUs