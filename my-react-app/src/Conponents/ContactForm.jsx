import React, { useState } from 'react';
import '../Styles/Contact.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: ''
  });
  const navigate = useNavigate();
  const [error,setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const sendRequest = {
      email:formData.email,
      subject:formData.subject,
      message:formData.message
    }
    axios.post('http://localhost:5000/contactus',sendRequest)
        .then(response => {
          const add = response.data;
          alert(add.auto_response)
          navigate("/home");
        })
        .catch(error => {
          if (error.response && error.response.data && error.response.data.error) {
            setError(error.response.data.error);
          } else {
            setError('An unknown error occurred');
          }
        });
  };

  return (
      <div className="contact-form">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Leave us a message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            required
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-button">
            Send
          </button>
        </form>
      </div>
  );
};

export default ContactForm;
