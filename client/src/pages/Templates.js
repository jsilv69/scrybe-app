import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { useHistory } from 'react-router-dom'

function Templates() {
	const history = useHistory()

	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [body, setBody] = useState('')

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

	// async function readTemplate(event) {
    //     event.preventDefault()

	// 	const req = await fetch('http://localhost:1337/api/contacts', {
	// 		headers: {
	// 			'x-access-token': localStorage.getItem('token'),
	// 		},
	// 	})
	// 	const data = await req.json()

	// 	console.log(data)
	// }

	async function addTemplate(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:1337/api/templates', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token'),
			},
			body: JSON.stringify({
				name,
                description,
                body,
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
			<form onSubmit={addTemplate}>
				<input
					value={name}
					onChange={(e) => setName(e.target.value)}
					type="text"
					placeholder="Name"
				/>
				<br />
                <input
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					type="text"
					placeholder="Description"
				/>
				<br />
                <textarea
					value={body}
					onChange={(e) => setBody(e.target.value)}
					type="textarea"
                    rows="7"
					placeholder="Body"
				/>
				<br />
				<input type="submit" value="Add New Template" />
			</form>
		</div>
	)
}

export default Templates
