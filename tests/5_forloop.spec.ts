import { test, expect } from "@playwright/test"

test("for loop - checkbox example", async ({ page }) => {
    await page.goto("https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php");
    const checkboxes = await page.$$("input[type='checkbox']")
    console.log(checkboxes.length)
    for (let i = 0; i < checkboxes.length; i++) {
        const ischeckbox = await checkboxes[i].isChecked()
        if (!ischeckbox) {
            await checkboxes[i].check()
            await page.waitForTimeout(1000)
        }
    }

    for (let i = 0; i < checkboxes.length; i++) {
        const ischeckbox = await checkboxes[i].isChecked()
        expect(ischeckbox).toBe(true)
    }
    console.log("All checkbox checked")
})

test("for loop - drop down", async ({ page }) => {
    await page.goto("https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php");
    const stateDropdown = await page.locator("#state");
    const options = await stateDropdown.locator('option');
    const count = await options.count();
    console.log(count)

    for (let i = 0; i < count; i++) {
        const listOfState = await options.nth(i).innerText()
        console.log(listOfState)
        if (listOfState?.trim() === "Rajasthan") {
            await stateDropdown.selectOption({ label: "Rajasthan" })
            break;
        }
    }
})

test.only("for loop - list of products", async ({ page }) => {
    await page.goto("https://www.saucedemo.com")
    await page.getByPlaceholder("Username").fill("standard_user")
    await page.getByPlaceholder("Password").fill("secret_sauce")
    await page.locator("#login-button").click()

    await page.waitForSelector(".inventory_item_name ", { state: "visible", timeout: 5000 })
    const listOfProducts = await page.locator(".inventory_item_name");
    const count = await listOfProducts.count();
    console.log(count)
    let isProduct = false;
    for (let i = 0; i < count; i++) {
        const product = await listOfProducts.nth(i).innerText()
        console.log(product)
        if (product.trim() === "Sauce Labs Bike Light") {
            isProduct = true;
        }

    }
    expect(isProduct).toBe(true)

})
