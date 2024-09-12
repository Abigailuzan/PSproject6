const nodemailer = require("nodemailer");

async function mailSendToCustomer(customer_email) {

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "a0583240144@gmail.com",
            pass: "ixch rrmn txsg shgq\n", // ודא שהסיסמה נכונה ואין רווחים מיותרים
        },
    });

    let info = await transporter.sendMail({
        from: '"Movie Watch Team" <a0583240144@gmail.com>',
        to: 'a0583240144@gmail.com',
        subject: "Welcome to Movie Watch!",
        html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <div style="background-color: #4CAF50; padding: 20px; text-align: center; color: white;">
                <h1>Welcome to Movie Watch!</h1>
            </div>
            <div style="padding: 20px;">
                <p>Hi there,</p>
                <p>We're excited to have you on board! 🎉</p>
                <p>Thank you for joining <strong>Movie Watch</strong>, where you can discover and enjoy a wide variety of films.</p>
                <p>We hope you'll have a great experience with us. If you have any questions, feel free to reach out to our support team at any time.</p>
                <p>Enjoy the movies! 🍿</p>
                <br>
                <p>Best regards,<br>The Movie Watch Team</p>
            </div>
            <div style="background-color: #f0f0f0; padding: 10px; text-align: center;">
                <p style="font-size: 12px;">© 2024 Movie Watch. All rights reserved.</p>
            </div>
        </div>
        `,
    });

    console.log(info.messageId);
}

mailSendToCustomer()
    .catch(err => console.log(err));