import {Storage} from "react-jhipster";

export default class StorageHelper {
  private static getLSKey = (bucketTypes) => {
    const username = Storage.local.get("username");
    const tenant = Storage.local.get("tenant");
    return tenant + "_" + username + "_" + bucketTypes;
  };

  static getLSItems = (bucketTypes): any [] => {
    const value = Storage.local.get(StorageHelper.getLSKey(bucketTypes));
    if (!value) {
      Storage.local.set(StorageHelper.getLSKey(bucketTypes), []);
      return [];
    }
    return JSON.parse(value);
  };

  static syncStateToLS = (storeItems: Readonly<any>, bucketTypes) => {
    Storage.local.set(StorageHelper.getLSKey(bucketTypes), JSON.stringify(storeItems));
    return storeItems;
  };


  static resetLSItems = (bucketTypes) => {
    Storage.local.set(StorageHelper.getLSKey(bucketTypes), undefined);
  }
}
