const selectors = {
  formSelector: ".popup__form",
  submitSelector: ".popup__save",
  inputSelector: ".popup__input",
  errorClass: "form__input-error_active",
  inputErrorClass: "popup__input_type_error",
  disabledButtonClass: "popup__save_inactive",
};

const showInputError = (selectors, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(selectors.inputErrorClass);
  errorElement.classList.add(selectors.errorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (selectors, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(selectors.inputErrorClass);
  errorElement.classList.remove(selectors.errorClass);
  errorElement.textContent = "";
};

const isValid = (selectors, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(selectors, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(selectors, formElement, inputElement);
  }
};

const setEventListeners = (selectors, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  const buttonElement = formElement.querySelector(selectors.submitSelector);
  toggleButtonState(selectors, inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      toggleButtonState(selectors, inputList, buttonElement);
      isValid(selectors, formElement, inputElement);
    });
  });
};

const enableValidation = (selectors) => {
  const forms = Array.from(document.querySelectorAll(selectors.formSelector));
  forms.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(selectors, formElement);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (selectors, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(selectors.disabledButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(selectors.disabledButtonClass);
    buttonElement.disabled = false;
  }
};

const resetValidation = (selectors, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  const buttonElement = formElement.querySelector(selectors.submitSelector);

  inputList.forEach((inputElement) => {
    hideInputError(selectors, formElement, inputElement);
  });
  toggleButtonState(selectors, inputList, buttonElement);
};

enableValidation(selectors);