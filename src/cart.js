/* Am incercat sa selectam elementele pe care dorim sa le si modificam, 
sa le efectuam anumite transformari,
in functie de aciunile utilizatorului, respectiv:
- totalul -> in functie de ce produse a selectat, pretul lor si cantitatea comandata
- produsele afisate -> trebuie afisate produsele care se afla in interiorul bag ului
*/

let label = document.getElementById("label");
let shopping_cart = document.getElementById("shopping-cart");

//Localstorage
/*
Ce mama mea e asta?
In localstorage datele sunt stocate si salvate în sesiunile browserului.
LocalStorage este similar cu sessionStorage, cu excepția faptului că,
în timp ce datele localStorage nu au timp de expirare,  datele din
sessionStorage sunt sterse odata ce page session ul e finalizat, 
atunci cand pagina este inchisa
*/

//parse - pentru a parcurge JSON ul cu date, utilizam functia parse a JSON-urilor
// || operatorul de sau; in cazul in care nu exista obiecte in json,
//acesta e initializat ca un array gol

let bag = JSON.parse(localStorage.getItem("data")) || [];

//in metoda calculate() se afiseaza cate produse sunt in total in cos, cantitatea totala
// fiind afisata la iconita de sus
const calculate = () => {
  let carticon = document.getElementById("cartAmount");
  carticon.innerHTML = bag.map((x) => x.quantity).reduce((x, y) => x + y, 0);
};
calculate();

//asemenea paginii generate in timpul training ului, generam cartonasele din JS, intrucat
//cartonasele afisate difera in functie de continutul array ului
let generateCartItems = () => {
  if (bag.length !== 0) {
    //avem de afisat cartonase doar daca lungimea array ului este mai mare ca 0
    return (shopping_cart.innerHTML = bag //parcurgem fiecare element al array ului cu map,
      // pentru a putea afisa fiecare cartonas in parte
      .map((x) => {
        //facem destructuring pentru a accesa mai usor proprietatile obiectului
        let { id, quantity } = x;
        let cautat = dataItems.find((y) => y.id === id) || [];
        let { img, price, name, desc } = cautat;
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
      .join("")); //join pentru a scapa de virgula (vezi training)
  } else {
    shopping_cart.innerHTML = "";
    //dorim sa informam utilizatorul in cazul in care acesta nu a adaugat nimic in cos, prin urmare, lasam un mesaj informativ
    label.innerHTML = `
     <div>
     <h2>Nu aveți niciun produs în coș momentan</h2></div>`;
  }
};
generateCartItems();

//trebuie sa putem mari cantitatea de produs si din pagina de cos, aplicam aceeasi
//logica ca cea utilizata in timpul training-ului
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
  /*
    localStorage.setItem(keyname, value) - pentru a seta valoarea obiectului setat in localstorage
    noi vom actualiza de fiecare data consinutul array ului cu obiecte achizitionate
  */
  // keyname-ul : data
  //value: formatul JSON al array-ului actualizat (salvam ultima versiune a cosului in urma modificarilor efectuate)
};

//idem increment
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

//aceeasi logica utilizata in cadrul training-ului, vezi training
const update = (id) => {
  let cautat = bag.find((x) => x.id === id);
  document.getElementById(id).innerHTML = cautat.quantity;
  calculate();
  total(); // de data asta apelam si total, pentru a actualiza si pretul total, cel afisat ca valoare finala a cosului
};

//METODA TOTAL
let total = () => {
  if (bag.length !== 0) {
    //parcurgem tot array ul, in aceleasi conditii ca pana acum
    let amount = bag
      .map((x) => {
        //obtinem pretul * cantitatea comandata aferente fiecarui produs
        let { quantity, id } = x;
        let cautat = dataItems.find((y) => y.id === id) || [];
        return quantity * cautat.price;
      })
      .reduce((x, y) => x + y, 0); //aduname valoarea fiecarui produs la amount, adica la totalul de plata
    label.innerHTML = `
        <h2>Total:................................. ${amount} $</h2>
        `; //in urma modificarilor este si afisat rezultatul final
  } else return;
};
total(); //apelam functia total pentru a putea avea un total afisat si
//la prima randare a paginii, cand este facuta tranzitia dintre pagina cu produse propuse cumpararii
//si pagina cu produsele selectate
