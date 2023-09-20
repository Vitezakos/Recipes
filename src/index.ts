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

function renderCards() {
  if (!localStorage.getItem("recipes")) {
    return;
  } else {
    let cardMain = JSON.parse(localStorage.getItem("recipes")!);
    cardMain.forEach((e: any) => {
      let newCard = new CardElement();
      newCard.setAttribute("title", e.title);
      newCard.setAttribute("label", e.label);
      newCard.setAttribute(
        "ingredientsname",
        JSON.stringify(e.ingredients.ingredientsName)
      );
      newCard.setAttribute(
        "ingredientsquantity",
        JSON.stringify(e.ingredients.ingredientsQuantity)
      );
      newCard.setAttribute(
        "ingredientsunit",
        JSON.stringify(e.ingredients.ingredientsUnit)
      );
      newCard.setAttribute("description", JSON.stringify(e.steps));
      document.querySelector("#front")?.append(newCard);
    });
  }
}

renderCards();
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
function saveData() {
  let newRecipe = {} as any;
  let title = (<HTMLInputElement>document.getElementById("titleInput"))?.value;
  newRecipe.title = title;
  let label = dropdown.buttonValue;
  newRecipe.label = label;
  let ingredients = list.ingredients;
  newRecipe.ingredients = ingredients;
  let steps = step.description;
  newRecipe.steps = steps;
  if (!localStorage.getItem("recipes")) {
    localStorage.setItem("recipes", "[]");
  }
  let recipes = JSON.parse(localStorage.getItem("recipes")!);
  recipes.push(newRecipe);
  localStorage.setItem("recipes", JSON.stringify(recipes));
  window.location.href = "index.html";
}
