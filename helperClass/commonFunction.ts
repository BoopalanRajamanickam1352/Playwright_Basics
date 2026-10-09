import { Page } from "@playwright/test"
export class commonFunction {
    constructor(private page: Page) {

    }

    async launchApp() {
        await this.page.goto("https://www.saucedemo.com/")
    }

    async login(username: string, password: string) {
        await this.page.fill("#user-name", username)
        await this.page.fill("#password", password)
        await this.page.locator("#login-button").click()
        await this.page.waitForTimeout(3000)
    }

    async launchAmazon() {
        await this.page.goto("https://www.amazon.in")
    }

    async pageTitle(): Promise<string> {
        return await this.page.title()
    }

    async searchProduct(product: string) {
        await this.page.locator("#twotabsearchtextbox").fill(product)
        await this.page.locator("#nav-search-submit-button").click()
    }

    async flipkart() {
        await this.page.goto("https://www.flipkart.com/", { waitUntil: 'domcontentloaded' });
    }
}