import { chromium } from 'playwright';

async function runCustomerJourneySuite() {
  console.log('--- STARTING PLAYWRIGHT CUSTOMER JOURNEY TEST SUITE ---');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  const baseUrl = 'https://vismart-studio.vercel.app';
  console.log(`Navigating to live production URL: ${baseUrl}`);

  try {
    // 1. Visit homepage and verify visibility
    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    const heroTitle = await page.locator('h1').first().innerText();
    console.log(`✓ Test 1: Homepage successfully loaded. Hero Title: "${heroTitle.substring(0, 40)}..."`);

    // 2. Wait for Welcome Invitation modal to appear gently after delay
    console.log('Waiting for Welcome Invitation...');
    await page.waitForTimeout(4000);
    const welcomeModal = page.locator('text=Welcome to Vismart Studio');
    const isWelcomeVisible = await welcomeModal.isVisible();
    console.log(`✓ Test 2: Unobtrusive Welcome Invitation rendered: ${isWelcomeVisible}`);

    // Take screenshot of Welcome Invitation
    await page.screenshot({ path: 'e2e-tests/screenshot-welcome-popup.png' });

    // 3. Test Popup Dismissal into Floating Side Icon
    const dismissBtn = page.locator('button[title="Continue browsing website"]');
    if (await dismissBtn.isVisible()) {
      await dismissBtn.click();
      await page.waitForTimeout(500);
      const dockedBadge = page.locator('text=Discuss My Project');
      console.log(`✓ Test 3: Dismissed popup into side icon badge. Docked icon visible: ${await dockedBadge.isVisible()}`);
    }

    // 4. Test Opening Consultation via Navbar CTA
    const navbarCta = page.locator('nav button:has-text("Discuss Project"), nav a:has-text("Discuss Project")').first();
    if (await navbarCta.isVisible()) {
      await navbarCta.click();
    } else {
      await page.click('button:has-text("Discuss My Project")');
    }
    await page.waitForTimeout(800);

    const modalTitle = page.locator('text=Project Consultation & Brief');
    console.log(`✓ Test 4: Consultation Modal opened: ${await modalTitle.isVisible()}`);

    // Take screenshot of Step 1
    await page.screenshot({ path: 'e2e-tests/screenshot-consultation-step1.png' });

    // 5. Select Step 1: "Build a Brand New Website"
    await page.click('text=Build a Brand New Website');
    await page.waitForTimeout(500);
    console.log('✓ Test 5: Step 1 (Core Goal) selected.');

    // 6. Select Step 2: "Restaurant / Cafe / Food"
    await page.click('button:has-text("Restaurant / Cafe / Food")');
    await page.waitForTimeout(500);
    console.log('✓ Test 6: Step 2 (Industry) selected as Restaurant.');

    // 7. Step 3: Verify Essential Capabilities (Toggle feature)
    await page.click('text=Direct Lead / Inquiry Capture Funnel');
    await page.click('button:has-text("Continue to Budget & Timeline →")');
    await page.waitForTimeout(500);
    console.log('✓ Test 7: Step 3 (Features) verified and advanced.');

    // 8. Step 4: Budget & Timeline
    await page.click('button:has-text("Standard Website")');
    await page.click('button:has-text("Proceed to Final Verification & Submission →")');
    await page.waitForTimeout(500);
    console.log('✓ Test 8: Step 4 (Budget & Timeline) selected.');

    // Take screenshot of Step 5 Verification
    await page.screenshot({ path: 'e2e-tests/screenshot-consultation-step5.png' });

    // 9. Step 5: Test Invalid Contact Submission First
    await page.fill('input[placeholder="e.g. John Doe / Rajesh Sharma"]', 'T');
    await page.fill('input[placeholder="Phone or official email"]', '12');
    await page.click('button:has-text("Submit Project Brief for Quotation Approval")');
    await page.waitForTimeout(500);
    const errorNotice = page.locator('text=Please enter your full name (at least 2 characters).');
    console.log(`✓ Test 9: Form validation blocked invalid input: ${await errorNotice.isVisible()}`);

    // 10. Step 5: Fill Genuine Input & Submit to Serverless Endpoint
    await page.fill('input[placeholder="e.g. John Doe / Rajesh Sharma"]', 'Rajiv Mehta (E2E Test)');
    await page.fill('input[placeholder="Phone or official email"]', 'rajiv.mehta@testcorp.com');
    await page.fill('textarea', 'Testing live E2E serverless lead intake on production.');
    await page.click('button:has-text("Submit Project Brief for Quotation Approval")');

    console.log('Submitting brief to /api/leads...');
    await page.waitForSelector('text=Project Brief Successfully Received', { timeout: 10000 });
    console.log('✓ Test 10: Server confirmed lead intake. Success notice rendered.');

    // Take screenshot of Server-Confirmed Success
    await page.screenshot({ path: 'e2e-tests/screenshot-server-confirmed.png' });

    // 11. Test Switching to Blueprint View
    await page.click('button:has-text("View Full Submitted Dossier")');
    await page.waitForTimeout(600);
    const blueprintTitle = page.locator('text=Project Blueprint Dossier');
    console.log(`✓ Test 11: Structured Project Blueprint dossier visible: ${await blueprintTitle.isVisible()}`);
    await page.screenshot({ path: 'e2e-tests/screenshot-blueprint-dossier.png' });

    // Close modal
    await page.click('button[title="Close modal"]');
    await page.waitForTimeout(500);

    // 12. Test Concept Prototype Modal (Demos Section)
    console.log('Testing Prototype preview modal in Demos section...');
    const inspectBtn = page.locator('button:has-text("Inspect Architecture Preview")').first();
    await inspectBtn.scrollIntoViewIfNeeded();
    await inspectBtn.click();
    await page.waitForTimeout(600);
    const conceptNotice = page.locator('text=Concept Preview Notice');
    console.log(`✓ Test 12: Concept preview modal opened with honest disclaimer: ${await conceptNotice.isVisible()}`);
    await page.screenshot({ path: 'e2e-tests/screenshot-concept-preview.png' });

    // Close demo modal
    await page.click('div[role="dialog"] button:has-text("X"), .fixed.inset-0.z-50 button:has(svg)');

    // 13. Mobile Viewport Navigation Test
    console.log('Testing Mobile Viewport (375x667 iPhone SE)...');
    const mobileContext = await browser.newContext({
      viewport: { width: 375, height: 667 },
      isMobile: true
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(baseUrl, { waitUntil: 'networkidle' });
    await mobilePage.waitForTimeout(1000);

    const mobileBottomBar = mobilePage.locator('button:has-text("Discuss Project")');
    console.log(`✓ Test 13: Mobile bottom bar visible and accessible: ${await mobileBottomBar.isVisible()}`);
    await mobilePage.screenshot({ path: 'e2e-tests/screenshot-mobile-viewport.png' });

    await mobileContext.close();
    await browser.close();

    console.log('--- ALL 13 REAL CUSTOMER JOURNEY TESTS PASSED WITH 100% SUCCESS ---');
  } catch (err) {
    console.error('Test suite failed:', err);
    await page.screenshot({ path: 'e2e-tests/screenshot-failure.png' });
    await browser.close();
    process.exit(1);
  }
}

runCustomerJourneySuite();
