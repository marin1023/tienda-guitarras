import {useEffect, useImperativeHandle, useState} from "react"
import Guitarra from "./Componets/Guitarra"
import Header from "./Componets/Header"
import { db } from  "./data/db.js"

function App() {

  const inicialCart = () => {
   const localStorageCart = localStorage.getItem('cart')
   return localStorageCart ? JSON.parse(localStorageCart) : []
  }

    const [data, setData] = useState(db)
    const [cart, setCart] = useState(inicialCart)
    
    const minItems = 1
    const maxItems = 5
    
    useEffect ( () => {
     localStorage.setItem('cart', JSON.stringify(cart))    
     
    }, [cart])

    function addToCart(item) {
      const itemExist = cart.findIndex (guitarra => guitarra.id === item.id)
      if(itemExist >= 0) {
        if(cart[itemExist].quantity >= maxItems) return
        const updatedCart = [...cart]
        updatedCart[itemExist].quantity++
        setCart(updatedCart)
       } else {
        item.quantity = 1
        setCart([...cart, item])
       }
      }

    function removeFromCart(id) {
      
      setCart(prevCart => prevCart.filter( guitarra => guitarra.id !== id) )
    }   

    function decreaseQuantity(id) {
      const updatedCart = cart.map ( item => {
     if(item.id === id && item.quantity > minItems ) {
      return {
        ...item,
        quantity: item.quantity - 1
      }
     }
     return item
      })
     setCart(updatedCart)
    }
 
    function increaseQuantity(id) {
      const updatedCart = cart.map ( item => {
     if(item.id === id && item.quantity < maxItems ) {
      return {
        ...item,
        quantity: item.quantity + 1
      }
     }
     return item
      })
     setCart(updatedCart)
    }
   
    function clearCart() {
     setCart([])
    } 
  return (
    <>
     
     <Header 
     cart={cart}
     removeFromCart={removeFromCart}
     decreaseQuantity={decreaseQuantity}
     increaseQuantity={increaseQuantity}
     clearCart={clearCart}
    
     />

<main className="container-xl mt-5">
    <h2 className="text-center">Nuestra Colección</h2>

    <div className="row mt-5">
         {data.map((guitarra) =>(
          <Guitarra
          key={guitarra.id}
          guitarra={guitarra}
          cart={cart}
          setCart={setCart}
          addToCart={addToCart}
          />
            

         ))}
          
    </div>
</main>


<footer className="bg-dark mt-5 py-5">
    <div className="container-xl">
        <p className="text-white text-center fs-4 mt-4 m-md-0">Guitarras Import - Todos los derechos Reservados</p>
    </div>
</footer>
    </>
  )
}

export default App
