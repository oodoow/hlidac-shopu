import { cleanPrice, registerShop } from "../helpers.mjs";
import { Shop } from "./shop.mjs";

export class CZC extends Shop {
  get injectionPoint() {
    return ["beforeend", ".pd-price-delivery"];
  }

  async scrape() {
    const elem = document.querySelector(".product-detail");
    if (!elem) return;
    const itemId = elem.dataset.productCode.replace("a", "");
    const title = document.querySelector("h1").getAttribute("title");
    const currentPrice = cleanPrice(".price .price-vatin");
    const originalPrice = cleanPrice(".price-before .price-vatin");
    const imageUrl = document.querySelector("meta[itemprop=image]").content;

    return { itemId, title, currentPrice, originalPrice, imageUrl };
  }
}

registerShop(new CZC(), "czc");
