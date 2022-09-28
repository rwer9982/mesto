
import { Card } from "./card.js";
import { FormValidator } from "./formValidator.js";


const validationForm = {
    formSelector: '.edit-form',
    inputSelector: '.edit-form__input',
    submitButtonSelector: '.edit-form__submit-button',
    inactiveButtonClass: 'edit-form__submit-button_disabled',
    inputErrorClass: 'edit-form__input_with-error',
    errorClass: 'edit-form__span',
}






const editformButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector("#popup-edit-form");
const editformCloseButton = document.querySelector("#edit-form-close-button");
const name = document.querySelector(".profile__title");
const job = document.querySelector(".profile__subtitle");
const nameInput = document.querySelector("#edit-form-title");
const jobInput = document.querySelector("#edit-form-subtitle");
const editFormElement = document.querySelector("#edit-form");

const editFormValidate = new FormValidator(validationForm, popupEdit);
editFormValidate.enableValidation();

function fillEditFormFields() {
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
}

function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener('keydown', closeByEscape);
};

function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener('keydown', closeByEscape);
};

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    closePopup(popupEdit);
};

editformButton.addEventListener("click", () => {
    openPopup(popupEdit);
    fillEditFormFields();
});
editformCloseButton.addEventListener("click", () => {
    closePopup(popupEdit);
});
editFormElement.addEventListener("submit", handleProfileFormSubmit);

///

const popupNewItem = document.querySelector("#popup-new-item-form");
const addNewItemButton = document.querySelector(".profile__add-button");
const newItemPopupCloseButton = document.querySelector("#new-item-form-close-button");
const formElementAddItem = document.querySelector("#add-item-form");
const newItemImageInput = document.querySelector("#add-card-image");
const newItemNameInput = document.querySelector("#add-card-text");
const newItemSubmitButton = document.querySelector("#new-item-form-submit-button");

const addItemFormValidate = new FormValidator(validationForm, formElementAddItem);
addItemFormValidate.enableValidation();

const elementsList = document.querySelector('.elements');


const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

//Открытие и закрытие форм


function handleProfileFormAddItem(evt) {
    evt.preventDefault();
    const item = { name: newItemNameInput.value, link: newItemImageInput.value };
    function addCard() {
        const card = new Card(item, '.element-template');
        elementsList.prepend(card.generateCard());
    }
    addCard(item);
    closePopup(popupNewItem);

    evt.target.reset();

    newItemSubmitButton.setAttribute('disabled', 'disabled');
    newItemSubmitButton.classList.add('edit-form__submit-button_disabled');
};

addNewItemButton.addEventListener("click", () => {
    openPopup(popupNewItem);
});

newItemPopupCloseButton.addEventListener("click", () => {
    closePopup(popupNewItem);
});

formElementAddItem.addEventListener("submit", handleProfileFormAddItem);

//закрытие большой картинки


const increasedImagePopup = document.querySelector('#popup-image');
const increasedImageCloseButton = document.querySelector('#increased-image-close-button');

increasedImageCloseButton.addEventListener("click", () => {
    closePopup(increasedImagePopup);
});



//тут была функция


//закрытие попапа на оверлей и Esc
function closePopupWithOverlay(event) {
    if (event.target === event.currentTarget) {
        closePopup(event.currentTarget);
    }
}

popupEdit.addEventListener('click', closePopupWithOverlay);

increasedImagePopup.addEventListener('click', closePopupWithOverlay);

popupNewItem.addEventListener('click', closePopupWithOverlay);



function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}



initialCards.forEach((item) => {
    const card = new Card(item, '.element-template');
    const cardElement = card.generateCard();

    document.querySelector('.elements').append(cardElement);
});