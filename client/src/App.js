import { Toaster } from 'react-hot-toast';
import './App.css';
import MyRouter from './routes/MyRouter';
import '@fontsource/poppins'; 
import '@fontsource/poppins/700.css'; 
import '@fontsource/roboto-slab'; 
import '@fontsource/roboto-slab/700.css';
import '@fontsource/rubik/300.css';
import '@fontsource/rubik/400.css';


function App() {
  return (
    <>
   <MyRouter/>
   <Toaster />
    </>
  );
}

export default App;
