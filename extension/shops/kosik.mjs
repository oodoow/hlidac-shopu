import { cleanPrice, registerShop } from "../helpers.mjs";
import { AsyncShop } from "./shop.js";

export class Kosik extends AsyncShop {
  get waitForSelector() {
    return ".product-detail__main-info";
  }

  async scrape() {
    const elem = document.querySelector(
      "#snippet-addProductToCartForm->.amount[product-data]"
    );
    if (!elem) return;
    try {
      const json = elem.getAttribute("product-data");
      const data = JSON.parse(json);
      const originalPrice = cleanPrice(
        ".price__old-price.price__old-price--exists"
      );
      const imageUrl = document.querySelector(".product-detail__image").src;

      return {
        itemId: data.id,
        title: data.itemName,
        currentPrice: data.stepPrice,
        originalPrice,
        imageUrl
      };
    } catch (e) {
      console.error("Could not find product info", e);
    }
  }

  inject(renderMarkup) {
    const elem = document.querySelector(
      ".product-detail__cart, .product-detail__cart-info"
    );
    if (!elem) throw new Error("Element to add chart not found");

    const markup = renderMarkup();
    elem.insertAdjacentElement("afterend", markup);
    return elem;
  }
}

registerShop(new Kosik(), "kosik");