import './css/styles.css';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import hitsTpl from './templates/card.hbs';
import NewsApiService from './js/apiService.js';
import LoadMoreBtn from './js/load-more-btn.js';
import notify from './js/notification';
import refs from './js/refs.js';

const { searchForm, hitsContainer } = refs;

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const newsApiService = new NewsApiService();

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchHits);
hitsContainer.addEventListener('click', showBigImage);

function onSearch(e) {
  e.preventDefault();
  newsApiService.query = e.currentTarget.elements.query.value;
  if (newsApiService.query === '') {
    return notify('PLEASE ENTER SOMETHING!');
  }
  loadMoreBtn.show();
  newsApiService.resetPage();
  clearHitsContainer();
  fetchHits();
}

function fetchHits() {
  loadMoreBtn.disable();

  newsApiService.fetchArticles().then(hits => {
    if (newsApiService.page - 1 === 1 && hits.length === 0) {
      loadMoreBtn.hide();
      notify('NO RESULTS FOUND!!!');
    } else {
      appendHitsMarkup(hits);
      loadMoreBtn.enable();
      hitsContainer.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  });
}

function appendHitsMarkup(hits) {
  hitsContainer.insertAdjacentHTML('beforeend', hitsTpl(hits));
}

function clearHitsContainer() {
  hitsContainer.innerHTML = '';
}

function showBigImage(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') return;

  const largeImageURL = event.target.getAttribute('data-largeImgURL');

  const instance = basicLightbox.create(`<img src = '${largeImageURL}'>`);
  instance.show();
}
