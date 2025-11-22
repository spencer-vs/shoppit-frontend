import React from 'react'
import styles from "./Contact.module.css"
import NavBar from '../NavBar'
import Footer from '../Footer'

const Contact = () => {
  return (
    <>
    <NavBar />
    <div className={styles.container}>
      <p className={styles.contactBody}>
        The developer can be contacted through any of this mediums.</p>

         <div className={styles.phone}>
        <h2 className={styles.contactHeader}>Phone</h2>
        <div className={styles.contactSpan}>
          <span>09046868547</span>
        <span>08071861441</span>
        <span>07074209805</span>
        </div>
        
         </div>
       
        <div className={styles.email}>
        <h2 className={styles.contactHeader}>Email</h2>

        <div className={styles.contactSpan}>
          <span>isaacharu17@gmail.com</span>
        <span>myunity23@gmail.com</span>
 
        </div>
       

        </div>
        
      
    </div>

   <Footer />
    </>
  )
}

export default Contact