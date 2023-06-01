
function Card({ URL, randomX, randomY, angle }){

    return (
            <img src={URL} className="card" style={{transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`}} />
    )
}


export default Card;