import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, formSelector, handleCardFormSubmit) {
        super(popupSelector);
        this._form = this._popup.querySelector(formSelector);
        this._handleCardFormSubmit = handleCardFormSubmit;
        this._inputElements = this._form.querySelectorAll('.popup__input');
    }

    //    handleCardFormSubmit(evt) {
    //      evt.preventDefault();
    //        const cardNewItem = { name: newItemNameInput.value, link: newItemImageInput.value };
    //
    //        todoList.addItem(createCard(cardNewItem))
    ///        closePopup(popupNewItem);
    ///        evt.target.reset();
    //        addItemFormValidator.disableSubmitButton();
    //    };

    _getInputValues() {
        const cardNewItem = {};

        this._inputElements.forEach((input) => {
            cardNewItem[input.name] = input.value;
        })
        return cardNewItem;
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
            this.closePopup();
        });
    }
}