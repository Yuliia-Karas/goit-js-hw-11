import axios from 'axios';

const KEY = '35692508-ed297a5167f9400201d2ec2b1';
const URL = 'https://pixabay.com/api/';

export default class PixabayGallery {
  constructor() {
    this.name = '';
    this.page = 1;
    this.perPage = 40;
    this.totalPage = 0;
  }

  async getResponse() {
    try {
      const response = await axios.get(`${URL}`, {
        params: {
          key: `${KEY}`,
          q: `${this.name}`,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: 'true',
          per_page: `${this.perPage}`,
          page: `${this.page}`,
        },
      });
      this.incrementPage();
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }

  get getName() {
    return this.name;
  }

  set setName(newName) {
    this.name = newName;
  }

  set setTotalPage(newTotalPages) {
    this.totalPage = newTotalPages;
  }
}
