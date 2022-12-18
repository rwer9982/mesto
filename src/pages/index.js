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

const buttonEditForm = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector("#popup-edit-form");
const name = document.querySelector(".profile__title");
const job = document.querySelector(".profile__subtitle");
const nameInput = document.querySelector("#edit-form-title");
const jobInput = document.querySelector("#edit-form-subtitle");

const nameAndJobDescription = { userName: name, userJob: job };
const nameAndJobInput = { userName: nameInput.value, userJob: jobInput.value }

const formEditValidator = new FormValidator(validationForm, popupEdit);
formEditValidator.enableValidation();

const userInfoChanger = new UserInfo(nameAndJobDescription);

function addUserInfo(data) {
    userInfoChanger.setUserInfo(data);
}

const popupEditForm = new PopupWithForm("#popup-edit-form", "#edit-form", addUserInfo);

popupEditForm.setEventListeners();

function fillEditFormFields() {
    //    nameInput.value = name.textContent;
    //    jobInput.value = job.textContent;
    userInfoChanger.getUserInfo();
    userInfoChanger.setUserInfo(nameAndJobInput);
}

buttonEditForm.addEventListener("click", () => {
    fillEditFormFields();
    popupEditForm.openPopup();
});

const addNewItemButton = document.querySelector(".profile__add-button");
const formElementAddItem = document.querySelector("#add-item-form");
//const newItemImageInput = document.querySelector("#add-card-image");
//const newItemNameInput = document.querySelector("#add-card-text");

const itemAddFormValidator = new FormValidator(validationForm, formElementAddItem);
itemAddFormValidator.enableValidation();


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
function addCard(data) {
    todoList.addItem(createCard(data));
}
const popupNewItem = new PopupWithForm("#popup-new-item-form", "#add-item-form", addCard);

popupNewItem.setEventListeners();


addNewItemButton.addEventListener("click", () => {
    popupNewItem.openPopup();
});



const popupImage = new PopupWithImage("#popup-image");

popupImage.setEventListeners();

const todoList = new Section('.elements', (cardItem) => {
    todoList.addItem(createCard(cardItem))
});


function createCard(cardItem) {
    const card = new Card({
        handleOpenPopupImage: (name, link) => {
            popupImage.openPopup(name, link);
        }
    }, cardItem, '.element-template');

    return card.generateCard();
}

todoList.renderItems(initialCards)