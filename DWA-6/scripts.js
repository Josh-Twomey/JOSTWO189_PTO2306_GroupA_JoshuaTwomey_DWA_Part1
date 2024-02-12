// Fully working scripts.js file

import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js";

let page = 1;
let matches = books;

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


const updateButtonText = () => {
  data.list.button.innerText = `Show more (${
    matches.length - BOOKS_PER_PAGE * page
  })`;
  data.list.button.disabled = matches.length - page * BOOKS_PER_PAGE < 0;
  data.list.button.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${
      matches.length - page * BOOKS_PER_PAGE > 0
        ? matches.length - page * BOOKS_PER_PAGE
        : 0
    })</span>
`;
};

  const updateDisplay = () => {
      const fragment = document.createDocumentFragment();

      for (const { author, id, image, title } of matches.slice(0,page * BOOKS_PER_PAGE)) {
        const element = document.createElement("button");
        data.list.items.innerHTML = "";
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
      updateButtonText();
      data.list.items.appendChild(fragment);
  }

updateDisplay()

const filterValues = (value,item,dropdown) => {
const html = document.createDocumentFragment();
const first = document.createElement("option");
first.value = "any";
first.innerText = value;
html.appendChild(first);

for (const [id, name] of Object.entries(item)) {
  const element = document.createElement("option");
  element.value = id;
  element.innerText = name;
  html.appendChild(element);
}

dropdown.appendChild(html);
}

filterValues('All Genres',genres,data.search.genre)
filterValues('All Authors',authors,data.search.authors)

    const colourSwap = (theme) => {
      if (theme === "night") {
        document.documentElement.style.setProperty("--color-dark","255, 255, 255");
        document.documentElement.style.setProperty("--color-light","10, 10, 20");
      } else {
        document.documentElement.style.setProperty("--color-dark","10, 10, 20");
        document.documentElement.style.setProperty("--color-light","255, 255, 255");
      }
    };

if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
  colourSwap(data.settings.theme.value = "night");
} else {
  colourSwap(data.settings.theme.value = "day");
}

data.search.cancel.addEventListener("click", () => {
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
    colourSwap(theme)
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
    
    updateDisplay()
    window.scrollTo({ top: 0, behavior: "smooth" });
    data.search.overlay.open = false;
  });

data.list.button.addEventListener("click", () => {
  page += 1;
  updateDisplay()
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


