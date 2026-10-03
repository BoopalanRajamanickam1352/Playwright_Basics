import { test, expect } from "@playwright/test"

test("variables", async ({ page }) => {
    let url = "https://www.automationexercise.com/login";
    const usernameValue = "Test User"
    const emailValue = "testuser100@gmail.com"

    await page.goto(url);
    const loginlink = page.getByText(" Signup / Login");
    await loginlink.click();

    const username = page.getByPlaceholder("Name");
    await username.fill(usernameValue);

    const email = page.locator('[data-qa="signup-email"]')
    await email.fill(emailValue);

    const signup = page.locator('[data-qa="signup-button"]')
    await signup.click();

})