"use strict";

const productCategory = document.getElementById("productCategory");
const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productImage = document.getElementById("productImage");
const productColor = document.getElementById("productColor");

const decreaseBtn = document.getElementById("decrease");
const increaseBtn = document.getElementById("increase");

const counterElement = document.getElementById("counter");
const addToCartBtn = document.getElementById("addToCart");

const sizeListLiElements = document.querySelectorAll("#sizeList li");
const sizeListDatas = [...sizeListLiElements].map((item) => item.dataset.size);
const sizeListBtnElements = document.querySelectorAll("#sizeList li button");

let count = 1;
let selectedSize;
let cartItems = [];

counterElement.value = count;

const { category, price, name, color, image, sizes } = JSON.parse( localStorage.getItem("product"));

const pName = name.split(" ").map((name) => name[0].toUpperCase() + name.slice(1)).join(" ");

productCategory.textContent = category;
productName.textContent = pName;
productPrice.textContent = `${price} AZN`;
productImage.src = image;
productColor.classList.add(`bg-${color}-500`);

decreaseBtn.addEventListener("click", () => {
    if(count > 1) {
        count--;
    }

    counterElement.value = count;
});

increaseBtn.addEventListener("click", () => {
    if(count < 10) {
        count++;
    }

    counterElement.value = count;
});

addToCartBtn.addEventListener("click", () => {
    
    cartItems = JSON.parse(localStorage.getItem("cartItems"));

    const addedProduct = {
        name: pName,
        price: price,
        category: category,
        color: color,
        image: image,
        count: count,
        size: selectedSize,
    }

    if(!selectedSize){
        alert("You must select size.");
        return;
    }

    if(!cartItems) {
        cartItems = [addedProduct];
    } else {
        const existingProduct = cartItems.find((cartItem) => cartItem.name === pName && cartItem.size === selectedSize);

        const existingProductIndex = cartItems.findIndex((cartItem) => cartItem.name === pName && cartItem.size === selectedSize);
        
        if (existingProduct && existingProductIndex !== undefined) {
            cartItems.splice(existingProductIndex, 1);
            existingProduct.count += count;
            cartItems.push(existingProduct);
        } else {
            cartItems.push(addedProduct);
        }
    }

    
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
});

sizeListDatas.forEach((size, index) => {
    if(!sizes.includes(size)) {
        sizeListLiElements[index].classList.add("opacity-40");
        sizeListBtnElements[index].classList.add("cursor-not-allowed");
        sizeListBtnElements[index].setAttribute("disabled", true);
    }

    sizeListLiElements[index].addEventListener("click", (event) => {
        selectedSize = size;

        for (let i = 0; i < sizeListBtnElements.length; i++) {
            sizeListBtnElements[i].classList.remove("bg-black", "text-white");
        }

        event.target.classList.add("bg-black", "text-white");
    });
});