import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard' 
import Contacts from './pages/Contacts'
import Campaigns from './pages/Campaigns'
import Templates from './pages/Templates'

const App = () => {

	return (
		<div>
			<div>
				<BrowserRouter>
					<Route path="/login" exact component={Login} />
					<Route path="/register" exact component={Register} />
					<Route path="/Dashboard" exact component={Dashboard} />
					<Route path="/Contacts" exact component={Contacts} />
					<Route path="/Campaigns" exact component={Campaigns} />
					<Route path="/Templates" exact component={Templates} />
				</BrowserRouter>
			</div>
		</div>
	)
}

export default App
