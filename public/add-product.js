import { db } from "./firebase.js";
import { ref, push } from "firebase/database";

const productForm = document.getElementById("productForm");

productForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Collect form data
    const productName = document.getElementById("productName").value;
    const productDescription = document.getElementById("productDescription").value;
    const productPrice = document.getElementById("productPrice").value;
    const productImage = document.getElementById("productImage").value;

    // Push product to Firebase Realtime Database
    const productsRef = ref(db, "products");
    push(productsRef, {
        name: productName,
        description: productDescription,
        price: productPrice,
        image: productImage
    });

    alert("Product added successfully!");
    productForm.reset();
});

