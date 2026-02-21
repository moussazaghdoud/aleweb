# ALE Website CMS -- Editor Guide

A practical guide for editors and marketers managing content on the Alcatel-Lucent Enterprise corporate website. This site is powered by **Payload CMS 3.77** embedded in a **Next.js 16** application, managing 166+ pages of products, solutions, blog posts, and more.

---

## Table of Contents

1. [Getting Started](#1-getting-started)
2. [Content Collections](#2-content-collections)
3. [Creating and Editing Content](#3-creating-and-editing-content)
4. [Draft and Publish Workflow](#4-draft-and-publish-workflow)
5. [Page Builder Blocks](#5-page-builder-blocks)
6. [Multi-Language (i18n)](#6-multi-language-i18n)
7. [SEO](#7-seo)
8. [Global Settings](#8-global-settings)
9. [Media Best Practices](#9-media-best-practices)
10. [Common Tasks Quick Reference](#10-common-tasks-quick-reference)
11. [Troubleshooting](#11-troubleshooting)

---

## 1. Getting Started

### Accessing the Admin Panel

Open your browser and navigate to:

```
https://your-domain.com/admin
```

During local development, this is typically `http://localhost:3000/admin`.

### First Login

An administrator creates your account and provides you with login credentials (email and password). On first login you will be asked to set your own password. Bookmark the admin URL for quick access.

### User Roles

The CMS has three roles. Your role determines what you can do:

| Role | Can Create/Edit | Can Delete | Can Publish | Can Manage Users | Can Edit Site Config & Redirects |
|---|---|---|---|---|---|
| **Admin** | Yes | Yes | Yes | Yes | Yes |
| **Editor** | Yes | No (admin only) | Yes | No | Navigation & Footer only |
| **Reviewer** | View only | No | No | No | No |

- **Admin** -- Full access to everything, including user management, site configuration, and redirect rules.
- **Editor** -- Can create, edit, and publish content in all collections. Can edit the navigation menu and footer. Cannot delete content or manage users.
- **Reviewer** -- Read-only access. Useful for stakeholders who need to review content before it goes live.

### Dashboard Overview

After logging in you land on the **Dashboard**. It shows:

- A list of all content collections (Products, Solutions, Blog Posts, etc.) with item counts.
- Quick links to Globals (Navigation, Footer, Site Config, Redirects).
- Your recent activity.
- The locale switcher (EN / FR) in the top bar.

---

## 2. Content Collections

Collections are groups of similar content. Each collection has its own list view, editor, and URL pattern on the live site.

| Collection | What It Manages | Live URL Pattern | Admin Path |
|---|---|---|---|
| **Products** | 54 product pages (switches, Wi-Fi APs, phones, etc.) | `/products/{category}/{slug}` | `/admin/collections/products` |
| **Solutions** | 20 solution pages (modernize communications, secure network, etc.) | `/solutions/{slug}` | `/admin/collections/solutions` |
| **Industries** | 9 industry verticals (healthcare, education, government, etc.) | `/industries/{slug}` | `/admin/collections/industries` |
| **Platforms** | 11 platform pages (Rainbow, OmniSwitch, OXO Connect, etc.) | `/platform/{slug}` | `/admin/collections/platforms` |
| **Blog Posts** | News articles and blog entries | `/blog/{slug}` | `/admin/collections/blog-posts` |
| **Services** | 5 service offerings | `/services/{slug}` | `/admin/collections/services` |
| **Partners** | 3 partner program pages | `/partners/{slug}` | `/admin/collections/partners` |
| **Company Pages** | 10 company pages (about, contact, newsroom, careers, etc.) | `/company/{slug}` | `/admin/collections/company-pages` |
| **Legal Pages** | 7 legal and compliance pages (privacy, terms, cookies, etc.) | `/legal/{slug}` | `/admin/collections/legal-pages` |
| **Resources** | 12 downloadable resources (whitepapers, datasheets, case studies) | `/resources` | `/admin/collections/resources` |
| **Pages** | Generic pages built with the block editor | Custom URL (the slug becomes the path) | `/admin/collections/pages` |
| **Media** | All uploaded images and files | N/A (referenced by other collections) | `/admin/collections/media` |
| **Users** | CMS user accounts | N/A | `/admin/collections/users` |

### Product Categories

Products are organized into seven categories (set via the **Category** dropdown in the sidebar):

- Network Switches
- Wireless LAN
- Phones & Devices
- Contact Center & Applications
- Ecosystem Integration
- Communications & Network Management
- Communication Platforms

### Blog Post Categories

Blog posts use the following categories:

- Digital Age Communications
- Digital Age Networking
- Artificial Intelligence
- Healthcare
- Education
- Hospitality
- Government
- Transportation
- ESG
- Product
- Rainbow

---

## 3. Creating and Editing Content

### Edit an Existing Page

1. In the sidebar, click the collection name (e.g., **Products**).
2. The list view shows all items. Use the search bar or column filters to find the item you want.
3. Click the item to open the editor.
4. Make your changes in the fields.
5. Click **Save Draft** to save without publishing, or **Publish** to make changes live immediately.

### Create a New Product

1. Go to **Products** in the sidebar.
2. Click **Create New** in the top-right corner.
3. Fill in the required fields:
   - **Name** -- The product display name (e.g., "OmniSwitch 6900").
   - **Slug** -- The URL-friendly identifier (e.g., `omniswitch-6900`). Must be unique. Set in the sidebar.
   - **Tagline** -- A short one-line description.
   - **Description** -- A longer product overview.
   - **Category** -- Select from the dropdown in the sidebar (e.g., "Network Switches").
4. Optionally fill in:
   - **Subcategory** -- A more specific grouping (e.g., "Core Switches").
   - **Hero Image** -- Upload or select an existing image from Media.
   - **Features** -- Add 1 to 8 feature cards, each with a title and description.
   - **Highlights** -- Add up to 6 stat items (e.g., stat: "10 GbE", label: "Port Speed").
   - **Related Products** -- Link to other products in the sidebar.
   - **SEO** -- Override the default meta title, description, and OG image.
5. Click **Publish** to make it live, or **Save Draft** to continue editing later.

The product will appear at: `https://your-domain.com/products/{category}/{slug}`

### Write a Blog Post

1. Go to **Blog Posts** in the sidebar.
2. Click **Create New**.
3. Fill in the required fields:
   - **Title** -- The headline.
   - **Slug** -- URL identifier (e.g., `rainbow-ai-update-2026`). Set in the sidebar.
   - **Excerpt** -- A short summary shown in blog listings and search results.
   - **Category** -- Select from the dropdown in the sidebar.
   - **Author** -- The author's name.
   - **Published Date** -- Select the publication date in the sidebar.
4. Optionally add a **Hero Image**.
5. Write the article body in the **Content** field using the Lexical rich text editor. You can add:
   - Headings (H2, H3, H4)
   - Bold, italic, underline text
   - Bulleted and numbered lists
   - Links
   - Inline images
   - Block quotes
6. Fill in **SEO** fields if you want to override the defaults.
7. Click **Publish**.

The post will appear at: `https://your-domain.com/blog/{slug}`

### Upload Media

1. Go to **Media** in the sidebar.
2. Click **Create New** (or **Upload**).
3. Drag and drop a file or click to browse your computer.
4. Fill in the **Alt Text** field (required) -- describe the image for accessibility and SEO.
5. Optionally add a **Caption**.
6. Click **Save**.

Accepted file types: images (JPEG, PNG, WebP, SVG, GIF) and PDFs.

When you upload an image, the CMS automatically generates four optimized sizes:

| Size Name | Dimensions | Use Case |
|---|---|---|
| `thumbnail` | 300 x 200 px | List views, small cards |
| `card` | 600 x 400 px | Card grids, blog listings |
| `hero` | 1400 x 600 px | Hero sections, page headers |
| `og` | 1200 x 630 px | Social media sharing (Open Graph) |

---

## 4. Draft and Publish Workflow

All content collections (Products, Solutions, Blog Posts, Pages, etc.) support a draft/publish workflow.

### Save Draft

Click **Save Draft** to save your work without making it visible on the live website. Drafts are only visible to logged-in CMS users. Use this when you are still working on content or waiting for review.

### Publish

Click **Publish** to push your content live. It becomes immediately visible to all website visitors.

### Version History

Every time you save (draft or publish), Payload creates a new version. To restore a previous version:

1. Open the item in the editor.
2. Click the **Versions** tab (or "Version History" in the sidebar).
3. Browse the list of saved versions with timestamps.
4. Click a version to preview it.
5. Click **Restore This Version** to make it the current content.

This is your safety net -- you can always undo changes.

### Live Preview

Live Preview lets you see exactly how your changes will look on the real website before publishing:

1. Open any item in the editor.
2. Make your changes.
3. Click **Save Draft**.
4. Click the **Live Preview** button.
5. A new browser tab opens showing the page with a yellow "Preview Mode" banner at the top.

Live Preview is available for: Products, Solutions, Industries, Platforms, Services, Partners, Company Pages, Legal Pages, Blog Posts, and Pages.

---

## 5. Page Builder Blocks

The **Pages** and **Company Pages** collections include a **Sections** field that uses a visual block editor. This lets you build custom page layouts by stacking content blocks -- no coding required.

To add a block: click **Add Block** in the Sections area and choose from the list below.

| Block | Use Case | Key Fields |
|---|---|---|
| **Hero** | Page header with a large heading, subheading, background image, and CTA buttons. | Heading, Subheading, Background Image, CTA Buttons (up to 3, each with label, URL, and variant: Primary / Secondary / Ghost), Style (Full Width, Centered, or Split). |
| **Rich Text** | Free-form content area with headings, paragraphs, lists, links, bold/italic. | Uses the Lexical rich text editor. Supports all standard formatting. |
| **Features Grid** | A 2-to-4-column grid of feature cards, each with a title, description, and optional icon or image. | Title, Description, optional image per card. |
| **CTA Banner** | A call-to-action section with heading, description, and buttons. Use it to drive conversions. | Heading, Description, Buttons, Theme (Dark, Light, or Gradient). |
| **Stats** | Display key metrics in a row or card grid (e.g., "3,400+ Partners", "100+ Countries"). | Stat value, Label. Layout: inline row or card grid. |
| **Card Grid** | A grid of linked cards with images, badges, and descriptions. Great for product listings, resource links, or category navigation. | Title, Description, Image, Badge, Link per card. |
| **Image + Text** | A split layout with an image on one side and text content on the other. | Image, Text content, Image Position (Left or Right). |
| **FAQ** | An accordion-style Q&A section. Users click a question to expand the answer. | Question and Answer pairs. Uses native browser accordion (no JavaScript required). |
| **Testimonials** | Customer quote cards with author name, role, company, and optional avatar image. | Quote, Author Name, Role, Company, Avatar. |

### Tips for Using Blocks

- **Reorder blocks** by dragging them up or down in the Sections list.
- **Duplicate a block** by clicking the three-dot menu on the block and selecting Duplicate.
- **Delete a block** by clicking the three-dot menu and selecting Remove.
- **Collapse blocks** you are not currently editing to keep the editor tidy.
- All text fields in blocks support **localization** -- you can provide English and French versions.

---

## 6. Multi-Language (i18n)

The CMS supports two languages:

| Language | Code | Status |
|---|---|---|
| English | `en` | Default locale |
| French (Francais) | `fr` | Falls back to English if not translated |

### How Localization Works

- **Localized fields** (marked with a globe icon or language switcher) can have different content for each language. Examples: page titles, descriptions, feature text, navigation labels.
- **Non-localized fields** (slug, dates, category selectors, URLs) are shared across all languages. You only fill them in once.

### Translating Content

1. Open any item in the editor.
2. In the top bar, click the **locale switcher** and select **FR** (French).
3. The editor reloads showing French content. Localized fields that have not been translated yet will appear empty or show the English fallback.
4. Fill in the French translations for all localized fields.
5. Click **Save Draft** or **Publish**.
6. Switch back to **EN** to verify the English content is unchanged.

### Fallback Behavior

If a French translation is missing for a localized field, the website automatically displays the English version. This means you can launch pages in English first and add French translations later without breaking the site.

---

## 7. SEO

### Per-Page SEO Fields

Most collections (Products, Solutions, Blog Posts, Pages, etc.) have an **SEO** group at the bottom of the editor with three fields:

| Field | What It Does | Recommendation |
|---|---|---|
| **Meta Title** | The title shown in browser tabs and search results. | Keep under 60 characters. Make it descriptive and include key terms. |
| **Meta Description** | The snippet shown below the title in search results. | Keep between 120 and 160 characters. Summarize the page value. |
| **OG Image** | The image shown when the page is shared on social media. | Use 1200 x 630 px images. If left empty, the site uses the default from Site Config. |

The Pages collection also has a **No Index** checkbox -- check it to prevent a page from appearing in search engine results.

### Default SEO

If you leave SEO fields empty, the site generates sensible defaults:

- **Meta Title** falls back to the page title + site name.
- **Meta Description** falls back to the page description or excerpt.
- **OG Image** falls back to the default set in Globals > Site Config.

### Automatic SEO Features

The site automatically generates and maintains:

- **`/sitemap.xml`** -- Lists all published pages for search engine crawlers.
- **`/robots.txt`** -- Tells search engines which pages to crawl.
- **Open Graph tags** -- Ensures proper previews on Facebook, LinkedIn, Slack, etc.
- **Twitter Card tags** -- Ensures proper previews on Twitter/X.

---

## 8. Global Settings

Globals are site-wide settings that apply across the entire website. Access them from the **Globals** section in the admin sidebar.

| Global | What It Controls | Admin Path | Who Can Edit |
|---|---|---|---|
| **Navigation** | Main menu items, dropdown children with descriptions, featured callouts in dropdowns, utility nav links, CTA button (label and URL) | `/admin/globals/navigation` | Admin, Editor |
| **Footer** | Up to 6 footer columns with heading and links, legal section (copyright text, legal links), social media links (LinkedIn, X, YouTube, Facebook, Instagram) | `/admin/globals/footer` | Admin, Editor |
| **Site Config** | Site name, site URL, default SEO (meta title, description, OG image), logo, favicon, analytics IDs (Google Analytics GA4, Google Tag Manager) | `/admin/globals/site-config` | Admin only |
| **Redirects** | URL redirect rules -- each rule has a source path, destination path, type (301 permanent or 302 temporary), and an active/inactive toggle | `/admin/globals/redirects` | Admin only |

### Editing the Navigation

1. Go to **Globals > Navigation**.
2. The **Primary Navigation** is an array of top-level menu items. Each item has:
   - **Label** -- The text shown in the menu (localized).
   - **Href** -- The link URL.
   - **Children** -- An array of dropdown links, each with label, href, and optional description.
   - **Featured** -- An optional featured callout in the dropdown (title, description, link, image).
3. The **Utility Navigation** is an array of small links shown above or beside the main menu.
4. The **CTA Button** sets the call-to-action button in the header (defaults to "Contact Us" linking to `/company/contact`).
5. Click **Save** when done.

### Managing Redirects

1. Go to **Globals > Redirects**.
2. Click **Add Rule** in the Rules array.
3. Fill in:
   - **Source** -- The old URL path (e.g., `/old-page`).
   - **Destination** -- The new URL path (e.g., `/new-page`).
   - **Type** -- Choose 301 (permanent) or 302 (temporary). Use 301 for pages that have permanently moved.
   - **Active** -- Checked by default. Uncheck to disable the redirect without deleting it.
4. Click **Save**.

---

## 9. Media Best Practices

### Recommended Formats

| Format | Best For |
|---|---|
| **WebP** | Photos and complex images (best compression, widely supported) |
| **JPEG** | Photos when WebP is not available |
| **PNG** | Graphics with transparency (logos on transparent backgrounds, icons) |
| **SVG** | Logos, icons, and simple graphics (infinitely scalable, tiny file size) |
| **PDF** | Downloadable documents (datasheets, whitepapers) |

### File Size and Dimensions

- **Maximum upload size**: Depends on server configuration (default approximately 10 MB).
- **Hero images**: Upload at least 1400 x 600 px for sharp display on large screens.
- **Product images**: At least 600 x 400 px.
- **OG images for social sharing**: Exactly 1200 x 630 px for best results.

### Auto-Generated Sizes

Every uploaded image is automatically processed into four sizes:

| Size | Dimensions | Purpose |
|---|---|---|
| `thumbnail` | 300 x 200 px | List views, navigation cards |
| `card` | 600 x 400 px | Card grids, blog post listings |
| `hero` | 1400 x 600 px | Hero sections, page headers |
| `og` | 1200 x 630 px | Open Graph / social media previews |

You do not need to create these sizes manually. The CMS handles it automatically using the Sharp image processing library.

### Alt Text

Always fill in the **Alt Text** field when uploading an image. Alt text:

- Is required by the CMS (you cannot save without it).
- Improves accessibility for users with screen readers.
- Helps search engines understand your images (SEO).
- Should describe what the image shows in plain language (e.g., "OmniSwitch 6900 rack-mounted network switch" rather than "product-image-1").

### File Naming

Use descriptive, lowercase filenames with hyphens:

- Good: `omniswitch-6900-product-shot.jpg`
- Good: `rainbow-communications-platform-hero.webp`
- Avoid: `IMG_20260221_001.jpg`
- Avoid: `Screenshot 2026-02-21 at 10.30.45.png`

---

## 10. Common Tasks Quick Reference

| Task | Steps |
|---|---|
| **Edit homepage hero text** | Globals > Site Config (for site-wide defaults), or edit the homepage entry in Pages collection |
| **Add a new product** | Products > Create New > fill in name, slug, tagline, description, category > add features and highlights > Publish |
| **Update company contact info** | Company Pages > find "contact" > edit offices/description > Publish |
| **Add a press release** | Company Pages > find "newsroom" > add to Press Releases array > Publish |
| **Change the navigation menu** | Globals > Navigation > edit Primary Nav items > Save |
| **Add a footer link** | Globals > Footer > edit Columns > add a link > Save |
| **Create a URL redirect** | Globals > Redirects > add a rule (source, destination, type) > Save |
| **Upload a new resource** | Resources > Create New > fill in title, type, summary > Publish |
| **Translate a page to French** | Open any item > switch locale to FR in the top bar > translate localized fields > Save |
| **Preview before publishing** | Edit an item > Save Draft > click Live Preview |
| **Restore a previous version** | Open an item > click Versions tab > select a version > Restore This Version |
| **Add a new blog post** | Blog Posts > Create New > fill in title, slug, excerpt, category, author, date > write content > Publish |
| **Update the site logo** | Globals > Site Config > Logo field > upload or select new image > Save |
| **Change social media links** | Globals > Footer > Social array > edit URLs > Save |
| **Add a new CMS user** | Users > Create New > fill in email, password, first/last name, role > Save (admin only) |
| **Set up Google Analytics** | Globals > Site Config > Analytics > enter GA4 measurement ID > Save (admin only) |

---

## 11. Troubleshooting

### Page not updating after publish

The site uses static generation with on-demand revalidation. After publishing, the page may take a few seconds to update. If you still see old content:

1. Hard-refresh your browser: press **Ctrl + Shift + R** (Windows) or **Cmd + Shift + R** (Mac).
2. Try opening the page in a private/incognito window to rule out browser cache.
3. Wait 30 seconds and refresh again -- the static page regenerates on the next request after publishing.

### Image not showing on the live site

1. Confirm the image was uploaded to the **Media** collection and saved successfully.
2. Check that the content field (e.g., Hero Image, Background Image) references the correct media item.
3. Verify the image has **Alt Text** filled in (it is a required field).
4. Try re-uploading the image if the file may have been corrupted.

### Live Preview not loading

1. Ensure the website is running (the preview connects to the live or development site).
2. Check with your admin that the `NEXT_PUBLIC_URL` environment variable is set correctly.
3. Try saving the draft again before clicking Live Preview.
4. Clear your browser cache and try again.

### Cannot log in

1. Double-check your email and password (passwords are case-sensitive).
2. Ask an administrator to reset your password.
3. Verify your account exists and has the correct role in the Users collection.
4. If the admin panel itself is not loading, the server may be down -- contact your technical team.

### Content disappeared

1. Open the item and check the **Versions** tab. Every save creates a version you can restore.
2. If the item was deleted, only an admin can recover it from a database backup.
3. Check that you are viewing the correct locale (EN vs. FR) -- content may appear "missing" if you are looking at an untranslated locale.

### Slug conflict or "unique constraint" error

Each slug must be unique within its collection. If you see this error:

1. Check the collection for another item with the same slug.
2. Change your slug to something unique (e.g., add a year or qualifier: `rainbow-update-2026`).

### Rich text editor not responding

1. Refresh the admin page.
2. Try a different browser (Chrome or Firefox recommended).
3. Clear browser cache and cookies for the admin domain.
4. If the issue persists, contact your technical team -- it may be a browser extension conflict.

---

## Appendix: Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| **Ctrl + S** (Cmd + S on Mac) | Save the current item |
| **Ctrl + Shift + R** | Hard refresh (bypass cache) |
| **Ctrl + K** | Insert a link (in the rich text editor) |
| **Ctrl + B** | Bold text (in the rich text editor) |
| **Ctrl + I** | Italic text (in the rich text editor) |
| **Ctrl + Z** | Undo last action |
| **Ctrl + Shift + Z** | Redo last action |

---

*This guide was written for the ALE Website CMS (Payload CMS 3.77 + Next.js 16). Last updated: February 2026.*
