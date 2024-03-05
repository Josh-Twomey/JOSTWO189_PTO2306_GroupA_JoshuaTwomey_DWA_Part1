const template = document.createElement('template');

template.innerHTML = /* html */ ` 
<style>

* {
  box-sizing: border-box;
}

.preview {
  border-width: 0;
  width: 100%;
  font-family: Roboto, sans-serif;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  text-align: left;
  border-radius: 8px;
  border: 1px solid rgba(var(--color-dark), 0.15);
  background: rgba(var(--color-light), 1);
}

@media (min-width: 60rem) {
  .preview {
    padding: 1rem;
  }
}

.preview_hidden {
  display: none;
}

.preview:hover {
  background: rgba(var(--color-blue), 0.05);
}

.preview__image {
  width: 48px;
  height: 70px;
  object-fit: cover;
  background: grey;
  border-radius: 2px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
  0px 1px 1px 0px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
}

.preview__info {
  padding: 1rem;
}

.preview__title {
  margin: 0 0 0.5rem;
  font-weight: bold;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
  color: rgba(var(--color-dark), 0.8)
}

.preview__author {
  color: rgba(var(--color-dark), 0.4);
}
</style>
<button class="preview">
  <img class="preview__image" data-image/>
  <div class="preview__info">
    <h3 class="preview__title" data-title></h3>
    <div class="preview__author" data-author></div>
  </div>
</button>`;


export class preview extends HTMLElement {
    img = undefined;
    title = undefined;
    author = undefined;
    id = undefined;

    #elements = {
        image: undefined,
        title: undefined,
        author: undefined,
        id: undefined,
    }
    #inner = this.attachShadow({ mode: "closed" });

    constructor ( img , title , author , id) {
        super()
        const { content } = template;
        this.#inner.appendChild(content.cloneNode(true));
        this.img = img;
        this.title = title;
        this.author = author;
        this.id = id;
    }
    
    connectedCallback () {
        this.#elements = {
          image: this.#inner.querySelector("[data-image]"),
          title: this.#inner.querySelector("[data-title]"),
          author: this.#inner.querySelector("[data-author]"),
          id: this.#inner.querySelector('[class="preview"]'),
        };

        this.#elements.image.src = this.img;
        this.#elements.title.innerHTML = this.title;
        this.#elements.author.innerHTML = this.author;
        this.setAttribute('data-preview', this.id);
    }

}

customElements.define("bk-preview",preview);