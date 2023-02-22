const SpotsIndexItem = ({ spot }) => {

    return (

        // <li>
        //     <p>{spot.city}</p>
        //     <p>{spot.state}</p>
        //     <p>{spot.zip}</p>
        //     <p>{spot.size}</p>
        //     <p>{spot.accessibility}</p>
        //     <p>{spot.rating}</p>
        //     {/* <p>{spot.owner.firstName}</p> */}
        //     {/* <p>{spot.owner.lastName}</p> */}
        // </li>
        <div className="card">
          <div class="card-header">{spot.size}</div>
            <div className="card-body">
                <h5 className="card-title">{spot.title}</h5>
                <p className="card-text">{spot.address} {spot.city} {spot.state} {spot.zip}</p>
                <p className="card-text">{spot.rating}</p>
                <a href="#" className="btn btn-primary see-btn">See more</a>
            </div>
        </div>
    )

};

export default SpotsIndexItem;
