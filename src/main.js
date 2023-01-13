//aici ne distram azi hehe =))))))))))))))))))))))))

let shop = document.getElementById("shop");

let bag = JSON.parse(localStorage.getItem("data")) || [];

const generateShop = () => {
  return (shop.innerHTML = dataItems
    .map((x) => {
      let { id, name, price, desc, img } = x;
      let cautat = bag.find((x) => x.id === id) || [];

      return `<div id="product-id-${id}" class="item ${name}">
    <img width="220" height="200" src="${img}" alt="" />
    <div class="details">
      <h3 class="product">${name}</h3>
      <p>
        ${desc}
      </p>
      <div class="price-quantity">
        <h2>$ ${price}</h2>
        <div class="buttons">
          <i  onclick="decrement(${id})" class="bi bi-dash-lg"></i>
          <div id=${id} class="quantity">
         ${cautat.quantity === undefined ? 0 : cautat.quantity}</div>
          <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
        </div>
      </div>
    </div>
  </div>`;
    })
    .join(""));
};
generateShop();

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

  //console.log(bag);
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
  //console.log(bag);

  localStorage.setItem("data", JSON.stringify(bag));
};
const update = (id) => {
  let cautat = bag.find((x) => x.id === id);
  document.getElementById(id).innerHTML = cautat.quantity;
  calculate();
};

const calculate = () => {
  let carticon = document.getElementById("cartAmount");
  console.log(carticon);
  carticon.textContent = bag.map((x) => x.quantity).reduce((x, y) => x + y, 0);
};
calculate();

const search_item = () => {
  let input = document.getElementById("searchbar").value;
  console.log(input);
  input = input.toLowerCase();
  let x = document.getElementsByClassName("product");
  let item = document.getElementsByClassName("item");
  for (let i = 0; i < x.length; i++) {
    if (!x[i].innerHTML.toLowerCase().includes(input)) {
      item[i].style.display = "none";
    } else {
      item[i].style.display = "block";
    }
  }
};

let schimb = document.getElementById("toggleDark");
let body = document.querySelector("body");

schimb.addEventListener("click", function () {
  this.classList.toggle("bi-moon");
  console.log(this);
  if (this.classList.toggle("bi-brightness-high-fill")) {
    body.style.background = "#a5b3a6";
    body.style.transition = "2s";
  } else {
    body.style.background = "black";
    body.style.transition = "2s";
  }
});
