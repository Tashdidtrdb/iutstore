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
        const error = err.response.data.message[0];
        alert(JSON.stringify(error));
        console.log(err.response.data);
    }
};

document.querySelector("#sub").addEventListener("click", e => {
  e.preventDefault();
  const name = document.getElementsByName("name")[0].value;
  const email = document.getElementsByName("email")[0].value;
  const password = document.getElementsByName("pass")[0].value;
  const address = document.getElementsByName("address")[0].value;
  const phone = document.getElementsByName("phone")[0].value;
  signup(name, email, password, address, phone);
});