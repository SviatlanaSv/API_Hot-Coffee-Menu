const coffeeList = document.querySelector('#coffee-list');

function getCoffeeData() {
    fetch('https://api.sampleapis.com/coffee/hot')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
          
            displayCoffees(data);
        })
      
}

function displayCoffees(coffees) {
    coffeeList.innerHTML = '';

    coffees.forEach(function(coffee) {
        const coffeeCard = document.createElement('div');
        coffeeCard.classList.add('coffee-card');

        coffeeCard.innerHTML = `
            <img src="${coffee.image}" alt="${coffee.title}">
            <h2>${coffee.title}</h2>
            <p>${coffee.description}</p>
            <div class="ingredients">Ingredients: ${coffee.ingredients.join(', ')}</div>
        `;

        coffeeList.appendChild(coffeeCard);
    });
}

document.querySelector('#search').addEventListener('keyup', function() {
    const searchTerm = this.value.toLowerCase();

    fetch('https://api.sampleapis.com/coffee/hot')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            const filteredCoffees = data.filter(function(coffee) {
                return coffee.title.toLowerCase().includes(searchTerm);
            });
            displayCoffees(filteredCoffees);
        })
        .catch(function(error) {
            console.log('Data filtering error:', error);
        });
});

getCoffeeData();
