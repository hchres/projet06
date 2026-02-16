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
        const works = await getWorks();
        displayWorks(works);

        // const categories = await getCategories()
        // categories.unshift({"id": 0, "name": "Tous"});
        // console.log(categories)
    } catch (error) {
        console.log(error);
    }
}

void init();


// async function getCategories() {
//   const response = await fetch("http://localhost:5678/api/categories");
//
//   if (!response.ok) {
//     throw new Error(`Erreur API: ${response.status}`);
//   }
//
//   return await response.json();
// }
//
// function displayCategories(filtres) {
//   const categories = document.querySelector(".categories");
//   categories.innerHTML = "";