const check_email = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const show_error = (message) => {
  const display = document.getElementsByClassName("message_error")[0];
  display.style.display = "block";
  display.innerText = message;
}

const signup = async (name, email, password, address, phone) => {
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://localhost:3000/account/signup',
            data: {
              name,
              email,
              password,
              address,
              phone
            }
        });
        console.log(res);
        location.assign("/login");
    } catch(err) {
      show_error("This email is already registered");        
    }
};

document.querySelector("#sub").addEventListener("click", e => {
  e.preventDefault();
  const name = document.getElementsByName("name")[0].value;
  const email = document.getElementsByName("email")[0].value;
  const password = document.getElementsByName("pass")[0].value;
  const address = document.getElementsByName("address")[0].value;
  const phone = document.getElementsByName("phone")[0].value;
  if(!name || !email || !password || !address || !phone) {
    show_error("All fields need to be filled");
  } else if(!check_email(email)) {
    show_error("Please enter a valid email");
  } else if(password.length < 5) {
    show_error("Password must be at least 5 characters long");
  } else {
    signup(name, email, password, address, phone);
  }
});