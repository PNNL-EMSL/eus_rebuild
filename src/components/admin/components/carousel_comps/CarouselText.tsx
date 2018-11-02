import CarouselSettingsObj from 'components/admin/components/CarouselSettingsObj';

export default class CarouselText extends CarouselSettingsObj {

    constructor(props) {
        super(props);

        this.updateCarouselText = this.updateCarouselText.bind(this);
    }

    updateCarouselText(e) {
        const target = e.currentTarget;
        const instance = this;
        setTimeout(() => {
          if(!target.contains(document.activeElement)) {
            instance.updateCarouselSettings('text', target.value);
          }
        }, 0);
      }
    

}