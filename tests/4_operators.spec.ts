//textContent → gets all text, including hidden text.
//innerText → gets only visible text.
//Use backticks ` ` console.log(`Value ${a}`);
//for arithematic operation usually it retrun string we need to convert to int using parseInt(a)
//textContent() returns all text inside an element, including hidden text. innerText() returns the visible text that the user can see.  
//totalText.replace(/[^\d]/g, '') to fetch only numbers from the string 

import { test, expect } from "@playwright/test"

test("Operators", async ({ page }) => {
    await page.goto("https://phptravels.com/demo/")
    await page.waitForTimeout(2000);
    const a = await page.locator('b[x-text="qa"]').innerText();
    const b = await page.locator('b[x-text="qb"]').innerText();
    const sum = parseInt(a) + parseInt(b);
    console.log(`Value ${a} and value ${b} is equal to ${sum}`);
    await page.locator("#dm-captcha").fill(sum.toString());
})

test("Operators 1", async ({ page }) => {
    await page.goto("https://automationexercise.com/");
    await page.getByRole('link', { name: 'products' }).click()
    await page.locator("[data-product-id='1']").first().click()
    await page.getByRole('button', { name: 'Continue Shopping' }).click()
    await page.locator("[data-product-id='1']").first().click()
    await page.getByRole('link', { name: 'View Cart' }).click()
    await page.waitForTimeout(3000)

    //cart price
    const priceText = await page.locator(".cart_price").innerText();
    const price = parseInt(priceText.replace(/[^\d]/g, ''))
    console.log(`Price is ${price}`)

    //Quantity
    const quantityText = await page.locator(".cart_quantity").innerText()
    const quantity = parseInt(quantityText)
    console.log(`Quantity is ${quantity}`)

    //Total Amount
    const totalText = await page.locator(".cart_total").innerText()
    const total = parseInt(totalText.replace(/[^\d]/g, ''))
    console.log(`Total is ${total}`)
    const expectedTotal = price * quantity;
    expect(expectedTotal).toBe(total)
})

test("Operators 2", async ({ page }) => {
    await page.goto("https://www.amazon.in/")
    await page.fill("#twotabsearchtextbox", "pen")
    await page.click("#nav-search-submit-button")

    await page.waitForSelector(".a-price-whole")

    let totalprice = 0

    const priceText1 = await page.locator(".a-price-whole").nth(0).innerText()
    const priceText2 = await page.locator(".a-price-whole").nth(1).innerText()
    const priceText3 = await page.locator(".a-price-whole").nth(2).innerText()

    const price1 = parseInt(priceText1)
    const price2 = parseInt(priceText2)
    const price3 = parseInt(priceText3)

    totalprice += price1
    totalprice += price2
    totalprice += price3

    console.log(totalprice)

    //discount 50 rupees 
    totalprice -= 50
    console.log(`After discount ${totalprice}`)

    //multiply by 2
    totalprice *= 2
    console.log(`After multiply by 2 ${totalprice}`)

    //divide by 2
    totalprice /= 2
    console.log(`After divide by 2 ${totalprice}`)
})

test("Operators 3", async ({ page }) => {
    await page.goto("https://www.amazon.in/")
    await page.fill("#twotabsearchtextbox", "pen")
    await page.click("#nav-search-submit-button")

    await page.waitForSelector(".a-price-whole")

    let expectedPrice = 299

    const priceText1 = await page.locator(".a-price-whole").nth(0).innerText()
    const price = parseInt(priceText1)
    console.log(price)

    if (price === expectedPrice) {
        await page.locator("[data-cy='title-recipe']:not(:has-text('sponsored'))a").nth(0).click();
    }
    else {
        console.log("price is not equal")
    }

})

test("Operators 4", async ({ page }) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await page.getByPlaceholder("Username").fill("Admin")
    await page.getByPlaceholder("Password").fill("admin123")
    await page.locator('[type="submit"]').click()

    await page.waitForSelector(".oxd-topbar-header-breadcrumb-module");
    const isDashboard = page.url().includes("/dashboard");
    console.log(isDashboard)

    const text = await page.locator(".oxd-topbar-header-breadcrumb-module").textContent()
    console.log(text)

    await page.waitForSelector(".emp-attendance-chart", { state: "visible", timeout: 3000 })
    const ischartVisible = await page.locator(".emp-attendance-chart").isVisible()
    console.log(ischartVisible)

    if (text?.trim() == "Dashboard" && isDashboard && ischartVisible) {
        console.log("All condition are true")
        await page.locator("button[title='My Timesheet']").click()
    }
    else {
        console.log("one or more condition is failed")
    }
})

test("Logical Not Operators 5", async ({ page }) => {
    await page.goto("https://www.saucedemo.com")
    const username = await page.getByPlaceholder("Username").inputValue()
    if (!username) {
        console.log("username is empty")
        await page.fill("#user-name", "Test")
    }

})

test("Ternary Operators 6", async ({ page }) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await page.getByPlaceholder("Username").fill("Admin")
    await page.getByPlaceholder("Password").fill("admin123")
    await page.locator('[type="submit"]').click()

    const text = await page.locator(".oxd-topbar-header-breadcrumb-module").textContent();
    console.log(text)

    text?.includes("Dashboard") ? await page.locator("button[title='My Timesheet']").click() : console.log("Fail")
})

test.only("Ternary Operators 7", async ({ page }) => {
    await page.goto("https://www.amazon.in/")
    await page.fill("#twotabsearchtextbox", "pen")
    await page.click("#nav-search-submit-button")

    await page.waitForSelector(".a-price-whole")
    const text = await page.textContent("i[data-cy='reviews-ratings-slot']");
    console.log(text)

    const rating = parseFloat((text ?? "0").split(' ')[0])
    console.log(rating)

    rating > 4 ? page.locator("[data-cy='title-recipe']:not(:has-text('Sponsored')a").nth(0).click()
        : console.log("Rating is less than 4")
})

