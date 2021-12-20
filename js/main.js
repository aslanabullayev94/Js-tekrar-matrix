var searchBtn = document.querySelector("#search-btn");
var searchForm = document.querySelector(".search-form");
var searchInput = document.querySelector("#search-box");
var searchBtnClick = document.querySelector("#search-btn--click");
var cartBtn = document.querySelector("#cart-btn");
var cartItemsContainer = document.querySelector(".cart-items-container");
var menuBtn = document.querySelector("#menu-btn");
var navbar = document.querySelector(".navbar");
// ----------------------------------------------------------     ------------------------------------------------------ //
var contactForm = document.querySelector("form#contact-form");
// checking form element on every input
contactForm.addEventListener("input", function (e) {
    var targetInput = e.target;
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
function checkName(nameInput) {
    var isValid = false;
    // console.log("checking name: " + nameInput.value);
    errorMessage("");
    errorStyling(nameInput, false);
    if (nameInput.value.trim() === "") {
        isValid = false;
        // console.log("Name area can not be blank");
        errorMessage("Name area can not be blank");
        errorStyling(nameInput, true);
    }
    else if (nameInput.value.trim().length < 3) {
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
function checkNumber(numberInput) {
    var isValid = false;
    errorMessage("");
    errorStyling(numberInput, false);
    if (!numberInput.value.includes("050") &&
        !numberInput.value.includes("055")) {
        errorMessage("Your phone number should start with 055 or 050");
        errorStyling(numberInput, true);
    }
    else if (numberInput.value.length < 10) {
        errorMessage("Number can not to be shorter than 10 characters");
        errorStyling(numberInput, true);
    }
    // console.log("checking number: " + numberInput.value);
    return isValid;
}
function errorMessage(message) {
    var messageContainerElem = document.querySelector(".errorMsgBox");
    var messageTextElem = document.querySelector(".errorMsgBox .errorMsg");
    if (!message) {
        messageContainerElem.classList.remove("display");
    }
    messageContainerElem.classList.add("display");
    messageTextElem.innerText = message;
}
function errorStyling(inputName, isError) {
    var parent = inputName.parentElement;
    if (parent) {
        if (!isError) {
            parent.classList.remove("error");
            parent.classList.add("valid");
        }
        else {
            parent.classList.remove("valid");
            parent.classList.add("error");
        }
    }
}
// ----------------------------------------------------------     ------------------------------------------------------ //
// ============================================ ========================================= //
var cardItemContainer = document.querySelector(".cart-items-container");
// console.log(cardItemContainer)
// adding items to card items container
var menuItemsContainer = document.querySelector(".box-container");
// console.log(menuItemsContainer);
var cardContentArr = [];
cardContentArr = JSON.parse(localStorage.getItem("checkoutCard") || "");
if (cardContentArr) {
    printToCardContainer(cardContentArr);
}
var itemsArr = menuItemsContainer.querySelectorAll("#add-btn");
// console.log(itemsArr);
itemsArr.forEach(function (button) {
    button.addEventListener("click", function (e) {
        var _a, _b, _c;
        var eventTarget = e.target;
        // console.log(eventTarget.parentElement);
        var imgSrc = (_b = (_a = eventTarget.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector("img")) === null || _b === void 0 ? void 0 : _b.getAttribute("src");
        // console.log(imgSrc);
        var priceEl = (_c = eventTarget.parentElement) === null || _c === void 0 ? void 0 : _c.querySelector(".price");
        // console.log(priceEl);
        var price = priceEl === null || priceEl === void 0 ? void 0 : priceEl.innerText.split(" ").slice(0, 1).join("");
        // console.log(price);
        var userItem = { img: imgSrc, price: price };
        // console.log(userItem);
        cardContentArr.push(userItem);
        // console.log(cardContentArr);
        localStorage.setItem("checkoutCard", JSON.stringify(cardContentArr));
        printToCardContainer(cardContentArr);
    });
});
function printToCardContainer(cardContentArr) {
    var cards = cardItemContainer.querySelectorAll(".cart-item");
    cards.forEach(function (card) {
        card.remove();
    });
    for (var i = 0; i < cardContentArr.length; i++) {
        var cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.setAttribute("data-id", "".concat(i + 1));
        var closeIcon = document.createElement("span");
        closeIcon.classList.add("fas", "fa-times");
        cartItem.appendChild(closeIcon);
        var image = document.createElement("img");
        image.setAttribute("src", cardContentArr[i].img);
        cartItem.appendChild(image);
        var cartContent = document.createElement("div");
        cartContent.setAttribute("class", "content");
        var contentHeader = document.createElement("h3");
        contentHeader.innerText = "cart item ".concat(i + 1);
        cartContent.appendChild(contentHeader);
        var contentPrice = document.createElement("div");
        contentPrice.setAttribute("class", "price");
        contentPrice.innerText = "".concat(cardContentArr[i].price);
        cartContent.appendChild(contentPrice);
        cartItem.appendChild(cartContent);
        // console.log(cartItem);
        cardItemContainer.prepend(cartItem);
    }
}
// removing items on click from card items container
cardItemContainer.addEventListener("click", function (e) {
    var targett = e.target;
    targett.classList.forEach(function (classes) {
        if (targett.parentElement) {
            if (classes === "fas") {
                var targetId = targett.parentElement.getAttribute("data-id");
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
searchBtn.onclick = function () {
    searchForm.classList.toggle("active");
    cartItemsContainer.classList.remove("active");
    navbar.classList.remove("active");
};
searchBtnClick.onclick = function () {
    var dataSearch = {
        search: searchInput.value
    };
    var dataSearchStorage = JSON.parse(localStorage.getItem("dataSearch") || "{}");
    if (typeof localStorage.getItem("dataSearch") === "string")
        dataSearchStorage !== null && //true
            dataSearchStorage !== undefined && // true
            dataSearchStorage && // true
            dataSearchStorage.search === searchInput.value // true
            ? alert("Bu product haqqinda evvelce axtarish etmisiniz")
            : localStorage.setItem("dataSearch", JSON.stringify(dataSearch));
};
cartBtn.onclick = function () {
    cartItemsContainer.classList.toggle("active");
    searchForm.classList.remove("active");
    navbar.classList.remove("active");
};
menuBtn.onclick = function () {
    navbar.classList.toggle("active");
    cartItemsContainer.classList.remove("active");
    searchForm.classList.remove("active");
};
window.onscroll = function () {
    navbar.classList.remove("active");
    cartItemsContainer.classList.remove("active");
    searchForm.classList.remove("active");
};
