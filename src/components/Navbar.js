import { Link } from "react-router-dom";
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import styles from './Navbar.module.css'


export default function Navbar() {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  return (
    <nav className={styles.navbar}>
        <ul>
            <li className={styles.title}><Link to="/">FinanceTracker</Link></li>

            {!user && <li><Link to='/login'>Login</Link></li>}
            {!user && <li><Link to='/signup'>Signup</Link></li>}
            {user && <li>hello, {user.displayName}</li>}
            {user && <li> <button className='btn' onClick={logout}>Log Out</button></li>}
        </ul>
    </nav>
  )
}
