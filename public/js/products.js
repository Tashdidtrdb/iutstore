const addToCart = async (jsonValue) => {
  const { owner_id, p_id, p_title, price } = jsonValue;
  // console.log(jsonValue);
  try{
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/cart/',
      data: {
        owner_id,
        p_id,
        p_title,
        price
      },
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if(res.data === "login") {
      alert("You're not logged in");
    } else {
      alert("Added to cart");
    }
  } catch(err) {
    alert("An error has occured");
  }
}

const buttons = document.getElementsByClassName("buy");
const products = Array.from(buttons);

products.forEach( (product, index) => {
  const values = product.value;
  const jsonValue = JSON.parse(values);

  product.addEventListener("click", e => {
    e.preventDefault();
    addToCart(jsonValue);
  })
});