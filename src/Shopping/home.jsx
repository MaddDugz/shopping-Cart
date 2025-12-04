import {useState, useEffect, useRef} from "react"   
import { useShared } from "../Shared.jsx"
import { useAuth } from "../authShared.jsx"
const apiUrl = import.meta.env.VITE_API_URL;

// Dropdown menu component (not used in current Home component)
 function Dropdown({id}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className="dropdown-wrapper">
      <button className="dropdown-btn" onClick={() => setOpen(!open)}>
         ▼
      </button>

      {open && (
        <div className="dropdown-menu">
          <a href={`/admin/update/${id}`}>Update</a>
          <a href="#" onClick={(e)=>{
            e.preventDefault()
            deleteProduct(id)
          }}>Delete</a>
        </div>
      )}
    </div>
  );
}

//handle delete 
function deleteProduct(id){
    fetch(`${apiUrl}/products/delete/${id}`, {
        method: "DELETE",
    })
    .then(response => response.text())
    .then(data => {
        console.log("server said:"+data);
        window.location.reload(); // Refresh the page after deletion.
    })
    .catch(error => console.error('Error deleting product:' + error.message));
}

function Home() {
    const {addCart, Btndisabled, searchTerm} = useShared()
    const {islogged} = useAuth()
    const [products, setProducts]    = useState([])
     const [error, setError] = useState("") 


    
    useEffect(() => {
        fetch(`${apiUrl}/products`)
        .then(response => response.json())
        .then(data => {
            setProducts(data.products)
        })
        .catch(error => console.error('Error fetching products:'+ error.message));
    }, [])

    useEffect(() => {
        let url = ""
        if(searchTerm.length <= 1){
            url = `${apiUrl}/products`
        }else{
            url = `${apiUrl}/products/product?q=${searchTerm}`

        }
        fetch(`${url}`)
        .then(response => response.json())
        .then(data => {
            setProducts(Array.isArray(data)
                        ? data
                        : data.products || [])  // Handle different response structures

            if(products.length === 0){
              setError(data.message)
          }
        })   
        .catch(error => console.error('Error:'+ error.message));
    }, [searchTerm]);
    

    return (
        <>
        <div className="Home">
            <h1>Welcome to the Shopping App</h1>
            <p>Explore our products and add them to your cart!</p>
        </div>

        <div className="Products">
            {products.map(product =>(
                <div key={product._id}>
                   <div className="img"> 
                    {islogged &&( <Dropdown id={product._id} />)}
                    <img src={`${apiUrl}/${product.imageUrl}`} alt={product.name} />
                    </div> 
                   <h3 className="price">{product.name}</h3>
                   <p className="price">Price: ${product.price}</p>

                   <button className="btn"  disabled={Btndisabled[product._id]}  onClick={()=>addCart({
                    id: product._id,                             
                    image: `${apiUrl}/${product.imageUrl}`,
                    price: product.price,
                    name : product.name
                   })}>Add to Cart</button>
                </div>
            ))}
        </div>

          { products.length === 0 && (
                    <p className="error">{error}</p>
                )}
        </>
    )
}
export default Home