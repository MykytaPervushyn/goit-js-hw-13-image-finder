import './css/styles.css';
import imagesTpl from './templates/image-card.hbs';
import ImagesApiService from './js/api-service';
import getRefs from './js/get-refs';
import LoadMoreBtn from './js/components/load-more-btn';

import { alert, error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
defaultModules.set(PNotifyMobile, {});

const refs = getRefs();

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const imagesApiService = new ImagesApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchImages);


function onSearch(e) {
  e.preventDefault();

  imagesApiService.query = e.currentTarget.elements.query.value.trim();

  if (imagesApiService.query === '') {
    return alert({ text: 'Please enter valid request!', });
  }
    
  loadMoreBtn.show();
  imagesApiService.resetPage();
  clearImagesContainer();
  fetchImages();
}

    
function fetchImages() {
  loadMoreBtn.disable();
  imagesApiService.fetchImages().then(images => {
    appendImagesMarkup(images);

    loadMoreBtn.enable();
    scrollDown();
  });
}


// function onLoadMore() {
//   fetchImages();
  
// }

function appendImagesMarkup(images) {
  refs.imagesContainer.insertAdjacentHTML('beforeend', imagesTpl(images));
}


function clearImagesContainer() {
    refs.imagesContainer.innerHTML = '';
}

function scrollDown() {
  refs.imagesContainer.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}



