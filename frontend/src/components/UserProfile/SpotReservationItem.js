import "./ReservationItem.scss"

const SpotReservationItem = ({ spot }) => {

    return (
        <div className="reservation-card">
            <div className="left-side-res">
                <div>
                    <h1>Spot Address:</h1>
                    <p>{spot.address}</p>
                    <p>{spot.city}{", "} {spot.state}{", "}{spot.zip}</p>
                </div>
            </div>
        </div>
    )
}

export default SpotReservationItem;