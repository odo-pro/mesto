const editButton = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('.popup__input_type_name');
const aboutInput = document.querySelector('.popup__input_type_about');
const nameTitle = document.querySelector('.profile__title');
const aboutSubtitle = document.querySelector('.profile__subtitle');
const popupEdit = document.querySelector('.popup__edit');
const formEditElement = document.querySelector('.popup__form-edit');
const closeEditButton = popupEdit.querySelector('.popup__close-edit');

const addButton = document.querySelector('.profile__add-button');
const placeNameInput = document.querySelector('.popup__input_type_placename');
const linkInput = document.querySelector('.popup__input_type_link');
const formAddElement = document.querySelector('.popup__form-add');
const popupAdd = document.querySelector('.popup__add');
const closeAddButton = popupAdd.querySelector('.popup__close-add');

const popupView = document.querySelector('.popup__view');
const popupViewName = popupView.querySelector('.popup__image-header-view');
const popupViewImage = popupView.querySelector('.popup__image-view');
const popupViewCloseButton = popupView.querySelector('.popup__close-view');

const elementsGrid = document.querySelector('.elements');
const template = document.querySelector('.element-template').content;

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

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
};

const handleFormEditSubmit = (evt) => {
  evt.preventDefault();
  nameTitle.textContent = nameInput.value;
  aboutSubtitle.textContent = aboutInput.value;
  closePopup(popupEdit);
};

const handleFormAddSubmit = (evt) => {
  evt.preventDefault();
  const newBlock = {
    name: placeNameInput.value,
    link: linkInput.value
  };
  elementsGrid.prepend(getBlock(newBlock));
  formAddElement.reset();
  closePopup(popupAdd);
};

const getBlock = (item) => {
  const elementsTemplate = template.cloneNode(true);
  const elementImage = elementsTemplate.querySelector('.element__image');

  elementsTemplate.querySelector('.element__name').textContent = item.name;
  elementImage.alt = item.name;
  elementImage.src = item.link;

  const likeButton = elementsTemplate.querySelector('.element__like');
  likeButton.addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like_active');
  });

  const deleteButton = elementsTemplate.querySelector('.element__delete');
  deleteButton.addEventListener('click', (evt) => {
    evt.target.closest('.element').remove();
  });

  elementsTemplate.querySelector('.element__image').addEventListener('click', () => {
    openPopup(popupView);
    popupViewImage.src = item.link;
    popupViewImage.alt = item.name;
    popupViewName.textContent = item.name;
  });

  return elementsTemplate;
};

initialCards.forEach((item) => {
  elementsGrid.append(getBlock(item));
});

popupViewCloseButton.addEventListener('click', () => {
  closePopup(popupView)
});

editButton.addEventListener('click', () => {
  openPopup(popupEdit);
  nameInput.value = nameTitle.textContent;
  aboutInput.value = aboutSubtitle.textContent;
});

closeEditButton.addEventListener('click', () => {
  closePopup(popupEdit);
});

formEditElement.addEventListener('submit', handleFormEditSubmit);

addButton.addEventListener('click', () => {
  openPopup(popupAdd);
});

closeAddButton.addEventListener('click', () => {
  closePopup(popupAdd);
});

formAddElement.addEventListener('submit', handleFormAddSubmit);