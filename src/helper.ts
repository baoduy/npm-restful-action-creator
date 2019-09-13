import urljoin from 'url-join';

const convertToArray = (obj: any): Array<any> =>
  Array.isArray(obj) ? obj : Object.getOwnPropertyNames(obj).map(p => obj[p]);

export const mergeUrl = (
  url: string,
  path?: object | Array<any> | string | number
) => {
  if (!path) return url;

  let newPath = '';

  if (typeof path === 'string') newPath = path;
  else if (typeof path === 'number') newPath = path.toString();
  else
    convertToArray(path).forEach(element => {
      if (!element) return;
      newPath = urljoin(newPath, element.toString());
    });

  return urljoin(url, newPath);
};
