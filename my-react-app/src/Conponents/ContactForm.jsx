import React, { useState } from 'react';
import '../Stlyles/Contact.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted', formData);
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
          <button type="submit" className="submit-button">
            Send
          </button>
        </form>
      </div>
  );
};

export default ContactForm;
