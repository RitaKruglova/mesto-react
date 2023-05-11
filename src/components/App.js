import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import '../App.css';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
  }

  return (
    <div className="page">
      <Header />
      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} />
      <Footer />
      <PopupWithForm name="edit-profile" title="Редактировать профиль" buttonText="Сохранить" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
        <fieldset className="popup__info">
          <input
            id="profileNameInput"
            type="text"
            name="fullname"
            className="popup__input popup__input_type_username"
            placeholder="Введите имя"
            required
            minLength="2"
            maxLength="40"
          />
          <span id="inputNameError" className="popup__error popup__error_visible"></span>
          <input
            id="profileDescriptionInput"
            type="text"
            name="about"
            className="popup__input popup__input_type_about-user"
            placeholder="Введите род деятельности"
            required
            minLength="2"
            maxLength="200"
          />
          <span id="inputAboutUserError" className="popup__error popup__error_visible"></span>
        </fieldset>
      </PopupWithForm>
      <PopupWithForm name="add-card" title="Новое место" buttonText="Создать" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} >
      <fieldset className="popup__info">
        <input
          id="input-picture-name"
          type="text"
          name="name"
          className="popup__input popup__input_type_picture-name"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
        />
        <span id="input-picture-name-error" className="popup__error popup__error_visible"></span>
        <input
          id="input-link"
          type="url"
          name="link"
          className="popup__input popup__input_type_picture-link"
          placeholder="Ссылка на картинку"
          required
        />
        <span id="input-link-error" className="popup__error popup__error_visible"></span>
      </fieldset>
      </PopupWithForm>
      <PopupWithForm name="avatar" title="Обновить аватар" buttonText="Сохранить" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} >
      <fieldset className="popup__info">
        <input
          id="input-link-avatar"
          type="url"
          name="avatar-link"
          className="popup__input popup__input_type_avatar"
          placeholder="Ссылка на картинку"
          required
        />
        <span id="input-link-avatar-error" className="popup__error popup__error_visible"></span>
      </fieldset>
      </PopupWithForm>
      <PopupWithForm name="delete-card" title="Вы уверены?" buttonText="Да" onClose={closeAllPopups} />
      <ImagePopup onClose={closeAllPopups} />
      <template id="card-template">
        <article className="card">
          <img className="card__image" src="#" alt="#" />
          <button type="button" className="card__recycle-bin" aria-label="Удалить карточку"></button>
          <div className="card__caption">
            <h2 className="card__title"></h2>
            <div className="card__like-counter">
              <button type="button" className="card__like" aria-label="Нравится"></button>
              <p className="card__counter"></p>
            </div>
          </div>
        </article>
      </template>
    </div>
  );
}

export default App;
