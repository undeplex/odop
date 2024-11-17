import '../styles/globals.css';
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'highlight.js/styles/vs2015.css'
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import NavbarLoader from '@/components/NavbarLoader';
import PageTransition from '@/components/PageTransition';
function MyApp({ Component, pageProps }) {
    return (
        <div className="relative overflow-hidden">
          <PageTransition>

        <Component {...pageProps} />
          </PageTransition>
      
        </div>
       
    );
}

export default MyApp;