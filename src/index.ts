import { MyElement } from "./components/myelement";
import { CardElement } from "./components/cardelement";
import { DropDown } from "./components/mydropdown";
let elem = new MyElement();
elem.name = "Breakfast";
let elem2 = new MyElement();
elem2.name = "Lunch";
let elem3 = new MyElement();
elem3.name = "Create Recipe";
elem3.showIcon = true;
elem3.link = "recipe";
let elem4 = new MyElement();
elem4.name = "Shopping List";
elem4.link = "shopping";
const left = document.querySelector(".left") as HTMLBodyElement;
left?.append(elem, elem2);
const right = document.querySelector(".right") as HTMLBodyElement;
right?.append(elem3, elem4);

let card = new CardElement();
let card2 = new CardElement();
document.querySelector("#front")?.append(card, card2);

let dropdown = new DropDown();
let dropdown2 = new DropDown();
dropdown.list = ["1", "2", "3", "4"];
dropdown2.list = ["9", "8", "7", "6"];
document.querySelector(".title")?.append(dropdown);
document
  .querySelector(".ingredients")
  ?.insertBefore(dropdown2, document.getElementById("delete-btn"));

const desc = document.getElementById("description");
desc?.addEventListener("click", deletePlaceholder);
function deletePlaceholder() {
  desc!.innerHTML = "";
}
