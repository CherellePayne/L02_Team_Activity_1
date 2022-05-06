import { loadTemplate, renderListWithTemplate } from "./utils.js";

export default class ProductList {
  constructor(category, dataSource, listElement) {
    // passing in this infor makes the class as reusable as possible
    // being able to define these things when we use the class will make it very flexible
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    // dataSource will return a Promise...so we can use await to resolve it
    const list = await this.dataSource.getData(this.category);
    // filter out unwanted items
    const filteredList = this.filterList(list);
    // render the list
    this.renderList(filteredList);
  }

  async renderList(list) {
    this.listElement.innerHTML = "";
    const cardTemplate = await loadTemplate(
      "../partials/product-card-template.html"
    );
    renderListWithTemplate(
      cardTemplate,
      this.listElement,
      list,
      this.prepareTemplate
    );
  }

  prepareTemplate(templateClone, product) {
    templateClone.querySelector("a").href += product.Id;
    templateClone.querySelector("img").src = product.Images.PrimaryMedium;
    templateClone.querySelector("img").alt += product.Name;
    templateClone.querySelector(".card__brand").innerHTML = product.Brand.Name;
    templateClone.querySelector(".card__name").innerHTML =
      product.NameWithoutBrand;
    templateClone.querySelector(".product-card__price").innerHTML =
      product.ListPrice;
    return templateClone;
  }

  filterList(list) {
    const filteredList = [];
    list.forEach((tent) => {
      if (tent.Id != "989CG" && tent.Id != "880RT") {
        filteredList.push(tent);
      }
    });
    return filteredList;
  }
}
