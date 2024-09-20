import React from 'react'
import '../Styles/Contact.css';
import ContactForm from '../Conponents/ContactForm'
import Navbar from '../Conponents/Navbar';

function ContactUs() {
    return (
      <div>
        <Navbar/>
        <div className="app-container">
            <div className="contact-form-container">
                <div className="contact-form-info">
                    <h3>WE'RE HERE TO HELP</h3>
                    <h1 className="h1-contant">Contact us</h1>
                    <h4>
                        Please submit your inquiry using the form below and we will get in touch with you
                        shortly.
                    </h4>
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