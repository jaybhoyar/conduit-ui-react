import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./components/Home/Home";
import Signin from "./components/Signin/signin";
import Signup from "./components/Signup/Signup";
import Header from "./components/common/Header";
import Article from "./components/Article/index";
import NewArticle from "./components/Newarticle";
import Settings from "./components/Settings";
import Logout from "./components/Logout";

function Auth(props) {
	return (
		<Switch>
			<Route exact path="/" component={Home} />
			<Route
				exact
				path="/logout"
				render={(properties) => (
					<Logout
						updateIsLoggedIn={props.updateIsLoggedIn}
						{...properties}
					/>
				)}
			/>
			<Route exact path="/tag/:tag" component={Home} />
			<Route exact path="/settings" component={Settings} />
			<Route exact path="/newpost" component={NewArticle} />
			<Route exact path="/article/:slug" component={Article} />
			<Route path="*" render={() => <h1>"404 Page not Found"</h1>} />
		</Switch>
	);
}
function NoAuth(propsMain) {
	return (
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/tag/:tag" component={Home} />
			<Route
				path="/login"
				render={(props) => (
					<Signin
						updateIsLoggedIn={propsMain.updateIsLoggedIn}
						{...props}
					/>
				)}
			/>
			<Route exact path="/signup" component={Signup} />
			<Route exact path="/article/:slug" component={Article} />
			<Route path="*" render={() => <h1>"404 Page not Found"</h1>} />
		</Switch>
	);
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: false,
		};
	}
	updateIsLoggedIn = (value) => {
		this.setState({ isLoggedIn: value });
	};
	componentDidMount() {
		if (localStorage["accessToken"]) {
			fetch(`https://conduit.productionready.io/api/user`, {
				method: "GET",
				headers: {
					authorization: `Token ${localStorage["accessToken"]}`,
				},
			})
				.then((res) => res.json())
				.then((user) => {
					this.setState({ isLoggedIn: true });
				})
				.catch((err) => {
					console.log(err);
					this.setState({ isLoggedIn: false });
				});
		}
	}
	render() {
		return (
			<>
				<Header isLoggedIn={this.state.isLoggedIn} />
				{this.state.isLoggedIn ? (
					<Auth updateIsLoggedIn={this.updateIsLoggedIn} />
				) : (
					<NoAuth updateIsLoggedIn={this.updateIsLoggedIn} />
				)}
			</>
		);
	}
}

export default App;
