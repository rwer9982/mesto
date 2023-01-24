import './index.css';
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { api } from '../components/Api.js';
import { PopupConfirm } from '../components/PopupConfirm.js';

let userId

Promise.all([api.getProfile(), api.getCards()])
    .then(([res, cardList]) => {
        userInfoChanger.setUserInfo({ name: res.name, job: res.about })
        userInfoChanger.setUserAvatar({ avatar: res.avatar })
        userId = res._id

        cardList.forEach(data => {
            const card = createCard({
                name: data.name,
                link: data.link,
                likes: data.likes,
                id: data._id,
                userId: userId,
                ownerId: data.owner._id
            })
            cardsList.addItem(card)
        })

    })
    .catch((err) => {
        console.log(err);
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

const nameAndJobDescription = { userName: ".profile__title", userJob: ".profile__subtitle", userAvatar: ".profile__avatar" };


const formEditValidator = new FormValidator(validationForm, popupEdit);
formEditValidator.enableValidation();

const userInfoChanger = new UserInfo(nameAndJobDescription);

function addUserInfo(data) {
    popupEditForm.setLoadingMessage(true)

    api.editProfile(data.name, data.job)
        .then(() => {
            userInfoChanger.setUserInfo(data);
            popupEditForm.closePopup();
        })
        .catch(function (err) {
            console.log('Ошибка', err)
        })
        .finally(function () {
            popupEditForm.setLoadingMessage(false)
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
//const avatarInput = document.querySelector("#edit-avatar");



const popupEditAvatarForm = new PopupWithForm("#popup-edit-avatar-form", "#edit-avatar-form", addAvatar);

popupEditAvatarForm.setEventListeners();

const avatarFormEditValidator = new FormValidator(validationFormAvatar, popupEditAvatar);
avatarFormEditValidator.enableValidation();


buttonAvatarForm.addEventListener("click", () => {
    popupEditAvatarForm.openPopup();
})

function addAvatar(data) {
    popupEditAvatarForm.setLoadingMessage(true)
    api.editAvatar(data.avatar)
        .then(() => {
            userInfoChanger.setUserAvatar(data);
            popupEditAvatarForm.closePopup();
        })
        .catch(function (err) {
            console.log('Ошибка', err)
        })
        .finally(function () {
            popupEditAvatarForm.setLoadingMessage(false)
        })
}




const addNewItemButton = document.querySelector(".profile__add-button");
const formElementAddItem = document.querySelector("#add-item-form");
//const newItemImageInput = document.querySelector("#add-card-image");
//const newItemNameInput = document.querySelector("#add-card-text");

const itemAddFormValidator = new FormValidator(validationForm, formElementAddItem);
itemAddFormValidator.enableValidation();

function addCard(data) {

    popupNewItem.setLoadingMessage(true)

    api.addCard(data.name, data.link)
        .then(res => {
            const card = createCard({
                name: res.name,
                link: res.link,
                likes: res.likes,
                id: res._id,
            })


            //            console.log('res', res)
            cardsList.addItem(card);
            popupNewItem.closePopup();
        })
        .catch(function (err) {
            console.log('Ошибка', err)
        })
        .finally(function () {
            popupNewItem.setLoadingMessage(false)
        })
}

const popupNewItem = new PopupWithForm("#popup-new-item-form", "#add-item-form", addCard);

popupNewItem.setEventListeners();


addNewItemButton.addEventListener("click", () => {
    popupNewItem.openPopup();
});



const popupImage = new PopupWithImage("#popup-image");

popupImage.setEventListeners();

const popupConfirm = new PopupConfirm("#popup-submit", "#submit-form");
popupConfirm.setEventListeners();

const cardsList = new Section('.elements', (cardItem) => {
    cardsList.addItem(createCard(cardItem))
});


function createCard(cardItem) {
    const card = new Card({
        handleOpenPopupImage: (name, link) => {
            popupImage.openPopup(name, link);
        }
    }, cardItem, '.element-template',
        (id) => {
            popupConfirm.openPopup();

            popupConfirm.setSubmit(() => {
                popupConfirm.setLoadingMessage(true);
                api.deleteCard(id)
                    .then(res => {
                        card.deleteCard();
                        popupConfirm.closePopup();

                    })
                    .catch(function (err) {
                        console.log('Ошибка', err)
                    })
                    .finally(res => {
                        popupConfirm.setLoadingMessage(false)
                    })
            })
        },
        (id) => {
            if (card.isLiked()) {
                api.deleteLike(id)
                    .then(res => {
                        card.setLikes(res.likes)
                    })
                    .catch(function (err) {
                        console.log('Ошибка', err)
                    })
            } else {
                api.addLike(id)
                    .then(res => {
                        card.setLikes(res.likes)
                    })
                    .catch(function (err) {
                        console.log('Ошибка', err)
                    })
            }
        }
    );

    return card.generateCard();
}

//todoList.renderItems(initialCards);