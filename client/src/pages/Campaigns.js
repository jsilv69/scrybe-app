import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { useHistory } from 'react-router-dom'

function Campaigns() {
	const history = useHistory()

	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [startDate, setStartDate] = useState('')
    const [members, setMembers] = useState('')
	const [template, setTemplate] = useState('')

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

	async function readCampaign(event) {
        event.preventDefault()

		const req = await fetch('http://localhost:1337/api/contacts', {
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})
		const data = await req.json()

		console.log(data)
	}

	async function addCampaign(event) {
		event.preventDefault()

        const membersArray = members.split(",")

		const response = await fetch('http://localhost:1337/api/campaigns', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token'),
			},
			body: JSON.stringify({
				name,
                description,
                startDate,
                membersArray,
                template
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
			<form onSubmit={addCampaign}>
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
                <input
					value={startDate}
					onChange={(e) => setStartDate(e.target.value)}
					type="date"
					placeholder="Start Date"
				/>
				<br />
				<input
					value={members}
					onChange={(e) => setMembers(e.target.value)}
					type="text"
					placeholder="Members"
				/>
				<br />
				<input
					value={template}
					onChange={(e) => setTemplate(e.target.value)}
					type="text"
					placeholder="Template"
				/>
				<br />
				<input type="submit" value="Add New Campaign" />
			</form>
			<button onClick={readCampaign}>Read Contacts</button>
		</div>
	)
}

export default Campaigns
