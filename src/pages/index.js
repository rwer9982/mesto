import './index.css';
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';




const validationForm = {
    formSelector: '.edit-form',
    inputSelector: '.edit-form__input',
    submitButtonSelector: '.edit-form__submit-button',
    inactiveButtonClass: 'edit-form__submit-button_disabled',
    inputErrorClass: 'edit-form__input_with-error',
    errorClass: 'edit-form__span',
}






const editFormButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector("#popup-edit-form");
const editFormCloseButton = document.querySelector("#edit-form-close-button");
const name = document.querySelector(".profile__title");
const job = document.querySelector(".profile__subtitle");
const nameInput = document.querySelector("#edit-form-title");
const jobInput = document.querySelector("#edit-form-subtitle");
//const editFormElement = document.querySelector("#edit-form");

const editFormValidator = new FormValidator(validationForm, popupEdit);
editFormValidator.enableValidation();

const defaultUserInfo = new UserInfo(name, job);

function addUserInfo(data) {
    defaultUserInfo.setUserInfo(data);
}

const popupEditForm = new PopupWithForm("#popup-edit-form", "#edit-form", () => {
    const newDescription = { name: nameInput.value, job: jobInput.value };
    addUserInfo(newDescription);
});

popupEditForm.setEventListeners();

function fillEditFormFields() {
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
}

//function openPopup(popup) {
//    popup.classList.add("popup_opened");
//    document.addEventListener('keydown', closeByEscape);
//};

//function closePopup(popup) {
//    popup.classList.remove("popup_opened");
//    document.removeEventListener('keydown', closeByEscape);
//};

//function handleProfileFormSubmit(evt) {
//    evt.preventDefault();
//    name.textContent = nameInput.value;
//    job.textContent = jobInput.value;
//    closePopup(popupEdit);
//};

editFormButton.addEventListener("click", () => {
    popupEditForm.openPopup();
    fillEditFormFields();
});
editFormCloseButton.addEventListener("click", () => {
    popupEditForm.closePopup();
});
//editFormElement.addEventListener("submit", handleProfileFormSubmit);

///

//const popupNewItem = document.querySelector("#popup-new-item-form");
const addNewItemButton = document.querySelector(".profile__add-button");
const newItemPopupCloseButton = document.querySelector("#new-item-form-close-button");
const formElementAddItem = document.querySelector("#add-item-form");
const newItemImageInput = document.querySelector("#add-card-image");
const newItemNameInput = document.querySelector("#add-card-text");
//const newItemSubmitButton = document.querySelector("#new-item-form-submit-button");

const addItemFormValidator = new FormValidator(validationForm, formElementAddItem);
addItemFormValidator.enableValidation();

//const cardsContainer = document.querySelector('.elements');


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





const popupNewItem = new PopupWithForm("#popup-new-item-form", "#add-item-form", () => {
    const cardNewItem = { name: newItemNameInput.value, link: newItemImageInput.value };
    todoList.addItem(createCard(cardNewItem))
});
popupNewItem.setEventListeners();


addNewItemButton.addEventListener("click", () => {
    popupNewItem.openPopup();
});

newItemPopupCloseButton.addEventListener("click", () => {
    popupNewItem.closePopup();
});

//formElementAddItem.addEventListener("submit", handleCardFormSubmit);

//function closePopupWithOverlay(event) {
//    if (event.target === event.currentTarget) {
//        closePopup(event.currentTarget);
//    }
//}

//popupEdit.addEventListener('click', closePopupWithOverlay);

//const increasedImagePopup = document.querySelector('#popup-image');




const increasedImageCloseButton = document.querySelector('#increased-image-close-button');

//import { Popup } from './Popup.js';


const popupImage = new PopupWithImage("#popup-image");

popupImage.setEventListeners();

//increasedImagePopup.addEventListener('click', closePopupWithOverlay);

increasedImageCloseButton.addEventListener("click", () => {
    popupImage.closePopup();
});

//popupNewItem.addEventListener('click', closePopupWithOverlay);



//function closeByEscape(evt) {
//    if (evt.key === 'Escape') {
//        const openedPopup = document.querySelector('.popup_opened');
//        closePopup(openedPopup);
//   }
//}


//const BigImage = document.querySelector('.increased-image__image');
//const BigImageTitle = document.querySelector('.increased-image__title');

//export function handleOpenImagePopup(name, link) {
//    BigImageTitle.textContent = name;
//    BigImage.src = link;
//    BigImage.alt = name;
//
//   popupImage.openPopup(name, link);
//}

const todoList = new Section('.elements', (cardItem) => {
    todoList.addItem(createCard(cardItem))
});


function createCard(cardItem) {
    const card = new Card(cardItem, '.element-template');

    return card.generateCard();
}


todoList.renderItems(initialCards)