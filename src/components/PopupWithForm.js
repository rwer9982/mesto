import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, formSelector, handleCardFormSubmit) {
        super(popupSelector);
        this._form = this._popup.querySelector(formSelector);
        this._handleCardFormSubmit = handleCardFormSubmit;
        this._inputElements = this._form.querySelectorAll('.input');

        this._submitButton = this._form.querySelector('.submit-button');
        this._submitButtonDefaultText = this._submitButton.textContent;
    }

    _getInputValues() {
        const cardNewItem = {};

        this._inputElements.forEach((input) => {
            cardNewItem[input.name] = input.value;
        })
        return cardNewItem;
    }

    changeSubmitHandler(newSubmitHandler) {
        this._handleCardFormSubmit = newSubmitHandler;
    }

    closePopup() {
        super.closePopup();
        this._form.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleCardFormSubmit(this._getInputValues());
//            this.closePopup();
        });
    }

    setLoadingMessage(loading) {
        if (loading) {
            this._submitButton.textContent = 'Сохранение...'
        }
        else {
            this._submitButton.textContent = this._submitButtonDefaultText
        }
    }

}