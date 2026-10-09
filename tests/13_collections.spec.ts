//We use a Locator collection when we need to interact with multiple webpage elements. 
// We use an array when we need to work with data such as text, numbers, or objects.
//Collection = webpage elements
//Array = JavaScript data

//Array - Ordered list of items --> Index-0 -->hetrogenous data --> resizeable --> duplicate values allowed
//Set - store unique value -> dynamic in size -> Iterable -> remove duplicates -> Insertion order is maintained

import { expect, test } from "@playwright/test"
import { commonFunction } from "../helperClass/commonFunction"

test("collections-Array", async ({ page }) => {
    const obj = new commonFunction(page)
    await obj.launchApp()
    await obj.login("standard_user", "secret_sauce")
    const items = await page.locator(".inventory_item_name").allTextContents()
    for (let item of items) {
        console.log(item)
    }
    await expect(items[0]).toContain("Sauce Labs Backpack")
    await expect(items.length).toBe(6)
})

test("collections-Set", async ({ page }) => {
    const obj = new commonFunction(page)
    await obj.flipkart()
    await page.locator("input[name='q']").first().fill("Laptop");
    await page.keyboard.press("Enter")
    await page.waitForSelector(".Vba09Z")
    const listofItems = await page.locator(".RG5Slk").allTextContents()
    //    console.log(listofItems)

    const brandname = listofItems.map(brand => brand.split(" ")[0])
    //    for (let item of listofItems) {
    //        const productTitle = (await item.innerText()).split(" ")[0].trim()
    //        console.log(productTitle)
    //    }
    const uniqueProduct = new Set(brandname)
    console.log(uniqueProduct)
});

test.only("collection-map", async ({ page }) => {
    const obj = new commonFunction(page)
    await obj.flipkart()
    await page.locator("input[name='q']").first().fill("Laptop");
    await page.keyboard.press("Enter")
    await page.waitForSelector(".Vba09Z")

    const items = await page.locator(".RG5Slk")
    const listofItems = await items.allTextContents()
    const brandname = listofItems.map(brand => brand.split(" ")[0])
    const brandcount = await items.count()

    const listofPrice = await page.locator(".hZ3P6w").allTextContents()
    const priceDetails = listofPrice.map(price => price.trim())

    console.log(brandname)
    console.log(priceDetails)

    const productMap = new Map<string, string>()

    for (let i = 0; i < brandcount; i++) {
        productMap.set(brandname[i], priceDetails[i]);
    }
    console.log(productMap);
    let highestPrice = 0;
    let highestBrand = "";

    for (let [brand, price] of productMap) {
        const priceNumber = Number(price.replace(/[₹,]/g, ""));

        if (priceNumber > highestPrice) {
            highestPrice = priceNumber;
            highestBrand = brand;
        }
    }

    console.log("Highest brand:", highestBrand);
    console.log("Highest price:", highestPrice);




})