import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import scss from "./Registration.module.scss";

const url =
	"https://api.elchocrud.pro/api/v1/6a23a942042c17bb6db2951cb6fcc173/useParams";

const Registration = () => {
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	
	const navigate = useNavigate();
	// ! Логика 
	const handleLogin = async () => {
		if (name === "" || password === "") {
			alert("Заполните поле!");
		} else {
			const response = await axios.get(url);
			const responseData = response.data;

			const usersFind = responseData.find(
				(item) => item.name === name && item.password == password
			);

			if (usersFind) {
				navigate("/homeUsers");
			} else {
				alert("");
			}
		}

		try {
			const response = await axios.post(url, { name, password });

			if (response.status === 200 || response.status === 201) {
				localStorage.setItem("login", name);
				localStorage.setItem("password", password);
				navigate("/login");
			}
		} catch (error) {
			console.error("Error registration!!!", error);
			alert("Ошибка при регистрации!");
		}
	};

	return (
		<div className={scss.Registration}>
			<div className={scss.card}>
				<div className={scss.inputs}>
					<div>
						<h2>Введите номер или адрес эл. почты</h2>
					</div>
					<div>
						<label htmlFor="username">Телефон или адрес эл. почты</label> <br />
						<input
							value={name}
							onChange={(e) => setName(e.target.value)}
							type="text"
							id="username"
							name="username"
						/>
					</div>
					<div>
						<label htmlFor="username">Пароль</label> <br />
						<input
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							type="password"
							id="username"
							name="username"
						/>
					</div>

					<div>
						<button onClick={handleLogin}>Зарегистрироваться</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Registration;
