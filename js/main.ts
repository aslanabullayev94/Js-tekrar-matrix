let searchBtn = document.querySelector("#search-btn")! as HTMLElement;
let searchForm = document.querySelector(".search-form")! as HTMLElement;
let searchInput = document.querySelector("#search-box")! as HTMLInputElement;
let searchBtnClick = document.querySelector(
  "#search-btn--click"
)! as HTMLElement;
let cartBtn = document.querySelector("#cart-btn")! as HTMLElement;
let cartItemsContainer = document.querySelector(
  ".cart-items-container"
)! as HTMLElement;
let menuBtn = document.querySelector("#menu-btn")! as HTMLElement;
let navbar = document.querySelector(".navbar")! as HTMLElement;

// ----------------------------------------------------------     ------------------------------------------------------ //
const contactForm = document.querySelector(
  "form#contact-form"
)! as HTMLFormElement;

// checking form element on every input
contactForm.addEventListener("input", (e) => {
  let targetInput = e.target as HTMLInputElement;
  switch (targetInput.getAttribute("type")) {
    case "text":
      checkName(targetInput);
      break;
    case "email":
      // checkEmail(targetInput);
      break;
    case "number":
      checkNumber(targetInput);
      break;
  }
});

function checkName(nameInput: HTMLInputElement) {
  let isValid = false;
  // console.log("checking name: " + nameInput.value);
  errorMessage("");
  errorStyling(nameInput, false);
  if (nameInput.value.trim() === "") {
    isValid = false;
    // console.log("Name area can not be blank");
    errorMessage("Name area can not be blank");
    errorStyling(nameInput, true);
  } else if (nameInput.value.trim().length < 3) {
    // console.log("Name has to be longer than 3 characters");
    errorMessage("Name has to be longer than 3 characters");
    errorStyling(nameInput, true);
  }
  return isValid;
}
// function checkEmail(emailInput: HTMLInputElement) {
//   let isValid = false;
//   emailInput.parentElement.classList.remove("valid", "error");
//   console.log("checking email: " + emailInput.value);
//   console.log(emailInput.parentElement);
//   return isValid;
// }
function checkNumber(numberInput: HTMLInputElement) {
  let isValid = false;
  errorMessage("");
  errorStyling(numberInput, false);
  if (
    !numberInput.value.includes("050") &&
    !numberInput.value.includes("055")
  ) {
    errorMessage("Your phone number should start with 055 or 050");
    errorStyling(numberInput, true);
  } else if (numberInput.value.length < 10) {
    errorMessage("Number can not to be shorter than 10 characters");
    errorStyling(numberInput, true);
  }
  // console.log("checking number: " + numberInput.value);
  return isValid;
}

function errorMessage(message: string) {
  let messageContainerElem = document.querySelector(
    ".errorMsgBox"
  ) as HTMLElement;

  let messageTextElem = document.querySelector(
    ".errorMsgBox .errorMsg"
  ) as HTMLElement;
  if (!message) {
    messageContainerElem.classList.remove("display");
  }
  messageContainerElem.classList.add("display");
  messageTextElem.innerText = message;
}

function errorStyling(inputName: HTMLInputElement, isError: boolean) {
  let parent = inputName.parentElement;
  if (parent) {
    if (!isError) {
      parent.classList.remove("error");
      parent.classList.add("valid");
    } else {
      parent.classList.remove("valid");
      parent.classList.add("error");
    }
  }
}

// ----------------------------------------------------------     ------------------------------------------------------ //

// ============================================ ========================================= //
const cardItemContainer = document.querySelector(
  ".cart-items-container"
) as HTMLElement;
// console.log(cardItemContainer)

// adding items to card items container
const menuItemsContainer = document.querySelector(
  ".box-container"
) as HTMLElement;
// console.log(menuItemsContainer);

let cardContentArr: {}[] = [];

cardContentArr = JSON.parse(localStorage.getItem("checkoutCard") || "");

if (cardContentArr) {
  printToCardContainer(cardContentArr);
}
let itemsArr = menuItemsContainer.querySelectorAll("#add-btn");
// console.log(itemsArr);

itemsArr.forEach((button) => {
  button.addEventListener("click", (e) => {
    let eventTarget = e.target as HTMLElement;
    // console.log(eventTarget.parentElement);

    let imgSrc = eventTarget.parentElement
      ?.querySelector("img")
      ?.getAttribute("src");
    // console.log(imgSrc);

    let priceEl = eventTarget.parentElement?.querySelector(
      ".price"
    ) as HTMLElement;
    // console.log(priceEl);

    let price = priceEl?.innerText.split(" ").slice(0, 1).join("");
    // console.log(price);

    let userItem = { img: imgSrc, price: price };
    // console.log(userItem);

    cardContentArr.push(userItem);
    // console.log(cardContentArr);

    localStorage.setItem("checkoutCard", JSON.stringify(cardContentArr));

    printToCardContainer(cardContentArr);
  });
});

function printToCardContainer(cardContentArr: {}[]) {
  let cards = cardItemContainer.querySelectorAll(".cart-item");
  cards.forEach((card) => {
    card.remove();
  });
  for (let i = 0; i < cardContentArr.length; i++) {
    let cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.setAttribute("data-id", `${i + 1}`);

    let closeIcon = document.createElement("span");
    closeIcon.classList.add("fas", "fa-times");
    cartItem.appendChild(closeIcon);

    let image = document.createElement("img");
    image.setAttribute("src", cardContentArr[i].img);
    cartItem.appendChild(image);

    let cartContent = document.createElement("div");
    cartContent.setAttribute("class", "content");
    let contentHeader = document.createElement("h3");
    contentHeader.innerText = `cart item ${i + 1}`;
    cartContent.appendChild(contentHeader);

    let contentPrice = document.createElement("div");
    contentPrice.setAttribute("class", "price");
    contentPrice.innerText = `${cardContentArr[i].price}`;
    cartContent.appendChild(contentPrice);

    cartItem.appendChild(cartContent);

    // console.log(cartItem);
    cardItemContainer.prepend(cartItem);
  }
}

// removing items on click from card items container
cardItemContainer.addEventListener("click", (e) => {
  let targett = e.target as HTMLElement;

  targett.classList.forEach((classes) => {
    if (targett.parentElement) {
      if (classes === "fas") {
        let targetId = targett.parentElement.getAttribute("data-id");

        // console.log(targett.parentElement);
        targett.parentElement.remove();
        targetId ? cardContentArr.splice(+targetId - 1, 1) : null;
        // console.log(cardContentArr);
        localStorage.setItem("checkoutCard", JSON.stringify(cardContentArr));
        printToCardContainer(cardContentArr);
      }
    }
  });
});

// ============================================ ========================================= //

searchBtn.onclick = (): void => {
  searchForm.classList.toggle("active");
  cartItemsContainer.classList.remove("active");
  navbar.classList.remove("active");
};

searchBtnClick.onclick = (): void => {
  let dataSearch = {
    search: searchInput.value,
  };

  let dataSearchStorage = JSON.parse(
    localStorage.getItem("dataSearch") || "{}"
  );

  if (typeof localStorage.getItem("dataSearch") === "string")
    dataSearchStorage !== null && //true
    dataSearchStorage !== undefined && // true
    dataSearchStorage && // true
    dataSearchStorage.search === searchInput.value // true
      ? alert("Bu product haqqinda evvelce axtarish etmisiniz")
      : localStorage.setItem("dataSearch", JSON.stringify(dataSearch));
};

cartBtn.onclick = (): void => {
  cartItemsContainer.classList.toggle("active");
  searchForm.classList.remove("active");
  navbar.classList.remove("active");
};

menuBtn.onclick = (): void => {
  navbar.classList.toggle("active");
  cartItemsContainer.classList.remove("active");
  searchForm.classList.remove("active");
};

window.onscroll = (): void => {
  navbar.classList.remove("active");
  cartItemsContainer.classList.remove("active");
  searchForm.classList.remove("active");
};
