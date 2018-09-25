import urljoin from 'url-join';

const convertToArray = (obj: any): Array<any> =>
  Array.isArray(obj) ? obj : Object.getOwnPropertyNames(obj).map(p => obj[p]);

export const mergeUrl = (
  url: string,
  pathParams?: object | Array<any> | string
) => {
  if (!pathParams) return url;

  let newPath = '';

  if (typeof pathParams === 'string') newPath = pathParams;
  else
    convertToArray(pathParams).forEach(element => {
      if (!element) return;
      newPath = urljoin(newPath, element.toString());
    });

  return urljoin(url, newPath);
};
