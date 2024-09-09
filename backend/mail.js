const nodemailer = require("nodemailer");

async function main() {

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "a0583240144@gmail.com",
            pass: "ixch rrmn txsg shgq\n",

        },
    });

    let info = await transporter.sendMail({
        from: '"abigail uzan" <***-a0583240144@gmail.com>',
        to: "rlehman@g.jct.ac.il",
        subject: "Testing, testing, 123",
        html: `
    <h1>היי מה קורה?</h1>
    <p>שלחתי לך את המייל הזה דרך node נכון מגניב?</p>
    `,
    });

    console.log(info.messageId);
}

main()
    .catch(err => console.log(err));