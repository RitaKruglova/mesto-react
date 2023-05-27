import {useEffect, useState} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
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
  const [cards, setCards] = useState([]);
  
  useEffect(() => {
    api.getInitialCards()
      .then(res => {
        setCards(res);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

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

  function handleUpdateUser({ name, about }) {
    api.setUserInfo({ name, about })
      .then(res => {
        setCurrentUser({
          ...currentUser,
          name: res.name,
          about: res.about,
        })
      })
  }

  function handleUpdateAvatar({ avatar }) {
    api.changeAvatar(avatar)
      .then(res => {
        setCurrentUser({
          ...currentUser,
          avatar: res.avatar
        })
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then(newCard => {
        let index;
        cards.forEach((c, i) => {
          if (c._id === card._id) {
            index = i;
          }
        })
        cards[index] = newCard;
        setCards([...cards])
      })
      .catch(err => {
        console.log(err);
      })
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter(c => card._id !== c._id));
      })
      .catch(err => {
        console.log(err);
      })
  }

  function handleAddPlaceSubmit({ name, link }) {
    api.addNewCard({name, link })
      .then(newCard => {
        setCards([newCard, ...cards]);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser} >
      <div className="page">
        <Header />
        <Main cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} onCardClick={handleCardClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} />
        <Footer />
        <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
        <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
        <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
        <PopupWithForm name="delete-card" title="Вы уверены?" buttonText="Да" onClose={closeAllPopups} />
        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
