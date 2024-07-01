import { useSelector } from "react-redux";
import "../styles/Header.css"


export function Header () {

    const {email} = useSelector(state => state.user)

    return(
<header>
<nav className='nav'>
<ul className='nav-bar'>
            <li className='logo'><a href='/'>PROJECT</a></li>
            <input type='checkbox' id='check' />
            <span className="menu">
                <li><a href="/">PROJECTS</a></li>
                <li><a href="/">ABOUT US</a></li>
                <li><a href="/">STORIES</a></li>
                <li><a href="/">Contact</a></li>
                <li> <i className="fa fa-user" aria-hidden="true"></i> {email}</li>
                <label htmlFor="check" className="close-menu">X</label>
            </span>
            <label htmlFor="check" className="open-menu">V</label>
        </ul>
    </nav>
</header>
    );


}