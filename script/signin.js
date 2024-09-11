const signInForm = document.getElementById("signInForm");
signInForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let userDetailString = localStorage.getItem("user");
  let user = JSON.parse(userDetailString);

  if (email.value === "" && password.value === "") {
    alert("please fill the credientials");
  } else {
    if (email === user.userEmail && password === user.userPassword) {
      window.location.href = "/index.html";
    } else {
      alert("Something Went Wrong");
    }
  }
});
