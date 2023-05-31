import PopupWithForm from "./PopupWithForm";
import { useRef, useEffect } from 'react';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputAvatarRef = useRef();
  const formRef = useRef();

  useEffect(() => {
    inputAvatarRef.current.value = '';
  }, [isOpen]);

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateAvatar({
      avatar: inputAvatarRef.current.value
    })
  }

  return (
    <PopupWithForm formRef={formRef} onSubmit={handleSubmit} name="avatar" title="Обновить аватар" isOpen={isOpen} onClose={onClose} >
      <fieldset className="popup__info">
        <input
          id="input-link-avatar"
          type="url"
          name="avatar-link"
          className="popup__input popup__input_type_avatar"
          placeholder="Ссылка на картинку"
          required
          ref={inputAvatarRef}
        />
        <span id="input-link-avatar-error" className="popup__error popup__error_visible"></span>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;