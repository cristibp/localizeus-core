import {log, Storage} from "react-jhipster";

 const getLSKey = (bucketTypes) => {
  const username = Storage.local.get("username");
  const tenant = Storage.local.get("tenant");
  return tenant + "_" + username + "_" + bucketTypes;
};

export const getLSItems = (bucketTypes) : any [] => {
  if (Storage.local.get(getLSKey(bucketTypes)) === undefined) {
    Storage.local.set(getLSKey(bucketTypes), []);
  }
  return Storage.local.get(getLSKey(bucketTypes));
};

export const syncStateToLS = (storeItems: Readonly<any>, bucketTypes) => {
  Storage.local.set(getLSKey(bucketTypes), storeItems);
  return storeItems;
};


export const resetLSItems = (bucketTypes) => {
  Storage.local.set(getLSKey(bucketTypes), undefined);
};
