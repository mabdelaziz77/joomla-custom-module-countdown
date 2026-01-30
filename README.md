# Joomla Custom Module Countdown Override

This repository contains a template override for the standard Joomla Custom Module (`mod_custom`). it transforms the module into a sticky countdown banner that automatically syncs with the module's "Finish Publishing" date.

## Features

- **Automatic Sync**: The countdown timer automatically calculates the remaining time based on the "Finish Publishing" date set in the module settings.
- **Auto-Unpublish**: Since it uses the native Joomla publishing controls, the module (and the banner) will automatically disappear when the time is up.
- **Sticky Layout**: Includes CSS/JS to keep the banner sticky at the top of the page and adjust the body padding accordingly.
- **Responsive**: Adapts to mobile devices.

## Use Case

This override is perfect for launching new products, running limited-time offers, or announcing events. 

I originally created this override to manage the launch offer for the **[JR Image Optimizer](https://joomreem.com/extension-store/39-package/98-jr-image-optimizer)**.
JR Image Optimizer is a powerful Joomla extension that automatically optimizes your images (WebP conversion (AVIF coming soon), resizing, lazy loading) to boost your PageSpeed scores and SEO rankings. 
Using this countdown banner helped create urgency and successfully automate the end of the launch campaign without manual intervention.

## Installation

1. **Create Template Override**:
   - Ensure you have the override structure in your template. You can generate this via Joomla Admin: **System** > **Site Templates** > **[Your Template]** > **Create Overrides** > **mod_custom**.

2. **Copy Files**:
   - Copy `templates/cassiopeia/html/mod_custom/countdown.php` to your template's HTML override folder (e.g., `templates/your_template/html/mod_custom/`).
   - Copy the `media/mod_custom` folder to your site's `media/` directory (so you have `media/mod_custom/css/launch_banner.css` and `media/mod_custom/js/launch_banner.js`).

3. **Create Module**:
   - Go to Joomla Administrator > Content > Site Modules > New.
   - Select **Custom**.
   
4. **Configure**:
   - **Title**: Enter a title (e.g., "Launch Banner").
   - **Position**: Select a position (e.g., `banner` or `top-bar`, or `debug` since it's fixed position anyway).
   - **Layout**: In the Advanced tab, change the **Layout** to `countdown`.
   - **Publishing**: Set the **Finish Publishing** date and time. This is CRITICAL as it determines when the countdown ends.

5. **Content**:
   - Switch the editor to Code view (Toggle Editor).
   - Insert the specific HTML structure required by the JavaScript:

```html
<div id="launch-banner" class="sticky-launch-banner">
    <div class="container">
        <div class="banner-content">
            <div class="banner-text-group">
                <div class="banner-headline">🚀 Limited Time Launch Offer!</div>
                <div class="banner-subtext">Get 30% OFF JR Image Optimizer</div>
            </div>
            
            <div class="countdown-timer">
                <div class="timer-item">
                    <span id="timer-days" class="timer-number">00</span>
                    <span class="timer-label">Days</span>
                </div>
                <div class="timer-item">
                    <span id="timer-hours" class="timer-number">00</span>
                    <span class="timer-label">Hrs</span>
                </div>
                <div class="timer-item">
                    <span id="timer-minutes" class="timer-number">00</span>
                    <span class="timer-label">Min</span>
                </div>
                <div class="timer-item">
                    <span id="timer-seconds" class="timer-number">00</span>
                    <span class="timer-label">Sec</span>
                </div>
            </div>

            <div class="banner-actions">
                <a href="https://joomreem.com/extension-store/39-package/98-jr-image-optimizer" class="banner-cta">Get It Now</a>
                <button class="banner-close" aria-label="Close banner">×</button>
            </div>
        </div>
    </div>
</div>
```

6. **Save**: Save and Publish.

## Customization

- **Styles**: Edit `media/mod_custom/css/launch_banner.css` to match your brand colors. The CSS uses some CSS variables (like `--danger`) which you might need to define or replace.
- **Behavior**: The JS (`media/mod_custom/js/launch_banner.js`) handles the countdown logic and resizing.
