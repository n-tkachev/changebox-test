import { createI18n } from "vue-i18n";

const i18n = createI18n({
  legacy: false,
  locale: "en",
  messages: {
    en: {
      message: {
        language: "English",
        home: {
          header: "Home Page",
          tabTitle: "Home"
        },
        cardsList: {
          header: "Cards List",
          tabTitle: "Cards List"
        },
        createCard: {
          successDeleted: "Card deleted",
          errorDeleted: "Error deleting card",
          successEdited: "Card edited",
          errorEdited: "Error editing card",
          successCreated: "Card created",
          errorCreated: "Error creating card",
          tabTitle: "Create Card",
          header: "Create Card",
          title: 'Title',
          description: 'Description',
          selectImage: 'Select Image',
          save: 'Save'
        }
      }
    },
    ru: {
      message: {
        language: "Русский",
        home: {
          header: "Главная",
          tabTitle: "Главная"
        },
        cardsList: {
          header: "Галерея карточек",
          tabTitle: "Галерея карточек"
        },
        createCard: {
          successDeleted: "Карточка успешно удалена",
          errorDeleted: "Ошибка при удалении карточки",
          successEdited: "Карточка успешно отредактирована",
          errorEdited: "Ошибка редактирования карточки",
          successCreated: "Карточка создана",
          errorCreated: "Ошибка при создании карточки",
          header: "Создать карточку",
          tabTitle: "Создать карточку",
          title: 'Название',
          description: 'Описание',
          selectImage: 'Выберите изображение',
          save: 'Сохранить'
        }
      }
    }
  }
})

i18n.global.locale.value = 'ru'

export default i18n