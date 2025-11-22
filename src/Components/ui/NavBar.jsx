import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import NavBarLink from "./NavBarLink"; // Import NavLink
import { IoMdCart } from "react-icons/io";
import api from "../../api";


const NavBar = ({numCartItems}) => {
  
  
  
  return (
    <nav className={`navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3 ${styles.stickyNavbar}`}>
      <div className="container">
        <Link className="navbar-brand fw-bold text-uppercase" to="/shoppit">
          Shoppit
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarContent">
          <NavBarLink /> {/* Use NavLink component here */}
        <Link to="/cart" className={`btn btn-dark ms-3 rounded-pill position-relative ${styles.responsiveCart}`}>
        <IoMdCart />
         {numCartItems > 0 && (
           <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger "
          style={{fontSize: '0.85rem', padding: '0.5em 0.65em', backgroundColor: '#6050DC'}}
          >
            {numCartItems}
          </span>
         )}
          
         

       
         
       
        </Link>
        </div>
      </div>
    </nav>
  );
};


export default NavBar