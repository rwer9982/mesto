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

function showEditForm() {
    popupEdit.classList.add("popup_opened");
    fillEditFormFields();
};

function hideEditForm() {
    popupEdit.classList.remove("popup_opened");
};

function editfFormSubmitHandler(evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    hideEditForm();
};

editformButton.addEventListener("click", showEditForm);
editformCloseButton.addEventListener("click", hideEditForm);
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
//В функции openPopup и closePopup передается попап, который открывает и закрывает форму добавления карточки. Если сделать открытие через одну функцию, будет открываться сразу несколько попапов. В связи с этим для открытия разных попапов созданы разные функции.


function openPopup() {
    popupNewItem.classList.add("popup_opened");
};

function closePopup() {
    popupNewItem.classList.remove("popup_opened");
};


function formAddItemHandler(evt) {
    evt.preventDefault();
    closePopup();
};

addNewItemButton.addEventListener("click", openPopup);
newItemPopupCloseButton.addEventListener("click", closePopup);
formElementAddItem.addEventListener("submit", formAddItemHandler);

//закрытие большой картинки


const increasedImagePopup = document.querySelector('#popup-image');
const increasedImageCloseButton = document.querySelector('#increased-image-close-button');

function hideIncreasedImage() {
    increasedImagePopup.classList.remove('popup_opened');
};

increasedImageCloseButton.addEventListener("click", hideIncreasedImage);

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

    //добавление и удаление классов 'popup_opened' передаются разным константам, поэтому необходимо использовать разные функции
    function showIncreasedImage() {
        increasedImagePopup.classList.add('popup_opened');
    }

    const elementTextFill = document.querySelector('.increased-image__title');
    const elementImageFill = document.querySelector('.increased-image__image');

    bimImage.addEventListener("click", function () {

        elementTextFill.textContent = item.name;
        elementImageFill.src = item.link;
        showIncreasedImage();
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

//Добавление карточки кнопкой

formElementAddItem.addEventListener('submit', function (item) {
    addCard(item);
    
    elementsList.querySelector('.element__text').textContent = newItemNameInput.value; 
    elementsList.querySelector('.element__image').src = newItemImageInput.value;
    
});
