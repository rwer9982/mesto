//import { handleOpenImagePopup } from "./script.js";
//import { PopupWithImage } from './PopupWithImage.js';


export class Card {
    constructor({ handleOpenPopupImage }, data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._openPopupImage = handleOpenPopupImage;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('#element-image');
        this._buttonLike = this._element.querySelector('.element__like');
        this._setEventListeners();

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._element.querySelector('.element__text').textContent = this._name;

        return this._element;
    }

    _setEventListeners() {
        this._buttonLike.addEventListener('click', (evt) => {
            this._toggleLikeButton(evt);
        });
        this._element.querySelector('.element__trash-button').addEventListener('click', () => {
            this._deleteCard()
        });
        this._element.querySelector('#element-image').addEventListener('click', () => {
            this._openPopupImage(this._name, this._link);
        });
    }
    _toggleLikeButton() {
        this._buttonLike.classList.toggle('element__like_active');
    }
    _deleteCard() {
        this._element.remove();
        this._element = null;
    }

}