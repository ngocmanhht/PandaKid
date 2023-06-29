import { action, makeObservable, observable } from 'mobx';

class SessionStore {
  @observable storageWords: {
    storage?: Array<any>;
  } = {};
  @action setData = ({ storage }: { storage?: any }) => {
    this.storageWords = {
      storage,
    };
  };
  @observable dataImage: {
    imageData?: any;
  };
  @action setImageData = ({ imageData }: { imageData?: any }) => {
    this.dataImage = {
      imageData,
    };
  };
}

export default SessionStore;
