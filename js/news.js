// fetching all api
const fetchApi = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};
// gte element by id
const getElement = (id) => {
  return document.getElementById(id);
};
// show Nav item
fetchApi("https://openapi.programming-hero.com/api/news/categories").then(
  (data) => showNevItem(data)
);

// show nav items
const showNevItem = (data) => {
  const navItem = getElement("navItem");
  const navCategories = data.data.news_category;

  navCategories.forEach((category) => {
    navItem.innerHTML += `
    <a class="text-black-50 text-decoration-none" href="#" onclick="fetchCategories('${category.category_id}','${category.category_name}')">${category.category_name}</a>
    `;
  });
};

// show category wise items
const fetchCategories = (category_id, category_name) => {
  fetchApi(
    ` https://openapi.programming-hero.com/api/news/category/${category_id}`
  ).then((data) => showAllNews(data.data, category_name));
};
fetchCategories("08", "Random News");
// show all news
const showAllNews = (data, name) => {
  getElement("itemCount").innerText = data.length;
  getElement("category_name").innerText = name;
  const newsContainer = getElement("allNewsContainer");
  newsContainer.innerHTML = "";
  data.forEach((news) => {
    const { image_url, title, details, author, total_view, rating } = news;
    const div = document.createElement("div");
    div.classList.add("card", "mb-4", "p-4");
    div.innerHTML = `
      <div class="row g-0 ">
      <div class="col-md-4 pe-4 ">
        <img src="${image_url}" class="img-fluid rounded-start h-100" alt="...">
      </div>
      <div class="col-md-8 ">
        <div class="card-body">
          <h4 class="card-title">${title}</h4>
          <p class="card-text text-black-50 fs-6">${details.slice(0, 200)}</p>
          <p class="card-text text-black-50 fs-6">${details.slice(
            201,
            350
          )}...</p>
          
        </div>
        <div class="d-flex align-items-center justify-content-between ps-4 bottom-0">
            <div class="d-flex ">
            <div class="me-3"><img class="img-fluid rounded-5"  style="width: 50px;" src="${
              author.img
            }" /></div>
            <div>
            <h6>${author.name}</h6>
            <p>${author.published_date}</p>
            </div>
            
            </div>    
            <h5 > <i class="fas fa-eye"></i> ${total_view}</h5>
            

            <div> ${rating.number} 
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star-half-stroke"></i>
            </div>

            <button type="button" class="btn btn-outline-primary fs-5 fw-bolder">
            &rightarrow;
          </button>
        </div>
      </div>
    </div>
        
   `;
    newsContainer.appendChild(div);
  });
};
