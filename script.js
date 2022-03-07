const selector = document.querySelector('#selector');
const search = document.querySelector('#search');
const button_submit = document.querySelector('#button_submit');
const productsContent = document.querySelector('#products_contend');

const getProducts = async (params = {}) => {
  const url = new URL('http://localhost:3001/api/v1/products');
  Object.keys(params).forEach((key) => {
    url.searchParams.append(key, params[key]);
  });

  const res = await fetch(url);
  const data = await res.json();

  return data;
};

const render = (products) => {
  // Pintar la vista
  productsContent.textContent = '';

  products.rows.forEach((item) => {
    const cardContent = document.createElement('div');
    const image = document.createElement('img');
    const productTitle = document.createElement('h3');
    const productPrice = document.createElement('p');

    cardContent.classList.add('card')
    image.classList.add('product_image')

    image.src = item.url_image;
    productTitle.textContent = item.name;
    productPrice.textContent = item.price;

    cardContent.appendChild(image);
    cardContent.appendChild(productTitle);
    cardContent.appendChild(productPrice);
    productsContent.appendChild(cardContent);
  });
}

const productosBySearch = async (searchWord) => {
  // Obtenemos la data
 const productos = await getProducts({search: searchWord});

 // Pintamos la data
 render(productos);
}

const productsByCategory = async (id) => {
  // Obtenemos los productos según categoria
  const products = await getProducts({ category: id });
  render(products)
};

button_submit.addEventListener('click', (evn) => {
  evn.preventDefault()
  productosBySearch(search.value);
});

selector.addEventListener('change', () => {
  search.value = '';
  const value = selector.options[selector.selectedIndex].value;
  productsByCategory(value);
});
