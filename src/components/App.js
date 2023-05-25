import {useEffect, useState} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import '../App.css';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    name: 'Юно Гасай',
    about: 'Школьница',
    avatar: 'https://i.pinimg.com/564x/e6/6e/33/e66e33b1565337384ffa0e75ab1a78fc.jpg'
  });



  useEffect(() => {
    api.getUserInfo()
      .then(res => {
        setCurrentUser(res);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

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
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  return (
    <CurrentUserContext.Provider value={currentUser} >
      <div className="page">
        <Header />
        <Main onCardClick={handleCardClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} />
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
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
        <PopupWithForm name="avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} >
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
        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
