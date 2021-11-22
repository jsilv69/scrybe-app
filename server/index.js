const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const dotenv = require('dotenv')
const Campaign = require('./models/campaign.model')
const Contact = require('./models/contact.model')
const User = require('./models/user.model')
const Template = require('./models/template.model')

dotenv.config();
var url = process.env.MONGOLAB_URI;
var port = process.env.PORT;
var secret = process.env.JWT_SECRET;

app.use(cors())
app.use(express.json())
app.use((err, req, res, next) => {
	console.log(`Error middleware hit.  Error: ${err}`);
})

mongoose.connect(url)

app.post('/api/register', async (req, res) => {
	console.log(req.body)
	try {
		const newPassword = await bcrypt.hash(req.body.password, 10)
		await User.create({
			username: req.body.username,
			email: req.body.email,
			password: newPassword,
		})
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: 'Duplicate email' })
	}
})

app.post('/api/login', async (req, res) => {
	const user = await User.findOne({
		username: req.body.username,
	})

	if (!user) {
		return { status: 'error', error: 'Invalid login attempt' }
	}
	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)

	if (isPasswordValid) {
		const token = jwt.sign(
			{
				id: user._id,
			},
			secret,
			{expiresIn: '1d'}
		)

		return res.json({ status: 'ok', user: token })
	} else {
		return res.json({ status: 'error', user: false })
	}
})

app.get('/api/quote', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		const decoded = jwt.verify(token, secret)
		const email = decoded.email
		const user = await User.findOne({ email: email })

		return res.json({ status: 'ok', quote: user.quote })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
		
	}
})

app.post('/api/quote', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		const decoded = jwt.verify(token, secret)
		const email = decoded.email
		await User.updateOne(
			{ email: email },
			{ $set: { quote: req.body.quote } }
		)

		return res.json({ status: 'ok' })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})

app.get('/api/contacts', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		const decoded = jwt.verify(token, secret)
		const email = decoded.email
		const user = await User.findOne({ email: email })
		const userId = await user.get("_id")
		const userContacts = await Contact.find({ creator: userId })
		const userContacts2 = await JSON.stringify(userContacts)

		return res.json(userContacts2)
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: `${error}` })
		
	}
})

app.post('/api/contacts/add', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		const decoded = jwt.verify(token, secret)
		const email = decoded.email
		const user = await User.findOne({ email: email })
		const userId = await user.get("_id")

		await Contact.create({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			phone: req.body.phone,
			email: req.body.email,
			address1: req.body.address1,
			address2: req.body.address2,
			city: req.body.city,
			state: req.body.state,
			zipcode: req.body.zipcode,
			creator: userId,
		})
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: `Error ${err}` })
	}
})

app.post('/api/campaigns', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		const decoded = jwt.verify(token, secret)
		const email = decoded.email
		const user = await User.findOne({ email: email })
		const userId = await user.get("_id")
		const campaignStatus = 'created'

		await Campaign.create({
			name: req.body.name,
			description: req.body.description,
			startDate: req.body.startDate,
			members: req.body.membersArray,
			template: req.body.template,
			campaignStatus: campaignStatus,
			creator: userId,
		})
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: `Error ${err}` })
	}
})

app.post('/api/templates', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		const decoded = jwt.verify(token, secret)
		const email = decoded.email
		const user = await User.findOne({ email: email })
		const userId = await user.get("_id")

		await Template.create({
			name: req.body.name,
			description: req.body.description,
			body: req.body.body,
			creator: userId,
		})
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: `Error ${err}` })
	}
})

app.listen(port, () => {
	console.log(`Server running on port ${port}`)
})
