const SpotsIndexItem = ({ spot }) => {

    return (
        <li>
            <p>{spot.city}</p>
            <p>{spot.state}</p>
            <p>{spot.zip}</p>
            <p>{spot.size}</p>
            <p>{spot.accessibility}</p>
            <p>{spot.rating}</p>
            {/* <p>{spot.owner.firstName}</p> */}
            {/* <p>{spot.owner.lastName}</p> */}
        </li>
    )

};

export default SpotsIndexItem;
