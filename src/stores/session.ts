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
}

export default SessionStore;
