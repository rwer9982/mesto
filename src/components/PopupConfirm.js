import { Popup } from "./Popup.js";

export class PopupConfirm extends Popup {
    constructor(popupSelector, formSelector) {
        super(popupSelector);
        this._form = this._popup.querySelector(formSelector);
        this._handleCardFormDelete = null;

        this._submitButton = this._form.querySelector('.submit-button');
        this._submitButtonDefaultText = this._submitButton.textContent;
    }

    setSubmit(submit) {
        this._handleCardFormDelete = submit;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault()
            this._handleCardFormDelete(evt);

        })
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