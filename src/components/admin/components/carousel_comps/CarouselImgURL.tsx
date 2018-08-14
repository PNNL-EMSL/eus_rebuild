import CarouselSettingsObj from 'components/admin/components/CarouselSettingsObj';

export default class CarouselImgURL extends CarouselSettingsObj {

    constructor(props) {
        super(props);
        this.updateCarouselImgUrl = this.updateCarouselImgUrl.bind(this);
    }

    updateCarouselImgUrl(e) {
        const target = e.currentTarget;
        const instance = this;
        setTimeout(() => {
            if(!target.contains(document.activeElement)) {
                instance.updateCarouselSettings('imgUrl', target.value);
            }
        }, 0);
    }
    

}