import React from 'react';
import pencil from '../images/pencil.svg';
import { api } from '../utils/api';

function Main(props) {

  const [userName, setUserName] = React.useState();
  const [userDescription, setUserDescription] = React.useState();
  const [userAvatar, setUserAvatar] = React.useState();
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo()
      .then(res => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      })
      .catch(err => {
        console.log(err);
      })
  });

  React.useEffect(() => {
    api.getInitialCards()
      .then(res => {
        console.log(res)
        setCards(res);
      })
      .catch(err => {
        console.log(err);
      })
  });

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img id="avatar" src={userAvatar} alt="Аватар" className="profile__avatar" />
          <img src={pencil} alt="Редактировать аватар" className="profile__avatar-overlay" onClick={props.onEditAvatar} />
        </div>
        <div className="profile__info">
          <div className="profile__flex-row">
            <h1 id="profileName" className="profile__name">{userName}</h1>
            <button type="button" className="profile__edit-button" aria-label="Редактировать профиль" onClick={props.onEditProfile} />
          </div>
          <p id="profileDescription" className="profile__description">{userDescription}</p>
        </div>
        <button type="button" className="profile__add-button" aria-label="Добавить" onClick={props.onAddPlace} />
      </section>
      <section className="cards">
        {cards.map((card) => (
          <article className="card" key={card._id}>
            <img className="card__image" src={card.link} alt="#" />
            <button type="button" className="card__recycle-bin" aria-label="Удалить карточку"></button>
            <div className="card__caption">
              <h2 className="card__title">{card.name}</h2>
              <div className="card__like-counter">
                <button type="button" className="card__like" aria-label="Нравится"></button>
                <p className="card__counter">{card.likes.length > 0 ? `${card.likes.length}` : ''}</p>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}

export default Main;