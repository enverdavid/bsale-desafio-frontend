const selector = document.querySelector('#selector');
const search = document.querySelector('#search');
const button_submit = document.querySelector('#button_submit');
const productsContent = document.querySelector('#products_contend');

const baseURL = 'https://bsale-my-backend.herokuapp.com/api/v1';

const getCategories = async () => {
  const res = await fetch(`${baseURL}/categories`);
  const data = await res.json();
  return data
};

const getProducts = async (params = {}) => {
  const url = new URL(`${baseURL}/products`);
  Object.keys(params).forEach((key) => {
    url.searchParams.append(key, params[key]);
  });

  const res = await fetch(url);
  const data = await res.json();

  return data;
};

const renderProducts = (products) => {
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

const renderCategories = async () => {
  const data = await getCategories();
  const categories = data.rows;

  categories.forEach((c) => {
    const option = document.createElement('option');
    option.value = c.id;
    option.textContent = c.name;

    selector.appendChild(option)
  })
}

const productosBySearch = async (searchWord) => {
  // Obtenemos la data
 const productos = await getProducts({search: searchWord});

 // Pintamos la data
 renderProducts(productos);
}

const productsByCategory = async (id) => {
  // Obtenemos los productos según categoria
  const products = await getProducts({ category: id });
  renderProducts(products)
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

renderCategories()
