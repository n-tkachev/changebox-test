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