const login = (email, password) => {
  alert(email);
};
document.querySelector(".login").addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  login(email);
  console.log(email);
});
