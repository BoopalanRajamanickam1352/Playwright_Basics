//length is a JavaScript property for arrays/strings, while count() is a Playwright Locator method for counting matching elements.

import { test, expect } from "@playwright/test"
import { commonFunction } from "../helperClass/commonFunction"

test("string length", async ({ page }) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    const fullText = await page.locator(".oxd-text.oxd-text--p").nth(1).textContent();
    console.log(fullText)
    if (fullText) {
        console.log(fullText.length)
        expect(fullText.length).toBeGreaterThan(10)
    }
    else {
        console.log("No Text found")
    }
})

test("string length 1", async ({ page }) => {
    await page.goto("https://www.amazon.in")
    const product = "laptop";
    const productUppercase = product.toUpperCase()

    await page.locator("#twotabsearchtextbox").fill(productUppercase)
    const enteredName = await page.inputValue("#twotabsearchtextbox")
    expect(enteredName).toBe(productUppercase)
    await page.waitForTimeout(3000)
    await page.locator("#nav-search-submit-button").click()
    await page.waitForTimeout(2000)
    const productList = await page.locator("[data-cy=title-recipe]").all()
    console.log(productList.length)

    if (productList) {
        await productList[3].click()
    }
    else {
        console.log("No products found")
    }

})

test("string split", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/")
    const listofUser = await page.locator("#login_credentials").innerText()
    const usersArray = await listofUser.split("\n").slice(1)
    console.log(usersArray)
    const user1 = await usersArray[0];
    console.log(user1)

    console.log(listofUser.startsWith("Accepted"))
    console.log(listofUser.trim().endsWith("user"))
    console.log(listofUser.includes("locked"))
})

test("string split username", async ({ page }) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login", { waitUntil: 'domcontentloaded' })
    const username = await page.locator(".oxd-text.oxd-text--p").nth(0).innerText()
    console.log(await username.split(":")[1].trim())
    await page.getByPlaceholder("Username").fill(username)
    await page.waitForTimeout(3000)
})

test("string split replace", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/")

    const obj = new commonFunction(page)
    await obj.launchApp
    await obj.login("standard_user", "secret_sauce")
    const addtoCartCount = await page.locator("button.btn_inventory").count();
    console.log(addtoCartCount)
    for (let i = 0; i < addtoCartCount; i++) {
        await page.locator("button.btn_inventory").nth(i).click()
        await page.waitForTimeout(1000)
    }
    await page.click(".shopping_cart_badge");
    await page.waitForSelector("#checkout")
    await page.click("#checkout")

    await page.getByPlaceholder("First Name").fill("abc")
    await page.getByPlaceholder("Last Name").fill("asdf")
    await page.getByPlaceholder("Zip/Postal Code").fill("233265")

    await page.locator("#continue").click()

    await page.waitForSelector(".summary_total_label");
    const total = await page.locator(".summary_total_label").innerText()
    console.log(total)

    const listofPrices = await page.locator(".inventory_item_price").allTextContents()
    console.log(listofPrices)

    const priceNumber = await listofPrices.map((price) => Number(price.replace('$', ' ')))
    console.log(priceNumber)

    const priceTotal = await priceNumber.reduce((sum, val) => sum + val, 0)
    console.log(priceTotal)

    const tax = Number((await page.locator(".summary_tax_label").innerText()).split("$")[1].trim())
    console.log(`Tax : ${tax}`)

    const displayTotal = Number((await page.locator(".summary_total_label").innerText()).split("$")[1].trim())
    console.log(displayTotal)

    expect(priceTotal + tax).toBe(displayTotal)

    console.log("success")
})

test("string replace all", async ({ page }) => {
    await page.goto("https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php")
    await page.locator("#dob").fill("2026-02-01")

    const dobProvided = await page.locator("#dob").inputValue()
    console.log(dobProvided)

    const dobReplace = await dobProvided.replaceAll("-", "/")
    console.log(dobReplace)

    expect(dobReplace).toBe("2026/02/01")

})

test("Extract email and phone numbre using regex", async ({ page }) => {
    const document = `Our customer ajay@gmail.com support team is available Monday to Friday. For general inquiries, call 5145551023. If you need technical support, contact 4385552045. For billing questions, please call 5145553178. You can also reach our sales department at 4505554261. For urgent after-hours assistance, call 5145555890.`

    const phoneRegex = /\b\d{10}\b/g;
    const phoneNumber = document.match(phoneRegex)
    console.log(phoneNumber?.length)
    console.log(phoneNumber)

    const emailRegex = /\b\w+@\w+\.\w+\b/g;
    const emailAddress = document.match(emailRegex)
    console.log(emailAddress?.length)
    console.log(emailAddress)

})

test("Extract price number using regex", async ({ page }) => {
    await page.goto("https://www.w3.org/WAI/ARIA/apg/patterns/grid/examples/data-grids/", { waitUntil: 'domcontentloaded', timeout: 3000 })
    const balance = await page.locator("#ex1-grid tbody tr td:nth-child(5)").allTextContents()
    console.log(balance)
    const balanceRegex = /\b\.00$\b/g;
    const balanceClear = balance.map(bal => bal.replace(balanceRegex, "").trim())
    console.log(balanceClear?.length)
    console.log(balanceClear)

})

test("Extract book price using regex", async ({ page }) => {
    await page.goto("https://books.toscrape.com/", { waitUntil: 'domcontentloaded', timeout: 3000 })
    const booksPrice = await page.locator(".price_color").allTextContents()
    //    console.log(booksPrice)
    const booksRegex = /\d+\.\d{2}/;
    const booksClear = booksPrice.map(bal => bal.match(booksRegex))
    console.log(booksClear)

})

test("string concat", async ({ page }) => {
    await page.goto("https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php")
    const email = "test".concat(Date.now().toString(), "@gmail.com")
    await page.locator("#email").fill(email)
    await page.waitForTimeout(3000)
})

test.only("string with capital letter", async ({ page }) => {
    const obj = new commonFunction(page)
    await obj.launchApp()
    await obj.login("standard_user", "secret_sauce")
    const items = await page.locator(".inventory_item_name").allTextContents()
    for (let item of items) {
        const firstChar = await item.charAt(0)
        if (firstChar === firstChar.toUpperCase()) {
            console.log("success")
        }
    }
})

