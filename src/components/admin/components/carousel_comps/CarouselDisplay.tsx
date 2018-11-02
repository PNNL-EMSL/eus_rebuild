import CarouselSettingsObj from 'components/admin/components/CarouselSettingsObj';

export default class CarouselText extends CarouselSettingsObj {
    constructor(props) {
        super(props);
    }

    updateCarouselDisplay(e) {
        this.updateCarouselSettings('display', e.currentTarget.checked);
    }
}