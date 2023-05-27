function PopupWithForm(props) {


  return (
    <div className={`popup popup_type_${props.name}${props.isOpen ? ' popup_opened' : ''}`}>
      <div className={`popup__container popup__container_place_${props.name}`}>
        <button type="button" className="popup__reset-button" aria-label="Отменить" onClick={props.onClose}></button>
        <h3 className="popup__title">{props.title}</h3>
        <form ref={props.formRef} onSubmit={props.onSubmit} className="popup__form" name={props.name}>
          {props.children}
          <button type="submit" className="popup__submit-button">{props.buttonText || 'Сохранить'}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;