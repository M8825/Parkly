import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpots, fetchSpots } from "../../store/spots";
import SpotItem from "./SpotItem";

const UserSpots = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const spots = useSelector(getSpots());

    useEffect(() => {
        dispatch(fetchSpots(userId));
    }, [dispatch, userId]);

    return spots && (
        <div className="spots-wrapper">
            {spots.map((spot) => (
                <SpotItem key={spot._id} spot={spot} />
            ))}
        </div>
    )
}

export default UserSpots;