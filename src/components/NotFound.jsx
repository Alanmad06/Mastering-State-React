import '../styles/NotFound.css'
import { Link } from 'react-router-dom'

export const NotFound = ()=>{

    return (
        <div className="notfound">
            Page Not Found 404 
            <Link to="/" className='notfound__link'>
            <button className="notfound__button">
                <strong> Go Back !</strong>
            </button>
            </Link>
        </div>
    )
}