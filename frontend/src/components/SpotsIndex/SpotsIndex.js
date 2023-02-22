import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpots, getSpots } from "../../store/spots";
import SpotsIndexItem from "./SpotsIndexItem";

const SpotsIndex = () => {
	const dispatch = useDispatch();
	const spots = useSelector(getSpots());

	useEffect(() => {
		dispatch(fetchSpots());
	}, [dispatch]);

	return (
		spots && (
			<>
				<ul>
					{spots.map((spot, i) => (
						<SpotsIndexItem key={i} spot={spot} />
					))}
				</ul>
			</>
		)
	);
};

export default SpotsIndex;
