/**
 * Created by Emiliya Vuntsova on 4/19/17.
 */
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDeXDoNUcOHO0uQ7qJ0YeJfWZG2r77GumM",
    authDomain: "sign-up-9aeb9.firebaseapp.com",
    databaseURL: "https://sign-up-9aeb9.firebaseio.com",
    projectId: "sign-up-9aeb9",
    storageBucket: "sign-up-9aeb9.appspot.com",
    messagingSenderId: "102643025094"
};
firebase.initializeApp(config);

var fd = firebase.database();
var name = "";
var email = "";
var age = 0;
var comment = "";

// Click Button changes what is stored in firebase
$("#addUser").on("click", function() {
    // Prevent the page from refreshing
    event.preventDefault();

    // Get inputs
    name = $("#nameInput").val().trim();
    email = $("#emailInput").val().trim();
    age = $("#ageInput").val().trim();
    comment = $("#commentInput").val().trim();

    // Change what is saved in firebase
    fd.ref().push({
        name: name,
        email: email,
        age: age,
        comment: comment,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

//Listener
fd.ref().on("child_added", function (snapshot) {
   $(".well").append("<p>"+snapshot.val().name+"</p>");
   $(".well").append("<p>"+snapshot.val().email+"</p>");
   $(".well").append("<p>"+snapshot.val().age+"</p>");
   $(".well").append("<p>"+snapshot.val().comment+"</p>");
   $(".well").append("<hr>");
});

fd.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot){
    $("#nameDisplay").html(snapshot.val().name);
    $("#emailDisplay").html(snapshot.val().email);
    $("#ageDisplay").html(snapshot.val().age);
    $("#commentDisplay").html(snapshot.val().comment);
});


