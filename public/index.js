import { db } from "./firebase.js";
import { ref, onValue } from "firebase/database";

const productList = document.getElementById("product-list");

// Fetch products from Firebase
const productsRef = ref(db, "products");

onValue(productsRef, (snapshot) => {
    productList.innerHTML = ""; // Clear previous content

    const products = snapshot.val();
    for (let id in products) {
        const product = products[id];
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p>Price: $${parseFloat(product.price).toFixed(2)}</p>
            <img src="${product.image}" alt="${product.name}">
        `;
        productList.appendChild(productDiv);
    }
});

