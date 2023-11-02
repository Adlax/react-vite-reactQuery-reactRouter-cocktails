import { NavLink } from "react-router-dom";
import Wrapper from "../style-wrappers/Navbar";

const Navbar = () => {
	return (
		<Wrapper>
			<nav>
				<div className="nav-center">
					<span className="logo">The Mixologist Tavern</span>
					<div className="nav-links">
						<NavLink to="/" className="nav-link">
							Home
						</NavLink>
						<NavLink to="/about" className="nav-link">
							About
						</NavLink>
						<NavLink to="/newsletter" className="nav-link">
							Newsletter
						</NavLink>
					</div>
				</div>
			</nav>
		</Wrapper>
	);
};

export default Navbar;
