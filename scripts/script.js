///ПР4

const editformButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector("#popup-edit-form");
const editformCloseButton = document.querySelector("#edit-form-close-button");
const name = document.querySelector(".profile__title");
const job = document.querySelector(".profile__subtitle");
const nameInput = document.querySelector("#edit-form-title");
const jobInput = document.querySelector("#edit-form-subtitle");
const editFormElement = document.querySelector("#edit-form");

const elementTextFill = document.querySelector('.increased-image__title');
const elementImageFill = document.querySelector('.increased-image__image');

function fillEditFormFields() {
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
}

function openPopup(popup) {
    popup.classList.add("popup_opened");
};

function closePopup(popup) {
    popup.classList.remove("popup_opened");
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

///ПР5

const popupNewItem = document.querySelector("#popup-new-item-form");
const addNewItemButton = document.querySelector(".profile__add-button");
const newItemPopupCloseButton = document.querySelector("#new-item-form-close-button");
const formElementAddItem = document.querySelector("#add-item-form");
const newItemImageInput = document.querySelector("#add-card-image");
const newItemNameInput = document.querySelector("#add-card-text");
const newItemSubmitButton = document.querySelector("#new-item-form-submit-button");


const elementsList = document.querySelector('.elements');
const elementTemplate = document.querySelector('.element-template').content.querySelector(".element");

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

///Добавление и удаление карт


function createCard(item) {
    const elementItem = elementTemplate.cloneNode(true);
    const trashButton = elementItem.querySelector('.element__trash-button');
    const likeButton = elementItem.querySelector('.element__like');
    const bimImage = elementItem.querySelector('#element-image');

    elementItem.querySelector('.element__text').textContent = item.name;
    bimImage.src = item.link;
    bimImage.alt = item.name;

    //Удаление картинки
    trashButton.addEventListener('click', function () {
        elementItem.remove();
    });

    //Лайк
    likeButton.addEventListener("click", function () {
        likeButton.classList.toggle('element__like_active');
    });
    //Увеличение картинки



    bimImage.addEventListener("click", function () {

        elementTextFill.textContent = item.name;
        elementImageFill.src = item.link;
        elementImageFill.alt = item.name;
        openPopup(increasedImagePopup);
    });
    return elementItem;
};

function addCard(item) {
    elementsList.prepend(createCard(item));
}

function createInitialCards() {
    initialCards.forEach(addCard)
};

createInitialCards();

//закрытие попапа на оверлей и Esc
function closePopupWithOverlay(evt) {
    if (event.target === event.currentTarget) {
        closePopup(evt);
    }
}

popupEdit.addEventListener('click', () => {
    closePopupWithOverlay(popupEdit);
});

increasedImagePopup.addEventListener('click', () => {
    closePopupWithOverlay(increasedImagePopup);
});

popupNewItem.addEventListener('click', () => {
    closePopupWithOverlay(popupNewItem);
});
//////////////
function closeByEscape(evt) {
    evt.preventDefault();
    if (evt.key === "Escape") {
        closePopup(popupEdit);
    };
    if (evt.key === "Escape") {
        closePopup(increasedImagePopup);
    };
    if (evt.key === "Escape") {
        closePopup(popupNewItem);
    };
};

document.addEventListener('keydown', closeByEscape);
//////////