import { Card, initialCards } from "./Card.js";
import { FormValidator, selectors } from "./FormValidator.js";

const buttonEditProfile = document.querySelector(".profile__edit-button");
const nameInput = document.querySelector(".popup__input_type_name");
const aboutInput = document.querySelector(".popup__input_type_about");
const nameTitle = document.querySelector(".profile__title");
const aboutSubtitle = document.querySelector(".profile__subtitle");
const popupEdit = document.querySelector(".popup_edit");
const formEditElement = document.querySelector(".popup__form-edit");
const buttonCloseEdit = popupEdit.querySelector(".popup__close-edit");

const buttonAddCard = document.querySelector(".profile__add-button");
const placeNameInput = document.querySelector(".popup__input_type_placename");
const linkInput = document.querySelector(".popup__input_type_link");
const formAddElement = document.querySelector(".popup__form-add");
const popupAdd = document.querySelector(".popup_add");
const buttonCloseAdd = popupAdd.querySelector(".popup__close-add");

const popupView = document.querySelector(".popup_view");
const popupViewName = popupView.querySelector(".popup__image-header-view");
const popupViewImage = popupView.querySelector(".popup__image-view");
const popupViewCloseButton = popupView.querySelector(".popup__close-view");

const elementsGrid = document.querySelector(".elements");
const templateSelector = document.querySelector(".element-template").content;

const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscClose);
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscClose);
};

const handleEscClose = (evt) => {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
};

const popupOverlayClose = document.querySelectorAll(".popup");
popupOverlayClose.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});

const openPopupViewByImage = (elementImage) => {
  popupViewImage.src = elementImage.src;
  popupViewImage.alt = elementImage.alt;
  popupViewName.textContent = elementImage.alt;
  openPopup(popupView);
};

const createNewCard = (data) => {
  const card = new Card(data, templateSelector, openPopupViewByImage);
  const elementCard = card.createCard();
  return elementCard;
};

const generateCard = (data) => {
  const elementCard = createNewCard(data);
  elementsGrid.prepend(elementCard);
};

initialCards.forEach((data) => {
  const elementCard = createNewCard(data);
  elementsGrid.append(elementCard);
});

const handleFormEditSubmit = (evt) => {
  evt.preventDefault();
  nameTitle.textContent = nameInput.value;
  aboutSubtitle.textContent = aboutInput.value;
  closePopup(popupEdit);
};

const handleFormAddSubmit = (evt) => {
  evt.preventDefault();
  const newCard = {
    name: placeNameInput.value,
    link: linkInput.value,
  };
  generateCard(newCard);
  formAddElement.reset();
  closePopup(popupAdd);
};

const validationFormEdit = new FormValidator(selectors, formEditElement);
validationFormEdit.enableValidation();
const validationFormAdd = new FormValidator(selectors, formAddElement);
validationFormAdd.enableValidation();

buttonEditProfile.addEventListener("click", () => {
  openPopup(popupEdit);
  nameInput.value = nameTitle.textContent;
  aboutInput.value = aboutSubtitle.textContent;
  validationFormEdit.resetValidation();
});

formEditElement.addEventListener("submit", handleFormEditSubmit);

buttonAddCard.addEventListener("click", () => {
  openPopup(popupAdd);
  formAddElement.reset();
  validationFormAdd.resetValidation();
});

formAddElement.addEventListener("submit", handleFormAddSubmit);