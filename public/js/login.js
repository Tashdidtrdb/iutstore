const show_error = (message) => {
  const display = document.getElementsByClassName("message_error")[0];
  display.style.display = "block";
  display.innerText = message;
}

const login = async (email, password) => {
  try{
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/account/login',
      data: {
        email,
        password
      }
    });
    location.assign("/");
  } catch(err) {
    const message = JSON.stringify(err.response.data.message);
    show_error("Incorrect email/password");
  }
};

document.querySelector("#sub").addEventListener("click", e => {
  e.preventDefault();
  const email = document.getElementsByName("email")[0].value;
  const password = document.getElementsByName("pass")[0].value;
  if(!email || !password) {
    show_error("All fields need to be filled");
  } else {
    login(email, password);
  }
});
