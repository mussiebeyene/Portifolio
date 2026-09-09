const app = document.getElementById("app");
const avatarBtn = document.getElementById("avatarBtn");
const backBtn = document.getElementById("backBtn");
const tree = document.getElementById("tree");
const page = document.getElementById("page");
const socials = document.getElementById("socials");
const nameEl = document.getElementById("name");
const roleEl = document.getElementById("role");

const views = new Set(["landing", "menu", "about", "resume", "projects"]);

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

function render(view) {
  app.className = view === "landing" || view === "menu" ? `view-${view}` : `view-${view} view-page`;

  const onMenu = view === "menu";
  const onPage = view === "about" || view === "resume" || view === "projects";

  setHidden(tree, !onMenu);
  setHidden(socials, view === "landing");
  setHidden(backBtn, !onPage);
  setHidden(page, !onPage);

  avatarBtn.setAttribute("aria-label", view === "landing" ? "Open menu" : "Back to home");

  if (onMenu) {
    requestAnimationFrame(drawTree);
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

tree.querySelectorAll("[data-view]").forEach((button) => {
  button.addEventListener("click", () => go(button.dataset.view));
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  const view = currentView();
  if (view === "menu") go("landing");
  if (view === "about" || view === "resume" || view === "projects") go("menu");
});

window.addEventListener("hashchange", () => render(currentView()));

fillChrome();
render(currentView());
