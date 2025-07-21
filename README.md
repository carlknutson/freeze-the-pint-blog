# Eleventy Notion Starter Blog

This is a blog template built with [Eleventy](https://www.11ty.dev/), designed to be easily integrated with Notion for content management.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
- [Notion Integration](#notion-integration)
  - [Setting up Notion API Key](#setting-up-notion-api-key)
  - [Creating Your Notion Database](#creating-your-notion-database)
  - [Generating Content from Notion](#generating-content-from-notion)
- [Deployment](#deployment)
- [Customization](#customization)
- [GitHub Pages Setup](#github-pages-setup)
- [Original Template](#original-template)
- [Eleventy Resources](#eleventy-resources)

## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/en/) (version 18 or higher) installed. You can check your version with:

```bash
node --version
```

### Installation

1.  **Create a new repository from this template:**

    On GitHub, click the "Use this template" button to create a new repository based on this one. Then, clone your newly created repository:

    ```bash
    git clone https://github.com/your-username/your-new-repo.git
    cd your-new-repo
    ```

2.  Install the dependencies:

    ```bash
    npm install
    ```

### Running Locally

To start a local development server with hot-reloading:

```bash
npm start
```

This will typically run the site at `http://localhost:8080/`.

## Notion Integration

This blog template is pre-configured to pull content directly from a Notion database. This allows you to manage your blog posts in Notion and generate static Markdown files for your Eleventy site.

### Setting up Notion API Key

1.  Go to [Notion Developers](https://www.notion.so/my-integrations) and create a new integration.
2.  Give your integration a name (e.g., "My Blog Integration").
3.  Copy the "Internal Integration Token" (this is your API key).
4.  Set this token as an environment variable named `NOTION_KEY` in your deployment environment (e.g., Netlify, Vercel) or in a `.env` file for local development. For local development, create a file named `.env` in the root of your project and add `NOTION_KEY=your_notion_api_key_here` to it.

### Creating Your Notion Database

1.  Create a new database in Notion.
2.  Share your database with the integration you created in the previous step. Click the "Share" button in the top right corner of your Notion database, then invite your integration.
3.  Copy your database ID. You can find this in the URL of your Notion database. It's the string of characters between `notion.so/` and `?v=`.
4.  Set this database ID as an environment variable named `NOTION_BLOG_ID` in your deployment environment or in a `.env` file for local development. For local development, add `NOTION_BLOG_ID=your_notion_database_id_here` to your `.env` file.

Your Notion database should have the following properties (case-sensitive):

- `Title` (Type:Title)
- `Description` (Type: Text)
- `Tags` (Type: Multi-select)
- `Publish` (Type: Checkbox) - If checked, the corresponding Markdown file will be created or updated. Unchecking this property will prevent further updates to the Markdown file, but will not delete existing content.
- `Published` (Type: Date)

### Generating Content from Notion

The `notion-to-md.js` script (located in `.github/scripts/`) is responsible for fetching content from your Notion database and converting it into Markdown files. This script is designed to be run manually via a GitHub Actions workflow (`.github/workflows/generate-md.yml`) using `workflow_dispatch`. When triggered, it generates the Markdown files and commits them to your repository. **For this GitHub Action to function correctly, ensure you have set `NOTION_KEY` and `NOTION_BLOG_ID` as repository secrets in your GitHub repository settings.**

### Handling Images in Notion

Images embedded directly within your Notion pages will be automatically downloaded and saved locally when the `generate-md.yml` workflow runs. The `save-images.cjs` script (also in `.github/scripts/`) handles this process by replacing the Notion image URLs in the generated Markdown with local file paths.

To include images:

1.  **Embed images directly in your Notion page content.** You can drag and drop images, paste them, or use Notion's image block.
2.  **Add alt text to your images in Notion.** The alt text you provide for an image in Notion will be used as the filename when the image is downloaded and saved locally by the `save-images.cjs` script. This is crucial for proper image mapping and organization.
3.  When the `generate-md.yml` workflow is triggered, the images will be downloaded to a directory alongside your Markdown file, and the Markdown will be updated to reference these local images.

**Note on Image Metadata:** Before uploading images to Notion, you might want to remove any sensitive metadata (like location data) from them. You can use online tools like [verexif.com](https://www.verexif.com/en/index.php) for this purpose.

You can also run the script locally to generate content:

```bash
node .github/scripts/notion-to-md.js
```

This will create Markdown files in the `content/blog/` directory.

## Deployment

This template is configured for deployment on platforms like Netlify or Vercel. For GitHub Pages deployment, the `.github/workflows/gh-pages.yml` workflow is responsible for building and publishing the site. Ensure you set the `NOTION_API_KEY` and `NOTION_DATABASE_ID` environment variables in your deployment settings.

## Customization

This template is designed to be easily customizable. Here are some key areas you might want to explore:

-   **Eleventy Configuration:** The main Eleventy configuration is in `eleventy.config.js`. Here you can adjust collections, add plugins, and define global data.
-   **Layouts and Includes:** The `_includes/` directory contains Nunjucks templates for your site's layout (`_includes/layouts/`) and reusable components (`_includes/`).
-   **CSS Styling:** All the main CSS is located in the `public/css/` directory. You can modify `index.css` or create new CSS files to change the look and feel of your blog.
-   **Data Files:** The `_data/` directory holds global data that can be accessed throughout your templates, such as `metadata.js`.

## GitHub Pages Setup

To publish your blog to GitHub Pages:

1.  Go to your repository on GitHub.
2.  Navigate to **Settings** > **Pages**.
3.  Under "Build and deployment", select **GitHub Actions** as the source.
4.  The `gh-pages.yml` workflow will automatically build and deploy your site whenever changes are pushed to the `main` branch.

## Original Template

This template was originally based on the [Eleventy Base Blog](https://github.com/11ty/eleventy-base-blog) by the Eleventy team.

## Eleventy Resources

-   [Eleventy Documentation](https://www.11ty.dev/docs/)
-   [Eleventy Getting Started Guide](https://www.11ty.dev/docs/getting-started/)
-   [Eleventy on GitHub](https://github.com/11ty/eleventy)
