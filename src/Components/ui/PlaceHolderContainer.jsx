import React from 'react'
import PlaceHolder from './PlaceHolder'

const PlaceHolderContainer = () => {

    const PlaceNumbers = [...Array(7).keys()].slice(0);

  return (
   <section className="py-5" id='shop'>
    <h4 style={{ textAlign: "center" }}>Our Products</h4>

    <div className="container px-4 px-lg-5 mt-5">
        <div 
        style={{ 
           display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', padding: '1rem 0'
         }}
        >
            {PlaceNumbers.map(num => <PlaceHolder key={num} />)}
            <PlaceHolder />
        </div>
    </div>
   </section>
  )
}

export default PlaceHolderContainer



// display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(2, auto)'