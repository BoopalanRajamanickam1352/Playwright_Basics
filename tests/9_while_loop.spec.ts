//A while loop is used when you want to repeat something as long as a condition is true.
//for     → repeat a known number of times where while   → repeat while condition is true
//scrollIntoViewIfNeeded() scrolls the page so that the element becomes visible in the viewport, but only when scrolling is needed.
import { test, expect } from "@playwright/test"
test("while loop", async ({ page }) => {
    await page.goto("https://www.amazon.in/")
    await page.fill("#twotabsearchtextbox", "pen")
    await page.click("#nav-search-submit-button")

    await page.waitForSelector(".a-price-whole")
    let pagination = 1;

    while (true) {
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(3000)
        const nextButton = await page.locator(".s-pagination-next")

        if (await nextButton.count() > 0 && await nextButton.isVisible()) {
            const classValue = await nextButton.getAttribute('class')
            if (classValue?.includes(".s-pagination-disabled")) {
                console.log("Next Button is disabled")
            }
            console.log("Clicking next button")
            await nextButton.scrollIntoViewIfNeeded()
            await page.waitForTimeout(5000)
            await nextButton.click()
            await page.waitForLoadState('domcontentloaded')
            await page.waitForTimeout(5000)
            pagination++
            console.log(pagination)
        }
    }

}) 