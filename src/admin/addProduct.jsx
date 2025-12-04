// page to add products in admin panel
import { useState, useRef } from "react";
import { useAuth } from "../authShared.jsx";
const apiUrl = import.meta.env.VITE_API_URL;


function AddProduct (){
    const {islogged} = useAuth();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [preview, setPreview] = useState(null);
    const productForm = useRef();

    function image(){
        document.querySelector('input[name="image"]').click();
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Create a preview URL
        const imageUrl = URL.createObjectURL(file);
        setPreview(imageUrl);
    }

    async function formSubmit(e){
        // e.preventDefault();
        try{
            const formData = new FormData(productForm.current);
           
            const response = await fetch(`${apiUrl}user/product`, {
                method: "POST",
                body: formData
            });
            const data = await response.json();

        }catch(err){
        console.error("Error:" + err.message);
    }
    }

    if(!islogged){ 
        window.location.href = "/admin";
        return
    }
     
    return(
         <div className="login-container">
                <form action="" ref={productForm} encType="multipart/form-data" className="login-form">

                    <div className="prodImgCont" onClick={image}>
                        {preview ? (
                            <img src= {preview} alt="Product Preview" className="prodImg" />
                        ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: "rgba(0, 0, 0, 1)"}}>
                        <path d="M20 2H8c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM8 16V4h12l.002 12H8z"></path>
                        <path d="M4 8H2v12c0 1.103.897 2 2 2h12v-2H4V8z"></path><path d="m12 12-1-1-2 3h10l-4-6z"></path></svg>
                        )}
                    </div>

                    <input type="text" placeholder="ProductName" name="name" className="input-field" onChange={(e) => setName(e.target.value) } />
                    <input type="text" placeholder="Price" name="price" className="input-field"  onChange={(e) => setPrice(e.target.value) } />
                    <input type="file"  onChange={handleImageChange} name="image" style={{display:"none"}} />
                    <button type="submit" onClick={formSubmit} className="login-button">Create</button>
                </form>
            </div>
    )
}

export default AddProduct