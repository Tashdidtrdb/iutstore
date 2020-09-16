const addToCart = async (jsonValue) => {
  const { owner_id, p_id, p_title, price } = jsonValue;
  console.log(jsonValue);
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
    alert("Added to cart")
  } catch(err) {
    console.log(err);
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