import "./SignUp.scss";

const SignUp = () => {
	return (
		<>
			<h1>This is Modal</h1>
			<label htmlFor="username">
				Username
				<input type="text" name="username" id="username" />
			</label>

			<label htmlFor="password">
				Password
				<input type="text" name="passwords" id="passwords" />
			</label>
		</>
	);
};

export default SignUp;
