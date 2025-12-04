import {Link} from "react-router-dom"
import { useShared } from "../Shared"   
import { useAuth } from "../authShared.jsx"
import {useLocation} from 'react-router-dom'   
import {useCallback} from "react"
import _ from "lodash"; // for smoother api calls

function Nav (){
    const {Products, searchTerm, setSearchTerm} = useShared()
    const {islogged, logOut } = useAuth()

    // Debounce the search function by 400ms
    const debouncedSearch = useCallback(
    _.debounce((value) => {
    }, 250),
    [searchTerm]
  );

    function handleSearchChange(event){
        setSearchTerm(event.target.value)
        debouncedSearch(event.target.value)
    }
    return(
        <ul className="Nav">
            <li> <Link to="/" className="Link"> Home </Link></li>

            {/* Display on only home */}
                {useLocation().pathname === "/" &&(
                    <li><input className="search" type="text" placeholder="Search" onChange={handleSearchChange} /> </li>
                )}

            {/* Display path to addproducts if logged in  */}
                {(islogged) ?(
                        useLocation().pathname === "/" &&(
                            <>
                            <li> <Link to="/admin/product" className="Link"> Add Product </Link></li>
                            <li> <button onClick={logOut} className="Link" style={{backgroundColor:"#212121", border:"none"}}>LogOut</button></li>
                            </>
                        )
                ):(
                    <div className="nav-cart">
                        {Products.length > 0 && ( // Conditionally render the cart count
                        <div className="cart-count">{Products.length}</div>
                        )}
                    <li> <Link to="/Cart" className="Link"> Cart </Link></li>
                    </div>
                 )}
        </ul>
    )
}
export default Nav