export class Card {

    static _template = document.querySelector('.element-template').content;



    createCard(item) {
        this._view = Card._template.querySelector(".element").cloneNode(true);
        const trashButton = this._view.querySelector('.element__trash-button');
        const likeButton = this._view.querySelector('.element__like');
        this._bigImage = this._view.querySelector('#element-image');



        this._view.querySelector('.element__text').textContent = item.name;
        this._bigImage.src = item.link;
        this._bigImage.alt = item.name;

        //Удаление картинки
        trashButton.addEventListener('click', this._handleClickDeleteCard);

        //Лайк
        likeButton.addEventListener("click", function () {
            likeButton.classList.toggle('element__like_active');
        });
        //Увеличение картинки



        this._bigImage.addEventListener("click", () => {


            document.querySelector('.increased-image__title').textContent = item.name;
            document.querySelector('.increased-image__image').src = item.link;
            document.querySelector('.increased-image__image').alt = item.link;
            const increasedImagePopup = document.querySelector('#popup-image');

            function openPopup(popup) {
                popup.classList.add("popup_opened");
                document.addEventListener('keydown', closeByEscape);
            };

            function closeByEscape(evt) {
                if (evt.key === 'Escape') {
                    const openedPopup = document.querySelector('.popup_opened');
                    closePopup(openedPopup);
                }
            }

            function closePopup(popup) {
                popup.classList.remove("popup_opened");
                document.removeEventListener('keydown', closeByEscape);
            };



            openPopup(increasedImagePopup);
        });

        return this._view;
    };

    _handleClickDeleteCard = () => {
        this._view.remove();
    }

}
