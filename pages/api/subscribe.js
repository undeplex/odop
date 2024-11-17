import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use your email provider
      auth: {
        user: process.env.SMTP_USER, // Your email
        pass: process.env.SMTP_PASS, // Your email password or app password
      },
    });

    // Email to the user
    await transporter.sendMail({
      from: `"Your Company" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Subscription Confirmation',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <h1 style="color: #4A90E2;">Thank you for subscribing!</h1>
          <p>You have successfully subscribed to our newsletter.</p>
          <p>- The Team</p>
        </div>
      `,
    });

    // Email to the admin
    await transporter.sendMail({
      from: `"Your Company" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL, // Your admin email
      subject: 'New Subscriber',
      text: `A new subscriber has joined: ${email}`,
    });

    res.status(200).json({ message: 'Subscription successful!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error sending email' });
  }
}

