# TODO

- [ ] Make admin able to edit every single aspect of the website (structure + hrefs).
  - [ ] Define a unified CMS schema in database.json (`siteCms`) covering:
    - [ ] nav items (label, href, enabled/visible)
    - [ ] page copy for home/about/admissions/events/resources/register/club-calendar
    - [ ] club landing copy for interact/paramount/pen
    - [ ] show/hide structural sections
    - [ ] keep existing datasets (news/gallery/comments/moderation, club events/announcements/uploads/backgrounds)
  - [ ] Backend API upgrade in controllers/files.js:
    - [ ] GET /api/cms (read full CMS)
    - [ ] POST /api/cms/update (save partial updates)
  - [ ] Frontend rendering upgrade in script.js:
    - [ ] Fetch CMS on load
    - [ ] Render editable fields into DOM using `data-cms` selectors
    - [ ] Publish updates from admin by calling /api/cms/update
  - [ ] Admin UI upgrade in admin.html:
    - [ ] Tabs/sections for Navigation, each Page, Clubs landing, and datasets
    - [ ] Form fields for every CMS property
    - [ ] Save + preview
  - [ ] Add `data-cms` attributes to all editable elements across:
    - [ ] index.html
    - [ ] about.html
    - [ ] admissions.html
    - [ ] events.html
    - [ ] resources.html
    - [ ] register.html
    - [ ] club-calendar.html
    - [ ] interact-club.html
    - [ ] paramount-club.html
    - [ ] pen-club.html
  - [ ] Remove/clean conflicting injected Firebase admin/public blocks from index.html.

- [ ] Validate media rendering for club uploads (images + videos) (if not already complete)

- [ ] Manual testing checklist
  - [ ] Edit navigation labels and hrefs; verify links change on all pages.
  - [ ] Edit about page mission/team/testimonials; verify updates on about.html.
  - [ ] Edit home hero + club descriptions; verify updates on index.html.
  - [ ] Edit club landing copy; verify on each club page.
  - [ ] Edit news/gallery items; verify rendering.
  - [ ] Edit comments moderation; verify public moderation behavior.

