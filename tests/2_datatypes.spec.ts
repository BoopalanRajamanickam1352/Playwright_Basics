//let variable can assign later but const needs to assign while declaring itself
//.fill will accept only string if any number we need to convert to string

import { test, expect } from "@playwright/test"
test("datatypes", async ({ page, browser }) => {
    await page.goto("https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php")
    let name: string;
    let email: string;
    let gender: boolean;
    let mob_number: number;
    let subject: undefined;

    name = "Ajay"
    await page.locator("#name").fill(name)

    email = "ajay@gmail.com"
    await page.locator("#email").fill(email)

    await page.locator("#gender").check()
    const ischecked = await page.locator("#gender").isChecked();
    if (ischecked) {
        console.log("success")
    }

    mob_number = 12315464;
    await page.locator("#mobile").fill(mob_number.toString())

    await page.locator("#subjects").fill(subject ?? "")

    browser.close()

})