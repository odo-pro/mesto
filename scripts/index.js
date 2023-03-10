const editButton = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('.popup__input_type_name');
const aboutInput = document.querySelector('.popup__input_type_about');
const nameTitle = document.querySelector('.profile__title');
const aboutSubtitle = document.querySelector('.profile__subtitle');
const popupEdit = document.querySelector('.popup_edit');
const formEditElement = document.querySelector('.popup__form-edit');
const buttonCloseEdit = popupEdit.querySelector('.popup__close-edit');

const addButton = document.querySelector('.profile__add-button');
const placeNameInput = document.querySelector('.popup__input_type_placename');
const linkInput = document.querySelector('.popup__input_type_link');
const formAddElement = document.querySelector('.popup__form-add');
const popupAdd = document.querySelector('.popup_add');
const buttonCloseAdd = popupAdd.querySelector('.popup__close-add');

const popupView = document.querySelector('.popup_view');
const popupViewName = popupView.querySelector('.popup__image-header-view');
const popupViewImage = popupView.querySelector('.popup__image-view');
const popupViewCloseButton = popupView.querySelector('.popup__close-view');

const elementsGrid = document.querySelector('.elements');
const template = document.querySelector('.element-template').content;

const popupList = document.querySelectorAll('.popup');

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscClose);
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscClose);
};

const handleEscClose = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
};

popupList.forEach(popup => {
  popup.addEventListener('mousedown', (evt) => {
    const targetClassList = evt.target.classList;
    if(targetClassList.contains('popup') || targetClassList.contains('popup_close'))
    closePopup(popup);
  })
});

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

const closeButtons = document.querySelectorAll('.popup__close');

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () =>
  closePopup(popup));
});

editButton.addEventListener('click', () => {
  openPopup(popupEdit);
  nameInput.value = nameTitle.textContent;
  aboutInput.value = aboutSubtitle.textContent;
});

formEditElement.addEventListener('submit', handleFormEditSubmit);

addButton.addEventListener('click', () => {
  openPopup(popupAdd);
});

formAddElement.addEventListener('submit', handleFormAddSubmit);