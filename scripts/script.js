const editformButton = document.querySelector(".profile__editbutton");
const popup = document.querySelector(".popup");
const editformCloseButton = document.querySelector(".editform__closebutton");
let name = document.querySelector(".profile__title");
let job = document.querySelector(".profile__subtitle");
let nameInput = document.querySelector(".editform__input_type_title");
let jobInput = document.querySelector(".editform__input_type_subtitle");
let formElement = document.querySelector(".editform");

function defaultFillForm () {
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
}

function showEditForm() {
    popup.classList.add("popup_opened");
    defaultFillForm();
};

function hideEditForm() {
    popup.classList.remove("popup_opened");
};

function formSubmitHandler (evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    hideEditForm();
};

editformButton.addEventListener("click", showEditForm);
editformCloseButton.addEventListener("click", hideEditForm);
formElement.addEventListener("submit", formSubmitHandler);