const app = document.getElementById("app");
const avatarBtn = document.getElementById("avatarBtn");
const backBtn = document.getElementById("backBtn");
const tree = document.getElementById("tree");
const page = document.getElementById("page");
const socials = document.getElementById("socials");
const nameEl = document.getElementById("name");
const roleEl = document.getElementById("role");
const now = document.getElementById("now");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

const views = new Set(["landing", "menu", "about", "resume", "projects"]);

let tiktokIndex = 0;
let commitCache = null;
let typewriterTimer = null;

const NOW_HEADING = "What I am currently working on";

const STACK_COLORS = [
  { bg: "#ffe08a", border: "#c9a227" },
  { bg: "#9ad7ff", border: "#3a8fc4" },
  { bg: "#b8f2c8", border: "#3d9a5f" },
  { bg: "#ffc2d4", border: "#d45a7a" },
  { bg: "#e0c8ff", border: "#8a5cc8" },
  { bg: "#ffd4a8", border: "#d47a2c" },
];

function stackColors(count) {
  const palette = STACK_COLORS.slice();
  for (let i = palette.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [palette[i], palette[j]] = [palette[j], palette[i]];
  }
  return Array.from({ length: count }, (_, i) => palette[i % palette.length]);
}

function currentView() {
  const hash = (location.hash || "#/").replace(/^#\/?/, "");
  if (!hash) return "landing";
  if (views.has(hash)) return hash;
  return "landing";
}

function go(view) {
  const next = views.has(view) ? view : "landing";
  const target = next === "landing" ? "#/" : `#/${next}`;
  if (location.hash === target || (next === "landing" && !location.hash)) {
    render(next);
    return;
  }
  location.hash = target;
}

function setHidden(el, hidden) {
  el.hidden = hidden;
}

function drawTree() {
  tree.querySelectorAll(".tree-path").forEach((path, i) => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
    path.style.transition = "none";
    path.getBoundingClientRect();
    path.style.transition = `stroke-dashoffset 0.7s ease ${0.35 + i * 0.08}s`;
    path.style.strokeDashoffset = "0";
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function aboutHtml() {
  return `
    <h1 class="page-title">ABOUT ME</h1>
    <p class="section-label">Overview</p>
    <p class="overview">${escapeHtml(content.about.overview)}</p>
    <div class="hobbies">
      <div>
        <p class="section-label">MY HOBBIES</p>
        <p class="hobbies-copy">${escapeHtml(content.about.hobbies)}</p>
      </div>
      <div class="hobby-photos">
        ${content.about.media
          .map((item, i) =>
            item.type === "video"
              ? `<video src="${escapeHtml(item.src)}" muted loop playsinline autoplay preload="metadata" aria-label="Hobby video ${i + 1}"></video>`
              : `<img src="${escapeHtml(item.src)}" alt="Hobby photo ${i + 1}" />`
          )
          .join("")}
      </div>
    </div>
  `;
}

function resumeHtml() {
  const src = encodeURI(content.resume.file);
  return `
    <h1 class="page-title">RESUME</h1>
    <div class="resume-wrap">
      <a class="download" href="${src}" download="Mussie-Beyene-Resume.pdf">Download</a>
      <iframe
        class="resume-pdf"
        src="${src}#toolbar=0&navpanes=0&scrollbar=0"
        title="Mussie Beyene resume"
      ></iframe>
      <a class="resume-preview" href="${src}" target="_blank" rel="noopener noreferrer">
        <img src="${escapeHtml(content.resume.preview)}" alt="First page of Mussie Beyene's resume" />
        <span>Tap to open full PDF</span>
      </a>
    </div>
  `;
}

function projectsHtml() {
  const cards = content.projects
    .map(
      (project) => `
        <article class="card">
          ${
            project.video
              ? `<video class="card-media" src="${escapeHtml(project.video)}" muted loop playsinline autoplay preload="metadata" aria-label="${escapeHtml(project.title)} preview"></video>`
              : `<img class="card-media" src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)} preview" />`
          }
          <div class="card-body">
            <h3>${escapeHtml(project.title)}</h3>
            <p>${escapeHtml(project.summary)}</p>
            <ul class="card-stack">
              ${(project.stack || [])
                .map((tech) => `<li>${escapeHtml(tech)}</li>`)
                .join("")}
            </ul>
            <div class="card-actions">
              <a href="${escapeHtml(project.demo)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(project.title)} live demo">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6h-2V7.4l-7.3 7.3-1.4-1.4L16.6 6H14V4ZM5 6h6v2H7v10h10v-4h2v6H5V6Z"/></svg>
              </a>
              <a href="${escapeHtml(project.code)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(project.title)} source code">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.7 16.3 4.4 12l4.3-4.3 1.4 1.4L7.2 12l2.9 2.9-1.4 1.4Zm6.6 0-1.4-1.4 2.9-2.9-2.9-2.9 1.4-1.4 4.3 4.3-4.3 4.3Z"/></svg>
              </a>
            </div>
          </div>
        </article>`
    )
    .join("");

  return `
    <h1 class="page-title">MY WORK</h1>
    <div class="work-grid">${cards}</div>
  `;
}

function relativeTime(value) {
  // Date-only strings parse as UTC, which reads a day off in western zones.
  const local = /^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T00:00:00` : value;
  const then = new Date(local);
  if (Number.isNaN(then.getTime())) return "";
  const days = Math.round((Date.now() - then.getTime()) / 86400000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days} days ago`;
  const months = Math.round(days / 30);
  if (months < 12) return `${months} mo ago`;
  return `${Math.round(months / 12)} yr ago`;
}

function tiktokId(url) {
  // Photo posts (slideshows) use /photo/ but embed under the same id.
  const match = String(url).match(/\/(?:video|photo)\/(\d+)/);
  return match ? match[1] : "";
}

function lockHtml() {
  const milestones = content.current.milestones || [];
  const done = milestones.filter((m) => m.done).length;
  const total = milestones.length;
  const pct = total ? done / total : 0;
  const bodyTop = 60;
  const bodyHeight = 80;
  const fillHeight = bodyHeight * pct;
  const unlocked = total > 0 && done === total;

  return `
    <div class="lock-wrap">
      <svg class="lock ${unlocked ? "is-unlocked" : ""}" viewBox="0 0 120 150" role="img"
           aria-label="${done} of ${total} milestones complete">
        <defs>
          <clipPath id="lockBodyClip">
            <rect x="20" y="${bodyTop}" width="80" height="${bodyHeight}" rx="12" />
          </clipPath>
        </defs>
        <path class="lock-shackle" d="M42 ${bodyTop} V42 a18 18 0 0 1 36 0 V${bodyTop}" />
        <rect class="lock-fill" x="20" y="${bodyTop + bodyHeight - fillHeight}"
              width="80" height="${fillHeight}" clip-path="url(#lockBodyClip)" />
        <rect class="lock-body" x="20" y="${bodyTop}" width="80" height="${bodyHeight}" rx="12" />
        <circle class="lock-keyhole" cx="60" cy="94" r="7" />
        <path class="lock-keyhole" d="M60 101 V112" />
      </svg>
      <p class="lock-count">${done} / ${total}</p>
      <ul class="lock-list">
        ${milestones
          .map(
            (m) =>
              `<li class="${m.done ? "is-done" : ""}">${escapeHtml(m.label)}</li>`
          )
          .join("")}
      </ul>
    </div>
  `;
}

function tiktokHtml() {
  const posts = content.current.tiktoks || [];

  if (!posts.length) {
    return `
      <div class="tiktok">
        <p class="tiktok-day">DAY —</p>
        <div class="tiktok-frame is-empty">
          <p>Add TikTok links in<br /><code>js/content.js</code></p>
        </div>
        <p class="tiktok-caption">Watch day in the life on TikTok</p>
      </div>
    `;
  }

  const index = Math.min(tiktokIndex, posts.length - 1);
  const post = posts[index];
  const id = tiktokId(post.url);
  const day = post.day ?? index + 1;

  return `
    <div class="tiktok">
      <p class="tiktok-day">DAY ${escapeHtml(day)}</p>
      <div class="tiktok-frame">
        ${
          id
            ? `<iframe src="https://www.tiktok.com/embed/v2/${id}" title="Day ${escapeHtml(day)} TikTok"
                 allow="encrypted-media; fullscreen" loading="lazy"></iframe>`
            : `<p class="tiktok-bad">Couldn't read that TikTok URL. Use the full post link ending in /video/&lt;id&gt; or /photo/&lt;id&gt;.</p>`
        }
      </div>
      <div class="tiktok-row">
        <button type="button" data-tiktok="prev" aria-label="Previous day"
          ${posts.length < 2 ? "disabled" : ""}>&#9664;</button>
        <span class="tiktok-count">${index + 1} / ${posts.length}</span>
        <button type="button" data-tiktok="next" aria-label="Next day"
          ${posts.length < 2 ? "disabled" : ""}>&#9654;</button>
      </div>
      <a class="tiktok-caption" href="${escapeHtml(post.url)}" target="_blank" rel="noopener noreferrer">
        Watch day in the life on TikTok
      </a>
    </div>
  `;
}

function journalHtml() {
  const entries = content.current.journal || [];
  if (!entries.length) return "";

  const cards = entries
    .map(
      (entry) => `
        <article class="journal-entry">
          <p class="journal-date">${escapeHtml(entry.date)} · ${escapeHtml(relativeTime(entry.date))}</p>
          <h4>${escapeHtml(entry.title)}</h4>
          <p class="journal-text">${escapeHtml(entry.text)}</p>
        </article>`
    )
    .join("");

  return `
    <section class="journal">
      <h3 class="progress-heading">Daily Journal</h3>
      <div class="journal-grid">${cards}</div>
    </section>
  `;
}

function feedEntryHtml(entry) {
  const when = relativeTime(entry.date);

  if (entry.type === "commit") {
    return `
      <li class="feed-item">
        <a class="feed-sha" href="${escapeHtml(entry.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(entry.sha)}</a>
        <p class="feed-text">${escapeHtml(entry.text)}</p>
        <span class="feed-when">${escapeHtml(when)}</span>
      </li>
    `;
  }

  return `
    <li class="feed-item is-note">
      <span class="feed-sha">note</span>
      <p class="feed-text">${escapeHtml(entry.text)}</p>
      <span class="feed-when">${escapeHtml(when)}</span>
    </li>
  `;
}

function noteEntries() {
  return (content.current.notes || []).map((note) => ({
    type: "note",
    date: note.date,
    text: note.text,
  }));
}

function renderFeed(entries, message) {
  const list = now.querySelector(".feed-list");
  const status = now.querySelector(".feed-status");
  if (!list) return;

  list.innerHTML = entries.map(feedEntryHtml).join("");
  if (status) status.textContent = message || "";
}

async function loadFeed() {
  const repo = content.current.repo;
  const notes = noteEntries();

  if (commitCache) {
    renderFeed(
      [...commitCache, ...notes].sort((a, b) => new Date(b.date) - new Date(a.date)),
      ""
    );
    return;
  }

  renderFeed(notes, "Loading commits…");

  try {
    const response = await fetch(
      `https://api.github.com/repos/${repo}/commits?per_page=20`,
      { headers: { Accept: "application/vnd.github+json" } }
    );

    // A repo with no commits yet answers 409, which isn't a failure.
    if (response.status === 409) {
      commitCache = [];
      renderFeed(notes, "No commits pushed yet.");
      return;
    }

    if (!response.ok) throw new Error(`GitHub returned ${response.status}`);

    const data = await response.json();
    commitCache = data.map((item) => ({
      type: "commit",
      date: item.commit.author.date,
      text: item.commit.message.split("\n")[0],
      sha: item.sha.slice(0, 7),
      url: item.html_url,
    }));

    if (currentView() !== "menu") return;
    renderFeed(
      [...commitCache, ...notes].sort((a, b) => new Date(b.date) - new Date(a.date)),
      ""
    );
  } catch (error) {
    if (currentView() !== "menu") return;
    renderFeed(notes, `Commits unavailable (${error.message}).`);
  }
}

function nowHtml() {
  const project = content.current;
  const repoUrl = project.repo ? `https://github.com/${project.repo}` : "";
  const title = escapeHtml(project.title);
  const colors = stackColors((project.stack || []).length);

  return `
    <h2 class="now-heading" aria-label="${escapeHtml(NOW_HEADING)}">
      <span class="now-heading-ghost" aria-hidden="true">${escapeHtml(NOW_HEADING)}</span>
      <span class="now-heading-typed" aria-hidden="true">
        <span class="now-heading-text"></span><span class="now-heading-caret"></span>
      </span>
    </h2>
    <h3 class="now-title">${
      repoUrl
        ? `<a href="${escapeHtml(repoUrl)}" target="_blank" rel="noopener noreferrer">${title}</a>`
        : title
    }</h3>

    <div class="now-body">
      <div class="now-left">
        <div class="bracket now-overview">
          <p class="section-label">Overview</p>
          <p>${escapeHtml(project.overview)}</p>
          ${
            (project.features || []).length
              ? `<p class="section-label">Features</p>
                 <ul class="now-features">
                   ${project.features
                     .map((item) => `<li>${escapeHtml(item)}</li>`)
                     .join("")}
                 </ul>`
              : ""
          }
          ${
            (project.stack || []).length
              ? `<ul class="card-stack now-stack">
                   ${project.stack
                     .map((tech, i) => {
                       const color = colors[i];
                       return `<li style="background:${color.bg};border-color:${color.border}">${escapeHtml(tech)}</li>`;
                     })
                     .join("")}
                 </ul>`
              : ""
          }
        </div>
        <h3 class="progress-heading">Progress</h3>
        <div class="feed">
          <p class="section-label">Feed</p>
          <ol class="feed-list"></ol>
          <p class="feed-status"></p>
        </div>
        ${journalHtml()}
      </div>
      <aside class="now-right">
        <div class="now-sketches">
          ${(project.sketches || [])
            .map(
              (sketch) => `
                <figure class="bracket now-sketch">
                  <button type="button" class="sketch-open" data-sketch="${escapeHtml(sketch.src)}"
                          aria-label="Enlarge ${escapeHtml(sketch.caption)}">
                    <img src="${escapeHtml(sketch.src)}" alt="${escapeHtml(sketch.caption)}" />
                  </button>
                  <figcaption>${escapeHtml(sketch.caption)} — click to enlarge</figcaption>
                </figure>`
            )
            .join("")}
        </div>
        ${lockHtml()}
        ${tiktokHtml()}
      </aside>
    </div>
  `;
}

function stopTypewriter() {
  if (typewriterTimer) {
    clearTimeout(typewriterTimer);
    typewriterTimer = null;
  }
}

function startTypewriter() {
  stopTypewriter();
  const textEl = now.querySelector(".now-heading-text");
  if (!textEl) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    textEl.textContent = NOW_HEADING;
    return;
  }

  let i = 0;
  textEl.textContent = "";

  const tick = () => {
    i += 1;
    textEl.textContent = NOW_HEADING.slice(0, i);
    if (i < NOW_HEADING.length) {
      typewriterTimer = setTimeout(tick, 48);
    } else {
      typewriterTimer = null;
    }
  };

  typewriterTimer = setTimeout(tick, 320);
}

function renderNow() {
  now.innerHTML = nowHtml();
  startTypewriter();
  loadFeed();
}

function render(view) {
  app.className = view === "landing" || view === "menu" ? `view-${view}` : `view-${view} view-page`;

  const onMenu = view === "menu";
  const onPage = view === "about" || view === "resume" || view === "projects";

  setHidden(tree, !onMenu);
  setHidden(now, !onMenu);
  setHidden(socials, view === "landing");
  setHidden(backBtn, !onPage);
  setHidden(page, !onPage);

  avatarBtn.setAttribute("aria-label", view === "landing" ? "Open menu" : "Back to home");

  window.scrollTo(0, 0);

  if (onMenu) {
    requestAnimationFrame(drawTree);
    renderNow();
  } else {
    stopTypewriter();
    now.innerHTML = "";
  }

  if (view === "about") page.innerHTML = aboutHtml();
  if (view === "resume") page.innerHTML = resumeHtml();
  if (view === "projects") page.innerHTML = projectsHtml();
  if (!onPage) page.innerHTML = "";
}

function fillChrome() {
  const avatar = document.querySelector(".avatar");
  avatar.src = content.avatar;
  avatar.alt = content.name;
  nameEl.innerHTML = `${escapeHtml(content.name)}<span class="caret" aria-hidden="true"></span>`;
  roleEl.textContent = content.role;
  roleEl.lang = "am";
  document.querySelector(".click-hint").textContent = window.matchMedia(
    "(hover: none)"
  ).matches
    ? "tap"
    : "click";
  document.title = content.name;
  document.getElementById("githubLink").href = content.social.github;
  document.getElementById("linkedinLink").href = content.social.linkedin;
  document.getElementById("emailLink").href = `mailto:${content.social.email}`;
}

avatarBtn.addEventListener("click", () => {
  const view = currentView();
  if (view === "landing") go("menu");
  else go("landing");
});

backBtn.addEventListener("click", () => go("menu"));

document.getElementById("lightboxClose").addEventListener("click", closeLightbox);

tree.querySelectorAll("[data-view]").forEach((button) => {
  button.addEventListener("click", () => go(button.dataset.view));
});

function openLightbox(src, alt) {
  lightboxImg.src = src;
  lightboxImg.alt = alt;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.hidden = true;
  lightboxImg.removeAttribute("src");
  document.body.style.overflow = "";
}

now.addEventListener("click", (event) => {
  const sketch = event.target.closest("[data-sketch]");
  if (sketch) {
    openLightbox(sketch.dataset.sketch, sketch.querySelector("img").alt);
    return;
  }

  const button = event.target.closest("[data-tiktok]");
  if (!button) return;

  const total = (content.current.tiktoks || []).length;
  if (!total) return;

  const step = button.dataset.tiktok === "next" ? 1 : -1;
  tiktokIndex = (tiktokIndex + step + total) % total;

  const carousel = now.querySelector(".tiktok");
  if (carousel) carousel.outerHTML = tiktokHtml();
});

lightbox.addEventListener("click", (event) => {
  if (event.target === lightboxImg) return;
  closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  if (!lightbox.hidden) {
    closeLightbox();
    return;
  }

  const view = currentView();
  if (view === "menu") go("landing");
  if (view === "about" || view === "resume" || view === "projects") go("menu");
});

window.addEventListener("hashchange", () => render(currentView()));

fillChrome();
render(currentView());
