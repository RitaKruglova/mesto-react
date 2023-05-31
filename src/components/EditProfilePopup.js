import PopupWithForm from "./PopupWithForm";
import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateUser({
      name,
      about: description,
    })
  }

  return (
    <PopupWithForm onSubmit={handleSubmit} name="edit-profile" title="Редактировать профиль" isOpen={isOpen} onClose={onClose}>
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
          onChange={handleNameChange}
          value={name}
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
          onChange={handleDescriptionChange}
          value={description}
        />
        <span id="inputAboutUserError" className="popup__error popup__error_visible"></span>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditProfilePopup;