const signUpForm = document.getElementById("signUpForm");

signUpForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let emailInput = document.getElementById("email");
  let passwordInput = document.getElementById("password");

  let email = emailInput.value.trim();
  let password = passwordInput.value.trim();

  let inputFilled = true;

  if (email === "") {
    emailInput.style.border = "2px solid red";
    inputFilled = false;
  } else {
    emailInput.style.border = "";
  }

  if (password === "") {
    passwordInput.style.border = "2px solid red";
    inputFilled = false;
  } else {
    passwordInput.style.border = "";
  }

  let userData = localStorage.getItem("users");
  let userArray = [];

  if (userData) {
    userArray = JSON.parse(userData);
  }

  let existingUser = userArray.find((user) => user.userEmail === email);

  if (existingUser) {
    alert("User with this email already exists. Please use a different email.");
  } else {
    if (inputFilled) {
      let userDetails = {
        userEmail: email,
        userPassword: password,
      };

      userArray.push(userDetails);
      
      let users = JSON.stringify(userArray);

      localStorage.setItem("users", users);

      alert("Account created successfully!");
      window.location.href = "/pages/signin.html";
    } else {
      alert("Please fill in the credentials.");
    }
  }
});
