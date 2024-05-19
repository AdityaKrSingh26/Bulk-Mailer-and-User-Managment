import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: "true",
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const sendEmail = async (to, subject, body, listId, userId) => {
    const unsubscribeLink = `http://localhost:8000/api/users/${listId}/unsubscribe/${userId}`;
    const htmlBody = `${body}<br><br><a href="${unsubscribeLink}">Unsubscribe</a>`;

    const mailOptions = {
        from: process.env.SMTP_USER,
        to,
        subject,
        html: htmlBody,
    };

    await transporter.sendMail(mailOptions, (error, emailResponse) => {
        if (error)
            throw error
        else
            console.log("SUCESSFULY SENT MAIL", emailResponse)
    });
};
