const signup = async (name, email, password) => {
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://localhost:3000/account/signup',
            data: {
              name,
              email,
              password
            }
        });
        console.log(res);
        location.assign("/login");
    } catch(err) {
        const error = err.response.data.message[0];
        alert(JSON.stringify(error));
        console.log(err.response.data);
    }
};

const isLoggedIn = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "http://localhost:3000/account/authenticated"
    });
    location.assign("/account");
  } catch(err) {
    
  }
}

isLoggedIn();

document.querySelector("#sub").addEventListener("click", e => {
  e.preventDefault();
  const name = document.getElementsByName("name")[0].value;
  const email = document.getElementsByName("email")[0].value;
  const password = document.getElementsByName("pass")[0].value;
  signup(name, email, password);
});