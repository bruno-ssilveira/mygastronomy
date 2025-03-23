import { Link } from "react-router-dom"
import { useCartContext } from "../../contexts/useCartContext"
import { LuMousePointerClick, LuCircleMinus, LuSend } from "react-icons/lu"
import styles from './page.module.css'
import { useEffect, useState } from "react"
import ConfirmOrderPopup from "../../components/confirmOrderPopup/confirmOrderPopup"
import orderServices from "../../services/order"


export default function Cart() {
    const { cartItems, updateCartItems, removeFromCart, clearCart } = useCartContext()
    const [isEndPage, setIsEndPage] = useState(false)
    const [confirmPopupOpen, setConfirmPopupOpen] = useState(false)
    const { sendOrder } = orderServices()

    // Show the button Go To Top when scrolled at certain page height
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPosition = window.scrollY + window.innerHeight
            const documentHeight = document.documentElement.scrollHeight - 100

            if(currentScrollPosition >= documentHeight){
                setIsEndPage(true)
            } else {
                setIsEndPage(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleChangeItemQty = (mode, itemId) => {
        const updatedCartItem = cartItems.map((item) => {
            if(item._id === itemId) {
                if(mode === 'less' && item.quantity > 1) {
                    item.quantity -= 1
                } else if(mode === 'more') {
                    item.quantity += 1
                }
            }

            return item
        })

        updateCartItems(updatedCartItem)
    }

    const handleOpenPopup = (e) => {
        e.preventDefault()
        setConfirmPopupOpen(!confirmPopupOpen)
    }

    const handleConfirmOrder = (orderData) => {
        orderData.items = cartItems.map((item) => {
            return { plateId: item._id, quantity: item.quantity }
        })
        sendOrder(orderData)
        setConfirmPopupOpen(!confirmPopupOpen)
        clearCart()
    }

    const totalPrice = () => {
        return cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
    }

    return (
        <>
            {cartItems.length === 0 ? (
                <div className={styles.noOrdersContainer}>
                    <h1>Your cart is empty</h1>
                    <Link to={'/plates'} className={styles.specialities}>See our specialities <LuMousePointerClick /> </Link>
                </div>
            ) : (
                <>
                    <h1>Cart</h1>
                    <div className={styles.cartPageContainer}>
                        {cartItems.map((item) => (
                            <div key={item._id} className={styles.cartContainer}>
                                <div className={styles.itemContainer}>
                                    <img src={item.imgUrl} alt="" />
                                    <div className={styles.itemInteraction}>
                                        <div className={styles.itemDescription}>
                                            <h5>{item.name}</h5>
                                            <p data-fulltext={item.description}>{item.description}</p>
                                        </div>
                                        <div className={styles.itemButtons}>
                                            <div className={styles.itemPortion}>
                                                <h5>Portions: {item.quantity}</h5>
                                                <div className={styles.itemPlusMinus}>    
                                                    <p onClick={() => {handleChangeItemQty('more', item._id)}}>+</p>
                                                    <p onClick={() => {handleChangeItemQty('less', item._id)}}>-</p>
                                                </div>
                                            </div>
                                            <div className={styles.priceRemoveItem}>
                                                <h5>Price: ${(item.quantity * item.price).toFixed(2)}</h5>
                                                <h6 onClick={() => { removeFromCart(item._id) }}>
                                                    Remove item <LuCircleMinus style={{color: '#B22222'}}/>
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className={`${styles.sendOrder} ${isEndPage ? styles.sendOrderAdjusted : ''}`} onClick={handleOpenPopup}>
                        Send order <LuSend />
                    </p>
                </>
            )}

            <ConfirmOrderPopup open={confirmPopupOpen} onClose={handleOpenPopup} onConfirm={handleConfirmOrder} totalPrice={totalPrice()}/>
        </>
    )
}