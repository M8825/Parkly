const SpotsIndexItem = ({ spot }) => {

    return (
        <div className="card">
          <div class="card-header">{spot.size}</div>
            <div className="card-body">
                <h5 className="card-title">{spot.title}</h5>
                <p className="card-text">{spot.address} {spot.city} {spot.state} {spot.zip}</p>
                <p className="card-text">{spot.rating}</p>
                <div className="btn-container">
                <button href="#" className="btn btn-primary see-btn">See more</button>
                </div>
            </div>
        </div>
    )

};

export default SpotsIndexItem;
