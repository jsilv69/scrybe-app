import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { useHistory } from 'react-router-dom'

function Contacts() {
	const history = useHistory()

	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
    const [address1, setAddress1] = useState('')
	const [address2, setAddress2] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipcode, setZipcode] = useState('')

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			const user = jwt.decode(token)
			console.log(token)
			if (!user) {
				localStorage.removeItem('token')
				history.replace('/login')
			} else {

			}
		}
	}, 
	)

	async function readContact(event) {
		const req = await fetch('http://localhost:1337/api/contacts', {
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})
		const data = await req.json()
		console.log(data)
	}

	async function addContact(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:1337/api/contacts/add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token'),
			},
			body: JSON.stringify({
				firstName,
                lastName,
                email,
                phone,
                address1,
                address2,
                city,
                state,
                zipcode,
			}),
		})

		const data = await response.json()
		if (data.status === 'ok') {
			history.push('/login')
		}
	}


	return (
		<div>
			<h1>New Contact</h1>
			<form onSubmit={addContact}>
				<input
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
					type="text"
					placeholder="First Name"
				/>
				<br />
                <input
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
					type="text"
					placeholder="Last Name"
				/>
				<br />
                <input
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
					type="text"
					placeholder="Phone"
				/>
				<br />
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					placeholder="Email"
				/>
				<br />
				<input
					value={address1}
					onChange={(e) => setAddress1(e.target.value)}
					type="text"
					placeholder="Address"
				/>
				<br />
                <input
					value={address2}
					onChange={(e) => setAddress2(e.target.value)}
					type="text"
					placeholder="Apt, Ste, Unit"
				/>
				<br />
                <input
					value={city}
					onChange={(e) => setCity(e.target.value)}
					type="text"
					placeholder="City"
				/>
				<br />
                <input
					value={state}
					onChange={(e) => setState(e.target.value)}
					type="text"
					placeholder="State"
				/>
				<br />
                <input
					value={zipcode}
					onChange={(e) => setZipcode(e.target.value)}
					type="text"
					placeholder="Zipcode"
				/>
				<br />
				<input type="submit" value="Add New Contact" />
			</form>
			<button onClick={readContact}>Read Contacts</button>
		</div>
	)
}

export default Contacts
