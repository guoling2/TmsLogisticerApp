export  class TmsUrlParserService {
  public static getUrlParameter(urlToCheck: any, name: any): string {
    if (!urlToCheck) {
      return '';
    }

    if (!name) {
      return '';
    }

    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(urlToCheck);
    return results === null ? '' : decodeURIComponent(results[1]);
  }
}
