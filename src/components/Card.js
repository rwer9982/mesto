//import { handleOpenImagePopup } from "./script.js";
import { PopupWithImage } from './PopupWithImage.js';


export class Card {
    constructor(data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('#element-image').src = this._link;
        this._element.querySelector('#element-image').alt = this._name;
        this._element.querySelector('.element__text').textContent = this._name;

        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', this._toggleLikeButton);
        this._element.querySelector('.element__trash-button').addEventListener('click', this._deleteCard.bind(this));
        this._element.querySelector('#element-image').addEventListener('click', this._handleOpenImagePopup.bind(this));
    }
    _toggleLikeButton(evt) {
        evt.target.classList.toggle('element__like_active');
    }
    _deleteCard() {
        this._element.remove();
    }
    _handleOpenImagePopup() {
        const openImage = new PopupWithImage("#popup-image");
        openImage.openPopup(this._name, this._link)

    }

}