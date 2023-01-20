//import { handleOpenImagePopup } from "./script.js";
//import { PopupWithImage } from './PopupWithImage.js';


export class Card {
    constructor({ handleOpenPopupImage }, data, templateSelector, handleDeleteConfirm, handleLikeClick) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._id = data.id;
        this._ownerId = data.ownerId;
        this._userId = data.userId;
        this._templateSelector = templateSelector;
        this._openPopupImage = handleOpenPopupImage;
        this._handleDeleteConfirm = handleDeleteConfirm;
        this._handleLikeClick = handleLikeClick;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
        return cardElement;
    }

    setLikes(newLikes) {
        this._likes = newLikes;
        const likesCountElement = this._element.querySelector('.element__likes-count');
        likesCountElement.textContent = this._likes.length;

        if (this.isLiked()) {
            this._addLikeButtonActiveState()
        }   else {
            this._removeLikeButtonActiveState()
        }
    }

    isLiked() {
        const userHasLikedCard = this._likes.find(user => user._id === this._userId)

        return userHasLikedCard
    }

    _addLikeButtonActiveState() {
        this._buttonLike.classList.add('element__like_active');
    }

    _removeLikeButtonActiveState() {
        this._buttonLike.classList.remove('element__like_active');
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('#element-image');
        this._buttonLike = this._element.querySelector('.element__like');
        this._setEventListeners();

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._element.querySelector('.element__text').textContent = this._name;

        this.setLikes(this._likes)

        if (this._ownerId !== this._userId) {
            this._element.querySelector('.element__trash-button').style.display = 'none';
        }

        return this._element;
    }

    _setEventListeners() {
        this._buttonLike.addEventListener('click', () => {
            this._handleLikeClick(this._id)
            //            this._toggleLikeButton()
        });

        this._element.querySelector('.element__trash-button').addEventListener('click', () => {
            //this._deleteCard()
            this._handleDeleteConfirm(this._id);
        });
        this._element.querySelector('#element-image').addEventListener('click', () => {
            this._openPopupImage(this._name, this._link);
        });
    }

    deleteCard() {
        this._element.remove();
        this._element = null;
    }

}