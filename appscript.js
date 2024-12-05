// Import the necessary functions from Firebase Authentication SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDHC7BiKbu7hFMfhInlIziHPAelNenjdMg",
    authDomain: "shield-a35b5.firebaseapp.com",
    projectId: "shield-a35b5",
    storageBucket: "shield-a35b5.appspot.com",
    messagingSenderId: "123110624345",
    appId: "1:123110624345:web:6fd56c57489e0a713bb548",
    measurementId: "G-2XV662RNRS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Check if user is logged in on page load
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, you can access user information here if needed
        console.log("User is logged in:", user.email);
    } else {
        // No user is signed in, redirect to login or show an error
        alert("You must be logged in to access this page.");
        window.location.href = "app.html"; // Redirect to login page
    }
});

// Function to handle login
function handleLogin() {
    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Firebase login with email and password
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // Play success sound
            const successSound = new Audio('notification-interface-success-positive-corrects-132471.mp3');
            successSound.play();

            // Hide login form and related elements
            document.querySelector('.login-content').style.display = 'none';
            document.querySelector('.login-form').style.display = 'none';

            // Show cards smoothly
            showCards();
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert("Login failed: " + errorMessage);
        });
}

// Function to create and display cards
function showCards() {
    const cardImages = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png"];
    const cardContainer = document.createElement("div");
    cardContainer.className = "card-container";

    cardImages.forEach((imgSrc, index) => {
        const card = document.createElement("div");
        card.className = "card";
        const img = document.createElement("img");
        img.src = imgSrc;
        img.alt = "Card " + (index + 1);
        card.appendChild(img);
        card.onclick = function() {
            // Redirect to subject.html only if user is logged in
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    window.location.href = "subject.html";
                } else {
                    alert("You must be logged in to access this page.");
                }
            });
        };
        cardContainer.appendChild(card);
    });

    // Append card container to body and scroll smoothly
    document.body.appendChild(cardContainer);
    cardContainer.scrollIntoView({ behavior: "smooth" });
}
