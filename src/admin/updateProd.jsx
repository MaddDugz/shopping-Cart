// update product page
import { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;


function  UpdateProduct(){
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [preview, setPreview] = useState(null);
    const productForm = useRef();

    //handle image change
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

    const { id } = useParams();   // <-- this gives you the URL ID

    // get former values
    useEffect(() => {
        fetch(`${apiUrl}/products/productById/${id}`)
        .then(res=> res.json())
        .then(data => {
            setName(data.name)
            setPrice(data.price)
            setPreview(data.imageUrl)
        })
        .catch(err =>{
            console.error("Error:"+err.message)
        })
    },[])

    function Update(e){
        e.preventDefault()
        const formData = new FormData (productForm.current)
        fetch(`${apiUrl}/products/update/${id}`, {
            method : "PUT",
            body : formData
        })
        .then(res => res.json())
        .then(data => {
            window.location.href = "/"
        })
        .catch(err =>{
            console.error("Error:"+err.message)
        })
    }
 

  return (
         <div className="login-container">
                <form action="" ref={productForm} encType="multipart/form-data" className="login-form">

                    <div className="prodImgCont" onClick={image}>
                            <img src={preview} alt="Product Preview" className="prodImg" />
                    </div>

                    <input type="text" placeholder="ProductName" name="name" value={name} className="input-field" onChange={(e) => setName(e.target.value) } />
                    <input type="text" placeholder="Price" name="price" value={price} className="input-field"  onChange={(e) => setPrice(e.target.value) } />
                    <input type="file" onChange={handleImageChange} name="image" style={{display:"none"}} />
                    <button type="submit" onClick={Update} className="login-button">Update</button>
                </form>
            </div>
  )
}

export default UpdateProduct