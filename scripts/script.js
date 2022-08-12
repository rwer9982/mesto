///ПР4

const editformButton = document.querySelector(".profile__editbutton");
const popupEdit = document.querySelector("#popup-editform");
const editformCloseButton = document.querySelector("#editform-closebutton");
let name = document.querySelector(".profile__title");
let job = document.querySelector(".profile__subtitle");
let nameInput = document.querySelector("#editform-title");
let jobInput = document.querySelector("#editform-subtitle");
let formElement = document.querySelector("#editform");

function defaultFillForm() {
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
}

function showEditForm() {
    popupEdit.classList.add("popup_opened");
    defaultFillForm();
};

function hideEditForm() {
    popupEdit.classList.remove("popup_opened");
};

function formSubmitHandler(evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    hideEditForm();
};

editformButton.addEventListener("click", showEditForm);
editformCloseButton.addEventListener("click", hideEditForm);
formElement.addEventListener("submit", formSubmitHandler);

///ПР5

const popupNewItem = document.querySelector("#popup-newitemform");
const newItemButton = document.querySelector(".profile__addbutton");
const newItemFormCloseButton = document.querySelector("#newitemform-closebutton");
let formElementAddItem = document.querySelector("#additemform");
let imageAdder = document.querySelector("#addcardimage");
let textAdder = document.querySelector("#addcardtext");


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

function showNewItemForm() {
    popupNewItem.classList.add("popup_opened");
};

function hideNewItemForm() {
    popupNewItem.classList.remove("popup_opened");
};


function formAddItemHandler(evt) {
    evt.preventDefault();
    hideNewItemForm();
};

newItemButton.addEventListener("click", showNewItemForm);
newItemFormCloseButton.addEventListener("click", hideNewItemForm);
formElementAddItem.addEventListener("submit", formAddItemHandler);

///Добавление и удаление карт

function cardEditor(item) {
    const elementItem = elementTemplate.cloneNode(true);
    const trashButton = elementItem.querySelector('.element__trash-button');

    elementItem.querySelector('.element__text').textContent = item.name;
    elementItem.querySelector('.element__image').src = item.link;
    const likeButton = elementItem.querySelector('.element__like');

    elementsList.append(elementItem);


    //Удаление картинки
    trashButton.addEventListener('click', function () {
        elementItem.remove();
    });

    //Лайк
    likeButton.addEventListener("click", function () {
        likeButton.classList.toggle('element__like_active');
    });
    //Увеличение картинки
    const chosenImage = elementItem.querySelector('#element-image');
    const increasedImage = document.querySelector('#popup-image');
    const increasedImageCloseButton = document.querySelector('#increased-image-closebutton');


    function showIncreasedImage() {
        increasedImage.classList.add('popup_opened');
    }

    function hideIncreasedImage() {
        increasedImage.classList.remove('popup_opened');
    }

    chosenImage.addEventListener("click", showIncreasedImage);



    chosenImage.addEventListener("click", function () {

        const elementTextFill = document.querySelector('.increased-image__title');
        const elementImageFill = document.querySelector('.increased-image__image');

        elementTextFill.textContent = item.name;
        elementImageFill.src = item.link;

    });
    increasedImageCloseButton.addEventListener("click", hideIncreasedImage);
};

function createInitialCards() {
    initialCards.forEach(cardEditor)
};

createInitialCards();

//Добавление епрточки кнопкой

formElementAddItem.addEventListener('submit', function (item) {
    const elementItem = elementTemplate.cloneNode(true);

    elementItem.querySelector('.element__text').textContent = textAdder.value;
    elementItem.querySelector('.element__image').src = imageAdder.value;

    elementsList.prepend(elementItem);

});
