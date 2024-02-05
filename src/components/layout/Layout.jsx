import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
// import { PrivateRoute } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import Home from "../pages/Home";
import HomeUsers from "../pages/HomeUsers";
import scss from "../layout/Layout.module.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Layout = () => {
	const navigate = useNavigate();
	let { pathname } = useLocation();
	const isAuth = localStorage.getItem("isAuth");
	useEffect(() => {
		if (!!isAuth && pathname === "/login") {
			navigate("/homeUsers");
		} else if (!isAuth && pathname === "/homeUsers") {
			navigate("/login");
		}
	}, [pathname]);
	return (
		<div className={scss.Layout}>
			<Header />
			<>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/registration" element={<Registration />} />
					<Route path="/homeusers" element={<HomeUsers />} />
				</Routes>
			</>
			<Footer />
		</div>
	);
};

export default Layout;
