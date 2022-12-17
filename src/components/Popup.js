export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    openPopup() {
        this._popup.classList.add("popup_opened");
        document.addEventListener('keydown', this._closeByEscape.bind(this));
    };

    closePopup() {
        this._popup.classList.remove("popup_opened");
        document.removeEventListener('keydown', this._closeByEscape.bind(this));
    };

    _closeByEscape (evt) {
        if (evt.key === 'Escape') {
            this.closePopup();
        }
    };

    setEventListeners() {
        this._popup.addEventListener('click', (event) => {
            if (event.target === event.currentTarget) {
                this.closePopup(event.currentTarget)
            }
            if (event.target.classList.contains('popup__close')) {
                this.closePopup(event.currentTarget);
              }
        });
    }

}