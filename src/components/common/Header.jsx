/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "../../styles/common.scss";

function Header() {
	return (
		<div className="header_container">
			<header className="header">
				<div className="logo">
					<p>Conduit</p>
				</div>
				<div className="search_box">
					<input type="text" name="" id="" />
				</div>
				<div className="auth_button">
					<a href="#" className="active_link">
						Home
					</a>
					<a href="#">Sign in</a>
					<a href="#">Signup</a>
				</div>
			</header>
		</div>
	);
}

export default Header;
