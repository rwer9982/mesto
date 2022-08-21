const validationForm = {
    formSelector: '.edit-form',
    inputSelector: '.edit-form__input',
    submitButtonSelector: '.edit-form__submit-button',
    inactiveButtonClass: 'edit-form__submit-button_disabled',
    inputErrorClass: 'edit-form__input_with-error',
    errorClass: 'edit-form__span',
};

function showInputError(formElement, inputElement, errorMessage, form) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(form.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(form.errorClass);
}

function hideInputError(formElement, inputElement, form) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(form.inputErrorClass);
    errorElement.classList.remove(form.errorClass);
    errorElement.textContent = '';

}

function checkInputValidity(formElement, inputElement, form) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, form);
    } else {
        hideInputError(formElement, inputElement, form);
    }
};


function setEventListeners(formElement, form) {
    const inputList = Array.from(formElement.querySelectorAll(form.inputSelector));
    const buttonElement = formElement.querySelector(form.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, form);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            formElement.addEventListener('submit', (evt) => {
                evt.preventDefault();
            });
            checkInputValidity(formElement, inputElement, form);
            toggleButtonState(inputList, buttonElement, form);
        });
    });
};

function enableValidation(form) {
    const formList = Array.from(document.querySelectorAll(form.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, form);
    });
}

enableValidation(validationForm);
// функции для активной/неактивной кнопок
function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

function toggleButtonState(inputList, buttonElement, form) {
    if (!hasInvalidInput(inputList)) {
        buttonElement.classList.remove(form.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    } else {
        buttonElement.classList.add(form.inactiveButtonClass)
        buttonElement.setAttribute('disabled', 'disabled');
    }
};

