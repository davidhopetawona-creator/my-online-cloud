const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const commentForm = document.getElementById('commentForm');
const commentText = document.getElementById('commentText');
const commentsPanel = document.getElementById('commentsPanel');
const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');
const logoutButton = document.getElementById('logoutButton');
const moderationPanel = document.getElementById('moderationPanel');
const themeToggle = document.getElementById('themeToggle');
const contactForm = document.getElementById('contactForm');
const contactFormMessage = document.getElementById('contactFormMessage');
const newsletterForm = document.getElementById('newsletterForm');
const newsletterMessage = document.getElementById('newsletterMessage');
const registrationForm = document.getElementById('registrationForm');
const registrationMessage = document.getElementById('registrationMessage');
const schedulerForm = document.getElementById('clubSchedulerForm');
const schedulerClub = document.getElementById('schedulerClub');
const schedulerTitle = document.getElementById('schedulerTitle');
const schedulerDate = document.getElementById('schedulerDate');
const schedulerTime = document.getElementById('schedulerTime');
const schedulerMessage = document.getElementById('schedulerMessage');
const schedulerCancelButton = document.getElementById('schedulerCancel');
const clubEventList = document.getElementById('clubEventList');
const calendarPrev = document.getElementById('calendarPrev');
const calendarNext = document.getElementById('calendarNext');
const calendarMonthLabel = document.getElementById('calendarMonthLabel');
const calendarGrid = document.getElementById('calendarGrid');
const adminNewsForm = document.getElementById('adminNewsForm');
const adminNewsCategory = document.getElementById('adminNewsCategory');
const adminNewsTitle = document.getElementById('adminNewsTitle');
const adminNewsDescription = document.getElementById('adminNewsDescription');
const adminNewsList = document.getElementById('adminNewsList');
const adminNewsMessage = document.getElementById('adminNewsMessage');
const adminEventForm = document.getElementById('adminEventForm');
const adminEventClub = document.getElementById('adminEventClub');
const adminEventTitle = document.getElementById('adminEventTitle');
const adminEventDate = document.getElementById('adminEventDate');
const adminEventTime = document.getElementById('adminEventTime');
const adminEventList = document.getElementById('adminEventList');
const adminEventMessage = document.getElementById('adminEventMessage');
const adminClubBackgroundForm = document.getElementById('adminClubBackgroundForm');
const adminClubBackgroundSelect = document.getElementById('adminClubBackgroundSelect');
const adminClubBackgroundUrl = document.getElementById('adminClubBackgroundUrl');
const adminClubBackgroundList = document.getElementById('adminClubBackgroundList');
const adminClubBackgroundMessage = document.getElementById('adminClubBackgroundMessage');
const clubAnnouncementForm = document.getElementById('clubAnnouncementForm');
const clubAnnouncementTitle = document.getElementById('clubAnnouncementTitle');
const clubAnnouncementText = document.getElementById('clubAnnouncementText');
const clubAnnouncementList = document.getElementById('clubAnnouncementList');
const clubAnnouncementMessage = document.getElementById('clubAnnouncementMessage');
const clubUploadForm = document.getElementById('clubUploadForm');
const clubUploadTitle = document.getElementById('clubUploadTitle');
const clubUploadUrl = document.getElementById('clubUploadUrl');
const clubUploadList = document.getElementById('clubUploadList');
const clubUploadMessage = document.getElementById('clubUploadMessage');
const clubManagerSection = document.getElementById('clubManager');
const clubManagerPanel = document.getElementById('clubManagerPanel');
const clubManagerList = document.getElementById('clubManagerList');
const clubManagerHint = document.getElementById('clubManagerHint');
const lightboxModal = document.getElementById('lightboxModal');
const lightboxImage = lightboxModal?.querySelector('img');
const lightboxCaption = lightboxModal?.querySelector('.lightbox-caption');
const lightboxClose = lightboxModal?.querySelector('.lightbox-close');

const STORAGE_KEYS = {
  comments: 'logahs_comments',
  commentsLikeMap: 'logahs_comment_likes_by_user',
  currentUser: 'logahs_current_user',
  newsletter: 'logahs_newsletter_subscriptions',
  registrations: 'logahs_registrations',
  clubEvents: 'logahs_club_events',
  newsItems: 'logahs_news_items',
  clubBackgrounds: 'logahs_club_backgrounds',
  clubAnnouncements: 'logahs_club_announcements',
  clubUploads: 'logahs_club_uploads',
  siteSettings: 'logahs_site_settings',
  galleryItems: 'logahs_gallery_items',
  siteViews: 'logahs_site_views',
  activityLog: 'logahs_activity_log'
};

const SITE_SETTINGS_DEFAULTS = {
  heroTitle: 'Connecting Learners, Leaders, and Innovation',
  heroSubtitle: 'Experience a modern school website built for students, staff, clubs, and administrators with responsive design, fast access, and a professional interface.',
  heroCard1Text: 'Leadership Summit & Award Ceremony - June 2026',
  heroCard2Text: 'Peer Educators Network: Health awareness and student engagement.',
  aboutCard1Text: 'Our school is committed to excellence, creativity, and a supportive learning environment for every student.',
  aboutCard2Text: 'Accessible on phones, tablets, and desktops with a smooth, modern interface and engaging visuals.',
  club1Desc: 'Club announcements, activities, event calendar, and member updates.',
  club2Desc: 'News, member communication, event management, and media uploads.',
  club3Desc: 'Health campaigns, peer education tools, and support resources.',
  contactHeadline: 'Reach out for school support, admissions, or partnership queries',
  contactEmail: 'contact@logahsonline.school',
  contactPhone: '+263 123 456 789',
  registerHeadline: 'Create your LOGAHS ONLINE account.',
  registerDescription: 'Register to join the community, clubs, and stay informed on campus updates.',
  registerHint: 'Registration is simulated on the client side and saves your request locally for the demo experience.'
};

const ACTIVITY_LIMIT = 8;

let editingEventId = null;
let editingAdminNewsId = null;
let editingAdminEventId = null;
let editingClubAnnouncementId = null;
let editingClubUploadId = null;
let editingGalleryItemId = null;
let activeCalendarDate = new Date();

const credentials = {
  "vincent_dube": { password: "admin123", redirect: "admin.html", role: "Super Administrator", access: ["admin", "interact", "paramount", "pen"] },
  "tafadzwa_madangombe": { password: "admin123", redirect: "admin.html", role: "System Administrator", access: ["admin", "interact", "paramount", "pen"] },
  "interact_admin": { password: "club123", redirect: "interact-club.html", role: "Interact Club Owner", access: ["interact"] },
  "interact_member": { password: "member123", redirect: "interact-club.html", role: "Interact Club Member", access: ["interact"] },
  "paramount_admin": { password: "club123", redirect: "paramount-club.html", role: "Paramount Club Owner", access: ["paramount"] },
  "paramount_member": { password: "member123", redirect: "paramount-club.html", role: "Paramount Club Member", access: ["paramount"] },
  "pen_admin": { password: "club123", redirect: "pen-club.html", role: "Peer Educators Network Owner", access: ["pen"] },
  "pen_member": { password: "member123", redirect: "pen-club.html", role: "Peer Educators Member", access: ["pen"] }
};

const CURRENT_PAGE = window.location.pathname.split('/').pop() || 'index.html';

const pageAccess = {
  'admin.html': 'admin',
  'interact-club.html': 'interact',
  'paramount-club.html': 'paramount',
  'pen-club.html': 'pen'
};


const CLUB_PAGE_MAP = {
  'interact-club.html': 'Interact Club',
  'paramount-club.html': 'Paramount Club',
  'pen-club.html': 'Peer Educators Network'
};

function saveStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadStorage(key, fallback = null) {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : fallback;
}

function showFormMessage(element, message, type = 'success') {
  if (!element) return;
  element.textContent = message;
  element.classList.remove('success', 'error');
  element.classList.add(type);
}

function getStoredComments() {
  let comments = loadStorage(STORAGE_KEYS.comments, null);
  if (!comments) {
    comments = [
      { id: 'c1', text: 'Great platform for staying updated with school news and events.', author: 'New Student', role: 'Learner', status: 'approved', page: 'index.html', likes: 3, online: true, createdAt: Date.now() },
      { id: 'c2', text: 'The admin portal will make content publishing so much easier.', author: 'Teacher', role: 'Staff', status: 'approved', page: 'index.html', likes: 1, online: true, createdAt: Date.now() },
      { id: 'c3', text: 'Looking forward to the new club dashboard updates.', author: 'Learner', role: 'Pending', status: 'pending', page: 'index.html', likes: 0, online: true, createdAt: Date.now() }
    ];
    saveStorage(STORAGE_KEYS.comments, comments);
  }
  return comments;
}

function updateCommentsStorage(comments) {
  saveStorage(STORAGE_KEYS.comments, comments);
}

function getSiteSettings() {
  return loadStorage(STORAGE_KEYS.siteSettings, SITE_SETTINGS_DEFAULTS);
}

function saveSiteSettings(settings) {
  saveStorage(STORAGE_KEYS.siteSettings, settings);
}

function getSiteViews() {
  return loadStorage(STORAGE_KEYS.siteViews, {});
}

function saveSiteViews(views) {
  saveStorage(STORAGE_KEYS.siteViews, views);
}

function recordActivity(message) {
  const activities = loadStorage(STORAGE_KEYS.activityLog, []);
  activities.unshift({
    id: `activity-${Date.now()}`,
    message,
    timestamp: Date.now()
  });
  saveStorage(STORAGE_KEYS.activityLog, activities.slice(0, ACTIVITY_LIMIT));
}

function getActivityLog() {
  return loadStorage(STORAGE_KEYS.activityLog, []);
}

function getStoredRegistrations() {
  return loadStorage(STORAGE_KEYS.registrations, []);
}

function updateRegistrationsStorage(registrations) {
  saveStorage(STORAGE_KEYS.registrations, registrations);
}

function getStoredClubEvents() {
  return loadStorage(STORAGE_KEYS.clubEvents, [
    { id: 'ev1', club: 'Interact Club', title: 'Leadership Summit Planning', date: '2026-06-03', time: '10:00' },
    { id: 'ev2', club: 'Paramount Club', title: 'Media Workshop', date: '2026-06-10', time: '14:00' },
    { id: 'ev3', club: 'Peer Educators Network', title: 'Wellness Planning Meeting', date: '2026-06-17', time: '09:30' }
  ]);
}

function updateClubEventsStorage(events) {
  saveStorage(STORAGE_KEYS.clubEvents, events);
}

function getStoredNewsItems() {
  let items = loadStorage(STORAGE_KEYS.newsItems, null);
  if (!items) {
    items = [
      { id: 'news-1', category: 'Academic', title: 'Exam Notice Released', description: 'Preparations begin for term-end exams with new study schedules and support sessions.', tagColor: 'blue' },
      { id: 'news-2', category: 'Sports', title: 'Inter-School Tournament', description: 'The football team is ready to compete in the regional championship this weekend.', tagColor: 'red' },
      { id: 'news-3', category: 'Events', title: 'Annual Awards Day', description: 'Celebrate student achievement with speeches, presentations, and awards in the school hall.', tagColor: 'navy' }
    ];
    saveStorage(STORAGE_KEYS.newsItems, items);
  }
  return items;
}

function updateNewsStorage(items) {
  saveStorage(STORAGE_KEYS.newsItems, items);
}

function getStoredGalleryItems() {
  let items = loadStorage(STORAGE_KEYS.galleryItems, null);
  if (!items) {
    items = [
      { id: 'gallery-1', caption: 'Campus Fair', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=80' },
      { id: 'gallery-2', caption: 'Club Awards', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80' },
      { id: 'gallery-3', caption: 'Volunteer Day', image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80' },
      { id: 'gallery-4', caption: 'Leadership Summit', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80' }
    ];
    saveStorage(STORAGE_KEYS.galleryItems, items);
  }
  return items;
}

function updateGalleryStorage(items) {
  saveStorage(STORAGE_KEYS.galleryItems, items);
}

function getStoredClubBackgrounds() {
  return loadStorage(STORAGE_KEYS.clubBackgrounds, {});
}

function updateClubBackgroundStorage(backgrounds) {
  saveStorage(STORAGE_KEYS.clubBackgrounds, backgrounds);
}

function getStoredClubAnnouncements() {
  return loadStorage(STORAGE_KEYS.clubAnnouncements, []);
}

function updateClubAnnouncementsStorage(items) {
  saveStorage(STORAGE_KEYS.clubAnnouncements, items);
}

function getStoredClubUploads() {
  return loadStorage(STORAGE_KEYS.clubUploads, []);
}

function updateClubUploadsStorage(items) {
  saveStorage(STORAGE_KEYS.clubUploads, items);
}

function getCurrentClubName() {
  const pageName = window.location.pathname.split('/').pop();
  return CLUB_PAGE_MAP[pageName] || null;
}

function renderAdminClubBackgrounds() {
  if (!adminClubBackgroundList) return;
  const backgrounds = getStoredClubBackgrounds();
  adminClubBackgroundList.innerHTML = Object.values(CLUB_PAGE_MAP)
    .map((clubName) => {
      const url = backgrounds[clubName] || '';
      return `
      <div class="comment-card admin-card" data-club="${clubName}">
        <p class="comment-meta"><strong>${clubName}</strong></p>
        <p>${url ? url : 'No custom background set.'}</p>
        <div class="comment-actions">
          ${url ? `<button class="comment-action" data-action="edit-background" data-club="${clubName}">Edit</button><button class="comment-action" data-action="remove-background" data-club="${clubName}">Remove</button>` : ''}
        </div>
      </div>
    `;
    })
    .join('');
}

function setupAdminClubBackgroundForm() {
  if (!adminClubBackgroundForm) return;
  adminClubBackgroundForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const club = adminClubBackgroundSelect.value;
    const url = adminClubBackgroundUrl.value.trim();
    if (!club || !url) {
      showFormMessage(adminClubBackgroundMessage, 'Please select a club and enter an image URL.', 'error');
      return;
    }
    const backgrounds = getStoredClubBackgrounds();
    backgrounds[club] = url;
    updateClubBackgroundStorage(backgrounds);
    renderAdminClubBackgrounds();
    applyClubPageBackground();
    showFormMessage(adminClubBackgroundMessage, 'Club background image saved successfully.', 'success');
    recordActivity(`Club background updated for ${club}`);
    renderAdminInsights();
    adminClubBackgroundForm.reset();
  });
}

function setupAdminClubBackgroundActions() {
  if (!adminClubBackgroundList) return;
  adminClubBackgroundList.addEventListener('click', (event) => {
    const button = event.target.closest('.comment-action');
    if (!button) return;
    const action = button.dataset.action;
    const club = button.dataset.club;
    const backgrounds = getStoredClubBackgrounds();
    if (action === 'edit-background') {
      adminClubBackgroundSelect.value = club;
      adminClubBackgroundUrl.value = backgrounds[club] || '';
      showFormMessage(adminClubBackgroundMessage, 'Edit the URL and save to update this club background.', 'success');
    }
    if (action === 'remove-background') {
      delete backgrounds[club];
      updateClubBackgroundStorage(backgrounds);
      renderAdminClubBackgrounds();
      applyClubPageBackground();
      showFormMessage(adminClubBackgroundMessage, 'Club background removed.', 'success');
      recordActivity(`Club background removed for ${club}`);
      renderAdminInsights();
    }
  });
}

function applyClubPageBackground() {
  const pageName = window.location.pathname.split('/').pop();
  const clubName = CLUB_PAGE_MAP[pageName];
  const clubCover = document.querySelector('.club-cover');
  if (!clubName || !clubCover) return;
  const backgrounds = getStoredClubBackgrounds();
  const imageUrl = backgrounds[clubName];
  if (imageUrl) {
    clubCover.style.backgroundImage = `linear-gradient(rgba(8,17,36,0.55), rgba(8,17,36,0.55)), url('${imageUrl}')`;
    clubCover.style.backgroundSize = 'cover';
    clubCover.style.backgroundPosition = 'center';
  } else {
    clubCover.style.backgroundImage = '';
  }
}

function renderClubEvents() {
  if (!clubEventList) return;
  const clubName = getCurrentClubName();
  const clubEvents = getStoredClubEvents()
    .filter((event) => !clubName || event.club === clubName)
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
  const canEditEvents = schedulerForm && clubName && isAuthorized(clubName);
  if (!clubEvents.length) {
    clubEventList.innerHTML = '<p class="hint">No club events scheduled yet.</p>';
    if (calendarGrid) renderCalendarMonth();
    return;
  }

  clubEventList.innerHTML = clubEvents
    .map((event) => `
      <div class="schedule-item" data-event-id="${event.id}">
        <div class="schedule-header">
          <h4>${event.title}</h4>
          <span class="status-badge">${event.club}</span>
        </div>
        <p>${new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })} • ${event.time}</p>
        ${canEditEvents ? `
        <div class="schedule-actions">
          <button class="button secondary schedule-action" data-action="edit" data-event-id="${event.id}">Edit</button>
          <button class="button secondary schedule-action" data-action="remove" data-event-id="${event.id}">Remove</button>
        </div>
        ` : ''}
      </div>
    `)
    .join('');

  if (calendarGrid) renderCalendarMonth();
}

function renderClubAnnouncements() {
  if (!clubAnnouncementList) return;
  const clubName = getCurrentClubName();
  const announcements = getStoredClubAnnouncements().filter((item) => item.club === clubName);
  if (!announcements.length) {
    clubAnnouncementList.innerHTML = '<p class="hint">No announcements have been posted yet.</p>';
    return;
  }
  clubAnnouncementList.innerHTML = announcements
    .map((item) => `
      <div class="comment-card admin-card" data-announcement-id="${item.id}">
        <p class="comment-meta"><strong>${item.title}</strong></p>
        <p>${item.description}</p>
        <div class="comment-actions">
          <button class="comment-action" data-action="edit-announcement" data-announcement-id="${item.id}">Edit</button>
          <button class="comment-action" data-action="remove-announcement" data-announcement-id="${item.id}">Remove</button>
        </div>
      </div>
    `)
    .join('');
}

function guessMediaTypeFromUrl(url) {
  if (!url) return 'image';
  const u = url.toLowerCase();
  if (u.match(/\.(mp4|webm|ogg)(\?|#|$)/)) return 'video';
  // Simple heuristics for common video providers (YouTube/Vimeo)
  if (u.includes('youtube.com') || u.includes('youtu.be') || u.includes('vimeo.com')) return 'video';
  // also treat common image extensions as images
  if (u.match(/\.(png|jpg|jpeg|gif|webp|bmp|svg)(\?|#|$)/)) return 'image';
  return 'image';
}


function renderMediaPreview(item) {
  const type = item.mediaType || guessMediaTypeFromUrl(item.url);
  if (type === 'video') {
    // If it's a direct mp4/webm/ogg, use <video>. Otherwise link out.
    const u = (item.url || '').toLowerCase();
    const isDirectVideo = u.match(/\.(mp4|webm|ogg)(\?|#|$)/);
    if (isDirectVideo) {
      return `<video src="${item.url}" controls preload="metadata" style="width:100%;max-height:320px;border-radius:16px;background:rgba(255,255,255,0.04);"></video>`;
    }
    // For other providers, use a safe link (no iframe embed without knowing the exact format)
    return `<p><a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.url}</a></p>`;
  }

  return `<img src="${item.url}" alt="${item.title}" loading="lazy" style="width:100%;max-height:320px;object-fit:cover;border-radius:16px;background:rgba(255,255,255,0.04);" />`;
}

function renderClubUploads() {
  if (!clubUploadList) return;
  const clubName = getCurrentClubName();
  const uploads = getStoredClubUploads().filter((item) => item.club === clubName);
  if (!uploads.length) {
    clubUploadList.innerHTML = '<p class="hint">No uploads have been shared yet.</p>';
    return;
  }

  clubUploadList.innerHTML = uploads
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
    .map((item) => `
      <div class="comment-card admin-card" data-upload-id="${item.id}">
        <p class="comment-meta"><strong>${item.title}</strong></p>
        ${renderMediaPreview(item)}
        <div class="comment-actions">
          <button class="comment-action" data-action="edit-upload" data-upload-id="${item.id}">Edit</button>
          <button class="comment-action" data-action="remove-upload" data-upload-id="${item.id}">Remove</button>
        </div>
      </div>
    `)
    .join('');
}


function showClubManagerPanel() {
  if (!clubManagerSection || !clubManagerHint) return;
  const clubName = getCurrentClubName();
  if (!clubName) {
    clubManagerSection.classList.add('hidden');
    return;
  }

  const authorized = isAuthorized(clubName);
  clubManagerSection.classList.remove('hidden');
  if (!authorized) {
    clubManagerPanel?.classList.add('hidden');
    clubManagerList?.classList.add('hidden');
    clubManagerHint.textContent = 'Sign in with your club account to manage this page.';
    return;
  }

  clubManagerPanel?.classList.remove('hidden');
  clubManagerList?.classList.remove('hidden');
  clubManagerHint.textContent = `Signed in as ${getCurrentUser()?.role || 'club member'} — manage announcements, events, and uploads.`;
  renderClubAnnouncements();
  renderClubEvents();
  renderClubUploads();
}

function setupClubAnnouncementForm() {
  if (!clubAnnouncementForm) return;
  clubAnnouncementForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const clubName = getCurrentClubName();
    if (!clubName || !isAuthorized(clubName)) {
      showFormMessage(clubAnnouncementMessage, 'Sign in with the correct club account to post announcements.', 'error');
      return;
    }
    const title = clubAnnouncementTitle.value.trim();
    const description = clubAnnouncementText.value.trim();
    if (!title || !description) {
      showFormMessage(clubAnnouncementMessage, 'Please complete every field to publish an announcement.', 'error');
      return;
    }
    const announcements = getStoredClubAnnouncements();
    if (editingClubAnnouncementId) {
      const index = announcements.findIndex((item) => item.id === editingClubAnnouncementId);
      if (index !== -1) {
        announcements[index] = { id: editingClubAnnouncementId, club: clubName, title, description, createdAt: Date.now() };
        showFormMessage(clubAnnouncementMessage, 'Announcement updated successfully.', 'success');
      }
    } else {
      announcements.unshift({ id: `ann-${Date.now()}`, club: clubName, title, description, createdAt: Date.now() });
      showFormMessage(clubAnnouncementMessage, 'Announcement posted successfully.', 'success');
    }
    updateClubAnnouncementsStorage(announcements);
    renderClubAnnouncements();
    clubAnnouncementForm.reset();
    editingClubAnnouncementId = null;
  });
}

function setupClubUploadForm() {
  if (!clubUploadForm) return;
  clubUploadForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const clubName = getCurrentClubName();
    if (!clubName || !isAuthorized(clubName)) {
      showFormMessage(clubUploadMessage, 'Sign in with the correct club account to upload content.', 'error');
      return;
    }
    const title = clubUploadTitle.value.trim();
    const url = clubUploadUrl.value.trim();
    if (!title || !url) {
      showFormMessage(clubUploadMessage, 'Please provide a title and content URL.', 'error');
      return;
    }

    // Optional: support explicit media type if the HTML provides it.
    const mediaTypeSelect = clubUploadForm.querySelector('#clubUploadMediaType');
    const mediaType = mediaTypeSelect?.value ? mediaTypeSelect.value : guessMediaTypeFromUrl(url);

    const uploads = getStoredClubUploads();
    if (editingClubUploadId) {
      const index = uploads.findIndex((item) => item.id === editingClubUploadId);
      if (index !== -1) {
        uploads[index] = { id: editingClubUploadId, club: clubName, title, url, mediaType, createdAt: Date.now() };
        showFormMessage(clubUploadMessage, 'Upload updated successfully.', 'success');
      }
    } else {
      uploads.unshift({ id: `upload-${Date.now()}`, club: clubName, title, url, mediaType, createdAt: Date.now() });
      showFormMessage(clubUploadMessage, 'Content uploaded successfully.', 'success');
    }
    updateClubUploadsStorage(uploads);
    renderClubUploads();
    clubUploadForm.reset();
    editingClubUploadId = null;
  });
}


function setupClubManagementActions() {
  if (clubAnnouncementList) {
    clubAnnouncementList.addEventListener('click', (event) => {
      const button = event.target.closest('.comment-action');
      if (!button) return;
      const action = button.dataset.action;
      const announcementId = button.dataset.announcementId;
      const announcements = getStoredClubAnnouncements();
      const index = announcements.findIndex((item) => item.id === announcementId);
      if (index === -1) return;
      if (action === 'edit-announcement') {
        const current = announcements[index];
        clubAnnouncementTitle.value = current.title;
        clubAnnouncementText.value = current.description;
        editingClubAnnouncementId = current.id;
        showFormMessage(clubAnnouncementMessage, 'Editing announcement. Save changes when ready.', 'success');
      }
      if (action === 'remove-announcement') {
        announcements.splice(index, 1);
        updateClubAnnouncementsStorage(announcements);
        renderClubAnnouncements();
        showFormMessage(clubAnnouncementMessage, 'Announcement removed successfully.', 'success');
      }
    });
  }

  if (clubUploadList) {
    clubUploadList.addEventListener('click', (event) => {
      const button = event.target.closest('.comment-action');
      if (!button) return;
      const action = button.dataset.action;
      const uploadId = button.dataset.uploadId;
      const uploads = getStoredClubUploads();
      const index = uploads.findIndex((item) => item.id === uploadId);
      if (index === -1) return;
      if (action === 'edit-upload') {
        const current = uploads[index];
        clubUploadTitle.value = current.title;
        clubUploadUrl.value = current.url;

        const mediaTypeSelect = clubUploadForm?.querySelector('#clubUploadMediaType');
        if (mediaTypeSelect) {
          mediaTypeSelect.value = current.mediaType || guessMediaTypeFromUrl(current.url);
        }

        editingClubUploadId = current.id;
        showFormMessage(clubUploadMessage, 'Editing upload. Save changes when ready.', 'success');
      }
      if (action === 'remove-upload') {
        uploads.splice(index, 1);
        updateClubUploadsStorage(uploads);
        renderClubUploads();
        showFormMessage(clubUploadMessage, 'Upload removed successfully.', 'success');
      }
    });
  }
}


function resetSchedulerState() {
  editingEventId = null;
  if (schedulerForm) {
    const submitButton = schedulerForm.querySelector('button[type="submit"]');
    if (submitButton) submitButton.textContent = 'Add to Calendar';
  }
  if (schedulerCancelButton) {
    schedulerCancelButton.classList.add('hidden');
  }
  if (schedulerMessage) schedulerMessage.textContent = '';
}

function setupRegistrationForm() {
  if (!registrationForm) return;
  registrationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('registrationName').value.trim();
    const email = document.getElementById('registrationEmail').value.trim();
    const role = document.getElementById('registrationRole').value;
    const interest = document.getElementById('registrationInterest').value.trim();
    if (!name || !email || !role || !interest) {
      showFormMessage(registrationMessage, 'Please complete every field to register.', 'error');
      return;
    }

    const registrations = getStoredRegistrations();
    registrations.push({ id: `reg-${Date.now()}`, name, email, role, interest, createdAt: Date.now() });
    updateRegistrationsStorage(registrations);
    registrationForm.reset();
    showFormMessage(registrationMessage, 'Registration submitted successfully! Welcome to LOGAHS ONLINE.', 'success');
    recordActivity(`New registration received: ${name} (${role})`);
    renderAdminInsights();
  });
}

function setupSchedulerForm() {
  if (!schedulerForm) return;
  schedulerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const club = getCurrentClubName() || (schedulerClub ? schedulerClub.value : '');
    const title = schedulerTitle.value.trim();
    const date = schedulerDate.value;
    const time = schedulerTime.value;

    if (!club || !title || !date || !time) {
      showFormMessage(schedulerMessage, 'Please fill in all event details.', 'error');
      return;
    }

    const events = getStoredClubEvents();
    if (editingEventId) {
      const index = events.findIndex((item) => item.id === editingEventId);
      if (index !== -1) {
        events[index] = { id: editingEventId, club, title, date, time };
        showFormMessage(schedulerMessage, 'Club event updated successfully.', 'success');
      }
    } else {
      events.push({ id: `ev-${Date.now()}`, club, title, date, time });
      showFormMessage(schedulerMessage, 'Club event added to the scheduler.', 'success');
    }

    updateClubEventsStorage(events);
    renderClubEvents();
    schedulerForm.reset();
    resetSchedulerState();
  });

  if (schedulerCancelButton) {
    schedulerCancelButton.addEventListener('click', () => {
      schedulerForm.reset();
      resetSchedulerState();
    });
  }
}

function setupClubEventActions() {
  if (!clubEventList) return;
  clubEventList.addEventListener('click', (event) => {
    const button = event.target.closest('.schedule-action');
    if (!button) return;
    const action = button.dataset.action;
    const eventId = button.dataset.eventId;
    const events = getStoredClubEvents();
    const index = events.findIndex((item) => item.id === eventId);
    if (index === -1) return;

    if (action === 'edit') {
      const current = events[index];
      if (schedulerClub) schedulerClub.value = current.club;
      schedulerTitle.value = current.title;
      schedulerDate.value = current.date;
      schedulerTime.value = current.time;
      editingEventId = current.id;
      const submitButton = schedulerForm.querySelector('button[type="submit"]');
      if (submitButton) submitButton.textContent = 'Update Event';
      if (schedulerCancelButton) schedulerCancelButton.classList.remove('hidden');
      showFormMessage(schedulerMessage, 'Edit mode activated. Make changes and update the event.', 'success');
    }

    if (action === 'remove') {
      events.splice(index, 1);
      updateClubEventsStorage(events);
      renderClubEvents();
      showFormMessage(schedulerMessage, 'Club event removed from the calendar.', 'success');
      if (editingEventId === eventId) {
        resetSchedulerState();
        schedulerForm.reset();
      }
    }
  });
}

function renderAdminGalleryList() {
  const galleryList = document.getElementById('adminGalleryList');
  if (!galleryList) return;
  const items = getStoredGalleryItems();
  if (!items.length) {
    galleryList.innerHTML = '<p class="hint">No gallery items have been added yet.</p>';
    return;
  }
  galleryList.innerHTML = items
    .map((item) => `
      <div class="comment-card admin-card" data-gallery-id="${item.id}">
        <p class="comment-meta"><strong>${item.caption}</strong></p>
        <div class="comment-actions">
          <button class="comment-action" data-action="remove-gallery" data-gallery-id="${item.id}">Remove</button>
        </div>
      </div>
    `)
    .join('');
}

function setupAdminGalleryForm() {
  const galleryForm = document.getElementById('adminGalleryForm');
  const captionInput = document.getElementById('galleryItemCaption');
  const imageUrlInput = document.getElementById('galleryItemImageUrl');
  const message = document.getElementById('adminGalleryMessage');
  if (!galleryForm || !captionInput || !imageUrlInput) return;

  galleryForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const caption = captionInput.value.trim();
    const imageUrl = imageUrlInput.value.trim();
    if (!caption || !imageUrl) {
      showFormMessage(message, 'Please provide a caption and a valid image URL.', 'error');
      return;
    }
    const items = getStoredGalleryItems();
    items.push({ id: `gallery-${Date.now()}`, caption, image: imageUrl });
    updateGalleryStorage(items);
    renderGalleryGrid();
    renderAdminGalleryList();
    showFormMessage(message, 'Gallery item saved successfully.', 'success');
    recordActivity(`Gallery item added: ${caption}`);
    renderAdminInsights();
    galleryForm.reset();
  });
}

function setupAdminGalleryActions() {
  const galleryList = document.getElementById('adminGalleryList');
  if (!galleryList) return;
  galleryList.addEventListener('click', (event) => {
    const button = event.target.closest('.comment-action');
    if (!button) return;
    const action = button.dataset.action;
    const itemId = button.dataset.galleryId;
    if (action !== 'remove-gallery' || !itemId) return;
    const items = getStoredGalleryItems();
    const updated = items.filter((item) => item.id !== itemId);
    updateGalleryStorage(updated);
    renderGalleryGrid();
    renderAdminGalleryList();
    recordActivity(`Gallery item removed: ${itemId}`);
    renderAdminInsights();
  });
}

function renderAdminNewsList() {
  if (!adminNewsList) return;
  const news = getStoredNewsItems();
  if (!news.length) {
    adminNewsList.innerHTML = '<p class="hint">No announcements published yet.</p>';
    return;
  }
  adminNewsList.innerHTML = news
    .map((item) => `
      <div class="comment-card admin-card" data-news-id="${item.id}">
        <p class="comment-meta"><strong>${item.category}</strong></p>
        <h4>${item.title}</h4>
        <p>${item.description}</p>
        <div class="comment-actions">
          <button class="comment-action" data-action="edit-news" data-news-id="${item.id}">Edit</button>
          <button class="comment-action" data-action="remove-news" data-news-id="${item.id}">Remove</button>
        </div>
      </div>
    `)
    .join('');
}

function setupAdminNewsForm() {
  if (!adminNewsForm) return;
  adminNewsForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const category = adminNewsCategory.value;
    const title = adminNewsTitle.value.trim();
    const description = adminNewsDescription.value.trim();
    if (!category || !title || !description) {
      showFormMessage(adminNewsMessage, 'Please complete every field to save the announcement.', 'error');
      return;
    }
    const news = getStoredNewsItems();
    const tagColor = category === 'Academic' ? 'blue' : category === 'Sports' ? 'red' : 'navy';
    if (editingAdminNewsId) {
      const index = news.findIndex((item) => item.id === editingAdminNewsId);
      if (index !== -1) {
        news[index] = { id: editingAdminNewsId, category, title, description, tagColor };
        showFormMessage(adminNewsMessage, 'Announcement updated successfully.', 'success');
        recordActivity(`Announcement updated: ${title}`);
      }
    } else {
      news.unshift({ id: `news-${Date.now()}`, category, title, description, tagColor });
      showFormMessage(adminNewsMessage, 'Announcement published successfully.', 'success');
      recordActivity(`Announcement published: ${title}`);
    }
    updateNewsStorage(news);
    renderNewsCards(news, document.getElementById('newsFeed'));
    renderAdminNewsList();
    renderAdminInsights();
    adminNewsForm.reset();
    editingAdminNewsId = null;
  });
}

function setupAdminNewsActions() {
  if (!adminNewsList) return;
  adminNewsList.addEventListener('click', (event) => {
    const button = event.target.closest('.comment-action');
    if (!button) return;
    const action = button.dataset.action;
    const newsId = button.dataset.newsId;
    const news = getStoredNewsItems();
    const index = news.findIndex((item) => item.id === newsId);
    if (index === -1) return;

    if (action === 'edit-news') {
      const item = news[index];
      adminNewsCategory.value = item.category;
      adminNewsTitle.value = item.title;
      adminNewsDescription.value = item.description;
      editingAdminNewsId = item.id;
      showFormMessage(adminNewsMessage, 'Editing announcement. Save changes when ready.', 'success');
    }
    if (action === 'remove-news') {
      const removedTitle = news[index]?.title;
      news.splice(index, 1);
      updateNewsStorage(news);
      renderNewsCards(news, document.getElementById('newsFeed'));
      renderAdminNewsList();
      showFormMessage(adminNewsMessage, 'Announcement removed successfully.', 'success');
      recordActivity(`Announcement removed: ${removedTitle}`);
      renderAdminInsights();
    }
  });
}

function renderAdminEventsList() {
  if (!adminEventList) return;
  const events = getStoredClubEvents().sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
  if (!events.length) {
    adminEventList.innerHTML = '<p class="hint">No scheduled events yet.</p>';
    return;
  }
  adminEventList.innerHTML = events
    .map((event) => `
      <div class="comment-card admin-card" data-event-id="${event.id}">
        <p class="comment-meta"><strong>${event.club}</strong></p>
        <h4>${event.title}</h4>
        <p>${new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })} • ${event.time}</p>
        <div class="comment-actions">
          <button class="comment-action" data-action="edit-event" data-event-id="${event.id}">Edit</button>
          <button class="comment-action" data-action="remove-event" data-event-id="${event.id}">Remove</button>
        </div>
      </div>
    `)
    .join('');
}

function setupAdminEventForm() {
  if (!adminEventForm) return;
  adminEventForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const club = adminEventClub.value;
    const title = adminEventTitle.value.trim();
    const date = adminEventDate.value;
    const time = adminEventTime.value;
    if (!club || !title || !date || !time) {
      showFormMessage(adminEventMessage, 'Please complete every field to save the event.', 'error');
      return;
    }
    const events = getStoredClubEvents();
    if (editingAdminEventId) {
      const index = events.findIndex((item) => item.id === editingAdminEventId);
      if (index !== -1) {
        events[index] = { id: editingAdminEventId, club, title, date, time };
        showFormMessage(adminEventMessage, 'Event updated successfully.', 'success');
        recordActivity(`Event updated: ${title} for ${club}`);
      }
    } else {
      events.push({ id: `ev-${Date.now()}`, club, title, date, time });
      showFormMessage(adminEventMessage, 'Event added successfully.', 'success');
      recordActivity(`Event added: ${title} for ${club}`);
    }
    updateClubEventsStorage(events);
    renderClubEvents();
    renderAdminEventsList();
    renderAdminInsights();
    adminEventForm.reset();
    editingAdminEventId = null;
  });
}

function setupAdminEventActions() {
  if (!adminEventList) return;
  adminEventList.addEventListener('click', (event) => {
    const button = event.target.closest('.comment-action');
    if (!button) return;
    const action = button.dataset.action;
    const eventId = button.dataset.eventId;
    const events = getStoredClubEvents();
    const index = events.findIndex((item) => item.id === eventId);
    if (index === -1) return;

    if (action === 'edit-event') {
      const current = events[index];
      adminEventClub.value = current.club;
      adminEventTitle.value = current.title;
      adminEventDate.value = current.date;
      adminEventTime.value = current.time;
      editingAdminEventId = current.id;
      showFormMessage(adminEventMessage, 'Editing event. Save changes when ready.', 'success');
    }

    if (action === 'remove-event') {
      const removedEvent = events[index];
      events.splice(index, 1);
      updateClubEventsStorage(events);
      renderClubEvents();
      renderAdminEventsList();
      showFormMessage(adminEventMessage, 'Event removed successfully.', 'success');
      recordActivity(`Event removed: ${removedEvent?.title} (${removedEvent?.club})`);
      renderAdminInsights();
    }
  });
}

function formatCalendarDate(year, month, day) {
  const twoDigit = (value) => String(value).padStart(2, '0');
  return `${year}-${twoDigit(month + 1)}-${twoDigit(day)}`;
}

function renderCalendarMonth() {
  if (!calendarGrid || !calendarMonthLabel) return;
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const year = activeCalendarDate.getFullYear();
  const month = activeCalendarDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const events = getStoredClubEvents();

  calendarMonthLabel.textContent = `${monthNames[month]} ${year}`;
  const dateMap = events.reduce((map, event) => {
    const key = event.date;
    if (!map[key]) map[key] = [];
    map[key].push(event);
    return map;
  }, {});

  let html = dayNames.map((day) => `<div class="calendar-day-name">${day}</div>`).join('');
  for (let blank = 0; blank < firstDay; blank += 1) {
    html += '<div class="calendar-cell empty"></div>';
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const dateKey = formatCalendarDate(year, month, day);
    const cellEvents = dateMap[dateKey] || [];
    html += `
      <div class="calendar-cell">
        <div class="calendar-date">${day}</div>
        <div class="calendar-events">
          ${cellEvents.map((evt) => `<span class="calendar-event-pill">${evt.club}: ${evt.title}</span>`).join('')}
        </div>
      </div>
    `;
  }

  calendarGrid.innerHTML = html;
}

function setupCalendarControls() {
  if (!calendarPrev || !calendarNext) return;
  calendarPrev.addEventListener('click', () => {
    activeCalendarDate = new Date(activeCalendarDate.getFullYear(), activeCalendarDate.getMonth() - 1, 1);
    renderCalendarMonth();
  });
  calendarNext.addEventListener('click', () => {
    activeCalendarDate = new Date(activeCalendarDate.getFullYear(), activeCalendarDate.getMonth() + 1, 1);
    renderCalendarMonth();
  });
}

function renderPublicComments() {
  if (!commentsPanel) return;
  const comments = getStoredComments().filter((item) => item.status === 'approved' && item.page === CURRENT_PAGE);
  if (!comments.length) {
    commentsPanel.innerHTML = '<p class="hint">No approved comments yet. Share your thoughts and they will appear once reviewed.</p>';
    return;
  }

  commentsPanel.innerHTML = comments
    .map((comment) => `
      <div class="comment-card approved" data-comment-id="${comment.id}">
        <p class="comment-meta">
          <span>${comment.role} • ${comment.author}</span>
          <span class="status-badge">Approved</span>
          ${comment.online ? '<span class="status-badge">Online</span>' : ''}
        </p>
        <p>${comment.text}</p>
        <div class="comment-actions">
          <button class="comment-action" data-action="react" data-comment-id="${comment.id}">👍 ${comment.likes || 0}</button>
        </div>
      </div>
    `)
    .join('');
}

function getLikeIdentity() {
  const user = getCurrentUser();
  if (user?.username) return `user:${user.username}`;
  let anon = localStorage.getItem('logahs_anon_id');
  if (!anon) {
    anon = `anon-${Math.random().toString(16).slice(2)}-${Date.now()}`;
    localStorage.setItem('logahs_anon_id', anon);
  }
  return `anon:${anon}`;
}

function getCommentsLikeMap() {
  return loadStorage(STORAGE_KEYS.commentsLikeMap, {});
}

function setCommentsLikeMap(map) {
  saveStorage(STORAGE_KEYS.commentsLikeMap, map);
}

function setupCommentReactions() {
  if (!commentsPanel) return;

  const likeIdentity = getLikeIdentity();

  commentsPanel.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-action="react"]');
    if (!button) return;

    const commentId = button.dataset.commentId;
    const comments = getStoredComments();
    const index = comments.findIndex((item) => item.id === commentId);
    if (index === -1) return;

    const likesMap = getCommentsLikeMap();
    likesMap[commentId] = likesMap[commentId] || { by: {} };

    if (likesMap[commentId].by?.[likeIdentity]) {
      // Like already used by this user/device.
      renderPublicComments();
      return;
    }

    comments[index].likes = (comments[index].likes || 0) + 1;
    likesMap[commentId].by = likesMap[commentId].by || {};
    likesMap[commentId].by[likeIdentity] = { at: Date.now() };

    saveStorage(STORAGE_KEYS.comments, comments);
    setCommentsLikeMap(likesMap);
    renderPublicComments();
  });
} 


function renderModerationPanel() {
  if (!moderationPanel) return;
  const comments = getStoredComments().filter((item) => item.status !== 'removed');
  if (!comments.length) {
    moderationPanel.innerHTML = '<p class="hint">No comments are available for moderation right now.</p>';
    return;
  }

  moderationPanel.innerHTML = comments
    .map((comment) => {
      return `
      <div class="comment-card ${comment.status === 'pending' ? 'pending' : 'approved'}" data-comment-id="${comment.id}">
        <p class="comment-meta">
          ${comment.status === 'approved' ? 'Approved' : 'Pending'} • ${comment.role}
          ${comment.online ? '<span class="status-badge">Online</span>' : ''}
        </p>
        <p>${comment.text}</p>
        <div class="comment-actions">
          ${comment.status === 'pending' ? '<button class="comment-action" data-action="approve">Approve</button>' : '<span class="status-badge">Approved</span>'}
          <button class="comment-action" data-action="remove">Remove</button>
        </div>
      </div>
    `;
    })
    .join('');
}

function incrementPageView() {
  const views = getSiteViews();
  views[CURRENT_PAGE] = (views[CURRENT_PAGE] || 0) + 1;
  saveSiteViews(views);
}

function getTotalPageViews() {
  return Object.values(getSiteViews()).reduce((total, count) => total + count, 0);
}

function applySiteSettings() {
  const settings = getSiteSettings();
  const map = {
    heroTitle: 'heroTitle',
    heroSubtitle: 'heroSubtitle',
    heroCard1Text: 'heroCard1Text',
    heroCard2Text: 'heroCard2Text',
    aboutCard1Text: 'aboutCard1Text',
    aboutCard2Text: 'aboutCard2Text',
    club1Desc: 'club1Desc',
    club2Desc: 'club2Desc',
    club3Desc: 'club3Desc'
  };

  Object.entries(map).forEach(([key, elementId]) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent = settings[key] || SITE_SETTINGS_DEFAULTS[key];
    }
  });

  const contactHeadline = document.getElementById('contactHeadline');
  if (contactHeadline) contactHeadline.textContent = settings.contactHeadline || SITE_SETTINGS_DEFAULTS.contactHeadline;

  const contactEmailDisplay = document.getElementById('contactEmailDisplay');
  if (contactEmailDisplay) contactEmailDisplay.textContent = `Email: ${settings.contactEmail || SITE_SETTINGS_DEFAULTS.contactEmail}`;

  const contactPhoneDisplay = document.getElementById('contactPhoneDisplay');
  if (contactPhoneDisplay) contactPhoneDisplay.textContent = `Phone: ${settings.contactPhone || SITE_SETTINGS_DEFAULTS.contactPhone}`;

  const registerHeadline = document.getElementById('registerHeadline');
  if (registerHeadline) registerHeadline.textContent = settings.registerHeadline || SITE_SETTINGS_DEFAULTS.registerHeadline;

  const registerDescription = document.getElementById('registerDescription');
  if (registerDescription) registerDescription.textContent = settings.registerDescription || SITE_SETTINGS_DEFAULTS.registerDescription;

  const registerHint = document.getElementById('registerHint');
  if (registerHint) registerHint.textContent = settings.registerHint || SITE_SETTINGS_DEFAULTS.registerHint;
}

function renderAdminInsights() {
  const approvedCount = getStoredComments().filter((item) => item.status === 'approved').length;
  const pendingCount = getStoredComments().filter((item) => item.status === 'pending').length;
  const totalViews = getTotalPageViews();
  const newsletterCount = loadStorage(STORAGE_KEYS.newsletter, []).length;
  const registrationCount = getStoredRegistrations().length;
  const eventCount = getStoredClubEvents().length;
  const activityLog = getActivityLog();

  const approvedElement = document.getElementById('insightApprovedComments');
  const pendingElement = document.getElementById('insightPendingComments');
  const viewsElement = document.getElementById('insightSiteViews');
  const subsElement = document.getElementById('insightSubscriptions');

  if (approvedElement) approvedElement.textContent = approvedCount;
  if (pendingElement) pendingElement.textContent = pendingCount;
  if (viewsElement) viewsElement.textContent = totalViews;
  if (subsElement) subsElement.textContent = newsletterCount;

  const cardsContainer = document.getElementById('adminInsightCards');
  if (cardsContainer) {
    cardsContainer.innerHTML = `
      <article class="feature-card stat-card">
        <h3>${registrationCount}</h3>
        <p>Registered users</p>
      </article>
      <article class="feature-card stat-card">
        <h3>${eventCount}</h3>
        <p>Active events</p>
      </article>
      <article class="feature-card stat-card">
        <h3>${activityLog.length}</h3>
        <p>Recent activities</p>
      </article>
    `;
  }

  const activityLogElement = document.getElementById('adminActivityLog');
  if (activityLogElement) {
    activityLogElement.innerHTML = `
      <div class="section-header">
        <p class="eyebrow">Activity Feed</p>
        <h2>Recent website actions</h2>
      </div>
      <div class="activity-list">
        ${activityLog
          .map((item) => `
            <div class="activity-item">
              <p>${item.message}</p>
              <span>${new Date(item.timestamp).toLocaleString()}</span>
            </div>
          `)
          .join('')}
      </div>
    `;
  }
}

function setupSiteSettingsForm() {
  const form = document.getElementById('adminSiteSettingsForm');
  const preview = document.getElementById('adminSiteSettingsPreview');
  const message = document.getElementById('adminSiteSettingsMessage');
  if (!form || !preview) return;

  const inputs = {
    siteHeroTitle: document.getElementById('siteHeroTitle'),
    siteHeroSubtitle: document.getElementById('siteHeroSubtitle'),
    siteCard1Text: document.getElementById('siteCard1Text'),
    siteCard2Text: document.getElementById('siteCard2Text'),
    siteAboutCard1: document.getElementById('siteAboutCard1'),
    siteAboutCard2: document.getElementById('siteAboutCard2'),
    siteClub1Desc: document.getElementById('siteClub1Desc'),
    siteClub2Desc: document.getElementById('siteClub2Desc'),
    siteClub3Desc: document.getElementById('siteClub3Desc')
  };

  const inputToSettingsKey = {
    siteHeroTitle: 'heroTitle',
    siteHeroSubtitle: 'heroSubtitle',
    siteCard1Text: 'heroCard1Text',
    siteCard2Text: 'heroCard2Text',
    siteAboutCard1: 'aboutCard1Text',
    siteAboutCard2: 'aboutCard2Text',
    siteClub1Desc: 'club1Desc',
    siteClub2Desc: 'club2Desc',
    siteClub3Desc: 'club3Desc'
  };

  function populateForm() {
    const settings = getSiteSettings();
    Object.entries(inputs).forEach(([key, input]) => {
      if (input) {
        const settingsKey = inputToSettingsKey[key];
        input.value = settings[settingsKey] || '';
      }
    });
    preview.innerHTML = `
      <p><strong>Hero headline:</strong> ${settings.heroTitle}</p>
      <p><strong>Hero subtitle:</strong> ${settings.heroSubtitle}</p>
      <p><strong>Hero card 1:</strong> ${settings.heroCard1Text}</p>
      <p><strong>Hero card 2:</strong> ${settings.heroCard2Text}</p>
      <p><strong>About card 1:</strong> ${settings.aboutCard1Text}</p>
      <p><strong>About card 2:</strong> ${settings.aboutCard2Text}</p>
      <p><strong>Interact Club:</strong> ${settings.club1Desc}</p>
      <p><strong>Paramount Club:</strong> ${settings.club2Desc}</p>
      <p><strong>Peer Educators:</strong> ${settings.club3Desc}</p>
    `;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const newSettings = {
      heroTitle: inputs.siteHeroTitle?.value.trim() || SITE_SETTINGS_DEFAULTS.heroTitle,
      heroSubtitle: inputs.siteHeroSubtitle?.value.trim() || SITE_SETTINGS_DEFAULTS.heroSubtitle,
      heroCard1Text: inputs.siteCard1Text?.value.trim() || SITE_SETTINGS_DEFAULTS.heroCard1Text,
      heroCard2Text: inputs.siteCard2Text?.value.trim() || SITE_SETTINGS_DEFAULTS.heroCard2Text,
      aboutCard1Text: inputs.siteAboutCard1?.value.trim() || SITE_SETTINGS_DEFAULTS.aboutCard1Text,
      aboutCard2Text: inputs.siteAboutCard2?.value.trim() || SITE_SETTINGS_DEFAULTS.aboutCard2Text,
      club1Desc: inputs.siteClub1Desc?.value.trim() || SITE_SETTINGS_DEFAULTS.club1Desc,
      club2Desc: inputs.siteClub2Desc?.value.trim() || SITE_SETTINGS_DEFAULTS.club2Desc,
      club3Desc: inputs.siteClub3Desc?.value.trim() || SITE_SETTINGS_DEFAULTS.club3Desc
    };
    saveSiteSettings(newSettings);
    applySiteSettings();
    renderSiteSettingsPreview();
    renderAdminInsights();
    recordActivity('Updated homepage and club content settings.');
    if (message) {
      message.textContent = 'Site content saved successfully.';
      message.classList.remove('error');
      message.classList.add('success');
    }
  });

  function renderSiteSettingsPreview() {
    const settings = getSiteSettings();
    preview.innerHTML = `
      <p><strong>Hero headline:</strong> ${settings.heroTitle}</p>
      <p><strong>Hero subtitle:</strong> ${settings.heroSubtitle}</p>
      <p><strong>Hero card 1:</strong> ${settings.heroCard1Text}</p>
      <p><strong>Hero card 2:</strong> ${settings.heroCard2Text}</p>
      <p><strong>About card 1:</strong> ${settings.aboutCard1Text}</p>
      <p><strong>About card 2:</strong> ${settings.aboutCard2Text}</p>
      <p><strong>Interact Club:</strong> ${settings.club1Desc}</p>
      <p><strong>Paramount Club:</strong> ${settings.club2Desc}</p>
      <p><strong>Peer Educators:</strong> ${settings.club3Desc}</p>
    `;
  }

  populateForm();
}

function setupContactRegisterForm() {
  const form = document.getElementById('adminContactRegisterForm');
  const preview = document.getElementById('adminContactRegisterPreview');
  const message = document.getElementById('adminContactRegisterMessage');
  if (!form || !preview) return;

  const inputs = {
    siteContactHeadline: document.getElementById('siteContactHeadline'),
    siteContactEmail: document.getElementById('siteContactEmail'),
    siteContactPhone: document.getElementById('siteContactPhone'),
    siteRegisterHeadline: document.getElementById('siteRegisterHeadline'),
    siteRegisterDescription: document.getElementById('siteRegisterDescription'),
    siteRegisterHint: document.getElementById('siteRegisterHint')
  };

  function populateForm() {
    const settings = getSiteSettings();
    inputs.siteContactHeadline.value = settings.contactHeadline || SITE_SETTINGS_DEFAULTS.contactHeadline;
    inputs.siteContactEmail.value = settings.contactEmail || SITE_SETTINGS_DEFAULTS.contactEmail;
    inputs.siteContactPhone.value = settings.contactPhone || SITE_SETTINGS_DEFAULTS.contactPhone;
    inputs.siteRegisterHeadline.value = settings.registerHeadline || SITE_SETTINGS_DEFAULTS.registerHeadline;
    inputs.siteRegisterDescription.value = settings.registerDescription || SITE_SETTINGS_DEFAULTS.registerDescription;
    inputs.siteRegisterHint.value = settings.registerHint || SITE_SETTINGS_DEFAULTS.registerHint;
    preview.innerHTML = `
      <p><strong>Contact headline:</strong> ${settings.contactHeadline}</p>
      <p><strong>Contact email:</strong> ${settings.contactEmail}</p>
      <p><strong>Contact phone:</strong> ${settings.contactPhone}</p>
      <p><strong>Register headline:</strong> ${settings.registerHeadline}</p>
      <p><strong>Register description:</strong> ${settings.registerDescription}</p>
      <p><strong>Register hint:</strong> ${settings.registerHint}</p>
    `;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const settings = getSiteSettings();
    const newSettings = {
      ...settings,
      contactHeadline: inputs.siteContactHeadline.value.trim() || SITE_SETTINGS_DEFAULTS.contactHeadline,
      contactEmail: inputs.siteContactEmail.value.trim() || SITE_SETTINGS_DEFAULTS.contactEmail,
      contactPhone: inputs.siteContactPhone.value.trim() || SITE_SETTINGS_DEFAULTS.contactPhone,
      registerHeadline: inputs.siteRegisterHeadline.value.trim() || SITE_SETTINGS_DEFAULTS.registerHeadline,
      registerDescription: inputs.siteRegisterDescription.value.trim() || SITE_SETTINGS_DEFAULTS.registerDescription,
      registerHint: inputs.siteRegisterHint.value.trim() || SITE_SETTINGS_DEFAULTS.registerHint
    };
    saveSiteSettings(newSettings);
    applySiteSettings();
    renderSiteSettingsPreview();
    renderAdminInsights();
    recordActivity('Updated contact and registration content settings.');
    if (message) {
      message.textContent = 'Contact and registration settings saved successfully.';
      message.classList.remove('error');
      message.classList.add('success');
    }
  });

  populateForm();
}


function setCurrentUser(user) {
  if (!user) {
    localStorage.removeItem(STORAGE_KEYS.currentUser);
    return;
  }
  saveStorage(STORAGE_KEYS.currentUser, user);
}

function getCurrentUser() {
  return loadStorage(STORAGE_KEYS.currentUser, null);
}

function isAuthorized(requiredRole) {
  const currentUser = getCurrentUser();
  if (!currentUser) return false;
  return currentUser.access.includes('admin') || currentUser.access.includes(requiredRole);
}

function setupAuthorization() {
  const currentUser = getCurrentUser();
  const pageName = window.location.pathname.split('/').pop();
  const requiredRole = pageAccess[pageName];
  if (!requiredRole) return;

  if (!isAuthorized(requiredRole)) {
    const main = document.querySelector('main');
    if (main) {
      main.innerHTML = `
        <section class="section-block">
          <div class="section-header">
            <p class="eyebrow">Access denied</p>
            <h2>Sign in with the correct account to continue.</h2>
            <p class="hint">You can return to the <a href="login.html">login page</a> to sign in.</p>
          </div>
        </section>
      `;
    }
    return;
  }

  if (pageName === 'admin.html') {
    const greeting = document.createElement('p');
    greeting.className = 'hint';
    greeting.textContent = `Signed in as ${currentUser.role}.`;
    const header = document.querySelector('.section-block .section-header');
    if (header) {
      header.appendChild(greeting);
    }
  }

  showClubManagerPanel();
}

function hideAdminLinksForStudents() {
  const currentUser = getCurrentUser();
  if (currentUser && Array.isArray(currentUser.access) && currentUser.access.includes('admin')) {
    return;
  }
  document.querySelectorAll('.site-nav a[href="admin.html"]').forEach((link) => link.remove());
}

function setupNavigation() {
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      siteNav.classList.toggle('open');
    });
  }

  const navLinks = Array.from(document.querySelectorAll('.site-nav a'));
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach((link) => {
    if (!link.hash) {
      const linkPath = new URL(link.href, window.location.href).pathname.split('/').pop();
      if (linkPath === currentPath) {
        link.classList.add('active');
      }
    }

    link.addEventListener('click', () => {
      if (siteNav && siteNav.classList.contains('open')) {
        siteNav.classList.remove('open');
      }
    });
  });

  const sectionLinks = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'));
  const sections = sectionLinks.map((link) => document.querySelector(link.hash)).filter(Boolean);
  if (sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const navLink = document.querySelector(`.site-nav a[href="#${entry.target.id}"]`);
          if (!navLink) return;
          if (entry.isIntersecting) {
            sectionLinks.forEach((link) => link.classList.remove('active'));
            navLink.classList.add('active');
          }
        });
      },
      { threshold: 0.55 }
    );
    sections.forEach((section) => observer.observe(section));
  }
}

function setupCommentForm() {
  if (!commentForm || !commentText) return;
  commentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = commentText.value.trim();
    if (!value) return;
    const comments = getStoredComments();
    comments.unshift({
      id: `comment-${Date.now()}`,
      text: value,
      author: 'Guest',
      role: 'Learner',
      status: 'pending',
      page: CURRENT_PAGE,
      likes: 0,
      online: true,
      createdAt: Date.now()
    });
    updateCommentsStorage(comments);
    commentText.value = '';
    showFormMessage(document.getElementById('commentMessage'), 'Comment submitted for review. Approved comments will appear shortly.', 'success');
    recordActivity(`Comment posted for review on ${CURRENT_PAGE}`);
    renderModerationPanel();
    renderAdminInsights();
  });
}

function setupContactForm() {
  if (!contactForm) return;
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessageInput').value.trim();
    if (!name || !email || !message) {
      showFormMessage(contactFormMessage, 'Please complete all fields before sending.', 'error');
      return;
    }
    showFormMessage(contactFormMessage, 'Message sent successfully! Our team will reply soon.', 'success');
    contactForm.reset();
  });
}

function setupNewsletterForm() {
  if (!newsletterForm) return;
  newsletterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('newsletterEmail').value.trim();
    if (!email) {
      showFormMessage(newsletterMessage, 'Please enter a valid email address.', 'error');
      return;
    }
    const subscriptions = loadStorage(STORAGE_KEYS.newsletter, []);
    if (subscriptions.includes(email)) {
      showFormMessage(newsletterMessage, 'You are already subscribed with this email.', 'error');
      return;
    }
    subscriptions.push(email);
    saveStorage(STORAGE_KEYS.newsletter, subscriptions);
    showFormMessage(newsletterMessage, 'Subscription successful! You will receive updates soon.', 'success');
    recordActivity(`Newsletter signup: ${email}`);
    renderAdminInsights();
    newsletterForm.reset();
  });
}

function setupLoginForm() {
  if (!loginForm) return;
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value.trim().toLowerCase();
    const password = document.getElementById('password').value;
    const user = credentials[username];
    if (!user || user.password !== password) {
      showFormMessage(loginMessage, 'Invalid username or password. Please try again.', 'error');
      return;
    }
    setCurrentUser({ username, role: user.role, redirect: user.redirect, access: user.access });
    showFormMessage(loginMessage, `Welcome ${user.role}! Redirecting...`, 'success');
    recordActivity(`User logged in: ${username} (${user.role})`);
    renderAdminInsights();
    setTimeout(() => {
      window.location.href = user.redirect;
    }, 700);
  });

  if (logoutButton) {
    const currentUser = getCurrentUser();
    if (currentUser) {
      logoutButton.classList.remove('hidden');
      showFormMessage(loginMessage, `Signed in as ${currentUser.role}.`, 'success');
    }
    logoutButton.addEventListener('click', () => {
      setCurrentUser(null);
      window.location.reload();
    });
  }
}

function loadNewsFeed() {
  const newsFeed = document.getElementById('newsFeed');
  if (!newsFeed) return;
  const newsItems = getStoredNewsItems();
  renderNewsCards(newsItems, newsFeed);
}

function renderNewsCards(items, container) {
  if (!container) return;
  if (!items.length) {
    container.innerHTML = '<p class="hint">No news items are available right now.</p>';
    return;
  }
  container.innerHTML = items
    .map((item) => `
      <article class="news-card">
        <span class="tag ${item.tagColor}">${item.category}</span>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </article>
    `)
    .join('');
}

function renderGalleryGrid() {
  const galleryGrid = document.getElementById('galleryGrid');
  if (!galleryGrid) return;
  const items = getStoredGalleryItems();
  if (!items.length) {
    galleryGrid.innerHTML = '<p class="hint">No gallery items have been added yet.</p>';
    return;
  }
  galleryGrid.innerHTML = items
    .map((item) => `
      <div class="gallery-item" data-caption="${item.caption}" data-image="${item.image}">
        <img src="${item.image}" alt="${item.caption}" loading="lazy" />
        <div class="gallery-caption">${item.caption}</div>
      </div>
    `)
    .join('');
}

function activateLightbox() {
  if (!lightboxModal) return;
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const src = item.dataset.image || item.querySelector('img')?.src;
      const caption = item.dataset.caption || item.querySelector('.gallery-caption')?.textContent || '';
      if (lightboxImage && src) {
        lightboxImage.src = src;
        lightboxImage.alt = caption;
      }
      if (lightboxCaption) {
        lightboxCaption.textContent = caption;
      }
      lightboxModal.classList.remove('hidden');
      lightboxModal.setAttribute('aria-hidden', 'false');
    });
  });

  const closeModal = () => {
    lightboxModal.classList.add('hidden');
    lightboxModal.setAttribute('aria-hidden', 'true');
    if (lightboxImage) {
      lightboxImage.src = '';
      lightboxImage.alt = '';
    }
  };

  lightboxClose?.addEventListener('click', closeModal);
  lightboxModal.addEventListener('click', (event) => {
    if (event.target === lightboxModal) {
      closeModal();
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !lightboxModal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

function setupModerationActions() {
  if (!moderationPanel) return;
  moderationPanel.addEventListener('click', (event) => {
    const button = event.target.closest('.comment-action');
    if (!button) return;
    const action = button.dataset.action;
    const card = button.closest('.comment-card');
    if (!card) return;
    const commentId = card.dataset.commentId;
    const comments = getStoredComments();
    const index = comments.findIndex((item) => item.id === commentId);
    if (index === -1) return;

    if (action === 'approve') {
      comments[index].status = 'approved';
      recordActivity(`Comment approved: ${comments[index].text.slice(0, 60)}`);
    }
    if (action === 'remove') {
      comments[index].status = 'removed';
      recordActivity(`Comment removed: ${comments[index].text.slice(0, 60)}`);
    }
    updateCommentsStorage(comments);
    renderModerationPanel();
    renderPublicComments();
    renderAdminInsights();
  });
}

function renderAllVisible() {
  renderPublicComments();
  renderModerationPanel();
  renderAdminInsights();
  renderClubAnnouncements();
  renderClubEvents();
  renderClubUploads();
  renderNewsCards(getStoredNewsItems(), document.getElementById('newsFeed'));
  renderGalleryGrid();
  renderAdminNewsList();
  renderAdminEventsList();
  renderAdminClubBackgrounds();
  applyClubPageBackground();
  applySiteSettings();
  setupAdminGalleryList?.();
}

function setupInstantRerenderOnStorageChanges() {
  const relevantKeys = [
    STORAGE_KEYS.comments,
    STORAGE_KEYS.commentsLikeMap,
    STORAGE_KEYS.newsItems,
    STORAGE_KEYS.clubEvents,
    STORAGE_KEYS.clubAnnouncements,
    STORAGE_KEYS.clubUploads,
    STORAGE_KEYS.clubBackgrounds,
    STORAGE_KEYS.galleryItems,
    STORAGE_KEYS.siteSettings,
    STORAGE_KEYS.activityLog,
    STORAGE_KEYS.siteViews,
    STORAGE_KEYS.registrations,
    STORAGE_KEYS.newsletter
  ];

  // Works across tabs/windows of the same browser.
  window.addEventListener('storage', (event) => {
    if (!event?.key) return;
    if (!relevantKeys.includes(event.key)) return;
    renderAllVisible();
  });

  // Best-effort cross-tab broadcast so changes feel instant.
  // Note: this does not work across different devices.
  try {
    const channel = new BroadcastChannel('logahs_site_updates');
    channel.addEventListener('message', (msg) => {
      if (!msg?.data?.type) return;
      if (msg.data.type !== 'site_changed') return;
      renderAllVisible();
    });
    return channel;
  } catch (_) {
    return null;
  }
}

function broadcastSiteChanged(channel) {
  // Immediate local re-render (current tab).
  renderAllVisible();

  // Notify other tabs/windows.
  try {
    if (channel) {
      channel.postMessage({ type: 'site_changed', at: Date.now() });
    } else {
      // Fallback: bump a ping key so `storage` event fires in other tabs.
      const pingKey = '__logahs_site_changed_ping__';
      localStorage.setItem(pingKey, String(Date.now()));
      // clean up after a moment (optional; harmless if left)
      setTimeout(() => {
        try {
          localStorage.removeItem(pingKey);
        } catch (_) {}
      }, 1000);
    }
  } catch (_) {
    // ignore
  }
}



function init() {
  incrementPageView();
  applySiteSettings();
  setupNavigation();
  hideAdminLinksForStudents();
  setupAuthorization();
  setupCommentForm();
  setupCommentReactions();
  setupContactForm();
  setupNewsletterForm();
  setupRegistrationForm();
  setupSchedulerForm();
  setupClubAnnouncementForm();
  setupClubUploadForm();
  setupClubManagementActions();
  setupClubEventActions();
  setupCalendarControls();
  setupLoginForm();
  setupSiteSettingsForm();
  setupContactRegisterForm();
  renderPublicComments();
  renderModerationPanel();
  renderClubEvents();
  loadNewsFeed();
  renderGalleryGrid();
  setupAdminNewsForm();
  setupAdminNewsActions();
  renderAdminNewsList();
  setupAdminEventForm();
  setupAdminEventActions();
  renderAdminEventsList();
  setupAdminClubBackgroundForm();
  setupAdminClubBackgroundActions();
  renderAdminClubBackgrounds();
  setupAdminGalleryForm();
  setupAdminGalleryActions();
  renderAdminGalleryList();
  renderAdminInsights();
  applyClubPageBackground();
  activateLightbox();
  setupModerationActions();
  setupInstantRerenderOnStorageChanges();

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
    });
  }
}

document.addEventListener('DOMContentLoaded', init);


