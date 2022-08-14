///ПР4

const editformButton = document.querySelector(".profile__editbutton");
const popupEdit = document.querySelector("#popup-editform");
const editformCloseButton = document.querySelector("#editform-closebutton");
const name = document.querySelector(".profile__title");
const job = document.querySelector(".profile__subtitle");
let nameInput = document.querySelector("#editform-title");
let jobInput = document.querySelector("#editform-subtitle");
const formElement = document.querySelector("#editform");

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

function EditfFormSubmitHandler(evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    hideEditForm();
};

editformButton.addEventListener("click", showEditForm);
editformCloseButton.addEventListener("click", hideEditForm);
formElement.addEventListener("submit", EditfFormSubmitHandler);

///ПР5

const popupNewItem = document.querySelector("#popup-newitemform");
const addNewItemButton = document.querySelector(".profile__addbutton");
const newItemPopupCloseButton = document.querySelector("#newitemform-closebutton");
const formElementAddItem = document.querySelector("#additemform");
const newItemImageInput = document.querySelector("#addcardimage");
const newItemNameInput = document.querySelector("#addcardtext");


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
const increasedImageCloseButton = document.querySelector('#increased-image-closebutton');

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



    function addCard() {
        elementsList.prepend(elementItem);
    }
    addCard();



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

    

    bimImage.addEventListener("click", showIncreasedImage);

    const elementTextFill = document.querySelector('.increased-image__title');
    const elementImageFill = document.querySelector('.increased-image__image');

    bimImage.addEventListener("click", function () {

        elementTextFill.textContent = item.name;
        elementImageFill.src = item.link;

    });

};



function createInitialCards() {
    initialCards.forEach(createCard)
};


createInitialCards();




//Добавление карточки кнопкой

formElementAddItem.addEventListener('submit', function (item) {
    const elementItem = elementTemplate.cloneNode(true);

    elementItem.querySelector('.element__text').textContent = newItemNameInput.value;
    elementItem.querySelector('.element__image').src = newItemImageInput.value;

    function addCard() {
        elementsList.prepend(elementItem);
    }
    addCard();

});
