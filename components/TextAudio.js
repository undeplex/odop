
import { PauseCircle, PlayCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

const TextToAudio = ({ text }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeechToggle = () => {
    if (isSpeaking) {
      // Stop if already speaking
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      // Start speaking
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  useEffect(() => {
    // Stop any ongoing speech if the component unmounts
    return () => window.speechSynthesis.cancel();
  }, []);

  return (
    <div className="relativ flex items-center justify-center  group">

    <button
      onClick={handleSpeechToggle}
      className={`px-4  py-2 text-gray-700 flex gap-2 rounded-full dark:border-slate-500 dark:text-gray-300 border-2 ${isSpeaking ? 'bg-red-00' : 'bg-blue-00'} text-whie`}
    >
        
      {isSpeaking ? <><PauseCircle/>Pause the audio</> :  <><PlayCircle/>Play the audio</>}
    </button>
    <div className="absolute  bottom-full mb-2 w-32 p-2 bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
          On est toujours à l'etape experimental
          <div className="absolute w-3 h-3 bg-black ity-35 transform rotate-45 -bottom-1 left-1/2 -translate-x-1/2"></div>
        </div>
    </div>
  );
};

export default TextToAudio;
