import CarouselSettingsObj from 'components/admin/components/CarouselSettingsObj';

export default class CarouselOrder extends CarouselSettingsObj {

    constructor(props) {
        super(props);
    }

    updateCarouselOrder(e) {
        const target = e.currentTarget;
        const instance = this;
        setTimeout(() => {
            if(target.contains(document.activeElement)) {
                instance.updateCarouselSettings('order', target.value);
            }
        }, 0);
    }
    

}