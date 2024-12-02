import products from "./data.js";

const categoryList = document.getElementById("categoryList");
const colorList = document.getElementById("colorList");
const sizeList = document.getElementById("sizeList");

const categories = [...new Set(products.map((product) => product.category))];
const colors = [...new Set(products.map((product) => product.color))];
const sizes = [...new Set(products.map((product) => product.sizes).flat())];

console.log(categories);
console.log(colors);
console.log(sizes);

categories.forEach((category) => {
    categoryList.innerHTML += `<li class="cursor-pointer text-black" data-category="${category}">
                                  ${category}
                                </li>`;
});

colors.forEach((color) => {
    colorList.innerHTML += `<li
                                  class="h-8 w-8 border ${ color === "black" ? "bg-black" : `bg-${color}-500`} flex items-center justify-center rounded-full cursor-pointer"
                                  data-color="${color}"
                                >
                                  <span class="h-3 w-3 rounded-full hidden bg-gray-200"></span>
                                </li>`;
});

sizes.forEach((size) => {
    sizeList.innerHTML += `<li
                              class="font-bold bg-gray-200 text-black w-9 h-9 flex items-center justify-center rounded-lg"
                              data-size="${size}"
                            >
                              <button class="uppercase w-full h-full">${size}</button>
                            </li>`;
});

