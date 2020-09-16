document.querySelector(".uploadbutton").addEventListener("click", e => {
  e.preventDefault();
  document.querySelector("#fileinput").click();
});

const addProduct = async (form_data) => {
  try{
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/product/',
      data: form_data,
      headers: {'Content-Type': 'multipart/form-data' }
    });
    console.log(res);
    alert("Product has been added");
  } catch(err) {
    console.log(err.message);
  }
}

document.querySelector("#sub").addEventListener("click", e => {
  e.preventDefault();
  const form_data = new FormData(document.querySelector(".productform"));
  addProduct(form_data);
});