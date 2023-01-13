let label = document.getElementById("label");
let shopping_cart = document.getElementById("shopping-cart");

let bag = JSON.parse(localStorage.getItem("data")) || [];

const calculate = () => {
  let carticon = document.getElementById("cartAmount");
  carticon.innerHTML = bag.map((x) => x.quantity).reduce((x, y) => x + y, 0);
};
calculate();

let generateCartItems = () => {
  if (bag.length !== 0) {
    return (shopping_cart.innerHTML = bag
      .map((x) => {
        let { id, quantity } = x;
        let cautat = dataItems.find((y) => y.id === id) || [];
        let { img, price, name, desc } = cautat;
        //sa ii recomand sa fac destructuring
        return `
            <div  class="cart-bag ${name}">
            <img width="200" height="200" src="${img}" alt="" />
            <div class="details-cart">
              <h3 class="product">${name}</h3>
              <p>
                ${desc}
              </p>
              <div class="price-quantity">
                <h2>$ ${price}</h2>
                <div class="buttons">
                  <i  onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                  <div id=${id} class="quantity">${quantity}</div>
                  <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                </div>
                <h2> $ ${quantity * price}</h2>
              </div>
            </div>
          </div>
            `;
      })
      .join(""));
  } else {
    shopping_cart.innerHTML = "";
    label.innerHTML = `
     <div>
     <h2>Nu aveți niciun produs în coș momentan</h2></div>`;
  }
};
generateCartItems();

const increment = (id) => {
  let selected = id;
  let cautat = bag.find((x) => x.id === selected.id);
  if (cautat === undefined) {
    bag.push({
      id: selected.id,
      quantity: 1,
    });
  } else {
    cautat.quantity++;
  }

  generateCartItems();
  update(selected.id);
  localStorage.setItem("data", JSON.stringify(bag));
};
const decrement = (id) => {
  let selected = id;
  let cautat = bag.find((x) => x.id === selected.id);
  if (cautat === undefined) return;
  else if (cautat.quantity === 0) {
    return;
  } else {
    cautat.quantity--;
  }
  update(selected.id);
  bag = bag.filter((x) => x.quantity !== 0);
  generateCartItems();

  localStorage.setItem("data", JSON.stringify(bag));
};

const update = (id) => {
  let cautat = bag.find((x) => x.id === id);
  document.getElementById(id).innerHTML = cautat.quantity;
  calculate();
  total();
};

let total = () => {
  if (bag.length !== 0) {
    let amount = bag
      .map((x) => {
        let { quantity, id } = x;
        let cautat = dataItems.find((y) => y.id === id) || [];
        return quantity * cautat.price;
      })
      .reduce((x, y) => x + y, 0);
    label.innerHTML = `
        <h2>Total:................................. ${amount} $</h2>
        `;
  } else return;
};
total();
