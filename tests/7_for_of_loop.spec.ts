//for...of is used to loop through the values of an iterable, most commonly an array.

import { test, expect } from "@playwright/test"
test("for of loop - example", async ({ page }) => {
    await page.goto("https://www.tutorialspoint.com/selenium/practice/webtables.php");
    const rows = await page.locator("table tbody tr").all();

    for (const row of rows) {
        const salaryText = await row.locator("td").nth(4).textContent();
        const salary = Number(salaryText)
        console.log(salary)
        if (salary >= 12000) {
            await row.locator(".delete-wrap.confirmdeletebtn").click();
            await page.waitForTimeout(2000)
        }
    }
    await page.waitForTimeout(5000)
})

test.only("for of loop -amazon example", async ({ page }) => {
    await page.goto("https://www.amazon.in");
    await page.waitForSelector("#nav-xshop-container")
    const navItem = await page.locator("#nav-xshop-container ul li").all();

    for (let nav of navItem) {
        console.log(await nav.innerText())
        console.log(await nav.locator("a").getAttribute('href'))
    }
    await page.waitForTimeout(3000)
})