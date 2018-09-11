import * as urljoin from 'url-join';

const convertToArray = (obj: any): Array<any> => {
  if (typeof obj === 'object')
    return Object.getOwnPropertyNames(obj).map(p => obj[p]);
  return Array.isArray(obj) ? obj : [];
};

export const mergeUrl = (
  url: string,
  pathParams?: object | Array<any> | string
) => {
  if (!pathParams) return url;

  let newPath = '';

  if (typeof pathParams === 'string') newPath = pathParams;

  convertToArray(pathParams).forEach(element => {
    if (!element) return;
    newPath = urljoin(newPath, element.toString());
  });

  return urljoin(url, newPath);
};
