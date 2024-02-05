import scss from "../header/Header.module.scss";

const Header = () => {
	return (
		<div>
			{" "}
			<div className={scss.Header}>
				<div className={scss.input}>
					<input type="text" placeholder="Поиск" />
				</div>
			</div>
		</div>
	);
};

export default Header;
