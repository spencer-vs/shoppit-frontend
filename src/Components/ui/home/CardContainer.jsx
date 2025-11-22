import React from 'react'
import HomeCard from './HomeCard'
import { BiFontSize } from 'react-icons/bi'


const CardContainer = ({products}) => {
  return (
    <section className="py-5" id="shop">
        <h4 style={{ textAlign: 'Center', color: '#6050DC', fontSize: "2em"}}>Our Products</h4>

        <div className="container px-4 px-lg-5 mt-5">
            <div className="row justify-content-center">
               {products.map(product => <HomeCard key={product.slug} product={product} />)}
             
            </div>
        </div>
    </section>
  )
}

export default CardContainer