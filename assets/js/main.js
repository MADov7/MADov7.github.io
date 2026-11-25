import * as THREE from "three";
import { DATA } from "./data.js?v=3";

const { gsap, ScrollTrigger, Lenis } = window;
gsap.registerPlugin(ScrollTrigger);
const html = document.documentElement;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const mobile = () => innerWidth < 760;

/* ================= strings ================= */
const STR = {
  ar: {
    "name.short": "سعود الكبان", "name.alt": "Soud Alkabban",
    "nav.patent": "براءة الاختراع", "nav.certs": "الشهادات", "nav.exp": "الخبرة", "nav.projects": "المشاريع", "nav.contact": "تواصل",
    "ui.langBtn": "EN", "ui.verify": "تحقق من الشهادة ↗", "ui.copy": "نسخ", "ui.copied": "تم ✓", "ui.all": "الكل",
    "ui.live": "الموقع شغّال ↗", "ui.private": "الكود خاص", "ui.view": "اضغط للعرض",
    "hero.lead": "مهندس كمبيوتر في وزارة الداخلية، أدير خوادم ويندوز وأبني أنظمة لعمليات الأمن. أتعلّم بالبناء: أدوات أمن سيبراني ومواقع حقيقية، ومشروع تخرجي مسجّل في ألمانيا كنموذج منفعة (براءة اختراع).",
    "hero.s1": "شهادة وإنجاز", "hero.s2": "مشاريع", "hero.s3": "براءة اختراع ألمانية (نموذج منفعة)",
    "hero.cta1": "تواصل معي", "hero.cta2": "شوف الشهادات",
    "patent.title": "براءة اختراع ألمانية (نموذج منفعة)",
    "patent.invention": "نظام مراقبة سلامة الفواكه والخضروات في الوقت الفعلي",
    "patent.text": "مشروع تخرجي في الجامعة الأمريكية في الشرق الأوسط (AUM) مع فريق من خمسة، مسجّل لدى مكتب براءات الاختراع والعلامات التجارية الألماني (DPMA) كنموذج منفعة (Gebrauchsmuster) بتاريخ 29 أبريل 2025.",
    "patent.view": "شوف الشهادة", "patent.verify": "تحقق في Google Patents ↗",
    "pcat.cyber": "أمن سيبراني", "pcat.web": "ويب", "pcat.sysadmin": "أنظمة وشبكات",
    "featured.title": "أبرز الشهادات",
    "certs.title": "كل الشهادات", "certs.text": "اضغط على أي شهادة عشان تشوفها كاملة، مع رابط التحقق الرسمي إذا موجود.",
    "certs.count": "{n} من {t}",
    "exp.title": "الخبرة والدراسة",
    "projects.title": "المشاريع", "projects.text": "أدوات أمن سيبراني ومواقع حقيقية، بنيتها بنفسي.",
    "skills.title": "المهارات",
    "contact.title": 'خلنا <span class="acc">نتكلم</span>', "contact.email": "الإيميل", "contact.phone": "التلفون",
    "footer": "سعود الكبان",
    "lb.kind": "النوع", "lb.issuer": "الجهة", "lb.date": "التاريخ", "lb.hours": "المدة", "lb.instructor": "المدرّب", "lb.id": "رقم الشهادة", "lb.hoursUnit": "ساعة", "lb.cat": "التصنيف",
    "status.in-development": "قيد التطوير", "status.maintained": "مستمر", "status.completed": "مكتمل", "status.experimental": "تجريبي",
  },
  en: {
    "name.short": "Soud Alkabban", "name.alt": "سعود الكبان",
    "nav.patent": "Patent", "nav.certs": "Certificates", "nav.exp": "Experience", "nav.projects": "Projects", "nav.contact": "Contact",
    "ui.langBtn": "ع", "ui.verify": "Verify certificate ↗", "ui.copy": "Copy", "ui.copied": "Copied ✓", "ui.all": "All",
    "ui.live": "Live site ↗", "ui.private": "Private code", "ui.view": "Click to view",
    "hero.lead": "Computer engineer at Kuwait's Ministry of Interior, administering Windows Server and building security-operations software. I learn by building: cybersecurity tools, real websites, and a graduation project registered as a German utility model.",
    "hero.s1": "certificates & achievements", "hero.s2": "projects", "hero.s3": "German utility model",
    "hero.cta1": "Contact me", "hero.cta2": "View certificates",
    "patent.title": "German Utility Model",
    "patent.invention": "Real-time safety monitoring system for fruit and vegetables",
    "patent.text": "My graduation project at the American University of the Middle East (AUM), built with a team of five and registered with the German Patent and Trade Mark Office (DPMA) as a utility model (Gebrauchsmuster) on 29 April 2025.",
    "patent.view": "View certificate", "patent.verify": "Verify on Google Patents ↗",
    "pcat.cyber": "Cybersecurity", "pcat.web": "Web", "pcat.sysadmin": "Systems & networks",
    "featured.title": "Featured certificates",
    "certs.title": "All certificates", "certs.text": "Click any certificate to see it in full, with the official verification link where one exists.",
    "certs.count": "{n} of {t}",
    "exp.title": "Experience & education",
    "projects.title": "Projects", "projects.text": "Cybersecurity tools and real websites I built myself.",
    "skills.title": "Skills",
    "contact.title": 'Let’s <span class="acc">talk</span>', "contact.email": "Email", "contact.phone": "Phone",
    "footer": "Soud Alkabban",
    "lb.kind": "Type", "lb.issuer": "Issuer", "lb.date": "Date", "lb.hours": "Length", "lb.instructor": "Instructor", "lb.id": "Credential ID", "lb.hoursUnit": "hours", "lb.cat": "Category",
    "status.in-development": "In development", "status.maintained": "Maintained", "status.completed": "Completed", "status.experimental": "Experimental",
  },
};
let lang = html.lang === "en" ? "en" : "ar";
const t = (k) => STR[lang][k] ?? k;
const L = (o) => (o == null ? "" : typeof o === "string" ? o : o[lang] ?? o.en ?? o.ar ?? "");

/* ================= experience (from CV) ================= */
const EXP = [
  { when: { ar: "أكتوبر 2025 – الآن", en: "Oct 2025 – Present" }, title: { ar: "مدير خوادم ويندوز ومطوّر تطبيقات", en: "Windows Server Administrator & Application Developer" }, org: { ar: "وزارة الداخلية، الكويت", en: "Ministry of Interior (MOI), Kuwait" },
    pts: [
      { ar: "بنيت MOI Portal: منصّة Python لعمليات الأمن على شبكة مختبر معزولة، تجمع مراقبة الشبكة (اكتشاف تلقائي، حسّاسات متعددة، سجل SQLite، تنبيهات) مع SIEM وDFIR وIDS/IPS وكشف مربوط بـ MITRE ATT&CK.", en: "Built MOI Portal, a dependency-free Python security-operations platform for an isolated lab network: PRTG-style monitoring (auto-discovery, multi-sensor polling, SQLite history, alerting) combined with SIEM, DFIR, IDS/IPS and MITRE ATT&CK detection." },
      { ar: "وسّعت اكتشاف الأجهزة لأكثر من 500 جهاز بـ 120 فحص متزامن (حوالي 4 ثواني لكل مسح لـ 508 أجهزة)، مع 174 اختبار وحدة، وسلّمته كتطبيق سطح مكتب ولوحة ويب.", en: "Scaled host discovery to 500+ hosts with 120 concurrent probes (about 4 seconds per 508-host sweep); validated with a 174-test unit suite and delivered as a desktop app and web dashboard." },
      { ar: "أطوّر تطبيقات سطح مكتب وويب تدعم عمليات الأمن والمراقبة، وأدير بنية خوادم Windows Server.", en: "Develop desktop and web applications for security operations and monitoring, and administer Windows Server infrastructure." },
    ] },
  { when: { ar: "يونيو – يوليو 2025", en: "Jun – Jul 2025" }, title: { ar: "متدرّب في قسم تقنية المعلومات", en: "IT Department Intern" }, org: { ar: "الخطوط الجوية الكويتية", en: "Kuwait Airways" },
    pts: [
      { ar: "بنيت تطبيق ويب لإدارة المهام بصلاحيات (مدير، مدير إدارة، موظف، مطوّر) مع استرجاع كلمة المرور بـ OTP على الإيميل وسجل نشاط، بـ HTML وCSS وJavaScript وPHP وSQLite.", en: "Built a role-based task management web app (admin, director, employee and developer roles) with OTP email password recovery and activity logging, on HTML, CSS, JavaScript, PHP and SQLite." },
      { ar: "أضفت المرفقات والبحث والفلاتر والإجراءات الجماعية وتنبيهات المواعيد والتصدير CSV/JSON مع فريق تقنية المعلومات.", en: "Added file attachments, search and filters, bulk actions, deadline alerts and CSV/JSON export with the IT team." },
    ] },
  { when: { ar: "7 يناير – 1 فبراير 2024", en: "7 Jan – 1 Feb 2024" }, title: { ar: "متدرّب", en: "Student Trainee" }, org: { ar: "بنك الكويت الوطني (NBK)", en: "National Bank of Kuwait (NBK)" },
    pts: [{ ar: "ساعدت العملاء في الاستفسارات والمعاملات وخدمات الحسابات في فرع هدية.", en: "Assisted customers with inquiries, transactions and account services at the Hadiya branch." }] },
  { when: { ar: "2020 – 2025", en: "2020 – 2025" }, title: { ar: "بكالوريوس هندسة الكمبيوتر", en: "B.Sc. Computer Engineering" }, org: { ar: "الجامعة الأمريكية في الشرق الأوسط (AUM)", en: "American University of the Middle East (AUM)" },
    pts: [{ ar: "مشروع التخرج مسجّل لدى مكتب براءات الاختراع والعلامات التجارية الألماني (DPMA)، رقم 20 2025 102 127، أبريل 2025.", en: "Graduation project registered with the German Patent and Trade Mark Office (DPMA), No. 20 2025 102 127, April 2025." }] },
];

/* ================= helpers ================= */
// certificates with their own image first (newest first inside each group)
const CERTS = [...DATA.certificates].sort((a, b) => (b.images.length ? 1 : 0) - (a.images.length ? 1 : 0));
const FEAT = CERTS.filter((c) => c.featured != null && c.images.length).sort((a, b) => a.featured - b.featured);
const ICON = {
  cyber: '<path d="M12 2 4 5v6c0 5 3.4 9.3 8 11 4.6-1.7 8-6 8-11V5z"/><path d="m9 12 2 2 4-4"/>',
  sys: '<rect x="3" y="4" width="18" height="7" rx="1.5"/><rect x="3" y="13" width="18" height="7" rx="1.5"/><path d="M7 7.5h.01M7 16.5h.01"/>',
  ai: '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>',
  dev: '<path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 4l-4 16"/>',
  net: '<circle cx="12" cy="5" r="2.5"/><circle cx="5" cy="19" r="2.5"/><circle cx="19" cy="19" r="2.5"/><path d="M12 7.5v4M12 11.5 6.5 17M12 11.5l5.5 5.5"/>',
  fin: '<circle cx="12" cy="12" r="9"/><path d="M15 9.5c-.6-1-1.7-1.5-3-1.5-1.7 0-3 .9-3 2.2 0 3 6 1.6 6 4.6 0 1.3-1.3 2.2-3 2.2-1.4 0-2.6-.6-3.1-1.6M12 6v2M12 16v2"/>',
  intern: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',
  acad: '<path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11v5c3 2 9 2 12 0v-5"/>',
};
const icon = (c) => `<svg viewBox="0 0 24 24" width="46" height="46" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${ICON[c] || ICON.cyber}</svg>`;
function art(c) {
  if (c.group === "skillsoft") {
    const short = c.title.replace(/^(CompTIA Cybersecurity Analyst\+|CompTIA Network\+|Certified in Cybersecurity \(CC\)):\s*/, "");
    const prog = c.title.match(/^(CompTIA Cybersecurity Analyst\+|CompTIA Network\+|Certified in Cybersecurity \(CC\))/)?.[1] || "";
    return `<div class="badge" dir="ltr"><div><b>skillsoft</b>${esc(prog.replace("CompTIA Cybersecurity Analyst+", "CompTIA CySA+"))}<br>${esc(short)}</div></div>`;
  }
  return `<div class="art-ic acc">${icon(c.cat)}</div>`;
}
const certTitle = (c) => (lang === "ar" && c.titleAr ? c.titleAr : c.title);
const certMeta = (c) => [c.issuer ? L(c.issuer) : "", c.date ? L(c.date) : ""].filter(Boolean).join(" · ");

/* ================= render ================= */
let filter = "all", visible = [];
function renderStatic() {
  html.lang = lang; html.dir = lang === "ar" ? "rtl" : "ltr";
  document.title = lang === "ar" ? "سعود الكبان · Portfolio" : "Soud Alkabban · Portfolio";
  $$("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
  const words = lang === "ar" ? ["سعود", "الكبان"] : ["Soud", "Alkabban"];
  $("#heroName").innerHTML = words.map((w) => `<span class="w"><span class="glow">${w}</span></span>`).join(" ");
  $("#contactTitle").innerHTML = t("contact.title");
  $("#statCerts").dataset.to = CERTS.length; $("#statProjects").dataset.to = DATA.projects.length;
  if (countsDone) { $("#statCerts").textContent = CERTS.length; $("#statProjects").textContent = DATA.projects.length; $$(".count[data-to='1']").forEach((e) => (e.textContent = 1)); }
}
function renderFilters() {
  const counts = {}; CERTS.forEach((c) => (counts[c.cat] = (counts[c.cat] || 0) + 1));
  const btn = (k, label, n) => `<button class="chipbtn" type="button" data-f="${k}" aria-pressed="${filter === k}">${esc(label)}<small>${n}</small></button>`;
  $("#filters").innerHTML = btn("all", t("ui.all"), CERTS.length) + Object.entries(DATA.categories).filter(([k]) => counts[k]).map(([k, v]) => btn(k, L(v), counts[k])).join("");
}
function renderCerts() {
  visible = CERTS.filter((c) => filter === "all" || c.cat === filter);
  $("#cgrid").innerHTML = visible.map((c, i) => {
    const img = c.images[0];
    return `<button class="cert rv" type="button" data-i="${i}" aria-label="${esc(certTitle(c))}">
      <div class="ph ${img ? "" : "art"}">${img ? `<img src="${img.thumb}" alt="" loading="lazy" decoding="async">` : art(c)}</div>
      ${c.verify ? `<span class="vf mono">✓ VERIFY</span>` : ""}
      <div class="body"><h3>${esc(certTitle(c))}</h3>${lang === "ar" && c.titleAr ? `<div class="ar">${esc(c.title)}</div>` : ""}<div class="meta">${esc(certMeta(c))}</div></div>
    </button>`;
  }).join("");
  $("#countNote").textContent = t("certs.count").replace("{n}", visible.length).replace("{t}", CERTS.length);
  observe($$("#cgrid .rv"));
}
function renderTimeline() {
  $("#timeline").innerHTML = EXP.map((e) => `<article class="tl-item rv"><div class="when mono">${esc(L(e.when))}</div><h3>${esc(L(e.title))}</h3><div class="org">${esc(L(e.org))}</div><ul>${e.pts.map((p) => `<li>${esc(L(p))}</li>`).join("")}</ul></article>`).join("");
  observe($$("#timeline .rv"));
}
let pfilter = "all";
function renderPFilters() {
  const counts = {}; DATA.projects.forEach((p) => (counts[p.category] = (counts[p.category] || 0) + 1));
  const btn = (k, label, n) => `<button class="chipbtn" type="button" data-f="${k}" aria-pressed="${pfilter === k}">${esc(label)}<small>${n}</small></button>`;
  $("#pfilters").innerHTML = btn("all", t("ui.all"), DATA.projects.length) + ["cyber", "web", "sysadmin"].filter((k) => counts[k]).map((k) => btn(k, t("pcat." + k), counts[k])).join("");
}
function renderProjects() {
  renderPFilters();
  const ps = [...DATA.projects].filter((p) => pfilter === "all" || p.category === pfilter).sort((a, b) => (b.demo ? 1 : 0) - (a.demo ? 1 : 0) || (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  $("#pgrid").innerHTML = ps.map((p, i) => `<article class="card rv">
    <div class="top"><span class="num mono">${String(i + 1).padStart(2, "0")} · ${esc(t("status." + p.status))}</span>${p.demo ? `<a class="live mono" href="${esc(p.demo)}" target="_blank" rel="noopener"><i></i>${esc(t("ui.live"))}</a>` : `<span class="priv">${esc(t("ui.private"))}</span>`}</div>
    <h3>${esc(L(p.name))}</h3><div class="sub">${esc(L(p.subtitle))}</div>
    <p>${esc(L(p.summary))}</p>
    <ul>${(p.features || []).slice(0, 3).map((f) => `<li>${esc(L(f))}</li>`).join("")}</ul>
    <div class="tags">${(p.tech || []).map((x) => `<span>${esc(x)}</span>`).join("")}</div>
  </article>`).join("");
  observe($$("#pgrid .rv")); bindTilt();
}
function renderSkills() {
  $("#sgrid").innerHTML = DATA.skills.map((g) => `<div class="sgroup rv"><h3>${esc(L(g.name))}</h3><div class="chips">${g.items.map((it) => `<span>${esc(it.name)}</span>`).join("")}</div></div>`).join("");
  observe($$("#sgrid .rv"));
}
function renderDots() { $("#dots").innerHTML = FEAT.map((c, i) => `<button type="button" role="tab" data-k="${i}" class="${i === capIdx ? "on" : ""}" aria-selected="${i === capIdx}" aria-label="${esc(certTitle(c))}"></button>`).join(""); }
function renderAll() { renderStatic(); renderFilters(); renderCerts(); renderTimeline(); renderProjects(); renderSkills(); renderDots(); setCaption(capIdx, true); }

/* reveal on scroll (dynamic content) */
const io = new IntersectionObserver((ents) => ents.forEach((e) => {
  if (!e.isIntersecting) return;
  const el = e.target; io.unobserve(el);
  const d = (+el.dataset.k || 0) * 0.06;
  gsap.fromTo(el, { opacity: 0, y: 70, rotateX: -16 }, { opacity: 1, y: 0, rotateX: 0, duration: 0.9, delay: d, ease: "power3.out", clearProps: "opacity,transform" });
}), { rootMargin: "0px 0px -8% 0px" });
function observe(els) { els.forEach((el, k) => { el.dataset.k = k % 4; if (reduce) return; el.style.opacity = 0; io.observe(el); }); }

/* 3D tilt on project cards */
function bindTilt() {
  if (matchMedia("(hover: none)").matches) return;
  $$(".card").forEach((c) => {
    c.addEventListener("pointermove", (e) => { const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      c.style.setProperty("--mx", x * 100 + "%"); c.style.setProperty("--my", y * 100 + "%");
      gsap.to(c, { rotateY: (x - 0.5) * 12, rotateX: (0.5 - y) * 10, duration: 0.5, ease: "power2.out" }); });
    c.addEventListener("pointerleave", () => gsap.to(c, { rotateY: 0, rotateX: 0, duration: 0.8, ease: "elastic.out(1,.5)" }));
  });
}

/* ================= lightbox ================= */
let lbI = -1;
function openLB(i) {
  lbI = (i + visible.length) % visible.length; const c = visible[lbI];
  const imgs = [...c.images, ...(c.images.length ? [] : c.groupImages || [])];
  $("#lbImg").innerHTML = imgs.length ? `<img src="${imgs[0].src}" alt="${esc(c.title)}">` : `<div class="art">${art(c)}</div>`;
  const row = (k, v) => (v ? `<dt>${esc(t(k))}</dt><dd>${v}</dd>` : "");
  $("#lbInfo").innerHTML = `<div class="kicker mono">${String(lbI + 1).padStart(2, "0")} / ${visible.length}</div>
    <h3 id="lbTitle">${esc(certTitle(c))}</h3>${lang === "ar" && c.titleAr ? `<div class="ar" style="color:var(--muted)">${esc(c.title)}</div>` : ""}
    <dl>${row("lb.cat", esc(L(DATA.categories[c.cat])))}${row("lb.kind", esc(L(c.kind)))}${row("lb.issuer", c.issuer ? esc(L(c.issuer)) : "")}${row("lb.date", c.date ? esc(L(c.date)) : "")}
    ${row("lb.hours", c.hours ? `${c.hours} ${esc(t("lb.hoursUnit"))}` : "")}${row("lb.instructor", c.instructor ? `<bdi>${esc(c.instructor)}</bdi>` : "")}${row("lb.id", c.credentialId ? `<span class="mono" style="font-size:13px">${esc(c.credentialId)}</span>` : "")}</dl>
    ${c.verify ? `<a class="btn" style="margin-top:14px;align-self:flex-start" href="${esc(c.verify)}" target="_blank" rel="noopener">${esc(t("ui.verify"))}</a>` : ""}
    ${imgs.length > 1 ? `<div class="lb-extra">${imgs.map((m) => `<img src="${m.thumb}" data-src="${m.src}" alt="">`).join("")}</div>` : ""}`;
  $$(".lb-extra img").forEach((m) => m.addEventListener("click", () => ($("#lbImg img").src = m.dataset.src)));
  const lb = $("#lb"); lb.classList.remove("single");
  if (!lb.classList.contains("open")) { lb.classList.add("open"); lenis?.stop(); gsap.fromTo(".lb-panel", { y: 40, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: "power3.out" }); $("#lbClose").focus(); }
}
function closeLB() { $("#lb").classList.remove("open"); lenis?.start(); const b = $(`#cgrid [data-i="${lbI}"]`); b && b.focus({ preventScroll: true }); }
$("#cgrid").addEventListener("click", (e) => { const b = e.target.closest(".cert"); if (b) openLB(+b.dataset.i); });
$("#pfilters").addEventListener("click", (e) => { const b = e.target.closest(".chipbtn"); if (!b) return; pfilter = b.dataset.f; renderProjects(); ScrollTrigger.refresh(); });
function openPatent() {
  const p = DATA.patent; if (!p || !p.image) return;
  lbI = -1; const lb = $("#lb"); lb.classList.add("single");
  $("#lbImg").innerHTML = `<img src="${p.image.src}" alt="${esc(lang === "ar" ? p.titleAr : p.title)}">`;
  $("#lbInfo").innerHTML = `<div class="kicker mono">DPMA · GEBRAUCHSMUSTER</div>
    <h3 id="lbTitle">${esc(lang === "ar" ? p.titleAr : p.title)}</h3><div class="inv">${esc(L(p.invention))}</div>
    <dl><dt>${esc(t("lb.issuer"))}</dt><dd>${esc(lang === "ar" ? "مكتب براءات الاختراع والعلامات التجارية الألماني (DPMA)" : p.issuer)}</dd>
    <dt>${esc(t("lb.date"))}</dt><dd><bdi dir="ltr">29.04.2025</bdi></dd><dt>${esc(t("lb.id"))}</dt><dd class="mono" style="font-size:13px">${esc(p.credentialId)}</dd><dt>IPC</dt><dd class="mono" style="font-size:13px">${esc(p.ipc)}</dd></dl>
    <a class="btn" style="margin-top:14px;align-self:flex-start" href="${esc(p.verifyUrl)}" target="_blank" rel="noopener">${esc(t("patent.verify"))}</a>`;
  if (!lb.classList.contains("open")) { lb.classList.add("open"); lenis?.stop(); gsap.fromTo(".lb-panel", { y: 40, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: "power3.out" }); $("#lbClose").focus(); }
}
$("#patentView").addEventListener("click", openPatent);
$("#filters").addEventListener("click", (e) => { const b = e.target.closest(".chipbtn"); if (!b) return; filter = b.dataset.f; renderFilters(); renderCerts(); ScrollTrigger.refresh(); });
$("#lbClose").addEventListener("click", closeLB);
$("#lbPrev").addEventListener("click", () => openLB(lbI + (lang === "ar" ? 1 : -1)));
$("#lbNext").addEventListener("click", () => openLB(lbI + (lang === "ar" ? -1 : 1)));
$("#lb").addEventListener("click", (e) => { if (e.target.id === "lb") closeLB(); });
addEventListener("keydown", (e) => {
  if (!$("#lb").classList.contains("open")) return;
  if ($("#lb").classList.contains("single") && e.key !== "Escape") return;
  if (e.key === "Escape") closeLB();
  if (e.key === "ArrowLeft") openLB(lbI + (lang === "ar" ? 1 : -1));
  if (e.key === "ArrowRight") openLB(lbI + (lang === "ar" ? -1 : 1));
});

/* copy buttons */
document.addEventListener("click", (e) => {
  const b = e.target.closest(".copy"); if (!b) return;
  e.preventDefault(); e.stopPropagation();
  navigator.clipboard?.writeText(b.dataset.copy).then(() => { b.textContent = t("ui.copied"); setTimeout(() => (b.textContent = t("ui.copy")), 1600); });
});

/* ================= smooth scroll ================= */
let lenis = null;
if (!reduce) {
  lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((tm) => lenis.raf(tm * 1000));
  gsap.ticker.lagSmoothing(0);
}
$$('a[href^="#"]').forEach((a) => a.addEventListener("click", (e) => {
  const id = a.getAttribute("href"); if (id.length < 2) return; e.preventDefault();
  lenis ? lenis.scrollTo(id, { duration: 1.6 }) : $(id).scrollIntoView({ behavior: "smooth" });
}));

/* ================= three.js scene ================= */
const canvas = $("#gl");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x070b14, 0.06);
const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 100);
camera.position.set(0, 0, 9);

const core = new THREE.Group(); scene.add(core);
const matIco = new THREE.MeshBasicMaterial({ wireframe: true, transparent: true, opacity: 0.55 });
const matIco2 = new THREE.MeshBasicMaterial({ wireframe: true, transparent: true, opacity: 0.12 });
const ico = new THREE.Mesh(new THREE.IcosahedronGeometry(1.6, 1), matIco);
const ico2 = new THREE.Mesh(new THREE.IcosahedronGeometry(2.25, 2), matIco2);
const heartMat = new THREE.ShaderMaterial({
  transparent: true, uniforms: { t: { value: 0 }, c1: { value: new THREE.Color() }, c2: { value: new THREE.Color() } },
  vertexShader: "varying vec3 vN; void main(){ vN = normalize(normalMatrix*normal); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.); }",
  fragmentShader: "uniform float t; uniform vec3 c1; uniform vec3 c2; varying vec3 vN; void main(){ float f = pow(1. - abs(vN.z), 2.2); gl_FragColor = vec4(mix(c1, c2, f), .35 + f*.65 + .08*sin(t*3.)); }",
});
const heart = new THREE.Mesh(new THREE.SphereGeometry(0.62, 48, 48), heartMat);
const ringMats = [], rings = [];
for (let i = 0; i < 3; i++) {
  const m = new THREE.MeshBasicMaterial({ transparent: true, opacity: i === 1 ? 0.45 : 0.3 }); ringMats.push(m);
  const r = new THREE.Mesh(new THREE.TorusGeometry(2.9 + i * 0.45, 0.006, 8, 160), m);
  r.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0); rings.push(r); core.add(r);
}
core.add(ico, ico2, heart);

const P = mobile() ? 1300 : 2600;
const pg = new THREE.BufferGeometry(); const pos = new Float32Array(P * 3); const seed = new Float32Array(P);
for (let i = 0; i < P; i++) { const r = 4 + Math.random() * 18, th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1); pos.set([r * Math.sin(ph) * Math.cos(th), r * Math.sin(ph) * Math.sin(th) * 0.6, r * Math.cos(ph)], i * 3); seed[i] = Math.random(); }
pg.setAttribute("position", new THREE.BufferAttribute(pos, 3)); pg.setAttribute("seed", new THREE.BufferAttribute(seed, 1));
const pm = new THREE.ShaderMaterial({ transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  uniforms: { t: { value: 0 }, warm: { value: 0 }, cA: { value: new THREE.Color() }, cB: { value: new THREE.Color() }, alpha: { value: 0.8 } },
  vertexShader: "attribute float seed; uniform float t; varying float vS; void main(){ vS = seed; vec3 p = position; p.y += sin(t*.6 + seed*20.)*.25; vec4 mv = modelViewMatrix*vec4(p,1.); gl_PointSize = (1.5 + seed*2.5) * (14. / -mv.z); gl_Position = projectionMatrix*mv; }",
  fragmentShader: "uniform float warm; uniform vec3 cA; uniform vec3 cB; uniform float alpha; varying float vS; void main(){ float d = length(gl_PointCoord-.5); if(d>.5) discard; vec3 c = mix(cA, cB, step(.93, vS)*warm + step(.975, vS)); gl_FragColor = vec4(c, (1.-d*2.)*alpha); }" });
const points = new THREE.Points(pg, pm); scene.add(points);

// featured certificate ring
const NF = FEAT.length, R = mobile() ? 2.7 : 3.9;
const ring = new THREE.Group(); scene.add(ring);
const edgeMats = [];
const loader = new THREE.TextureLoader();
const cards = FEAT.map((c, i) => {
  const g = new THREE.Group(); const a = (i / NF) * Math.PI * 2;
  const mat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, side: THREE.DoubleSide, color: 0xffffff });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), mat);
  const em = new THREE.LineBasicMaterial({ transparent: true, opacity: 0 }); edgeMats.push(em);
  const edge = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.PlaneGeometry(1.03, 1.03)), em);
  g.add(mesh, edge); g.position.set(Math.sin(a) * R, 0, Math.cos(a) * R); g.rotation.y = a; ring.add(g);
  const im = c.images[0], asp = im.w / im.h, h = asp >= 1 ? 2.1 / asp : 2.2, w = asp >= 1 ? 2.1 : 2.2 * asp;
  mesh.scale.set(w, h, 1); edge.scale.set(w, h, 1);
  loader.load(im.src, (tx) => { tx.colorSpace = THREE.SRGBColorSpace; tx.anisotropy = renderer.capabilities.getMaxAnisotropy(); mat.map = tx; mat.needsUpdate = true; });
  return { g, mat, em, a };
});

function sceneTheme() {
  const light = html.dataset.theme === "light";
  const A = new THREE.Color(light ? 0x0b9c7b : 0x35f2c4), A2 = new THREE.Color(light ? 0x077a60 : 0x8af7da), RED = new THREE.Color(light ? 0xd42f47 : 0xff4d5e);
  matIco.color.copy(A); matIco2.color.copy(A2); ringMats.forEach((m, i) => m.color.copy(i === 1 ? RED : A));
  heartMat.uniforms.c1.value.set(light ? 0xbfeee2 : 0x0d5a4c); heartMat.uniforms.c2.value.copy(A);
  pm.uniforms.cA.value.copy(A); pm.uniforms.cB.value.copy(RED); pm.uniforms.alpha.value = light ? 0.55 : 0.8;
  pm.blending = light ? THREE.NormalBlending : THREE.AdditiveBlending; pm.needsUpdate = true;
  edgeMats.forEach((m) => m.color.copy(A));
  scene.fog.color.set(light ? 0xeef3f8 : 0x070b14);
  $('meta[name="theme-color"]').content = light ? "#eef3f8" : "#070b14";
}
sceneTheme();

/* scroll-linked state */
const S = { hero: 0, ringIn: 0, ringOut: 0, out: 0, mx: 0, my: 0 };
ScrollTrigger.create({ trigger: "#hero", start: "top top", end: "bottom top", scrub: true, onUpdate: (s) => (S.hero = s.progress) });
// the featured stage is CSS-sticky; the ring fades in as it arrives and out as it leaves
ScrollTrigger.create({ trigger: "#featured", start: "top 85%", end: "top top", scrub: true, onUpdate: (s) => (S.ringIn = s.progress) });
ScrollTrigger.create({ trigger: "#featured", start: "bottom bottom", end: "bottom 25%", scrub: true, onUpdate: (s) => (S.ringOut = s.progress) });
ScrollTrigger.create({ trigger: "#certificates", start: "top bottom", end: "top 35%", scrub: true, onUpdate: (s) => (S.out = s.progress) });
addEventListener("pointermove", (e) => { S.mx = e.clientX / innerWidth - 0.5; S.my = e.clientY / innerHeight - 0.5; });

let capIdx = 0;
function setCaption(i, force) {
  if (!FEAT.length || (i === capIdx && !force)) return;
  const first = force; capIdx = i; const c = FEAT[i];
  const apply = () => {
    $("#capIdx").textContent = String(i + 1).padStart(2, "0") + " / " + String(NF).padStart(2, "0");
    $("#capTitle").textContent = certTitle(c);
    $("#capSub").textContent = lang === "ar" && c.titleAr ? c.title : "";
    $("#capMeta").textContent = certMeta(c);
    const a = $("#capLink");
    if (c.verify) { a.href = c.verify; a.querySelector("span").textContent = t("ui.verify"); } else { a.removeAttribute("href"); a.querySelector("span").textContent = L(c.kind); }
    $$("#dots button").forEach((d, k) => { d.classList.toggle("on", k === i); d.setAttribute("aria-selected", k === i); });
  };
  if (first || reduce) return apply();
  const parts = ".caption > *:not(.cap-bar)";
  gsap.timeline().to(parts, { y: -10, opacity: 0, duration: 0.16, stagger: 0.03 }).add(apply)
    .fromTo(parts, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, stagger: 0.04, ease: "power3.out" });
}

/* featured ring: turns by itself, one certificate every AUTO seconds */
const STEP = (Math.PI * 2) / Math.max(1, NF), AUTO = 5;
let ringTarget = 0, autoAcc = 0, autoPaused = false;
function goTo(i) {
  if (NF < 2) return;
  const next = ((i % NF) + NF) % NF;
  let d = next - capIdx; if (d > NF / 2) d -= NF; if (d < -NF / 2) d += NF;
  autoAcc = 0; if (!d) return;
  ringTarget -= d * STEP; setCaption(next);
}
$("#dots").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) goTo(+b.dataset.k); });
$(".caption").addEventListener("pointerenter", () => (autoPaused = true));
$(".caption").addEventListener("pointerleave", () => (autoPaused = false));
const lbEl = $("#lb"), capBar = $("#capBar");

const clock = new THREE.Clock(); const lerp = (a, b, k) => a + (b - a) * k; const sm = { rx: 0, ry: 0 };
function frame() {
  const tm = clock.getElapsedTime(); const dt = Math.min(0.1, tm - (frame.last ?? tm)); frame.last = tm;
  const ringVis = S.ringIn * (1 - S.ringOut); const side = html.dir === "rtl" ? -1 : 1;
  if (ringVis > 0.5 && !autoPaused && !document.hidden && !lbEl.classList.contains("open")) { autoAcc += dt; if (autoAcc >= AUTO) goTo(capIdx + 1); }
  capBar.style.transform = `scaleX(${Math.min(1, autoAcc / AUTO)})`;
  pm.uniforms.t.value = tm; heartMat.uniforms.t.value = tm; pm.uniforms.warm.value = S.out;
  sm.rx = lerp(sm.rx, S.my * 0.35, 0.05); sm.ry = lerp(sm.ry, S.mx * 0.5, 0.05);
  ico.rotation.set(tm * 0.12 + sm.rx, tm * 0.18 + sm.ry, 0); ico2.rotation.set(-tm * 0.07, tm * 0.1, 0);
  rings.forEach((r, i) => { r.rotation.z += 0.002 * (i + 1); r.rotation.x += 0.001; });
  const away = Math.min(1, S.hero * 1.15);
  core.position.set(lerp(innerWidth > 900 ? 2.7 * side : 0, 0, away), lerp(0, 2.3, S.ringIn) - S.out, lerp(0, -1.5, away) + lerp(0, -5, S.ringIn));
  core.scale.setScalar(lerp(mobile() ? 0.75 : 1, 0.55, S.ringIn) * (1 + Math.sin(tm * 1.4) * 0.015));
  ring.rotation.y = lerp(ring.rotation.y, ringTarget, 0.045); ring.rotation.x = sm.rx * 0.3;
  ring.position.set(innerWidth > 900 ? 1.4 * side : 0, lerp(-0.9, mobile() ? -0.2 : -0.35, S.ringIn), 0); ring.scale.setScalar(lerp(0.55, 1, ringVis));
  cards.forEach((c) => { const f = Math.max(0, Math.cos(c.a + ring.rotation.y));
    c.mat.opacity = ringVis * (0.1 + 0.9 * Math.pow(f, 3)); c.em.opacity = ringVis * Math.pow(f, 6) * 0.9;
    c.g.position.y = Math.sin(tm * 0.8 + c.a * 3) * 0.06; });
  points.rotation.y = tm * 0.02 + S.hero * 0.6 + S.out * 1.4; points.rotation.x = sm.rx * 0.2;
  camera.position.x = lerp(camera.position.x, sm.ry * 0.8, 0.05); camera.position.y = lerp(camera.position.y, -sm.rx * 0.6, 0.05);
  camera.position.z = lerp(9, mobile() ? 12 : 11, S.ringIn) + S.out * 2; camera.lookAt(0, 0, 0);
  renderer.render(scene, camera);
}
gsap.ticker.add(frame);
addEventListener("resize", () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight); });

/* ================= static motion ================= */
let countsDone = false;
renderAll();
gsap.to(".progress", { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });
const tag = $("[data-scramble]"), finalTxt = tag.dataset.scramble, glyphs = "!<>-_\\/[]{}=+*^?#01";
if (reduce) tag.textContent = finalTxt; else { let n = 0; const id = setInterval(() => { n++; tag.textContent = finalTxt.split("").map((ch, i) => (i < n * 1.4 ? ch : ch === " " ? " " : glyphs[(Math.random() * glyphs.length) | 0])).join(""); if (n * 1.4 > finalTxt.length) clearInterval(id); }, 28); }
if (!reduce) {
  gsap.from(".hero h1 .w > span", { yPercent: 115, rotate: 4, duration: 1.3, stagger: 0.12, ease: "expo.out", delay: 0.15 });
  gsap.from([".alt-name", ".lead", ".stats", ".cta"], { y: 30, opacity: 0, filter: "blur(8px)", duration: 1.1, stagger: 0.1, ease: "power3.out", delay: 0.5 });
}
$$(".count").forEach((el) => gsap.to({ v: 0 }, { v: +el.dataset.to, duration: reduce ? 0 : 2.2, delay: 0.9, ease: "power2.out", onUpdate() { el.textContent = Math.round(this.targets()[0].v); }, onComplete() { countsDone = true; } }));
// scroll-out runs on a wrapper with explicit start values, so it never inherits the intro's hidden state
gsap.fromTo(".hero-in", { y: 0, opacity: 1 }, { y: -110, opacity: 0, ease: "none", immediateRender: false, scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom 15%", scrub: true } });
gsap.fromTo(".patent", { rotateY: -70, rotateX: 16, scale: 0.82, opacity: 0 }, { rotateY: 0, rotateX: 0, scale: 1, opacity: 1, ease: "power2.out", scrollTrigger: { trigger: "#patent", start: "top 88%", end: "center 62%", scrub: 1 } });
gsap.fromTo("#patent", { y: 0, opacity: 1 }, { y: -60, opacity: 0.2, ease: "none", immediateRender: false, scrollTrigger: { trigger: "#patent", start: "bottom 70%", end: "bottom top", scrub: true } });
gsap.from("#featured .sec-head", { y: 80, opacity: 0, scrollTrigger: { trigger: "#featured", start: "top 85%", end: "top 25%", scrub: true } });
gsap.from(".caption", { y: 60, opacity: 0, rotateX: -20, scrollTrigger: { trigger: "#featured", start: "top 60%", end: "top top", scrub: true } });
$$(".sec-head").forEach((h) => { if (h.closest("#featured")) return; gsap.from(h.children, { y: 60, opacity: 0, stagger: 0.08, scrollTrigger: { trigger: h, start: "top 88%", end: "top 50%", scrub: true } }); });
gsap.from("#contact > *", { y: 70, opacity: 0, stagger: 0.1, scrollTrigger: { trigger: "#contact", start: "top 85%", end: "top 35%", scrub: true } });
$$(".magnet").forEach((b) => {
  b.addEventListener("pointermove", (e) => { const r = b.getBoundingClientRect(); gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.3, duration: 0.4 }); });
  b.addEventListener("pointerleave", () => gsap.to(b, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1,.4)" }));
});

/* ================= toggles ================= */
$("#langBtn").addEventListener("click", () => {
  lang = lang === "ar" ? "en" : "ar"; try { localStorage.setItem("sa-lang", lang); } catch {}
  gsap.to("main", { opacity: 0, duration: 0.2, onComplete() { renderAll(); requestAnimationFrame(() => { ScrollTrigger.refresh(); gsap.to("main", { opacity: 1, duration: 0.35 }); }); } });
});
$("#themeBtn").addEventListener("click", () => {
  html.dataset.theme = html.dataset.theme === "light" ? "dark" : "light"; try { localStorage.setItem("sa-theme", html.dataset.theme); } catch {}
  sceneTheme();
});
addEventListener("load", () => ScrollTrigger.refresh());
