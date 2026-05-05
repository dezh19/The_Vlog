# Strapi CMS Admin Guide

This guide explains how content managers can manage all frontend content through Strapi Admin Panel.

## Accessing Strapi Admin

1. **Open Strapi Admin:** https://localhost:1337/admin
2. **Login with your admin credentials**

---

## Content Types Overview

Your website has 7 manageable content types:

### Single Types (1 record each)
1. **Hero** - Main landing section
2. **About** - About section
3. **Footer** - Footer section
4. **Booking** - Booking section

### Collection Types (Multiple records)
1. **Content Features** - Videos, blogs, scriptures, podcasts
2. **Testimonies** - Community member testimonies
3. **Events** - Upcoming events and services

---

## Managing Each Section

### 1. Hero Section
**Path:** Content Manager → Hero

Edit these fields:
- **Badge** - Top badge text (e.g., "LIVE NOW")
- **Headline 1** - Main headline first part
- **Headline Accent** - Main headline colored part (shows in cyan)
- **Headline 2** - Secondary headline
- **Subheadline** - Supporting text
- **CTA Primary** - Primary button text
- **CTA Secondary** - Secondary button text
- **Scripture Text** - Bible verse text
- **Scripture Reference** - Bible reference (e.g., "John 3:16")
- **Stats** - Add statistics as JSON objects
- **Main Image** - Hero background/main image (UPLOAD HERE)
- **Small Images** - Additional decorative images (UPLOAD MULTIPLE)
- **Live Label** - Label for live indicator

**To Upload Images:**
1. Click on the image field
2. Click "Add an asset"
3. Click "Upload new asset"
4. Drag & drop or browse for your image
5. Upload and select

---

### 2. About Section
**Path:** Content Manager → About

Edit these fields:
- **Mission Text** - Your mission statement
- **Mission Scripture Text** - Related Bible verse
- **Mission Scripture Reference** - Bible reference
- **Body Text** - Main content body
- **Image** - About section image (UPLOAD)
- **Float Stat Value** - Statistics value
- **Float Stat Label** - Statistics label
- **Pillars** - Add pillar values as JSON
- **Stats** - Add stats as JSON objects

---

### 3. Footer Section
**Path:** Content Manager → Footer

Edit these fields:
- **Scripture of Week Text** - Featured scripture text
- **Scripture of Week Reference** - Reference
- **Tagline** - Footer tagline
- **Tagline Verse** - Tagline related verse
- **Description** - Footer description

---

### 4. Booking Section
**Path:** Content Manager → Booking

Edit these fields:
- **Types** - Booking types as JSON objects
- **Highlights** - Highlight array
- **Scripture Text** - Related scripture
- **Scripture Reference** - Bible reference
- **Image** - Booking section image (UPLOAD)
- **Image Caption** - Caption for the image

---

### 5. Content Features (Videos, Blogs, etc.)
**Path:** Content Manager → Content Features

**Click "Create new entry"** to add:
- **Feature ID** - Unique identifier (auto-generated)
- **Label** - Category (e.g., "Videos", "Blogs", "Scriptures")
- **Headline** - Feature title
- **Description** - Short description
- **Detail** - Detailed content
- **Image** - Feature thumbnail image (UPLOAD)
- **Tag** - Tag/category
- **Highlight** - Highlight text (optional)
- **Sort Order** - Order of display (0 = first)

**To Edit:** Click the entry → Edit → Save
**To Delete:** Click entry → Click "Delete this entry" → Confirm

---

### 6. Testimonies
**Path:** Content Manager → Testimonies

**Click "Create new entry"** to add:
- **Client ID** - Unique identifier for person
- **Name** - Full name
- **Role** - Their role/title
- **Quote** - Their testimony text
- **Image** - Profile image (UPLOAD)
- **Verse** - Related Bible verse (optional)
- **Sort Order** - Order of display

**Tips:**
- Use profile photos for images
- Keep quotes concise (1-3 sentences)
- Include inspiring verses

---

### 7. Events
**Path:** Content Manager → Events

**Click "Create new entry"** to add:
- **Client ID** - Unique event identifier
- **Title** - Event name
- **Date** - Event date
- **Time** - Event time
- **Location** - Event location
- **Description** - Event details
- **Image** - Event banner/image (UPLOAD)
- **Badge** - Badge text (e.g., "UPCOMING")
- **Badge Color** - Choose "cyan" or "white"
- **Spots** - Number of spots available
- **Sort Order** - Order of display

---

## Image Upload Tips

1. **Supported Formats:** JPG, PNG, WebP, GIF
2. **Recommended Sizes:**
   - Hero Main Image: 1200x600px
   - About Image: 600x400px
   - Small images: 200x200px
   - Profile images: 300x300px
   - Event images: 600x400px

3. **File Size:** Keep under 2MB for best performance

4. **Multiple Images:**
   - Some fields allow multiple uploads
   - Click "Add another entry" to add more
   - Drag to reorder

---

## Publishing Changes

### Draft vs Published

When you edit content, it stays in **Draft** mode.

**To Publish:**
1. After editing, click **"Publish"** button (top right)
2. Changes go live immediately to the frontend

**To Unpublish:**
1. Click **"Unpublish"** button to revert to previous published version

---

## Media Library

**Path:** Media Library (left sidebar)

Use this to:
- See all uploaded images/videos
- Organize media
- Reuse images across content types
- Delete unused media

---

## Saving & Preview

- **Save Draft:** Click "Save" to save without publishing
- **Publish:** Click "Publish" to go live
- **Preview:** Check the frontend at http://localhost:3000 to see changes

---

## Common Tasks

### Add a New Event
1. Go to Content Manager → Events
2. Click "Create new entry"
3. Fill in all fields (Title, Date, Time, Location, Description)
4. Upload event banner image
5. Set Badge Color and Badge Text
6. Set Sort Order
7. Click "Publish"

### Add a New Testimony
1. Go to Content Manager → Testimonies
2. Click "Create new entry"
3. Enter Name, Role, Quote, Verse
4. Upload profile image
5. Set Sort Order
6. Click "Publish"

### Update Hero Image
1. Go to Content Manager → Hero
2. Click on the image field
3. Either:
   - Upload a new image
   - Select from existing media
4. Click "Publish"

### Edit Multiple Stats
1. Edit the section (Hero, About, Booking)
2. Click the JSON editor for stats/types
3. Add/edit objects as needed
4. Click "Publish"

---

## Troubleshooting

**Image won't upload?**
- Check file size (should be < 2MB)
- Check format (JPG, PNG, WebP, GIF)
- Try dragging file instead of clicking

**Changes not showing on frontend?**
- Make sure you clicked "Publish" (not just "Save")
- Hard refresh browser (Ctrl+Shift+R)
- Check that Strapi is running (localhost:1337)

**Can't access admin?**
- Make sure Strapi is running: `npm run develop` from backend folder
- Check login credentials
- Try clearing browser cookies

---

## Best Practices

1. **Always Preview:** Check http://localhost:3000 after publishing
2. **Use Consistent Naming:** Keep naming conventions consistent
3. **Optimize Images:** Compress before uploading for better performance
4. **Test Responsively:** Check how content looks on mobile
5. **Keep Backups:** Export important data regularly

---

## Support

For technical issues or questions:
1. Check Strapi documentation: https://docs.strapi.io
2. Verify Strapi is running and healthy
3. Check browser console for errors (F12)

---

**Last Updated:** April 25, 2026
**Version:** 1.0
