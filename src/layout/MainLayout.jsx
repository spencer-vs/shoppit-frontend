import NavBar from '../Components/ui/NavBar'
import Footer from '../Components/ui/Footer'
import { Outlet } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = ({numCartItems}) => {
 
 
  return (
   <>
   <NavBar numCartItems={numCartItems}/>
   <ToastContainer />
   <Outlet />
   <Footer />
  
   </>
  )
}

export default MainLayout