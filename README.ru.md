# Actions on Google: простое приложение для поиска гифок на Dialogflow и Cloud Functions for Firebase (Node.js)

Простое приложение для Google Ассистента, разработанное на Dialogflow и Cloud Functions for Firebase (Node.js). Позволяет искать гифки через GIPHY API. Агент Dialogflow сконфигурирован для работы с русским языком.  

## Инструкция по установке

### Шаги
1. Перейдите в консоль Dialogflow и создайте нового агента или выберите существующего. 
2. Кликните на иконке настроек, перейдите в раздел Export and Import и нажмите кнопку RESTORE FROM ZIP. Выберите ZIP файл из корневой директории репозитория. 
3. Выберите *Fulfillment* из левого навигационного меню.
4. Включите настройку *Inline Editor*.
5. Скопируйте содержимое файлов из директории <code>functions</code> в соответствующие вкладки в *Fulfillment*.
6. Укажите ваш ключ доступа к GIPHY API во вкладке <code>index.js</code>.
7. Перейдите в консоль Firebase и смените ваш тарифный план на Flame или Blaze. Работа со сторонними сервисами по сети недоступна в рамках бесплатного тарифного плана. 

## Полезные ссылки
* Документация Actions on Google: [https://developers.google.com/actions/](https://developers.google.com/actions/).
* Документация Dialoglow: [https://dialogflow.com/docs/](https://dialogflow.com/docs/). 
* Документация Cloud Functions for Firebase: [https://firebase.google.com/docs/functions/](https://firebase.google.com/docs/functions/). 

## Лицензия
Смотрите [LICENSE](LICENSE).