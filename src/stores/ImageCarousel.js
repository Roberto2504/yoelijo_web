import { observable, action, useStrict } from 'mobx';

useStrict(true);

class ImageCarouselStore {
  @observable activeImageCarousel = false;
  @observable images = [];

  @action setActiveImageCarousel (images) {
    this.activeImageCarousel = !this.activeImageCarousel;
    this.images = images;
  }
}

const imageCarouselStore = new ImageCarouselStore();
export default imageCarouselStore;
