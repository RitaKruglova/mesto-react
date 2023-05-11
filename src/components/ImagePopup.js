function ImagePopup() {
  return (
    <div className="popup popup_type_picture">
      <div className="popup__container popup__container_place_popup-picture">
        <button type="button" className="popup__reset-button popup__reset-button_place_popup-picture" aria-label="Отменить"></button>
        <img className="popup__image" src="#" alt="#" />
        <p className="popup__image-name"></p>
      </div>
    </div>
  )
}

export default ImagePopup;