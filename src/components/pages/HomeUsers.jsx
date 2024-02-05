import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import scss from "./HomeUsers.module.scss";

const url =
	"https://api.elchocrud.pro/api/v1/6a23a942042c17bb6db2951cb6fcc173/useParams";

const HomeUsers = () => {
	const [users, setUsers] = useState([]);
	const [userProfile, setUserProfile] = useState({});

	const navigate = useNavigate();

	const getUserProfile = async () => {
		const resposne = await axios.get(url);
		const userProfile = resposne.data;
		const getUserIdLocalStorage = localStorage.getItem("isAuth");
		const findUser = userProfile.find(
			(item) => item._id === +getUserIdLocalStorage
		);
		setUserProfile(findUser);
	};

	
	const getRequest = async () => {
		const response = await axios.get(url);
		setUsers(response.data);
	};
	
	useEffect(() => {
		getUserProfile();
		getRequest();
	}, []);

	
	const handleLogin = () => {
		localStorage.removeItem("login");
		localStorage.removeItem("password");
		localStorage.removeItem("isAuth");
		navigate("/login");
	};

	return (
		<div className={scss.HomeUsers}>
			<div className={scss.Buttons}>
				<button onClick={handleLogin}>ВЫЙТИ</button>
			</div>
			<h1>HOME USERS</h1>
			<div className={scss.cards}>
				{users.map((item, index) => (
					<div className={scss.card} key={index}>
						<h1>{item.name}</h1>
						<p>{item.password}</p>
					</div>
				))}
				<div>
					<h1>{userProfile.login}</h1>
				</div>
			</div>
		</div>
	);
};

export default HomeUsers;
