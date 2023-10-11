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
    let text = [] as any;
    let k = 0;
    if (localStorage.getItem("listing")) {
      for (let i = 0; i < listedRecipes.length; i++) {
        for (let j = 0; j < listedRecipes[i].ingredients.length; j++) {
          text[k] = listedRecipes[i].ingredients[j].split(" ");
          k++;
        }
      }
      let finalIngredients = {} as string[];
      for (let i = 0; i < text.length; i++) {
        let currentIngredient = text[i].slice(0, -1).join(" ").toLowerCase();
        let currentQuantityAndUnit = text[i][text[i].length - 1];
        let currentQuantity = currentQuantityAndUnit.slice(0, -1);
        if (!finalIngredients[currentIngredient]) {
          finalIngredients[currentIngredient] = currentQuantityAndUnit;
        } else {
          let storedQuantityAndUnit = finalIngredients[currentIngredient];
          let storedQuantity = finalIngredients[currentIngredient].slice(0, -1);
          let storedUnit =
            finalIngredients[currentIngredient][
              finalIngredients[currentIngredient].length - 1
            ];
          let currentUnit =
            currentQuantityAndUnit[currentQuantityAndUnit.length - 1] + "";
          if (currentUnit.toLowerCase() == storedUnit.toLowerCase()) {
            let addedQuantity =
              Number(storedQuantity) + Number(currentQuantity);
            finalIngredients[currentIngredient] = addedQuantity + storedUnit;
          } else {
            finalIngredients[currentIngredient] =
              storedQuantityAndUnit + " " + "+" + " " + currentQuantityAndUnit;
          }
        }
      }
      for (let i = 0; i < listedRecipes.length; i++) {
        const li = document.createElement("li");
        li.innerText = listedRecipes[i].name;
        itemName?.appendChild(li);
      }
      for (let i = 0; i < Object.keys(finalIngredients).length; i++) {
        const li = document.createElement("li");
        li.innerText = (Object.keys(finalIngredients)
          [i].charAt(0)
          .toUpperCase() +
          Object.keys(finalIngredients)[i].slice(1) +
          " " +
          Object.values(finalIngredients)[i]) as string;
        itemList?.appendChild(li);
      }
    }
  }
  shoppingElement();

  document.querySelector(".clean")?.addEventListener("click", () => {
    localStorage.removeItem("listing");
    const itemName = document.querySelector(".items");
    const itemList = document.querySelector(".itemList");
    itemName!.innerHTML = "";
    itemList!.innerHTML = "";
  });
}
