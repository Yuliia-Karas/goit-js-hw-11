import './sass/index.scss';

import Notiflix, { Notify } from 'notiflix';
import PixabayGallery from './pixabay-gallery';
import { insertContent } from './card-gallery';

const pixabayGallery = new PixabayGallery();
const searchForm = document.querySelector('.search-form');
const input = document.querySelector('input');
const gallery = document.querySelector('.gallery');
const endGallery = document.querySelector('.end');
// const loadMoreBtn = document.querySelector('.load-more');

let observer;

const searchImages = async e => {
  e.preventDefault();
  pixabayGallery.name = input.value.trim();
  pixabayGallery.resetPage();

  // const observer = new IntersectionObserver(onEntry, observerOptions);

  observer = new IntersectionObserver(onEntry, observerOptions);


  if (pixabayGallery.name === '') {
    return Notify.failure('What you want to find?');
  }

  try {
    const response = await pixabayGallery.getResponse();
    gallery.innerHTML = '';
    smoothScroll();

    pixabayGallery.totalPages = Math.ceil(
      response.data?.totalHits / response.config.params.per_page
    );

    if (response.data.hits.length === 0) {
      observer.unobserve(endGallery);
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else if (
      pixabayGallery.page > pixabayGallery.totalPages ||
      response.data.totalHits < pixabayGallery.perPage
    ) {
      observer.unobserve(endGallery);
      Notify.info("We're sorry, but you've reached the end of search results.");
    } else {
      Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
      observer.observe(endGallery);
    }

    insertContent(response.data.hits);
  } catch (error) {
    console.log(error);
  }
};

function smoothScroll() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
}

const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && pixabayGallery.name !== '') {
      pixabayGallery
        .getResponse()
        .then(response => {
                if (
            pixabayGallery.page > pixabayGallery.totalPages ||
            response.data.totalHits < pixabayGallery.perPage
          ) {
            observer.unobserve(endGallery);
            Notify.info(
              "We're sorry, but you've reached the end of search results."
            );
          } else {
            insertContent(response.data.hits);
          } 
          
        })
        .catch(error => console.log(error));
    }
  });
};

const observerOptions = {
  rootMargin: '300px',
};

searchForm.addEventListener('submit', searchImages);