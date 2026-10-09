//const url = (page.url()).includes("dashboard") includes method used to find part of text 
//await page.keyboard.press('Enter')

import { test, expect } from "@playwright/test"

test("conditional statement - if", async ({ page }) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await page.getByPlaceholder("Username").fill("Admin")
    await page.getByPlaceholder("Password").fill("admin123")
    await page.locator('[type="submit"]').click()

    await page.waitForSelector(".oxd-topbar-header-breadcrumb-module");
    const text = await page.locator(".oxd-topbar-header-breadcrumb-module").textContent()
    if (text === 'Dashboard') {
        console.log("login successful")
    }
})

test("conditional statement - if-else", async ({ page }) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await page.getByPlaceholder("Username").fill("Admin")
    await page.getByPlaceholder("Password").fill("admin123")
    await page.locator('[type="submit"]').click()

    await page.waitForSelector(".oxd-topbar-header-breadcrumb-module");
    const url = (page.url()).includes("dashboard")
    console.log(url)

    if (url) {
        await page.locator("button[title='Assign Leave']").click()
    }
    else {
        console.log("login failed")
    }

})

test.only("conditional statement - if-else ladder", async ({ page }) => {
    await page.goto("https://www.amazon.in/")
    await page.locator(".a-button-text").click();
    await page.getByPlaceholder("Search Amazon.in").fill("laptop");
    await page.keyboard.press('Enter')
    const product = page.getByRole('link', { name: /Apple 2026 MacBook Neo 13/ }).first();
    await product.evaluate((el) => el.removeAttribute("target"));
    await product.click();
    const stockMessage = await page.locator(".primary-availability-message").textContent();
    await page.waitForTimeout(3000)

    if (stockMessage?.includes("In stock")) {
        await page.locator("#add-to-cart-button").nth(1).click();
    }
    else if (stockMessage?.includes("Currently Unavailable")) {
        console.log("product is out of stock");
    }
})
