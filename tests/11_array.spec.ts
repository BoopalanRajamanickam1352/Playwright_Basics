import { Page } from "@playwright/test";
import { test } from "@playwright/test"
import { commonFunction } from "../helperClass/commonFunction";

test("array", async ({ page }) => {
    const obj = new commonFunction(page);
    await obj.launchAmazon()
    await page.waitForTimeout(5000)
    const title = await obj.pageTitle()
    console.log(`Page title is ${title}`)
    const footerlink = await page.locator("#navFooter a")
    const footercount = await footerlink.count()

    for (let i = 0; i <= footercount; i++) {
        const footertext = await footerlink.nth(i).innerText()
        console.log(`Footer link for ${i} is ${footertext}`)
        if (footertext.includes("Sell on Amazon")) {
            await footerlink.nth(i).click()
            break;
        }
    }
    await page.waitForLoadState('domcontentloaded')
    const newPageTitle = await page.title()
    console.log(`New Page Title ${newPageTitle}`)
})

test.only("array1", async ({ page }) => {
    const obj = new commonFunction(page);
    await obj.launchApp()
    const credentials = [{ username: "standard_user", password: "secret_sauce" }, { username: "locked_out_user", password: "secret_sauce" },
    { username: "problem_user", password: "secret_sauce" }, { username: "performance_glitch_user", password: "secret_sauce" }];
    for (const { username, password } of credentials) {
        console.log(`Testing with username ${username} and password ${password}`)
        await page.fill("#user-name", username)
        await page.fill("#password", password)
        await page.click("#login-button")
        await page.waitForTimeout(1000);

        if (await page.locator(".inventory_list").isVisible()) {
            await page.locator("#react-burger-menu-btn").click()
            await page.locator("#logout_sidebar_link").click()
        }
        else {
            console.log("login failed")
        }
    }
    await page.fill("#user-name", "")
    await page.fill("#password", "")


})