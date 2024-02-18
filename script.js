const getData = async function () {
  try {
    const recResponse = await fetch("./travel_recommendation_api.json");
    const recImage = await recResponse.json();
    return recImage;
  } catch (e) {
    throw e;
  }
};
async function logSubmit(event) {
  event.preventDefault();
  const search_inp = document
    .getElementById("search-input")
    .value.toLowerCase();
  var data = await getData();
  let list;
  switch (search_inp) {
    case "beach":
      list = data.beaches;
      showList(list);
      break;
    case "country":
      let countries = data.countries;
      list = [];
      for (let i = 0; i < countries.length; i++) {
        list.push(countries[i].cities[0]);
      }
      showList(list);
      break;
    case "temple":
      list = data.temples;
      showList(list);
      break;
    default:
      search_result.innerHTML = "";
      break;
  }
}

function clear() {
  search_result.innerHTML = "";
}

function showList(list) {
  let html = `<div class="flex flex-col items-center space-y-2 p-2 border-b-2">`;
  list.forEach((item) => {
    html += `<img class="block w-40 h-40 object-cover rounded" src="${item.imageUrl}" alt="Destination">
    <div>
        <h3 class="font-bold">${item.name}</h3>
        <p class="text-sm">${item.description}</p>
        <button class="mt-2 text-blue-500 text-sm">View</button>
    </div>`;
  });
  html += "  </div>";
  search_result.innerHTML = html;
}
const search_result = document.getElementById("search-result");
const form = document.getElementById("search-form");
// const result = document.getElementById("result");
form.addEventListener("submit", logSubmit);
document.getElementById("reset-btn").addEventListener("click", (ev) => {
  search_result.innerHTML = "";
  document.getElementById("search-input").value = "";
});
