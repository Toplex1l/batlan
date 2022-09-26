import './App.css';
import Login from './components/users/login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

  return (
    <>
      <ToastContainer/>
      <Login></Login>
    </>
  );
}

export default App;
