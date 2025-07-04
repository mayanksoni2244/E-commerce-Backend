import nodemailer from 'nodemailer';



const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // for STARTTLS
  auth: {
    user: "ms9218764@gmail.com",
    pass: "qxwc vrnl ofgv mlxl",
  },
});

const sendOrderEmail = async (toEmail, orderId) => {
  const info = await transporter.sendMail({
    from: 'Fabrico <ms9218764@gmail.com>',
    to: toEmail,
    replyTo: 'ms9218764@gmail.com',
    subject: "Your Order Confirmation",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px; background: #f9f9f9;">
        <h2 style="color: #333; text-align: center;">Thank you for your order!</h2>
        <p style="font-size: 16px; color: #555;">
          Your order has been placed successfully.
        </p>
        <p style="font-size: 16px; color: #555;">
          <strong>Order ID:</strong> ${orderId}
        </p>
        <p style="font-size: 16px; color: #555;">
          We will notify you once it is shipped.
        </p>
        <p style="font-size: 16px; color: #555;">
          If you have any questions, just reply to this email.
        </p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="text-align: center; font-size: 14px; color: #999;">
          &copy; ${new Date().getFullYear()} Fabrico. All rights reserved.
        </p>
      </div>
    `,
  });

  console.log("Message sent: %s", info.messageId);
};



export  default sendOrderEmail;