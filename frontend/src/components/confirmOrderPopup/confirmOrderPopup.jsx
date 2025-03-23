import { Dialog } from '@mui/material'
import styles from './confirmOrderPopup.module.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ConfirmOrderPopup({ open, onClose, onConfirm, totalPrice }) {
	const [formData, setFormData] = useState(null)
	const authData = JSON.parse(localStorage.getItem('auth'))
	const navigate = useNavigate()

	const handleConfirm = (e) => {
		e.preventDefault()

		if(!authData?.user?._id) {
			return navigate('/auth')
		} else {
			const orderData = {
				userId: authData?.user?._id,
			}
			onConfirm(orderData)
		}
	}

	const handleFormDataChange = (e) => {
		setFormData({
			...formData, [e.target.name]: e.target.value
	})
	}

	return(
		<Dialog open={open} onClose={onClose} disableScrollLock >
			<div className={styles.popupContainer}>
				<div className={styles.orderPrice}>
					<p>Confirm order?</p>
					<p>Total price: ${(totalPrice).toFixed(2)}</p>
				</div>
				<div className={styles.confirmBtns}>
					<button onClick={onClose}>Cancel</button>
					<button onClick={handleConfirm}>Confirm</button>
				</div>
			</div>
		</Dialog>
	)
}