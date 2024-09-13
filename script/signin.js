const signInForm = document.getElementById("signInForm");
signInForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();
  
  let userData = localStorage.getItem("users");
  
  
  if (userData) {
    let userArray = JSON.parse(userData);
    let userObject = userArray.find(user => user.userEmail === email && user.userPassword === password)

    if (userObject) {
      alert("Congragulations You Logged In Successfully")
      window.location.href = "/index.html"
      
    } else {
      alert('Something Went Wrong')
    }
  }else{
    alert("Users Data not Found")
  }
});
