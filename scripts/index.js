const editButton = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('.popup__input_type_name');
const aboutInput = document.querySelector('.popup__input_type_about');
const nameTitle = document.querySelector('.profile__title');
const aboutSubtitle = document.querySelector('.profile__subtitle');
const formElement = document.querySelector('.popup__form');
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close');

const toggleOpenPopup = () => {
  popup.classList.toggle('popup_opened');
};

const handleEditButtonClick = () => {
  toggleOpenPopup();
  nameInput.value = nameTitle.textContent;
  aboutInput.value = aboutSubtitle.textContent;
};

const handleCloseButtonClick = () => {
  toggleOpenPopup();
};

const handleOverlayClick = (event) => {
  if (event.target === event.currentTarget) {
    toggleOpenPopup();
  }
};

function handleFormSubmit (evt) {
  evt.preventDefault();
  nameTitle.textContent = nameInput.value;
  aboutSubtitle.textContent = aboutInput.value;
  closePopup(formElement);
};


editButton.addEventListener('click', handleEditButtonClick);
closeButton.addEventListener('click', handleCloseButtonClick);
popup.addEventListener('click', handleOverlayClick);
formElement.addEventListener('submit', handleFormSubmit);
