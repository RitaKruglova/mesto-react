function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <article className="card">
      <img className="card__image" src={props.card.link} alt={props.card.name} onClick={handleClick} />
      <button type="button" className="card__recycle-bin" aria-label="Удалить карточку"></button>
      <div className="card__caption">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__like-counter">
          <button type="button" className="card__like" aria-label="Нравится"></button>
          <p className="card__counter">{props.card.likes.length > 0 ? `${props.card.likes.length}` : ''}</p>
        </div>
      </div>
    </article>
  )
}

export default Card;