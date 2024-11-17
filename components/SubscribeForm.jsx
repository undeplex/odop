import { useState } from 'react';
import PopupNotification from './PopupNotification';
import { EnvelopeOpenIcon,EnvelopeIcon } from '@heroicons/react/24/outline';
import { FaEnvelope } from 'react-icons/fa';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        setMessage('Thank you for subscribing on our newsletter!');
        setEmail('');
        setShowPopup(true); // Show popup on success
        setTimeout(() => setShowPopup(false), 5000); // Auto close after 5 seconds
      } else {
        setMessage(data.error || 'Something went wrong.');
       // Auto close after 5 seconds

      }
    } catch (error) {
      setLoading(false);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    
    <div className="b-white  mx-auto my-6 p-4  w-full max-w-md">
      <h1 className="text-3xl play font-bold mb-4 text-center dark:text-gray-100">
      <EnvelopeIcon className="size-7 inline mx-2 rotate-12"/>
        Subscribe to our Newsletter
       
       
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 relative">
        <label className="absolute top-0 bg-white dark:bg-slate-900 left-2 px-2">Email</label>
        <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border placeholder:dark:text-gray-300  w-full p-4 mt-3 bg-transparent"            placeholder="Peter@gmail.com"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-4 rounded-g hover:bg-blue-600 transition flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <span className="animate-spin border-2 border-t-transparent border-white rounded-full w-5 h-5"></span>
          ) : (
            'Subscribe'
          )}
        </button>
        <div className="text-sm my-2 dark:text-gray-100">
          Inscrit toi a notre NewLetter pour recevoir 
           <span className="underline"> directement dans ta boite mail de Blogs </span>
            basés sur des <span className="underline"> Projets</span> réels avant la date de publication
        </div>
      </form>
   
      {message && <p className="mt-4 text-center text-green-500">{message}</p>}
      {showPopup && (
        <PopupNotification message="Thank you for subscribing!" onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
}