const SpotCard = ({spot}) => {
    return (
        <div>
            <img src={spot.previewImage} />
            <div>
                {spot.address}
            </div>
            <div>
                {spot.city}
            </div>
        </div>
    )
}


export default SpotCard;
