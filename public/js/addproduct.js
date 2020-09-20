document.querySelector(".uploadbutton").addEventListener("click", e => {
  e.preventDefault();
  document.querySelector("#fileinput").click();
});

const show_error = (message) => {
  const display = document.getElementsByClassName("message_display")[0];
  display.classList = "message_display alert alert-danger";
  display.style.display = "block";
  display.innerText = message;
}

const show_success = (message) => {
  const display = document.getElementsByClassName("message_display")[0];
  display.classList = "message_display alert alert-success";
  display.style.display = "block";
  display.innerText = message;
}

const addProduct = async (form_data) => {
  try{
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/product/',
      data: form_data,
      headers: {'Content-Type': 'multipart/form-data' }
    });
    show_success("Product has been added");
  } catch(err) {
    show_error("An error occured");
  }
}

document.querySelector("#sub").addEventListener("click", e => {
  e.preventDefault();
  
  const display = document.getElementsByClassName("message_display")[0];
  display.classList = "message_display alert alert-success";
  display.style.display = "none";

  const form_data = new FormData(document.querySelector(".productform"));
  const name = document.getElementsByName("p_title")[0].value;
  const category = document.getElementsByName("p_category")[0].value;
  const size = document.getElementsByName("size")[0].value;
  const color = document.getElementsByName("color")[0].value;
  const description = document.getElementsByName("p_description")[0].value;
  const price = document.getElementsByName("price")[0].value;
  const pic = document.getElementsByName("pic")[0].value;
  // console.log(pic);
  if(!name || !category || !size || !color || !description || !price || !pic){
    show_error("All the fields need to be filled");
  } else {
    addProduct(form_data);
  }
});