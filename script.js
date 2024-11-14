document.addEventListener('DOMContentLoaded', () => {
    // Function to create a new product section
    function createProductSection(title, products) {
        // Create the section element
        const section = document.createElement('section');
        section.classList.add('product-category');

        // Add the section title
        const header = document.createElement('h2');
        header.textContent = title;
        section.appendChild(header);

        // Create product list container
        const productList = document.createElement('div');
        productList.classList.add('product-list');

        // Add products to the product list
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');

            // Create product content
            const img = document.createElement('img');
            img.src = product.image; // Make sure to replace with actual image URL
            img.alt = product.name;
            productDiv.appendChild(img);

            const name = document.createElement('p');
            name.textContent = product.name;
            productDiv.appendChild(name);

            const price = document.createElement('p');
            price.textContent = `$${product.price}`;
            productDiv.appendChild(price);

            // Add the product to the list
            productList.appendChild(productDiv);
        });

        // Append the product list to the section
        section.appendChild(productList);

        // Add the new section to the main content
        document.getElementById('main-content').appendChild(section);
    }

    // Function to fetch products from the server
    async function fetchProducts() {
        try {
            const response = await fetch('/api/products'); // Corrected endpoint
            if (response.ok) {
                const data = await response.json();
                // Assuming your API returns products as an array of sections
                createProductSection('New Arrivals', data.newArrivals);
                createProductSection('Best Sellers', data.bestSellers);
            } else {
                console.error('Failed to fetch products');
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    // Sidebar functionality
    const menuIcon = document.getElementById('menuIcon');
    const sidebar = document.getElementById('sidebar');
    const closeBtn = document.getElementById('closeBtn');

    // Toggle the sidebar visibility
    menuIcon.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    // Close the sidebar when clicking the close button
    closeBtn.addEventListener('click', () => {
        sidebar.classList.remove('active');
    });

    // Close the sidebar when clicking outside of it
    document.addEventListener('click', (event) => {
        if (!sidebar.contains(event.target) && !menuIcon.contains(event.target)) {
            sidebar.classList.remove('active');
        }
    });

    // Prevent closing the sidebar when clicking inside it
    sidebar.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    // Form handling for adding products
    const form = document.getElementById('add-product-form');

    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            // Gather form data
            const formData = new FormData(form);

            try {
                const response = await fetch('/api/products', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    const result = await response.text();
                    alert(result);
                    form.reset(); // Clear the form
                } else {
                    const error = await response.text();
                    alert(`Error: ${error}`);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('There was a problem adding the product.');
            }
        });
    }

    // Fetch and display products on page load
    fetchProducts();
});

