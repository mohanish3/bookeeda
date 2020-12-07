const baseUrl = 'https://www.googleapis.com/books/v1/volumes';
const filter =
  'fields=items(id,volumeInfo(title, authors, description, categories, imageLinks))';
const lang = 'langRestrict=en';
const orderBy = 'orderBy=relevance';

export async function get(path, query) {
  var url = baseUrl;

  query.push(filter);
  query.push(lang);
  query.push(orderBy);
  console.log(path, query);

  for (var p in path) {
    url = url + '/' + p;
  }

  for (var q = 0; q < query.length; q++) {
    if (q === 0) {
      url = url + '?' + query[q];
    } else {
      url = url + '&' + query[q];
    }
  }
  console.log(url);

  var response = await fetch(url);
  var data = await response.json();
  return data.items;
}
