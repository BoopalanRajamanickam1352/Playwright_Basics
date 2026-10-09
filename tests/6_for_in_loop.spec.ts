//for...in is mainly used to loop through the keys/properties of an object.

import { test, expect } from "@playwright/test"
import { locators } from "./locators";
import { formdata } from "./formdata";

test.only("for in loop - example", async ({ page }) => {
    await page.goto("https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php");
    // const formdata = {
    //     name: "Aj",
    //     email: "aj@gmail.com",
    //     mobile: "1232312",
    //     subject: "physics"
    // }
    // const locators = {
    //     name: "#name",
    //     email: "#email",
    //     mobile: "#mobile",
    //     subject: "#subjects"
    // }

    for (let key in formdata) {

        const field = key as keyof typeof formdata;

        if (locators[field]) {
            await page.fill(locators[field], formdata[field]);
        }

    }
    await page.waitForTimeout(3000);
})