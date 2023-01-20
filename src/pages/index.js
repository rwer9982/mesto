import './index.css';
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { api } from '../components/Api.js';

let userId

api.getProfile()
    .then(res => {
        userInfoChanger.setUserInfoDefault({ name: res.name, job: res.about, avatar: res.avatar })
        userId = res._id
    })


api.getCards()
    .then(cardList => {
        cardList.forEach(data => {
            const card = createCard({
                name: data.name,
                link: data.link,
                likes: data.likes,
                id: data._id,
                userId: userId,
                ownerId: data.owner._id
            })
            todoList.addItem(card)
        })
    })


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
const nameInput = document.querySelector("#edit-form-title");
const jobInput = document.querySelector("#edit-form-subtitle");
const editFormSubmitButton = document.querySelector("#edit-form-submit-button")

const nameAndJobDescription = { userName: ".profile__title", userJob: ".profile__subtitle", userAvatar: ".profile__avatar" };


const formEditValidator = new FormValidator(validationForm, popupEdit);
formEditValidator.enableValidation();

const userInfoChanger = new UserInfo(nameAndJobDescription);

function setLoadingMessage(loading, sumbitButton) {
    if (loading) {
        sumbitButton.innerText = 'Сохраняется...'
    }
    else {
        sumbitButton.innerText = 'Сохранить'
    }
}

function addUserInfo(data) {
    setLoadingMessage(true, editFormSubmitButton)
    api.editProfile(data.name, data.job)
        .then(() => {
            userInfoChanger.setUserInfo(data)
        })
        .catch(function (err) {
            console.log('Ошибка', err)
        })
        .finally(function () {
            setLoadingMessage(false, editFormSubmitButton)
        })
}

const popupEditForm = new PopupWithForm("#popup-edit-form", "#edit-form", addUserInfo);

popupEditForm.setEventListeners();

function fillEditFormFields() {
    nameInput.value = userInfoChanger.getUserInfo().name;
    jobInput.value = userInfoChanger.getUserInfo().job;
}

buttonEditForm.addEventListener("click", () => {
    fillEditFormFields();
    popupEditForm.openPopup();
});
//////////////////////////////////////////АВАТАР!!
const validationFormAvatar = {
    formSelector: '.edit-avatar-form',
    inputSelector: '.edit-avatar-form__input',
    submitButtonSelector: '.edit-avatar-form__submit-button',
    inactiveButtonClass: 'edit-avatar-form__submit-button_disabled',
    inputErrorClass: 'edit-avatar-form__input_with-error',
    errorClass: 'edit-avatar-form__span',
}

const buttonAvatarForm = document.querySelector(".profile__avatar-container");
const popupEditAvatar = document.querySelector("#popup-edit-avatar-form");
const avatarInput = document.querySelector("#edit-avatar");

const avatarSubmitButton = document.querySelector(".edit-avatar-form__submit-button")


const popupEditAvatarForm = new PopupWithForm("#popup-edit-avatar-form", "#edit-avatar-form", addAvatar);

popupEditAvatarForm.setEventListeners();

const avatarFormEditValidator = new FormValidator(validationFormAvatar, popupEditAvatar);
avatarFormEditValidator.enableValidation();


buttonAvatarForm.addEventListener("click", () => {
    popupEditAvatarForm.openPopup();
})

function addAvatar(data) {

    data.avatar = avatarInput.value;
    setLoadingMessage(true, avatarSubmitButton)
    api.editAvatar(data.avatar)
        .then(res => {
            const avatar = {
                avatar: res.avatar,
            }
            userInfoChanger.setUserAvatar(avatar)
        })
        .catch(function (err) {
            console.log('Ошибка', err)
        })
        .finally(function () {
            setLoadingMessage(false, avatarSubmitButton)
        })
}


//////////////////////////////////////////АВАТАР1!!!

const addNewItemButton = document.querySelector(".profile__add-button");
const formElementAddItem = document.querySelector("#add-item-form");
const newItemImageInput = document.querySelector("#add-card-image");
const newItemNameInput = document.querySelector("#add-card-text");
const newItemFormSubmitButton = document.querySelector("#new-item-form-submit-button")

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

    data.name = newItemNameInput.value;
    data.link = newItemImageInput.value;

    setLoadingMessage(true, newItemFormSubmitButton)

    api.addCard(data.name, data.link)
        .then(res => {
            const card = createCard({
                name: res.name,
                link: res.link,
                likes: res.likes,
                id: res._id,
            })


            console.log('res', res)
            todoList.addItem(card);
        })
        .catch(function (err) {
            console.log('Ошибка', err)
        })
        .finally(function () {
            setLoadingMessage(false, newItemFormSubmitButton)
        })
}

const popupNewItem = new PopupWithForm("#popup-new-item-form", "#add-item-form", addCard);

popupNewItem.setEventListeners();


addNewItemButton.addEventListener("click", () => {
    popupNewItem.openPopup();
});



const popupImage = new PopupWithImage("#popup-image");

popupImage.setEventListeners();

const popupConfirm = new PopupWithForm("#popup-submit", "#submit-form");
popupConfirm.setEventListeners();

const todoList = new Section('.elements', (cardItem) => {
    todoList.addItem(createCard(cardItem))
});


function createCard(cardItem) {
    const card = new Card({
        handleOpenPopupImage: (name, link) => {
            popupImage.openPopup(name, link);
        }
    }, cardItem, '.element-template',
        (id) => {
            popupConfirm.openPopup();
            popupConfirm.changeSubmitHandler(() => {
                api.deleteCard(id)
                    .then(res => {
                        card.deleteCard();
                        console.log(res)
                    })
            })
        },
        (id) => {
            if (card.isLiked()) {
                api.deleteLike(id)
                    .then(res => {
                        card.setLikes(res.likes)
                        //                    console.log(res)
                    })
            } else {
                api.addLike(id)
                    .then(res => {
                        card.setLikes(res.likes)
                        //                    console.log(res)
                    })
            }
        }
    );

    return card.generateCard();
}

//todoList.renderItems(initialCards);