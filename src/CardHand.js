import Card from './Card'
import { useSate, useRef } from 'react';

function CardHand({ deck, hand, angle, randomX, randomY }){
    



    return (
        <div id="hand">
            {hand.map(card => <Card id={card.code} URL={card.URL} key={card.code} angle={card.angle} randomX={card.randomX} randomY={card.randomY}/>)}
            {/* {hand.map(card => <Card id={card.code} URL={card.URL} key={card.code}/>)} */}
        </div>
    )
}


export default CardHand;