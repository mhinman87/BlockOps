# Public Assets Directory

This directory contains static assets that are served directly without processing.

## Folder Structure

### `/images/hero/`
Hero section images and backgrounds

### `/images/team/`
Team member photos and profile images

### `/images/services/`
Service-related illustrations and photos

### `/logos/`
Company logos, brand assets, and favicons

## Usage

Reference images directly with a leading slash:

```jsx
// Example in React components:
<img src="/logos/logo.svg" alt="Block Ops Logo" />
<img src="/images/team/doctor.jpg" alt="Team Member" />
```

```html
<!-- Example in HTML: -->
<link rel="icon" href="/logos/favicon.ico" />
```

## Image Guidelines

- **Logos**: Use SVG format when possible
- **Photos**: Optimize before uploading (WebP format recommended)
- **Max file size**: Keep under 500KB per image when possible
- **Naming**: Use lowercase with hyphens (e.g., `team-member-1.jpg`)

