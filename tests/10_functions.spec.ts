import { expect, test } from "@playwright/test"
import { commonFunction } from "../helperClass/commonFunction"

test("functions", async ({ page }) => {
    const obj = new commonFunction(page);
    //await obj.launchApp()
    //await obj.login("standard_user", "secret_sauce")

    await obj.launchAmazon()
    await page.waitForTimeout(5000)
    const title = await obj.pageTitle()
    console.log(`Page title is ${title}`)
    const prod = "pen"
    await obj.searchProduct(prod)
    await page.waitForSelector(".a-size-base.a-spacing-small")
    const result = await page.locator(".a-size-base.a-spacing-small");
    expect(result).toContainText(`results for "${prod}"`)
    await page.waitForTimeout(3000)
})