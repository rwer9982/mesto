export class FormValidator {

    constructor(validationConfig, formElement) {
        this.validationConfig = validationConfig;
        this.formElement = formElement;
        this.inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
        this.buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

    }
    
    _showInputError(inputElement, errorMessage) {
        const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this.validationConfig.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this.validationConfig.errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this.validationConfig.inputErrorClass);
        errorElement.classList.remove(this.validationConfig.errorClass);
        errorElement.textContent = '';

    }

    _checkInputValidity() {
        this.inputList.forEach((inputElement) => {
            if (!inputElement.validity.valid) {
                this._showInputError(inputElement, inputElement.validationMessage);
            } else {
                this._hideInputError(inputElement);
            }
        })
    }

    _setEventListeners() {
        this._toggleButtonState();
        this.inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                inputElement.addEventListener('submit', (evt) => {
                    evt.preventDefault();
                });
                this._checkInputValidity();
                this._toggleButtonState();
            });
        });
    };

    enableValidation() {
        this._setEventListeners(this.formElement);
    }

    _hasInvalidInput() {
        return this.inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    _toggleButtonState() {
        if (!this._hasInvalidInput()) {
            this.buttonElement.classList.remove(this.validationConfig.inactiveButtonClass);
            this.buttonElement.removeAttribute('disabled');
        } else {
            this.buttonElement.classList.add(this.validationConfig.inactiveButtonClass)
            this.buttonElement.setAttribute('disabled', 'disabled');
        }
    }

}