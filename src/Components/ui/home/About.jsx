

import NavBar from "../NavBar";
import styles from "./About.module.css"
import Header from "./Header";
import Footer from "../Footer"


const About = () => {
  return (

    <>
     <NavBar />
     


     <div className={styles.container}>
        <div className={styles.aboutShoppit}> 
        <header className={styles.aboutHeader}>About The Website</header> 
        <p className={styles.aboutBody}>
            Shoppit is a state of the art e-commerce site, built to provide customers with easy and memorable shopping experience. Complete with the latest products in the market, simple and easy to use authentication features and multiple payment options such as Flutterwave and Paypal, allowing customers to pay with both their credit cards and bank transfers as well as international payment through our Paypal payment gateway. This features provide a seamless shopping experience which can be done with a few clicks of the button right their on your couch.
        </p>
        </div>
        <div className={styles.aboutdev}>
        <header className={styles.devHeader}>About Developer</header>
        <p className={styles.devBody}>
            This site was built by Isaac Sylvester &copy; 2025. Sylvester is currently a 400l Political Science student of Federal University Kashere and an up and coming Web Developer from Bauchi State Nigeria. Special thanks goes to Code With Clinton from Youtube who provided a step-by-step guidance towards building this e-commerce site with his tutorial videos.
            
        </p>
        </div>
            
    </div>
   
    <Footer />
  
     </>
  )
}

export default About;




















