export default function(value: any, parentElement: any) {
  try {
    const pOpKeys = Object.keys(parentElement._parent);
    const keyNo = pOpKeys.length;
    const keyName = pOpKeys[keyNo - 1];
    const arrOfKey = parentElement._parent[keyName];
    const arrOfKeyLen = arrOfKey.length;
    if (arrOfKeyLen > 0) {
      const arr = arrOfKey;
      const arrIndex = arrOfKey.length - 1;
      arr[arrIndex] = value;
    } else {
      parentElement._parent[keyName] = value;
    }
  } catch (e) {}
}

export interface ISteamProfile {
  steamID64: string;
  steamID: string;
  onlineState: string;
  stateMessage: string;
  privacyState: string;
  visibilityState: string;
  avatarIcon: string;
  avatarMedium: string;
  avatarFull: string;
  vacBanned: string;
  tradeBanState: string;
  isLimitedAccount: string;
}
