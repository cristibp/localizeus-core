export default class ApiUtils {
  // Remove and return the first occurrence

  static stringifyCriteria(criteria, hasAlreadyOtherParameters) {
    let stringCriteria = hasAlreadyOtherParameters ? '' : '?';
    for (const prop in criteria) {
      if (Object.hasOwnProperty.call(criteria, prop)) {
        stringCriteria += prop + "=" + criteria[prop] + "&";
      }
    }
    return stringCriteria;
  };

}
