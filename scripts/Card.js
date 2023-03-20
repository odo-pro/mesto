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

class Card {
  constructor(data, templateSelector, openPopupViewByImage) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._openPopupViewByImage = openPopupViewByImage;
  }

  _getTemplate = () => {
    return this._templateSelector
    .querySelector(".element")
    .cloneNode(true);
  };

  _handleLikeButton = () => {
    this._likeButton.classList.toggle("element__like_active");
  };

  _handleCardRemoval = () => {
    this._card.remove();
  };

  _setEventListeners = () => {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleCardRemoval();
    });

    this._elementImage.addEventListener("click", () => {
      this._openPopupViewByImage(this._elementImage);
    });
  };

  createCard = () => {
    this._card = this._getTemplate();
    this._likeButton = this._card.querySelector(".element__like");
    this._deleteButton = this._card.querySelector(".element__delete");
    this._elementImage = this._card.querySelector(".element__image");
    this._elementName = this._card.querySelector(".element__name");

    this._setEventListeners();
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementName.textContent = this._name;

    return this._card;
  };
}

export { Card, initialCards };