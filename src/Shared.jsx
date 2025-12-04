import { useState, createContext, useContext, useEffect } from "react";

const sharedContext = createContext()

export function SharedProvider({children}){
    // for search btn
    const [searchTerm, setSearchTerm] = useState('')

    //For my cart
    const [Products, setProducts] = useState(()=>{
        const savedProducts = localStorage.getItem("cartProducts"); // Retrieve from localStorage
        return savedProducts ? JSON.parse(savedProducts) : []; // If exists, parse it, else start with empty array
    })
    //For disabling btns
    const [Btndisabled, setBtndisabled] = useState(()=>{
        const Btnstate = localStorage.getItem("Btndisabled") // get btn state from localstorage
        return Btnstate ? JSON.parse(Btnstate) : {}
    })
    // Function to add product to cart
    const addCart = (product) => {
        setProducts(prev =>  [...prev, product]); // Add new product to cart

        setBtndisabled(prev =>({
            ...prev , 
            [product.id]: true
        }))

    }
    useEffect(() => { 
        localStorage.setItem("cartProducts", JSON.stringify(Products)); // Save to localStorage whenever Products changes
    }, [Products]);

    useEffect(()=>{
        localStorage.setItem('Btndisabled', JSON.stringify(Btndisabled)) // Save to btn state to local storage
    },[Btndisabled])

    return(
        <sharedContext.Provider value={{
            searchTerm, setSearchTerm, Products, setProducts, addCart, Btndisabled, setBtndisabled
            }}>
            {children}
        </sharedContext.Provider>
    )
}

export function useShared(){
    return useContext(sharedContext)
}
