//forEach() is used to go through each value in an array one by one.

import { test, expect } from "@playwright/test"
test("for each loop - example", async ({ page }) => {
    await page.goto("https://www.tutorialspoint.com/selenium/practice/webtables.php")
    const expectedHeader = ['First Name', 'Last Name', 'Age', 'Email', 'Salary', 'Department', 'Action'];
    const headerElements = await page.locator("table thead th").all()
    headerElements.forEach(async (headerE1) => {
        console.log(await headerE1.innerText());
    });
})