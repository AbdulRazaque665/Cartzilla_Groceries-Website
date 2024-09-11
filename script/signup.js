const signUpForm = document.getElementById("signUpForm");

signUpForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let email = document.getElementById("email");
  let password = document.getElementById("password");

  let userDetails = {
    userEmail: email,
    userPassword: password,
  };

  let inputFilled = true;

  if (email.value === "") {
    email.style.border = "2px solid red";
    inputFilled = false;
  }

  if (password.value === "") {
    password.style.border = "2px solid red";
    inputFilled = false;
  }

  if (inputFilled) {
    let userDetailObj = JSON.stringify(userDetails);
    localStorage.setItem("user", userDetailObj);
    window.location.href = "/pages/signin.html";
  } else {
    alert("Please fill the Credientials");
  }
});
