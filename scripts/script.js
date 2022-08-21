///ПР4

const editformButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector("#popup-edit-form");
const editformCloseButton = document.querySelector("#edit-form-close-button");
const name = document.querySelector(".profile__title");
const job = document.querySelector(".profile__subtitle");
const nameInput = document.querySelector("#edit-form-title");
const jobInput = document.querySelector("#edit-form-subtitle");
const editFormElement = document.querySelector("#edit-form");

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

function editfFormSubmitHandler(evt) {
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
editFormElement.addEventListener("submit", editfFormSubmitHandler);

///ПР5

const popupNewItem = document.querySelector("#popup-new-item-form");
const addNewItemButton = document.querySelector(".profile__add-button");
const newItemPopupCloseButton = document.querySelector("#new-item-form-close-button");
const formElementAddItem = document.querySelector("#add-item-form");
const newItemImageInput = document.querySelector("#add-card-image");
const newItemNameInput = document.querySelector("#add-card-text");


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

function formAddItemHandler(evt) {
    evt.preventDefault();
    const item = { name: newItemNameInput.value, link: newItemImageInput.value };
    addCard(item);
    closePopup(popupNewItem);
};

addNewItemButton.addEventListener("click", () => {
    openPopup(popupNewItem);
});

newItemPopupCloseButton.addEventListener("click", () => {
    closePopup(popupNewItem);
});

formElementAddItem.addEventListener("submit", formAddItemHandler);

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

    elementItem.querySelector('.element__text').textContent = item.name;
    elementItem.querySelector('.element__image').src = item.link;

    //Удаление картинки
    trashButton.addEventListener('click', function () {
        elementItem.remove();
    });

    //Лайк
    likeButton.addEventListener("click", function () {
        likeButton.classList.toggle('element__like_active');
    });
    //Увеличение картинки
    const bimImage = elementItem.querySelector('#element-image');
    const elementTextFill = document.querySelector('.increased-image__title');
    const elementImageFill = document.querySelector('.increased-image__image');

    bimImage.addEventListener("click", function () {

        elementTextFill.textContent = item.name;
        elementImageFill.src = item.link;
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
popupEdit.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
        closePopup(popupEdit);

    };
});

increasedImagePopup.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
        closePopup(increasedImagePopup);
    }
});

popupNewItem.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
        closePopup(popupNewItem);
    }
});

document.addEventListener('keydown', (evt) => {
    evt.preventDefault;
    if (evt.key === "Escape") {
        closePopup(popupEdit);
    };
    if (evt.key === "Escape") {
        closePopup(increasedImagePopup);
    };
    if (evt.key === "Escape") {
        closePopup(popupNewItem);
    };
});