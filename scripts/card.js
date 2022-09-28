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
        this._element.querySelector('.element__text').textContent = this._name;

        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', this._toggleLikeButton);
        this._element.querySelector('.element__trash-button').addEventListener('click', () => {
            this._element.remove();
        });
        this._element.querySelector('.element__image').addEventListener('click', this._handleOpenPopup);
    }
    _toggleLikeButton(evt) {
        evt.target.classList.toggle('element__like_active');
    }

    _handleOpenPopup() {
        document.querySelector('.increased-image__title').textContent = this._name;
        document.querySelector('.increased-image__image').src = this._link;
        document.querySelector('.increased-image__image').alt = this._name;
        document.querySelector('.popup-image').classList.add('popup_opened');
    }

}