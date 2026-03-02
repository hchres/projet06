let works = [];

async function getWorks() {
  const response = await fetch("http://localhost:5678/api/works");

  if (!response.ok) {
    throw new Error(`Erreur API: ${response.status}`);
  }

  return await response.json();
}

function displayWorks(works) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";

  works.forEach((work) => {
    const figure = document.createElement("figure");

    const img = document.createElement("img");
    img.src = work.imageUrl;
    img.alt = work.title;

    const figcaption = document.createElement("figcaption");
    figcaption.textContent = work.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);

    gallery.appendChild(figure);
  });
}

async function init() {
    try {
        works = await getWorks();
        const categories = await getCategories()

        displayWorks(works);

        categories.unshift({"id": 0, "name": "Tous"});
        displayCategories(categories)
    } catch (error) {
        console.log(error);
    }
}

void init();


async function getCategories() {
  const response = await fetch("http://localhost:5678/api/categories");

  if (!response.ok) {
    throw new Error(`Erreur API: ${response.status}`);
  }

  return await response.json();
}

function displayCategories(categories) {
    const divCategories = document.querySelector(".categories");
    divCategories.innerHTML = "";

    categories.forEach((category, index) => {
        const button = document.createElement("button");
        button.id = category.id;
        button.textContent = category.name;

        if (index === 0) {
            button.className += "button_selected";
        }
        button.addEventListener("click", () => applyFilter(category.id));

        divCategories.appendChild(button);
    })
}

function applyFilter(catId) {
    let filteredWorks;

    if (catId === 0) {
        filteredWorks = works;
    } else {
        filteredWorks = works.filter((work) => {
            return work.categoryId === catId;
        })
    }
    changeButtonSelected(catId.toString());

    displayWorks(filteredWorks);
}

function changeButtonSelected(categoryId) {
    let buttons = document.querySelectorAll(".categories button");
    buttons.forEach((button) => {
        button.className = "";
        if (button.id === categoryId) {
            button.className = "button_selected";
        }
    })
}
