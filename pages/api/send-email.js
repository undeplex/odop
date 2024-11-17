// import nodemailer from 'nodemailer';

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const { name, email, message } = req.body;

//     if (!name || !email || !message) {
//       return res.status(400).json({ message: 'All fields are required.' });
//     }

//     try {
//       // Set up Nodemailer transporter
//       const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//           user: process.env.EMAIL_USER,
//           pass: process.env.EMAIL_PASS,
//         },
//       });

//       // Email options
//       const mailOptions = {
//         from: email,
//         to: process.env.EMAIL_RECEIVER,
//         subject: `New message from ${name}`,
//         text: message,
//       };

//       // Send email
//       await transporter.sendMail(mailOptions);
//       return res.status(200).json({ message: 'Email sent successfully' });
//     } catch (error) {
//       return res.status(500).json({ message: 'Error sending email', error });
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
      // Configure Nodemailer transporter
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Email content
      const mailOptions = {
        from: email, // Use the user's email address as the "from" address
        to: process.env.EMAIL_RECEIVER,
        subject: `New message from ${name}`,
        text: `You've received a new message from your website:

        Name: ${name}
        Email: ${email}

        Message:
        ${message}
        `,
      };

      // Send email
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error sending email', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
