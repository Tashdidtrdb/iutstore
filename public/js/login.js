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
    console.log(res);
    location.assign("/");
  } catch(err) {
    alert(JSON.stringify(err.response.data.message));
    console.log(err.response.data);
  }
};

document.querySelector("#sub").addEventListener("click", e => {
  e.preventDefault();
  const email = document.getElementsByName("email")[0].value;
  const password = document.getElementsByName("pass")[0].value;
  login(email, password);
});
