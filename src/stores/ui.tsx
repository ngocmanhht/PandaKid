import { action, makeObservable, observable } from 'mobx';

class UIStore {
  @observable loading: {
    isVisible: boolean;
  } = { isVisible: false };
  @action showLoading = () => {
    this.loading = {
      isVisible: true,
    };
  };
  @action hideLoading = () => {
    this.loading = {
      isVisible: false,
    };
  };
  @observable cameraOption: {
    isVisible: boolean;
  } = { isVisible: false };
  @action showCameraOption = () => {
    this.cameraOption = {
      isVisible: true,
    };
  };
  @action hideCameraOption = () => {
    this.cameraOption = {
      isVisible: false,
    };
  };
  constructor() {
    makeObservable(this);
  }
}

export default UIStore;
