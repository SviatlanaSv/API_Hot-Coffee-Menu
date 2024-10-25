// Элемент для списка кофе
const coffeeList = document.querySelector('#coffee-list');

// Функция для загрузки данных о кофе
function getCoffeeData() {
    // Используем fetch для запроса данных с API
    fetch('https://api.sampleapis.com/coffee/hot')
        .then(function(response) {
            // Преобразуем ответ в JSON
            return response.json();
        })
        .then(function(data) {
            // Отображаем кофе на странице
            displayCoffees(data);
        })
      
}

// Функция для отображения списка кофе
function displayCoffees(coffees) {
    // Очищаем контейнер перед добавлением новых элементов
    coffeeList.innerHTML = '';

    // Проходим по каждому объекту кофе и создаем карточки
    coffees.forEach(function(coffee) {
        // Создаем элемент карточки
        const coffeeCard = document.createElement('div');
        coffeeCard.classList.add('coffee-card');

        // Вставляем данные в карточку
        coffeeCard.innerHTML = `
            <img src="${coffee.image}" alt="${coffee.title}">
            <h2>${coffee.title}</h2>
            <p>${coffee.description}</p>
            <div class="ingredients">Ingredients: ${coffee.ingredients.join(', ')}</div>
        `;

        // Добавляем карточку на страницу
        coffeeList.appendChild(coffeeCard);
    });
}

// Добавляем обработчик для поиска кофе
document.getElementById('search').addEventListener('keyup', function() {
    // Получаем введенный текст в нижнем регистре
    const searchTerm = this.value.toLowerCase();

    // Используем fetch, чтобы заново загрузить данные и применить фильтр
    fetch('https://api.sampleapis.com/coffee/hot')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // Фильтруем данные по заголовку
            const filteredCoffees = data.filter(function(coffee) {
                return coffee.title.toLowerCase().includes(searchTerm);
            });
            // Отображаем отфильтрованные данные
            displayCoffees(filteredCoffees);
        })
        .catch(function(error) {
            console.log('Ошибка при фильтрации данных:', error);
        });
});

// Загружаем данные при загрузке страницы
getCoffeeData();
