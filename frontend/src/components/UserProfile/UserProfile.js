import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser } from "../../store/session";
import "./UserProfile.scss"

const UserProfile = () => {
	const { userId } = useParams();
	const dispatch = useDispatch();
	const user = useSelector((state) =>
		state && state.session ? state.session.user : null
	);

	useEffect(() => {
		dispatch(getCurrentUser);
	}, [dispatch]);

	return (
		user && (
			<div className="profile-container" >
				<h1>{`${user.firstName} ${user.lastName}`}</h1>
			</div>
		)
	);
};

export default UserProfile;
