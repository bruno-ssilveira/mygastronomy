import styles from './navbar.module.css'
import { LuMenu, LuShoppingCart } from 'react-icons/lu'
import { TbUserCircle } from 'react-icons/tb'
import { Drawer } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCartContext } from '../../contexts/useCartContext'

export default function Navbar() {
    const [openMenu, setOpenMenu] = useState(false)
    const { cartItems } = useCartContext()

    const handleOpenMenu = () => {
        setOpenMenu(!openMenu)
    }

    return (
        <nav className={styles.navbarContainer}>
            <div className={styles.navbarItems}>
                <Link to={'/'}>
                    <img src='/imgs/logo.png' alt='' className={styles.logo}/>
                </Link>
                <div className={styles.navBarLinksContainer}>
                    <Link to={'/'} className={styles.navbarLink}>Home</Link>
                    <Link to={'/plates'} className={styles.navbarLink}>Plates</Link>
                    <Link to={'/cart'} className={styles.cartItem}>
                        <LuShoppingCart className={styles.navbarLink} />
                        {cartItems.length > 0 ? <p>{cartItems.length}</p> : ''}
                    </Link>
                    <Link to={'/profile'}>
                        <TbUserCircle className={styles.navbarLink} />
                    </Link>
                </div>
            </div>

            <div className={styles.mobileNavbarItems}>
                <Link to={'/'}>
                    <img src='/imgs/logo.png' alt='' className={styles.logo}/>
                </Link>
                <div className={styles.mobileNavbarBtns}>
                    <Link to={'/cart'}>
                        <LuShoppingCart className={styles.navbarLink} />
                    </Link>
                    <LuMenu className={styles.navbarLink} onClick={handleOpenMenu} />
                </div>
            </div>

            <Drawer anchor='right' open={openMenu} onClose={handleOpenMenu} >
                <div className={styles.drawer}>
                    <Link to={'/'} className={styles.navbarLink} onClick={handleOpenMenu} >Home</Link>
                    <Link to={'/plates'} className={styles.navbarLink} onClick={handleOpenMenu} >Plates</Link>
                    <Link to={'/profile'} className={styles.navbarLink} onClick={handleOpenMenu} >Profile</Link>
                </div>
            </Drawer>
        </nav>
    )
}