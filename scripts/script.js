const editformButton = document.querySelector(".profile__editbutton");
const popup = document.querySelector(".popup");
const editformCloseButton = document.querySelector(".editform__closebutton");
let name = document.querySelector(".profile__title");
let job = document.querySelector(".profile__subtitle");
let nameInput = document.querySelector(".editform__input_type_title");
let jobInput = document.querySelector(".editform__input_type_subtitle");
const formElement = document.querySelector(".editform__submitbutton")

function ShowEditForm() {
    popup.classList.remove("popup_closed");
};

function HideEditForm() {
    popup.classList.add("popup_closed");
};

function DefaultFillForm () {
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    HideEditForm();
};

DefaultFillForm();
editformButton.addEventListener("click", ShowEditForm);
editformCloseButton.addEventListener("click", HideEditForm);
formElement.addEventListener("click", formSubmitHandler);