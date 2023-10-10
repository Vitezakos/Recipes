import { MyButton } from "./mybutton";
import { CardElement } from "./cardelement";
import { DropDown } from "./mydropdown";
import { MyList } from "./listingelement";
import { MySteps } from "./mystep";

export interface ingredientsBlueprint {
  ingredientsName: String[];
  ingredientsQuantity: String[];
  ingredientsUnit: String[];
}

export function frontPage() {
  const headerBtns = [
    { name: "Breakfast", placement: "left" },
    { name: "Lunch", placement: "left" },
    {
      name: "Create Recipe",
      showIcon: true,
      link: "recipe",
      placement: "right",
    },
    { name: "Shopping List", link: "shopping", placement: "right" },
  ];
  const left = document.querySelector(".left") as HTMLBodyElement;
  const right = document.querySelector(".right") as HTMLBodyElement;
  headerBtns.forEach((btn) => {
    let newBtn = new MyButton();
    newBtn.name = btn.name;
    if (btn.showIcon) {
      newBtn.showIcon = btn.showIcon;
    }

    if (btn.link) {
      newBtn.link = btn.link as "recipe" | "shopping";
    }

    if (btn.placement == "left") {
      left?.append(newBtn);
    }
    if (btn.placement == "right") {
      right?.append(newBtn);
    }
  });

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
}

export function createRecipePage() {
  interface newRecipe {
    title: string;
    label: string;
    ingredients: ingredientsBlueprint;
    steps: string[];
  }
  let dropdown = new DropDown();
  dropdown.setAttribute("id", "dropdownList");
  dropdown.list = ["Breakfast", "Lunch"];
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
    let newRecipe = {} as newRecipe;

    let title = (<HTMLInputElement>document.getElementById("titleInput"))
      ?.value;
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
}

export function shoppingListPage() {
  function shoppingElement() {
    const itemName = document.querySelector(".items");
    let listedRecipes = JSON.parse(localStorage.getItem("listing")!);
    const itemList = document.querySelector(".itemList") as HTMLUListElement;
    if (itemName?.innerHTML == "" && itemList?.innerHTML == "") {
      if (localStorage.getItem("listing")) {
        for (let i = 0; i < listedRecipes.length; i++) {
          const li = document.createElement("li");
          li.innerText = listedRecipes[i].name;
          itemName?.appendChild(li);
          for (let j = 0; j < listedRecipes[i].ingredients.length; j++) {
            const li2 = document.createElement("li");
            li2.innerText = listedRecipes[i].ingredients[j];
            itemList?.appendChild(li2);
          }
        }
      } else {
        itemName!.innerHTML = "";
        itemList!.innerHTML = "";
      }
    } else if (
      (itemName?.innerHTML !== "" || itemList?.innerHTML !== "") &&
      !localStorage.getItem("listing")
    ) {
      itemName!.innerHTML = "";
      itemList!.innerHTML = "";
    }
    let text = [] as any;
    itemList?.childNodes.forEach((e) => {
      let elements = e.textContent?.split(" ");
      text.push(elements);
    });
    for (let i = 0; i < text.length; i++) {
      let check = 0;
      let newValue = "";

      for (let j = 0; j < text.length; j++) {
        if (text[i][0] == text[j][0]) {
          check = check + 1;
          if (check > 1) {
            if (
              text[i][1].slice(text[i][1].length - 1) ==
              text[j][1].slice(text[j][1].length - 1)
            ) {
              let firstValue = text[i][1].slice(0, text[i][1].length - 1);
              let secondValue = text[j][1].slice(0, text[i][1].length - 1);
              let firstNumber = +firstValue;
              let secondNumber = +secondValue;
              let newNumber = firstNumber + secondNumber;
              let newNumberAsString = newNumber.toString();
              newValue =
                newNumberAsString + text[i][1].slice(text[i][1].length - 1);
              text[i][1] = newValue;
            } else {
              newValue =
                text[i][1].slice(0, text[i][1].length) +
                " " +
                "+" +
                " " +
                text[j][1].slice(0, text[j][1].length);
              text[i][1] = newValue;
            }
            let liToChange = itemList.children[i];
            if (liToChange) {
              liToChange.textContent = text[i][0] + " " + newValue;
            }
            if (itemList.children[j]) {
              itemList.children[j].remove();
            }
          }
        }
      }
    }
  }
  shoppingElement();

  document.querySelector(".clean")?.addEventListener("click", () => {
    localStorage.removeItem("listing");
    shoppingElement();
  });
}
