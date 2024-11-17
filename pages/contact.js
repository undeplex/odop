// import { useState } from 'react';
// import { AiFillGithub, AiFillLinkedin, AiOutlineMail } from 'react-icons/ai';

// const Contact = () => {
//   const [formData, setFormData] = useState({ name: '', email: '', message: '' });
//   const [status, setStatus] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setStatus('Sending...');

//     try {
//       const response = await fetch('/api/send-email', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         setStatus('Message sent successfully!');
//         setFormData({ name: '', email: '', message: '' });
//       } else {
//         setStatus('Failed to send message.');
//       }
//     } catch (error) {
//       setStatus('Something went wrong.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
//       <h1 className="text-3xl font-bold mb-8">Contact Me</h1>
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-lg -lg p-8 max-w-lg w-full"
//       >
//         <label className="block mb-4">
//           <span className="text-gray-700">Name</span>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="mt-2 p-4  bg-transparent  border  w-full"
//             required
//           />
//         </label>
//         <label className="block mb-4">
//           <span className="text-gray-700">Email</span>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="mt-2 p-4  bg-transparent  border  w-full"
//             required
//           />
//         </label>
//         <label className="block mb-4">
//           <span className="text-gray-700">Message</span>
//           <textarea
//             name="message"
//             value={formData.message}
//             onChange={handleChange}
//             className="mt-2 p-4  bg-transparent  border  w-full"
//             rows="4"
//             required
//           />
//         </label>
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2  hover:bg-blue-700 transition duration-200"
//         >
//           Send Message
//         </button>
//         {status && <p className="text-center mt-4">{status}</p>}
//       </form>
//       <div className="mt-8 flex space-x-4">
//         <a href="https://github.com/your-profile" target="_blank" rel="noreferrer">
//           <AiFillGithub size={30} className="text-gray-700 hover:text-black" />
//         </a>
//         <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noreferrer">
//           <AiFillLinkedin size={30} className="text-blue-700 hover:text-blue-800" />
//         </a>
//         <a href="mailto:your-email@example.com">
//           <AiOutlineMail size={30} className="text-red-600 hover:text-red-700" />
//         </a>
//       </div>
//     </div>
//   );
// };

// export default Contact;
import Layout from '@/components/Layout';
import { ArrowLongRightIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { AiFillGithub, AiFillLinkedin, AiOutlineMail } from 'react-icons/ai';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Failed to send message.');
      }
    } catch (error) {
      setStatus('Something went wrong.');
    }
  };

  return (
    <Layout>

    <div className="min-h-screen px-6 flex flex-col items-center justify-center  p-4">
      <h1 className="text-3xl play font-bold mb-8">Contact Me</h1>
      <form
        onSubmit={handleSubmit}
        className="  p- max-w-lg w-full"
      >
               <div className="mb-4 relative">
               <label className="absolute top-0 bg-white dark:bg-slate-900 left-2 px-2">Nom</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-2 p-4  bg-transparent  border  w-full"
            required
          />
      </div>
      <div className="mb-4 relative">
               <label className="absolute top-0 bg-white dark:bg-slate-900 left-2 px-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-2 p-4  bg-transparent  border  w-full"
            required
          />
        </div>
        <div className="mb-4 relative">
               <label className="absolute top-0 bg-white dark:bg-slate-900 left-2 px-2">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="mt-2 p-4  bg-transparent  border  w-full"
            rows="4"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2  hover:bg-blue-700 transition duration-200"
        >
          Send Message
          <ArrowLongRightIcon className="size-7 mx-auto"/>
        </button>
        {status && <p className="text-center mt-4">{status}</p>}
      </form>
      <p class="text-sm text-gray-400 mt-3 underline">Envoyez moi un message et je vous repondrez dans un delais de moins de 24 heures ou contacter moi directement sur mes reseaux sociaux si dessous</p>
      <div className="mt-8 flex space-x-4">
        <a href="https://github.com/your-profile" target="_blank" rel="noreferrer">
          <AiFillGithub size={30} className="text-gray-700 hover:text-black" />
        </a>
        <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noreferrer">
          <AiFillLinkedin size={30} className="text-blue-700 hover:text-blue-800" />
        </a>
        <a href="mailto:your-email@example.com">
          <AiOutlineMail size={30} className="text-red-600 hover:text-red-700" />
        </a>
      </div>
    </div>
    </Layout>
  );
};

export default Contact;