import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from 'react';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleLinkChange(event) {
    setLink(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    onAddPlace({
      name,
      link
    })
  }

  return (
    <PopupWithForm onSubmit={handleSubmit} name="add-card" title="Новое место" buttonText="Создать" isOpen={isOpen} onClose={onClose} >
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
          onChange={handleNameChange}
          value={name}
        />
        <span id="input-picture-name-error" className="popup__error popup__error_visible"></span>
        <input
          id="input-link"
          type="url"
          name="link"
          className="popup__input popup__input_type_picture-link"
          placeholder="Ссылка на картинку"
          required
          onChange={handleLinkChange}
          value={link}
        />
        <span id="input-link-error" className="popup__error popup__error_visible"></span>
      </fieldset>
    </PopupWithForm>
  )
}

export default AddPlacePopup;