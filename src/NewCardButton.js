

function NewCardButton({getNewCard, disabled}){
    return(
        <button onClick={getNewCard} disabled={disabled}>{!disabled ? "New Card!" : "ran out!"}</button>
    )
}

export default NewCardButton;