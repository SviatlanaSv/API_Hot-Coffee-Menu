// Get the container where the coffee list will be shown
const coffeeList = document.querySelector('#coffee-list');

// Get coffee data from the API
function getCoffeeData() {
    fetch('https://api.sampleapis.com/coffee/hot')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            displayCoffees(data);
        })
}

// Function to display coffee data on the page
function displayCoffees(coffees) {
    // Clear the list before adding new coffee items
    coffeeList.innerHTML = '';

    // Loop through each coffee and create a card for it
    coffees.forEach(function(coffee) {
        const coffeeCard = document.createElement('div');  // Create card div
        coffeeCard.classList.add('coffee-card');  // Add class

        // Add content (image, title, description, ingredients)
        coffeeCard.innerHTML = `
            <img src="${coffee.image}" alt="${coffee.title}">
            <h2>${coffee.title}</h2>
            <p>${coffee.description}</p>
            <div class="ingredients">Ingredients: ${coffee.ingredients.join(', ')}</div>
        `;

        // Add the card to the list
        coffeeList.appendChild(coffeeCard);
    });
}

// Search functionality 
document.querySelector('#search').addEventListener('keyup', function() {
    const searchTerm = this.value.toLowerCase();  
    // Fetch the coffee data again to filter it
    fetch('https://api.sampleapis.com/coffee/hot')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // Filter the coffee list based on the search term
            const filteredCoffees = data.filter(function(coffee) {
                return coffee.title.toLowerCase().includes(searchTerm);
            });
            displayCoffees(filteredCoffees);
        })
        .catch(function(error) {
            // Log an error if there's a problem
            console.log('Error filtering data:', error);
        });
});

getCoffeeData();
