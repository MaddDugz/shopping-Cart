import {useShared} from "../Shared.jsx"
import { useState, useEffect } from "react"

function Cart(){
    const {Products, setProducts, setBtndisabled } = useShared()
   // quantityById stores quantity per product ID
    const [quantityById, setQuantityById] = useState(() => {
        const saved = localStorage.getItem("quantityById");
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(()=>{
        localStorage.setItem("quantityById", JSON.stringify(quantityById));// Saves quantityById to localStorage whenever it changes
    },[quantityById])

    const handleQuantityChange = (id, value) => {
        const newQuantity = Math.max(1, parseInt(value)); // minimum 1
        setQuantityById(prev => ({
        ...prev,
        [id]: newQuantity,
        }));
    };

    function RemoveCart(id){
        setProducts( prev => prev.filter(item => item.id !== id) ) // Creating a new without the removed item
        setQuantityById(prev => {
            const updated = { ...prev };
            delete updated[id];
            return updated;
        });
        setBtndisabled(prev =>({
            ...prev , 
            [id]: false
        }))
    }

    function checkOut(product) {
        const phoneNumber = "2347079353135";
        const message =product
            .map(prod => `Product: ${prod.name}, Price: $${prod.price}, Quantity: ${quantityById[prod.id] || 1}`)  // return string for each product
            .join("\n"); // join all strings into a single message;

       const newTab =  window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
       if (newTab) {
            // Only clear products and quantity if the new tab successfully opened
            setProducts([]);
            setQuantityById({})
            setBtndisabled([])
        }
    }
    
    return(
        <div className="cart-cont">
            {Products.length === 0 ? 
                <h1>Your cart is empty Pls Select an item</h1> // If Cart is empty
             : 
                Products.map(product => {
                const quantity = quantityById[product.id] || 1;
                return (
                <div key={product.id} className="cart">
                    <div>
                        <div className="cart-img"> <img src={product.image} alt="" /></div> 
                        <p className="cart-price">{product.name}</p>
                        <button className="cart-btn" onClick={()=>RemoveCart(product.id)}>Remove From Cart</button>
                   </div>
                     <div>
                        <label htmlFor="" className="cart-label">Quantity</label><br />
                        <input type="number" name="" value={quantity} className="cart-inp" onChange={(e)=> handleQuantityChange(product.id, e.target.value)} />
                        <h3 className="priceSm"> <span className="cart-price">Price </span> <br />${(product.price * quantity).toFixed(2)}</h3>
                    </div>
                        <h3 className="priceLg"> <span className="cart-price">Price </span> <br />${(product.price * quantity).toFixed(2)}</h3>
                </div>
                 )})
              }

                {Products.length >0 &&(
               <div>
                    <button className="checkout" onClick={()=>checkOut(Products)}>CheckOut</button>
                </div>
                )}
        </div>
    )
}

export default Cart