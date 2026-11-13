MASTER IMPLEMENTATION RULES – READ BEFORE EXECUTION

Act as an efficient Senior Software Engineer and UI/UX Specialist. Treat the following requirements as a direct implementation plan, not a brainstorming or redesign exercise.

1. Execution Strategy

- First inspect the existing codebase and understand the current architecture.
- Create and follow the "IMPLEMENTATION_PLAN.md" checklist.
- Work directly on the existing project.
- Implement all requested changes in the fewest efficient steps.
- Do not waste time or tokens repeatedly analyzing, explaining, or rewriting code that already works.
- Avoid unnecessary file creation, dependencies, refactoring, redesigns, and duplicate implementations.
- Prefer targeted code changes and reuse existing components and assets.
- Work quickly, but never compromise production quality.

2. Strict Preservation

- Do not remove or disturb any existing functionality, animations, images, videos, illustrations, content, or components unless explicitly instructed.
- Do not rebuild the website from scratch.
- Do not overwrite working code unnecessarily.
- Preserve the existing project architecture and deployment configuration.

3. Professional Design Standards

- No emojis anywhere in the website UI.
- Use accurate, clean, professional SVG icons for all relevant icons, social platforms, buttons, and navigation elements.
- Avoid emoji substitutes, random Unicode symbols, and inconsistent icon styles.
- Maintain a consistent premium design system, typography, spacing, colors, borders, and animations.
- Every new element must look like a native part of Linkal AI.

4. Mobile-First and Desktop-Responsive Development

Design and verify every component separately for:

- Mobile phones (small and large screens).
- Tablets.
- Desktop and laptop screens.

The website must adapt naturally to each screen size. Do not simply shrink desktop layouts to fit mobile.

Ensure:

- No horizontal scrolling or overflowing containers.
- Correct image, video, text, and button sizing.
- Proper navigation and menu behavior.
- Appropriate touch targets and spacing on mobile.
- Balanced layouts and typography on desktop.
- No overlapping or clipped elements.

5. Performance and Code Quality

- Keep the website lightweight, fast, and responsive.
- Avoid unnecessary JavaScript, CSS, animations, libraries, and dependencies.
- Prevent layout shifts and unnecessary re-renders.
- Optimize existing assets without degrading their quality.
- Use efficient CSS and reuse existing code wherever possible.
- Ensure animations remain smooth and do not affect scrolling or responsiveness.
- Avoid introducing performance regressions or console errors.

6. Production-Ready Execution

Do not consider a task complete just because code has been written. Verify its actual behavior.

Test the modified functionality, responsive layouts, navigation, links, assets, and production build. Fix errors introduced by the changes.

Update the implementation checklist after each verified task.

7. Efficient Completion

Do not stop to ask for approval after every individual change. Follow the complete approved requirements in the implementation plan.

Prioritize the requested changes, avoid unrelated improvements, and complete the work in one efficient implementation cycle.

At the end, provide a concise completion report, update the checklist, commit the changes, and push everything to the existing GitHub repository.

CORE RULE: Minimum unnecessary work, maximum implementation quality, zero avoidable regressions.

Act as a Senior UI/UX Designer, Frontend Engineer, and Full-Stack Developer. I want you to implement the following changes in the existing Linkal AI website (linkal.in).

IMPORTANT: Before doing anything, inspect the entire existing project and understand its current design, components, animations, assets, navigation, responsive layouts, and functionality. Do not blindly modify or replace existing code.

1. MOST IMPORTANT: PRESERVE THE EXISTING WEBSITE

In previous modifications, several existing elements were accidentally removed or damaged. This must NOT happen again.

Strictly preserve:

- The initial mobile loading/intro animation.
- All existing coffee, cakes, food, product, and other illustrative images.
- Existing website builder demonstrations and animations.
- All existing sections, content, illustrations, and background assets.
- Existing functionality, buttons, links, and interactive elements.
- Existing responsive layouts and navigation behavior.
- All existing features and visual elements that are not explicitly mentioned for modification.

Do not delete, replace, simplify, or redesign unrelated sections.

Before modifying any component, understand its dependencies and existing behavior. Make minimal, targeted changes instead of rewriting entire components.

2. COMPLETE WEBSITE COLOR THEME REDESIGN

Change the overall website appearance to a clean, premium, professional white theme.

- Use pure white or subtle off-white as the primary background.
- Use sophisticated dark typography for headings and body text.
- Use Linkal's existing brand accent colors wherever appropriate.
- Maintain subtle borders, refined shadows, and clean spacing.
- Avoid excessive gradients, dark backgrounds, unnecessary colored containers, and heavy visual effects.
- Give the website a modern premium SaaS appearance inspired by high-quality professional technology products.

The entire website should feel visually consistent, light, spacious, modern, and trustworthy.

Typography:
Choose suitable professional fonts for headings, descriptions, buttons, and normal text. Use a slightly creative, elegant heading font paired with a highly readable modern sans-serif body font. Maintain consistent font weights, sizes, and spacing across desktop and mobile.

3. HERO VIDEO – hero-loop.webm

Locate the existing "hero-loop.webm" video.

- Preserve the original video and its animation.
- Change its surrounding section to a clean white background.
- Remove the visible box, border, and unnecessary container styling around the video.
- Display the video directly within the website layout, seamlessly integrated into the white background.
- Maintain its original aspect ratio and proper responsive sizing.
- Do not remove, replace, or unnecessarily modify the video itself.

The video should look like an integrated part of the website rather than a video placed inside a bordered card.

4. MAIN WEBSITE TASKBAR / NAVIGATION ORDER

Currently, Studio is in the fourth position. Move it to the second position.

The main desktop navigation must follow this exact order:

1. Home
2. Studio
3. How it Works
4. Pricing

Preserve all existing navigation functionality and links. Only change the order and styling where necessary.

Ensure the taskbar remains properly positioned and consistent throughout the website, including when scrolling through different sections.

5. MOBILE FREE FEATURES TEXT

Currently, the free portfolio website and wedding website information is displayed inside a box.

Modify this specifically for mobile view:

Display the following in one single horizontal line, without a surrounding box:

CV Website & Wedding Card Website: Lifetime Free

Requirements:

- Remove the existing box/container styling on mobile for this particular announcement.
- Highlight the word FREE with an attractive brand-accent treatment.
- Use proper SVG icons where appropriate.
- Maintain clean typography, alignment, and spacing.
- Ensure it fits properly without horizontal scrolling or going outside the screen.
- Keep desktop styling intact unless a change is necessary for visual consistency.

6. REMOVE EXISTING SENTENCE

Completely remove this sentence from the website:

"No coding, no manual configuration. Just enter your details and Linkal puts your branded website on Google with direct WhatsApp ordering in 60 seconds."

Remove it wherever it appears in the relevant existing content. Do not replace it with another misleading claim.

7. SIDE-OPENING MENU REDESIGN

Currently, the menu opens downward. Change it to a professional left-side sliding navigation drawer.

Requirements:

- Menu should slide in smoothly from the left.
- Use a clean white background and premium typography.
- Add a subtle overlay behind the drawer.
- Include a smooth opening animation.
- When the user clicks the close/back button, clicks outside, or selects a navigation link, the menu should smoothly slide back out to the left.
- Prevent background scrolling while the menu is open.
- Ensure correct z-index and positioning.
- Make it fully responsive and usable on mobile and desktop.
- Preserve existing menu controls and accessibility.

Menu navigation order

1. Home
2. Founder
3. Studio
4. How it Works
5. Pricing
6. About Us
7. Contact Us

Founder, About Us, and Contact Us must open their respective separate HTML pages.

Do not add these three sections to the existing homepage.

8. CREATE A SEPARATE FOUNDER PAGE

Create a new standalone HTML page, preferably "founder.html".

Use the existing project design system and the new white theme.

Locate the attached/existing image named:

"Yahya_Founder.jpg"

It is already available in the project folder. Use this exact image. Do not generate a replacement or modify the person's facial appearance.

Founder page layout

Arrange the content in this exact visual order:

First: Founder photograph

- Display the photograph in a clean circular frame.
- Use proper image sizing and cropping.
- Maintain its original quality.

Second: Name and designation

Yahya Mundewadi

Founder of Linkal AI

Third: Two professional profile buttons

Button 1:

- Label: Personal Website
- Include an accurate Google G SVG icon.
- Link: https://yahya.in/

Button 2:

- Label: LinkedIn
- Include the official LinkedIn SVG icon.
- Link: https://linkedin.com/in/yahyamundewadi

Both buttons should open the respective websites in a new tab.

Fourth: Short founder introduction

Write a concise, professional introduction covering:

Yahya Mundewadi is a 22-year-old Indian entrepreneur and technology founder, and the Founder of Linkal AI.

He is also the Founder of Dominal Technology (dominal.in) and OpenSoftwares Pvt. Ltd. (opensoftwares.in).

Add one or two meaningful lines about his interest in building technology products, digital platforms, and software solutions.

Keep the content professional, credible, and concise. Do not invent achievements, awards, or statistics.

The design should be minimal, premium, and visually balanced.

9. CREATE A SEPARATE ABOUT US PAGE

Create a new standalone "about.html" page.

This page should explain Linkal AI in simple, understandable language.

Include:

- What Linkal AI is.
- What problem it solves.
- How users can create websites using Linkal.
- How the website creation process works.
- Its available website types, including CV websites, wedding card websites, mobile storefronts, and restaurant QR menus, where supported.
- Its mission to make website creation simple and accessible.

Use a clean layout, proper headings, subtle illustrations, and a professional white background.

Do not add this content as a new section to the existing homepage.

10. CREATE A SEPARATE CONTACT US PAGE

Create a new standalone "contact.html" page.

Display these three contact methods with their respective accurate SVG brand icons:

Instagram
https://instagram.com/linkal.in

WhatsApp
+91 8766882442

Link:
https://wa.me/918766882442

LinkedIn
https://linkedin.com/company/linkalai

Requirements:

- Use accurate SVG icons for Instagram, WhatsApp, and LinkedIn.
- Make each contact option clickable.
- Open social profiles in new tabs.
- Make the WhatsApp link directly open a conversation.
- Use professional cards or a clean vertical contact layout.
- Maintain the new white theme.

Do not use emojis as substitutes for SVG icons.

11. RESPONSIVE DESIGN AND LAYOUT FIXES

Previously, some mobile containers extended beyond the screen and some navigation elements behaved inconsistently.

Audit the entire website on mobile, tablet, and desktop.

Specifically:

- No horizontal overflow.
- No containers extending outside the viewport.
- No clipped images or text.
- Correct video sizing.
- Proper mobile navigation.
- Consistent sticky taskbar behavior across all homepage sections.
- No overlapping elements.
- Correct padding and margins.
- Buttons must remain accessible and properly aligned.
- All existing animations must work.
- Ensure the newly created pages are also fully responsive.

Do not apply random global CSS overrides. Fix the actual source of each layout issue.

12. IMPLEMENTATION PLAN AND CHECKLIST – MANDATORY

Before coding, create a file named:

"IMPLEMENTATION_PLAN.md"

Include every requested change above as an individual task with a checkbox.

For example:

- [ ] Inspect existing project and preserve assets.
- [ ] Implement white theme.
- [ ] Update hero video presentation.
- [ ] Reorder main navigation.
- [ ] Update mobile free-features announcement.
- [ ] Implement left-side menu.
- [ ] Create Founder page.
- [ ] Create About Us page.
- [ ] Create Contact Us page.
- [ ] Fix responsive layouts.
- [ ] Test existing animations and functionality.
- [ ] Run final build and checks.
- [ ] Push changes to GitHub.

Follow this plan throughout implementation.

After completing each task, update its checkbox to "[x]". Do not mark tasks complete unless they have actually been implemented and verified.

If you discover any issue or dependency, document it in the plan.

13. FINAL VERIFICATION AND GITHUB PUSH

After implementing all changes:

1. Inspect every modified file.
2. Check for syntax errors, broken imports, missing assets, and incorrect paths.
3. Ensure there are no red error indicators or unresolved code errors in the IDE.
4. Run the production build and available tests.
5. Verify every new HTML page opens correctly.
6. Test all navigation links and social links.
7. Test the left-side menu opening and closing animations.
8. Verify mobile layouts and check for horizontal overflow.
9. Verify the original intro animation, coffee images, cake images, product illustrations, and all other existing assets remain intact.
10. Verify the hero video works correctly.
11. Verify the sticky navigation across all relevant sections.
12. Update "IMPLEMENTATION_PLAN.md" with the actual completion status.

Finally, commit and PUSH ALL COMPLETED CHANGES, including the new Founder image asset, to the EXISTING GitHub repository.

Do not create a new repository or change the existing deployment configuration.

FINAL PRIORITY: Preserve everything that already works. Implement only the requested changes, maintain the existing website's functionality, and ensure the final result is professionally designed, fully responsive, and error-free.

Work efficiently, avoid unnecessary delays, and do not stop after creating the plan. Execute the plan, verify everything, and push the completed project to GitHub.