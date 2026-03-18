/**
 * Coursid API Client
 * ==================
 * Connects to your external Course Generator application.
 * Configure API_BASE_URL to point at your backend.
 *
 * Your Course Generator app should expose:
 *   POST /api/courses          → publish a new course
 *   PUT  /api/courses/:id      → update a course
 *   GET  /api/courses          → list all courses
 *   GET  /api/courses/:id      → get single course
 *   POST /api/courses/:id/lessons  → add lesson
 *   PUT  /api/courses/:id/lessons/:lessonId → update lesson
 *   DELETE /api/courses/:id    → unpublish
 *
 * Webhook: POST /webhook/course-updated (from your generator to this platform)
 */

const CoursidAPI = (() => {

  /* ─── Configuration ─── */
  const CONFIG = {
    API_BASE_URL:   window.__COURSID_API_URL__ || 'https://api.coursid.com/v1',
    API_KEY:        window.__COURSID_API_KEY__  || '',
    TIMEOUT_MS:     15000,
    CACHE_TTL_MS:   5 * 60 * 1000,   // 5 minutes
    USE_MOCK:       true,             // set false when real API ready
  };

  /* ─── Cache ─── */
  const cache = new Map();

  function cacheSet(key, data) {
    cache.set(key, { data, ts: Date.now() });
    try { localStorage.setItem(`coursid_cache_${key}`, JSON.stringify({ data, ts: Date.now() })); } catch(_) {}
  }

  function cacheGet(key) {
    let entry = cache.get(key);
    if (!entry) {
      try {
        const raw = localStorage.getItem(`coursid_cache_${key}`);
        if (raw) entry = JSON.parse(raw);
      } catch(_) {}
    }
    if (!entry) return null;
    if (Date.now() - entry.ts > CONFIG.CACHE_TTL_MS) return null;
    return entry.data;
  }

  /* ─── HTTP Helper ─── */
  async function request(method, path, body = null) {
    if (CONFIG.USE_MOCK) return mockHandler(method, path, body);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), CONFIG.TIMEOUT_MS);

    try {
      const res = await fetch(CONFIG.API_BASE_URL + path, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${CONFIG.API_KEY}`,
          'X-Platform': 'coursid-web',
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timer);

      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: res.statusText }));
        throw new APIError(err.message || 'Request failed', res.status);
      }

      return await res.json();
    } catch (err) {
      clearTimeout(timer);
      if (err.name === 'AbortError') throw new APIError('Request timed out', 408);
      throw err;
    }
  }

  /* ─── Custom Error ─── */
  class APIError extends Error {
    constructor(message, status) {
      super(message);
      this.name = 'APIError';
      this.status = status;
    }
  }

  /* ─── Public API ─── */

  /** Get paginated course list */
  async function getCourses(params = {}) {
    const qs = new URLSearchParams({
      page:     params.page     || 1,
      limit:    params.limit    || 20,
      category: params.category || '',
      level:    params.level    || '',
      sort:     params.sort     || 'popular',
      q:        params.q        || '',
      free:     params.free     || '',
    }).toString();

    const cacheKey = `courses_${qs}`;
    const cached = cacheGet(cacheKey);
    if (cached) return cached;

    const data = await request('GET', `/courses?${qs}`);
    cacheSet(cacheKey, data);
    return data;
  }

  /** Get single course by ID or slug */
  async function getCourse(idOrSlug) {
    const cacheKey = `course_${idOrSlug}`;
    const cached = cacheGet(cacheKey);
    if (cached) return cached;

    const data = await request('GET', `/courses/${idOrSlug}`);
    cacheSet(cacheKey, data);
    return data;
  }

  /** Get featured / hero courses */
  async function getFeaturedCourses() {
    const cached = cacheGet('featured');
    if (cached) return cached;
    const data = await request('GET', '/courses/featured');
    cacheSet('featured', data);
    return data;
  }

  /** Get all categories */
  async function getCategories() {
    const cached = cacheGet('categories');
    if (cached) return cached;
    const data = await request('GET', '/categories');
    cacheSet('categories', data);
    return data;
  }

  /** Enroll current user in a course */
  async function enrollCourse(courseId, paymentToken = null) {
    return request('POST', `/courses/${courseId}/enroll`, { paymentToken });
  }

  /** Get lessons for enrolled course */
  async function getLessons(courseId) {
    const cacheKey = `lessons_${courseId}`;
    const cached = cacheGet(cacheKey);
    if (cached) return cached;
    const data = await request('GET', `/courses/${courseId}/lessons`);
    cacheSet(cacheKey, data);
    return data;
  }

  /** Mark a lesson as complete */
  async function completeLesson(courseId, lessonId) {
    const user = Auth.getUser();
    if (!user) return;
    const progress = JSON.parse(localStorage.getItem('coursid_progress') || '{}');
    if (!progress[courseId]) progress[courseId] = {};
    progress[courseId][lessonId] = { completedAt: new Date().toISOString() };
    localStorage.setItem('coursid_progress', JSON.stringify(progress));
    return { success: true };
  }

  /** Get user's progress for a course */
  function getCourseProgress(courseId, totalLessons) {
    const progress = JSON.parse(localStorage.getItem('coursid_progress') || '{}');
    const courseProg = progress[courseId] || {};
    const completed = Object.keys(courseProg).length;
    return { completed, total: totalLessons, pct: totalLessons ? Math.round((completed / totalLessons) * 100) : 0 };
  }

  /** Search courses */
  async function searchCourses(query) {
    return getCourses({ q: query });
  }

  /** Publish a course from external generator */
  async function publishCourse(courseData) {
    const data = await request('POST', '/courses', courseData);
    cache.clear(); // invalidate all course caches
    return data;
  }

  /** Update an existing course */
  async function updateCourse(courseId, updates) {
    const data = await request('PUT', `/courses/${courseId}`, updates);
    cache.delete(`course_${courseId}`);
    return data;
  }

  /** Configure API (called from your integration setup) */
  function configure(options) {
    if (options.apiUrl) CONFIG.API_BASE_URL = options.apiUrl;
    if (options.apiKey) CONFIG.API_KEY      = options.apiKey;
    if ('useMock' in options) CONFIG.USE_MOCK = options.useMock;
  }

  /* ─── Mock Data Handler ─── */
  function mockHandler(method, path, body) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (path.startsWith('/courses/featured')) {
          resolve({ courses: MockData.COURSES.slice(0, 8) });
        } else if (path.match(/^\/courses\/[^/]+\/lessons/)) {
          const id = path.split('/')[2];
          const course = MockData.COURSES.find(c => c.id === id || c.slug === id);
          resolve({ lessons: course ? course.sections.flatMap(s => s.lectures) : [] });
        } else if (path.match(/^\/courses\/[^/]+$/)) {
          const id = path.split('/')[2];
          const course = MockData.COURSES.find(c => c.id === id || c.slug === id);
          resolve(course || { error: 'Not found' });
        } else if (path.startsWith('/courses')) {
          const params = Object.fromEntries(new URLSearchParams(path.split('?')[1] || ''));
          let courses = [...MockData.COURSES];
          if (params.category && params.category !== 'all') {
            courses = courses.filter(c => c.category.toLowerCase() === params.category.toLowerCase());
          }
          if (params.q) {
            const q = params.q.toLowerCase();
            courses = courses.filter(c => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q));
          }
          if (params.level) courses = courses.filter(c => c.level === params.level);
          if (params.free === 'true') courses = courses.filter(c => c.price === 0);
          resolve({ courses, total: courses.length, page: 1, limit: 20 });
        } else if (path.startsWith('/categories')) {
          resolve({ categories: MockData.CATEGORIES });
        } else if (path.endsWith('/enroll')) {
          const courseId = path.split('/')[2];
          const enrolled = JSON.parse(localStorage.getItem('coursid_enrolled') || '[]');
          if (!enrolled.includes(courseId)) enrolled.push(courseId);
          localStorage.setItem('coursid_enrolled', JSON.stringify(enrolled));
          resolve({ success: true, message: 'Enrolled successfully' });
        } else {
          resolve({});
        }
      }, 300 + Math.random() * 400);
    });
  }

  return {
    configure,
    getCourses,
    getCourse,
    getFeaturedCourses,
    getCategories,
    enrollCourse,
    getLessons,
    completeLesson,
    getCourseProgress,
    searchCourses,
    publishCourse,
    updateCourse,
    APIError,
  };

})();

/* =====================================================
   AUTH MODULE
   ===================================================== */

const Auth = (() => {

  const STORAGE_KEY = 'coursid_user';

  function getUser() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch { return null; }
  }

  function setUser(user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    document.dispatchEvent(new CustomEvent('auth:change', { detail: { user } }));
  }

  function isLoggedIn() { return !!getUser(); }

  function login(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Demo user + any real account stored at signup
        const stored = localStorage.getItem(`coursid_account_${email}`);
        let user = null;

        if (email === 'demo@coursid.com' && password === 'demo123') {
          user = { id: 'demo', name: 'Alex Johnson', email, avatar: '', plan: 'pro', joined: '2024-01-01' };
        } else if (stored) {
          const account = JSON.parse(stored);
          if (account.password === password) {
            user = { id: account.id, name: account.name, email: account.email, avatar: '', plan: 'free', joined: account.joined };
          }
        }

        if (user) {
          setUser(user);
          resolve(user);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 600);
    });
  }

  function signup(name, email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (localStorage.getItem(`coursid_account_${email}`)) {
          reject(new Error('An account with this email already exists'));
          return;
        }
        const user = {
          id: 'u_' + Date.now(),
          name, email,
          password,  // in real app: never store plaintext
          plan: 'free',
          joined: new Date().toISOString().split('T')[0],
        };
        localStorage.setItem(`coursid_account_${email}`, JSON.stringify(user));
        const sessionUser = { ...user };
        delete sessionUser.password;
        setUser(sessionUser);
        resolve(sessionUser);
      }, 700);
    });
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY);
    document.dispatchEvent(new CustomEvent('auth:change', { detail: { user: null } }));
  }

  function getEnrolledCourses() {
    return JSON.parse(localStorage.getItem('coursid_enrolled') || '[]');
  }

  function isEnrolled(courseId) {
    return getEnrolledCourses().includes(courseId);
  }

  return { getUser, isLoggedIn, login, signup, logout, getEnrolledCourses, isEnrolled };

})();

/* =====================================================
   CART MODULE
   ===================================================== */

const Cart = (() => {

  const KEY = 'coursid_cart';

  function getItems() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; }
  }

  function save(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
    document.dispatchEvent(new CustomEvent('cart:change', { detail: { count: items.length } }));
  }

  function addItem(course) {
    const items = getItems();
    if (items.find(i => i.id === course.id)) return false;
    items.push({ id: course.id, title: course.title, price: course.price, instructor: course.instructor?.name, thumb: course.thumbnail });
    save(items);
    return true;
  }

  function removeItem(courseId) {
    save(getItems().filter(i => i.id !== courseId));
  }

  function hasItem(courseId) {
    return getItems().some(i => i.id === courseId);
  }

  function getCount() { return getItems().length; }

  function getTotal() {
    return getItems().reduce((sum, i) => sum + (i.price || 0), 0);
  }

  function clear() { save([]); }

  return { getItems, addItem, removeItem, hasItem, getCount, getTotal, clear };

})();

/* =====================================================
   UI UTILITIES
   ===================================================== */

const UI = (() => {

  function toast(message, type = 'default', duration = 3500) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const t = document.createElement('div');
    t.className = `toast toast-${type}`;

    const icons = {
      success: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20,6 9,17 4,12"/></svg>`,
      error:   `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
      default: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
    };

    t.innerHTML = (icons[type] || icons.default) + `<span>${message}</span>`;
    container.appendChild(t);

    setTimeout(() => {
      t.style.animation = 'toastOut 0.3s ease forwards';
      setTimeout(() => t.remove(), 300);
    }, duration);
  }

  function confirm(message) {
    return window.confirm(message);
  }

  function formatPrice(price, currency = 'USD') {
    if (price === 0) return 'Free';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(price);
  }

  function formatNumber(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return n.toLocaleString();
  }

  function stars(rating, max = 5) {
    let html = '<span class="stars">';
    for (let i = 1; i <= max; i++) {
      const filled = i <= Math.round(rating);
      html += `<svg class="star" viewBox="0 0 24 24" fill="${filled ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.5">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
      </svg>`;
    }
    return html + '</span>';
  }

  function levelBadge(level) {
    const map = { beginner: 'green', intermediate: 'yellow', advanced: 'red', all: 'purple' };
    const color = map[level] || 'gray';
    return `<span class="badge badge-${color}" style="text-transform:capitalize">${level}</span>`;
  }

  function renderCourseCard(course) {
    const price = course.price === 0
      ? `<span class="price-free">Free</span>`
      : `<span class="price-current">${formatPrice(course.price)}</span>
         ${course.originalPrice ? `<span class="price-original">${formatPrice(course.originalPrice)}</span>` : ''}`;

    return `
      <div class="course-card" onclick="window.location='course.html?id=${course.id}'">
        <img class="course-card-thumb" src="${course.thumbnail || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIyNSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZThlOWViIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJJbnRlciIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzZhNmY3MyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNvdXJzZSBUaHVtYm5haWw8L3RleHQ+PC9zdmc+'}" alt="${course.title}" loading="lazy">
        <div class="course-card-body">
          <div class="course-card-title">${course.title}</div>
          <div class="course-card-instructor">${course.instructor?.name || 'Instructor'}</div>
          <div class="star-row">
            <span class="star-score">${(course.rating || 0).toFixed(1)}</span>
            ${stars(course.rating || 0)}
            <span class="star-count">(${formatNumber(course.ratingsCount || 0)})</span>
          </div>
          <div class="course-card-price">${price}</div>
          ${course.bestseller ? '<div class="mt-4"><span class="badge badge-yellow">Bestseller</span></div>' : ''}
        </div>
      </div>
    `;
  }

  function setCartBadge(count) {
    const badge = document.getElementById('cart-badge');
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  }

  return { toast, confirm, formatPrice, formatNumber, stars, levelBadge, renderCourseCard, setCartBadge };

})();

/* =====================================================
   NAV UTILS (shared across pages)
   ===================================================== */

function initNav() {
  // Cart badge
  UI.setCartBadge(Cart.getCount());
  document.addEventListener('cart:change', (e) => UI.setCartBadge(e.detail.count));

  // User avatar / login link
  const user = Auth.getUser();
  const userArea = document.getElementById('nav-user-area');
  if (userArea) {
    if (user) {
      userArea.innerHTML = `
        <a href="dashboard.html" class="btn btn-outline-black btn-sm">My Learning</a>
        <div style="width:36px;height:36px;border-radius:50%;background:#a435f0;color:#fff;font-weight:700;font-size:14px;display:flex;align-items:center;justify-content:center;cursor:pointer;" onclick="window.location='dashboard.html'">
          ${user.name.charAt(0).toUpperCase()}
        </div>
      `;
    } else {
      userArea.innerHTML = `
        <a href="login.html" class="btn btn-outline-black btn-sm">Log in</a>
        <a href="signup.html" class="btn btn-black btn-sm">Sign up</a>
      `;
    }
  }

  // Search
  const searchForm = document.getElementById('nav-search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = document.getElementById('nav-search-input')?.value?.trim();
      if (q) window.location = `catalog.html?q=${encodeURIComponent(q)}`;
    });
  }
}
