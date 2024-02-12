// Fully working scripts.js file

import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js";

  const data = {
    list: {
      description: document.querySelector("[data-list-description]"),
      subtitle: document.querySelector("[data-list-subtitle]"),
      title: document.querySelector("[data-list-title]"),
      image: document.querySelector("[data-list-image]"),
      blur: document.querySelector("[data-list-blur]"),
      active: document.querySelector("[data-list-active]"),
      items: document.querySelector("[data-list-items]"),
      button: document.querySelector("[data-list-button]"),
      message: document.querySelector("[data-list-message]"),
      close: document.querySelector("[data-list-close]"),
    },
    search: {
      overlay: document.querySelector("[data-search-overlay]"),
      form: document.querySelector("[data-search-form]"),
      title: document.querySelector("[data-search-title]"),
      authors: document.querySelector("[data-search-authors]"),
      genre: document.querySelector("[data-search-genres]"),
      cancel: document.querySelector("[data-search-cancel")
    },
    settings: {
      overlay: document.querySelector("[data-settings-overlay]"),
      form: document.querySelector("[data-settings-form]"),
      cancel: document.querySelector("[data-settings-cancel]"),
      theme: document.querySelector("[data-settings-theme]"),
    },
    header: {
      settings: document.querySelector("[data-header-settings]"),
      search: document.querySelector("[data-header-search]"),
    },
  };

let page = 1;
let matches = books;

const starting = document.createDocumentFragment();

for (const { author, id, image, title } of matches.slice(0, BOOKS_PER_PAGE)) {
  const element = document.createElement("button");
  element.classList = "preview";
  element.setAttribute("data-preview", id);

  element.innerHTML = `
        <img
            class="preview__image"
            src="${image}"
        />
        
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
    `;

  starting.appendChild(element);
}

data.list.items.appendChild(starting);

// Add Function to do both Option lists
const genreHtml = document.createDocumentFragment();
const firstGenreElement = document.createElement("option");
firstGenreElement.value = "any";
firstGenreElement.innerText = "All Genres";
genreHtml.appendChild(firstGenreElement);

for (const [id, name] of Object.entries(genres)) {
  const element = document.createElement("option");
  element.value = id;
  element.innerText = name;
  genreHtml.appendChild(element);
}

data.search.genre.appendChild(genreHtml);

const authorsHtml = document.createDocumentFragment();
const firstAuthorElement = document.createElement("option");
firstAuthorElement.value = "any";
firstAuthorElement.innerText = "All Authors";
authorsHtml.appendChild(firstAuthorElement);

for (const [id, name] of Object.entries(authors)) {
  const element = document.createElement("option");
  element.value = id;
  element.innerText = name;
  authorsHtml.appendChild(element);
}

data.search.authors.appendChild(authorsHtml);

// Function to use is other apps?
if (window.matchMedia &&window.matchMedia("(prefers-color-scheme: dark)").matches) {
  data.settings.theme.value = "night";
  document.documentElement.style.setProperty("--color-dark", "255, 255, 255");
  document.documentElement.style.setProperty("--color-light", "10, 10, 20");
} else {
  data.settings.theme.value = "day";
  document.documentElement.style.setProperty("--color-dark", "10, 10, 20");
  document.documentElement.style.setProperty("--color-light", "255, 255, 255");
}

data.list.button.innerText = `Show more (${
  books.length - BOOKS_PER_PAGE
})`;
data.list.button.disabled =
  matches.length - page * BOOKS_PER_PAGE > 0;

data.list.button.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${
      matches.length - page * BOOKS_PER_PAGE > 0
        ? matches.length - page * BOOKS_PER_PAGE
        : 0
    })</span>
`;

  (data.search.cancel).addEventListener("click", () => {
  data.search.overlay.open = false;
});

data.settings.cancel.addEventListener("click", () => {
    data.settings.overlay.open = false;
  });

  data.header.search.addEventListener("click", () => {
  data.search.overlay.open = true;
  data.search.title.focus();
});

data.header.settings.addEventListener("click", () => {
    data.settings.overlay.open = true;
  });

  data.list.close.addEventListener("click", () => {
  data.list.active.open = false;
});

data.settings.form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { theme } = Object.fromEntries(formData);

    if (theme === "night") {
      document.documentElement.style.setProperty(
        "--color-dark",
        "255, 255, 255"
      );
      document.documentElement.style.setProperty("--color-light", "10, 10, 20");
    } else {
      document.documentElement.style.setProperty("--color-dark", "10, 10, 20");
      document.documentElement.style.setProperty(
        "--color-light",
        "255, 255, 255"
      );
    }

    data.settings.overlay.open = false;
  });

data.search.form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);
    const result = [];

    for (const book of books) {
      let genreMatch = filters.genre === "any";

      for (const singleGenre of book.genres) {
        if (genreMatch) break;
        if (singleGenre === filters.genre) {
          genreMatch = true;
        }
      }

      if (
        (filters.title.trim() === "" ||
          book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
        (filters.author === "any" || book.author === filters.author) &&
        genreMatch
      ) {
        result.push(book);
      }
    }

    page = 1;
    matches = result;

    if (result.length < 1) {
      data.list.message.classList.add("list__message_show");
    } else {
      data.list.message.classList.remove("list__message_show");
    }

    data.list.items.innerHTML = "";
    const newItems = document.createDocumentFragment();

    for (const { author, id, image, title } of result.slice(
      0,
      BOOKS_PER_PAGE
    )) {
      const element = document.createElement("button");
      element.classList = "preview";
      element.setAttribute("data-preview", id);

      element.innerHTML = `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `;

      newItems.appendChild(element);
    }
// Show more button intergrate?
    data.list.items.appendChild(newItems);
    data.list.button.disabled = matches.length - page * BOOKS_PER_PAGE < 1;
    data.list.button.innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${
          matches.length - page * BOOKS_PER_PAGE > 0
            ? matches.length - page * BOOKS_PER_PAGE
            : 0
        })</span>
    `;

    window.scrollTo({ top: 0, behavior: "smooth" });
    data.search.overlay.open = false;
  });

data.list.button.addEventListener("click", () => {
  const fragment = document.createDocumentFragment();

  for (const { author, id, image, title } of matches.slice(
    page * BOOKS_PER_PAGE,
    (page + 1) * BOOKS_PER_PAGE
  )) {
    const element = document.createElement("button");
    element.classList = "preview";
    element.setAttribute("data-preview", id);

    element.innerHTML = `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `;

    fragment.appendChild(element);
  }

  data.list.items.appendChild(fragment);
  page += 1;
});

data.list.items.addEventListener("click", (event) => {
    const pathArray = Array.from(event.path || event.composedPath());
    let active = null;

    for (const node of pathArray) {
      if (active) break;

      if (node?.dataset?.preview) {
        let result = null;

        for (const singleBook of books) {
          if (result) break;
          if (singleBook.id === node?.dataset?.preview) result = singleBook;
        }

        active = result;
      }
    }

    if (active) {
      data.list.active.open = true;
      data.list.blur.src = active.image;
      data.list.image.src = active.image;
      data.list.title.innerText = active.title;
      data.list.subtitle.innerText = `${authors[active.author]} 
      (${new Date(active.published).getFullYear()})`;
      data.list.description.innerText =active.description;
    }
  });

