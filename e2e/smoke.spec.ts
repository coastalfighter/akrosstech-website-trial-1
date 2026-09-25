import { expect, test, type Page } from "@playwright/test";

/** Skip the first-visit preloader so tests start on an interactive page. */
async function skipPreloader(page: Page) {
  await page.addInitScript(() => {
    try {
      sessionStorage.setItem("ak-preloaded", "1");
    } catch {
      /* storage unavailable */
    }
  });
}

function collectConsoleErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message));
  page.on("console", (msg) => {
    if (msg.type() === "error" && !/Failed to load resource/.test(msg.text()))
      errors.push(msg.text());
  });
  return errors;
}

test.describe("Akrostech website", () => {
  test.beforeEach(async ({ page }) => {
    await skipPreloader(page);
  });

  test("home page renders hero, services and contact without console errors", async ({ page }) => {
    const errors = collectConsoleErrors(page);
    await page.goto("/");
    await expect(
      page.getByRole("heading", { level: 1, name: /offshore talent\. onshore quality\./i }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Website Development" }).first()).toBeAttached();
    await expect(page.locator("#contact")).toBeAttached();
    await expect(page).toHaveTitle(/Akrostech/);
    expect(errors).toEqual([]);
  });

  test("every primary page responds and has exactly one h1", async ({ page }) => {
    for (const path of [
      "/about",
      "/services",
      "/services/website-development",
      "/services/virtual-assistance",
      "/services/recruitment-process-outsourcing",
      "/services/accounting-assistance",
      "/services/legal-process-outsourcing",
      "/contact",
      "/blog",
      "/blog/what-is-recruitment-process-outsourcing-rpo",
      "/privacy-policy",
      "/terms-and-conditions",
    ]) {
      const response = await page.goto(path);
      expect(response?.status(), path).toBe(200);
      await expect(page.locator("h1"), path).toHaveCount(1);
    }
  });

  test("website development page shows pricing tiers and process", async ({ page }) => {
    await page.goto("/services/website-development");
    for (const tier of [
      "Landing Page",
      "Business Website",
      "E-commerce Store",
      "Web Application",
      "Essential",
      "Growth",
      "Scale",
    ]) {
      await expect(page.getByRole("heading", { name: tier, exact: true })).toBeAttached();
    }
    for (const step of ["Discovery", "Design", "Development", "Testing", "Launch", "Support"]) {
      await expect(page.getByRole("heading", { name: step, exact: true })).toBeAttached();
    }
  });

  test("contact form validates required fields", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: /send message/i }).click();
    await expect(page.getByText("Please enter your first name")).toBeVisible();
  });

  test("legacy WordPress URLs redirect permanently", async ({ request }) => {
    const res = await request.get("/about-akrostech", { maxRedirects: 0 });
    expect([301, 308]).toContain(res.status());
    expect(res.headers()["location"]).toContain("/about");
  });

  test("unknown routes render the branded 404", async ({ page }) => {
    const res = await page.goto("/this-page-does-not-exist");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: /offshore vacation/i })).toBeVisible();
  });

  test("security headers are present", async ({ request }) => {
    const res = await request.get("/");
    const headers = res.headers();
    expect(headers["content-security-policy"]).toContain("default-src 'self'");
    expect(headers["x-frame-options"]).toBe("DENY");
    expect(headers["x-content-type-options"]).toBe("nosniff");
  });

  test("mobile menu opens and navigates", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile-only");
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    const dialog = page.getByRole("dialog", { name: "Site menu" });
    await expect(dialog).toBeVisible();
    await dialog.getByRole("link", { name: /website development/i }).click();
    await expect(page).toHaveURL(/\/services\/website-development$/);
  });

  test("keyboard users can reach the skip link", async ({ page, isMobile }) => {
    test.skip(isMobile, "desktop-only");
    await page.goto("/");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  });
});
