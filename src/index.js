import './sass/index.scss';

import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('#search-form');
const photoGallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

const KEY = '35692508-ed297a5167f9400201d2ec2b1';
let page = 1;
const perPage = 40;
const imageType = 'photo';
const imageOrientation = 'horizontal';
const safeSearch = 'true';


async function getResponse(searchImages) {
    try {
     const URL =
       'https://pixabay.com/api/?key=${KEY}&q=${searchImages}&image_type=${imageType}&orientation=${imageOrientation}&safesearch=${safeSearch}&per_page=${perPage}&page=${page}';
 
    const response = await axios.get(URL);
    if (response.status === 404) {
      return [];
      }
          return await response.data;
  } catch (error) {
    console.error(error);
  }
}


