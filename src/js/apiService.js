const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '23855124-9744a76c55c8d410f772c2e55';

export default class NewsApiServise {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchArticles() {
    const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;

    return await fetch(url)
      .then(response => response.json())
      .then(data => {
        this.incrementPage();

        return data.hits;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
