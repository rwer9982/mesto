import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);

        this._link = this._popup.querySelector('.increased-image__image');
        this._name = this._popup.querySelector('.increased-image__title');

    }

    openPopup(name, link) {
        super.openPopup();

        this._name.textContent = name;
        this._link.src = link;
        this._name.alt = name;
    
    }
}