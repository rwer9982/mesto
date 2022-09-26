export class FormValidator {

    

    constructor(templateSelector) {
        this._templateSelector = templateSelector;
    }

    _showInputError(formElement, inputElement, errorMessage, validationConfig) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(validationConfig.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(validationConfig.errorClass);
    }

    _hideInputError(formElement, inputElement, validationConfig) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(validationConfig.inputErrorClass);
        errorElement.classList.remove(validationConfig.errorClass);
        errorElement.textContent = '';

    }

    _checkInputValidity(formElement, inputElement, validationConfig) {
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
        } else {
            this._hideInputError(formElement, inputElement, validationConfig);
        }
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    _toggleButtonState(inputList, buttonElement, validationConfig) {
        if (!this._hasInvalidInput(inputList)) {
            buttonElement.classList.remove(validationConfig.inactiveButtonClass);
            buttonElement.removeAttribute('disabled');
        } else {
            buttonElement.classList.add(validationConfig.inactiveButtonClass)
            buttonElement.setAttribute('disabled', 'disabled');
        }
    }

    _setEventListeners(formElement, validationConfig) {
        const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
        const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
        this._toggleButtonState(inputList, buttonElement, validationConfig);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', function () {
                formElement.addEventListener('submit', (evt) => {
                    evt.preventDefault();
                });
                this._checkInputValidity(formElement, inputElement, validationConfig);
                this._toggleButtonState(inputList, buttonElement, validationConfig);
            });
        });
    };


    enableValidation(validationConfig) {
        const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
        formList.forEach((formElement) => {
            this._setEventListeners(formElement, validationConfig);
        });
    }
}