import { MyElement } from "./components/myelement";
import { CardElement } from "./components/cardelement";
import { DropDown } from "./components/mydropdown";
import { MyList } from "./components/listingelement";
import { MySteps } from "./components/mystep";
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

dropdown.setAttribute("id", "dropdownList");
dropdown.list = ["Breakfast", "Lunch", "Dinner"];
document.querySelector(".title")?.append(dropdown);

let list = new MyList();
list.measure = ["g", "L"];
document.querySelector(".ingredients")?.append(list);
let step = new MySteps();
document.querySelector(".steps")?.append(step);

const uploadBtn = document.getElementById("upload-btn");
const fileBtn = document.getElementById("file-input");
uploadBtn?.addEventListener("click", function () {
  fileBtn?.click();
});
fileBtn?.addEventListener("change", function () {
  document.getElementById("uploadSpan")!.innerHTML =
    "You have uploaded your image.";
});

const submitBtn = document.getElementById("submit-btn");
submitBtn?.addEventListener("click", saveData);
window.addEventListener("collectData", () => {
  console.log("hi");
});
function saveData() {
  clearData();
  let title = (<HTMLInputElement>document.getElementById("titleInput"))?.value;
  localStorage.setItem("title", title);
  let label = dropdown.buttonValue;
  localStorage.setItem("label", label);
  let ingredients = list.ingredients;
  localStorage.setItem("ingredients", JSON.stringify(ingredients));
  let steps = step.description;
  localStorage.setItem("description", JSON.stringify(steps));
}
function clearData() {
  localStorage.clear();
}
