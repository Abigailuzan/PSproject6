import React from 'react'
import '../Stlyles/Contact.css';
import ContactForm from '../Conponents/ContactForm'
import Navbar from '../Conponents/Navbar';

function ContactUs() {
    return (
      <div>
        <Navbar/>
        <div className="app-container">
            <div className="contact-form-container">
                <div className="contact-form-info">
                    <h5>WE'RE HERE TO HELP</h5>
                    <h2>Contact us</h2>
                    <p>
                        Please submit your inquiry using the form below and we will get in touch with you
                        shortly.
                    </p>
                </div>
                <ContactForm/>
            </div>
            <div className="footer-image-container">
            </div>
        </div>
        </div>
    )
}


export default ContactUs