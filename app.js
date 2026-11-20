(function () {
  "use strict";

  var D = window.EP_DATA;
  var KEY = "entrepath.v1";
  var MODULES = D.modules;
  var BY_ID = {};
  MODULES.forEach(function (m) { BY_ID[m.id] = m; });

  var LEVELS = [
    [0, "Explorer"], [120, "Tester"], [300, "Builder"], [550, "Seller"],
    [850, "Operator"], [1250, "Strategist"], [1700, "Founder"],
    [2300, "Scale Operator"], [3000, "Portfolio Founder"]
  ];

  var BADGES = [
    { id: "first", name: "First Step", desc: "Read your first lesson" },
    { id: "ace", name: "Quiz Ace", desc: "Score 3 out of 3 on a quiz" },
    { id: "tools", name: "Toolsmith", desc: "Use all five tools" },
    { id: "path5", name: "Path Walker", desc: "Finish five modules" },
    { id: "survivor", name: "Crisis Manager", desc: "End the simulation with runway above 3 months" },
    { id: "streak7", name: "Consistent", desc: "Seven-day streak" }
  ];

  var TOOLS = [
    { id: "breakeven", name: "Break-even", ico: "BE", blurb: "How many units before the fixed costs are covered." },
    { id: "runway", name: "Runway", ico: "RW", blurb: "Months of cash left at your current net burn." },
    { id: "growth", name: "Revenue simulator", ico: "GR", blurb: "Twelve months of customers and revenue with churn." },
    { id: "swot", name: "SWOT board", ico: "SW", blurb: "Four quadrants, saved and exportable." },
    { id: "persona", name: "Buyer persona", ico: "PE", blurb: "Build a one-page profile of the person who buys." }
  ];

  var OB_STEPS = [
    { key: "persona", q: "Which situation is closest to yours?", sub: "This shapes the order of your path, not what you are allowed to learn.", opts: D.personas },
    { key: "stage", q: "Where is the venture today?", sub: "Be honest. A path built for the wrong stage wastes your time.", opts: D.stages },
    { key: "industry", q: "Which market are you building for?", sub: "Examples and benchmarks adapt to your sector.", opts: D.industries },
    { key: "capital", q: "What can you put behind it for the next 12 months?", sub: "This decides which advice is realistic.", opts: D.capitals },
    { key: "region", q: "Where will you operate?", sub: "Legal and funding guidance is jurisdiction-specific.", opts: D.regions },
    { key: "time", q: "How many hours a week can you give it?", sub: "Modules are sized to fit.", opts: D.times }
  ];

  function fresh() {
    return {
      v: 1, profile: null, xp: 0, done: {}, quiz: {}, quizXp: {}, lessons: {},
      tools: {}, toolData: {}, badges: [], posts: [], sim: null, simReward: false,
      streak: { last: null, count: 0 }, created: null
    };
  }

  var S = load();
  var ob = { step: 0, answers: {} };
  var lastPage = null;
  var libFilter = "all";
  var libQuery = "";

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) {
        var p = JSON.parse(raw);
        return Object.assign(fresh(), p);
      }
    } catch (e) {}
    return fresh();
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {}
  }

  function todayStr() {
    var d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function dayBefore(str) {
    var p = str.split("-");
    var d = new Date(+p[0], +p[1] - 1, +p[2]);
    d.setDate(d.getDate() - 1);
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }

  function touchStreak() {
    var t = todayStr();
    if (S.streak.last === t) return;
    if (S.streak.last && S.streak.last === dayBefore(t)) S.streak.count += 1;
    else S.streak.count = 1;
    S.streak.last = t;
    save();
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function money(n) {
    if (!isFinite(n)) return "—";
    return "$" + Math.round(n).toLocaleString("en-US");
  }
  function num(n) {
    return Number(n).toLocaleString("en-US", { maximumFractionDigits: 1 });
  }
  function levelOf(xp) {
    var i = 0;
    LEVELS.forEach(function (l, k) { if (xp >= l[0]) i = k; });
    var next = LEVELS[i + 1];
    return {
      n: i + 1, name: LEVELS[i][1], cur: LEVELS[i][0],
      next: next ? next[0] : null, nextName: next ? next[1] : null
    };
  }
  function levelPct(xp) {
    var l = levelOf(xp);
    if (!l.next) return 100;
    return Math.max(0, Math.min(100, ((xp - l.cur) / (l.next - l.cur)) * 100));
  }

  function toast(msg, sub) {
    var box = document.getElementById("toasts");
    if (!box) return;
    var el = document.createElement("div");
    el.className = "toast";
    el.innerHTML = (sub ? "<b>" + esc(sub) + "</b>" : "") + esc(msg);
    box.appendChild(el);
    setTimeout(function () {
      el.style.opacity = "0";
      el.style.transition = "opacity .4s";
      setTimeout(function () { el.remove(); }, 420);
    }, 3200);
  }

  function goTop() {
    window.scrollTo(0, 0);
    requestAnimationFrame(function () { window.scrollTo(0, 0); });
  }

  function award(id) {
    if (S.badges.indexOf(id) >= 0) return;
    var b = BADGES.filter(function (x) { return x.id === id; })[0];
    if (!b) return;
    S.badges.push(id);
    save();
    toast(b.name + " — " + b.desc, "Badge unlocked");
  }

  function doneCount() {
    return MODULES.filter(function (m) { return isDone(m.id); }).length;
  }
  function isDone(id) {
    var m = BY_ID[id];
    if (!m) return false;
    if (m.sim) return !!(S.sim && S.sim.done);
    return !!S.done[id];
  }

  function checkBadges() {
    if (Object.keys(S.lessons).length > 0) award("first");
    if (doneCount() >= 5) award("path5");
    if (Object.keys(S.tools).length >= TOOLS.length) award("tools");
    if (S.streak.count >= 7) award("streak7");
  }

  function pathFor() {
    var p = S.profile || {};
    var ids = D.paths[p.persona] || D.paths[p.stage] || D.paths.prelaunch;
    return ids.map(function (id) { return BY_ID[id]; }).filter(Boolean);
  }
  function nextModule() {
    var path = pathFor();
    for (var i = 0; i < path.length; i++) if (!isDone(path[i].id)) return path[i];
    return null;
  }
  function stageLabel(id) {
    var s = D.stages.filter(function (x) { return x.id === id; })[0];
    return s ? s.label : "Early stage";
  }
  function personaLabel(id) {
    var s = D.personas.filter(function (x) { return x.id === id; })[0];
    return s ? s.label : "Founder";
  }
  function industryLabel(id) {
    var s = D.industries.filter(function (x) { return x.id === id; })[0];
    return s ? s.label : "your market";
  }
  function capitalLabel(id) {
    var s = D.capitals.filter(function (x) { return x.id === id; })[0];
    return s ? s.label : "your resources";
  }

  /* ---------------- HUD ---------------- */
  function updateHud() {
    var hud = document.getElementById("hud");
    if (!hud) return;
    if (!S.profile) {
      hud.innerHTML = '<span class="chip">Free · no account</span>';
      return;
    }
    var l = levelOf(S.xp);
    hud.innerHTML =
      '<span class="chip" title="' + esc(l.name) + '">' +
      '<span class="hud-name">Lv ' + l.n + " " + esc(l.name) + "</span>" +
      '<span class="bar"><i style="width:' + levelPct(S.xp).toFixed(0) + '%"></i></span>' +
      "<b>" + S.xp + " XP</b></span>" +
      '<span class="chip" title="Daily streak">Day ' + S.streak.count + "</span>";
  }

  /* ---------------- routing ---------------- */
  function parseHash() {
    var h = location.hash.replace(/^#\/?/, "");
    if (!h) return { page: "dashboard", arg: null };
    var parts = h.split("/");
    return { page: parts[0], arg: parts[1] || null };
  }

  function render() {
    var route = parseHash();
    var app = document.getElementById("app");
    if (!app) return;

    if (!S.profile && route.page !== "onboarding") {
      location.hash = "#/onboarding";
      return;
    }

    var html = "";
    var activeNav = route.page;

    if (route.page === "onboarding") {
      if (lastPage && lastPage !== "onboarding") {
        ob = { step: 0, answers: {} };
      }
      lastPage = "onboarding";
    } else {
      lastPage = route.page;
    }

    switch (route.page) {
      case "onboarding": html = viewOnboarding(); activeNav = ""; break;
      case "dashboard": html = viewDashboard(); break;
      case "path": html = viewPath(); break;
      case "module": html = viewModule(route.arg); activeNav = "path"; break;
      case "tools": html = viewTools(); break;
      case "tool": html = viewTool(route.arg); activeNav = "tools"; break;
      case "library": html = viewLibrary(); break;
      case "community": html = viewCommunity(); break;
      default: html = viewDashboard(); activeNav = "dashboard";
    }

    app.innerHTML = html;

    Array.prototype.forEach.call(document.querySelectorAll("#nav a"), function (a) {
      a.classList.toggle("active", a.getAttribute("data-nav") === activeNav);
    });
    updateHud();

    if (route.page === "tool") calcTool(route.arg);
    if (route.page === "onboarding") updateObButtons();
  }

  window.addEventListener("hashchange", function () {
    render();
    window.scrollTo(0, 0);
  });

  /* ---------------- onboarding ---------------- */
  function viewOnboarding() {
    if (!S.profile) { ob.step = ob.step || 0; }
    var step = OB_STEPS[Math.min(ob.step, OB_STEPS.length - 1)];
    var i = Math.min(ob.step, OB_STEPS.length - 1);
    var chosen = ob.answers[step.key];

    var dots = OB_STEPS.map(function (_, k) {
      return '<i class="' + (k <= i ? "on" : "") + '"></i>';
    }).join("");

    var choices = step.opts.map(function (o) {
      return '<button type="button" class="choice ' + (chosen === o.id ? "sel" : "") + '" data-ob="' + esc(step.key) + '" data-val="' + esc(o.id) + '">' +
        "<span>" + esc(o.label) + (o.hint ? "<small>" + esc(o.hint) + "</small>" : "") + "</span>" +
        (chosen === o.id ? "<span aria-hidden='true'>✓</span>" : "") +
        "</button>";
    }).join("");

    var isLast = i === OB_STEPS.length - 1;

    return '<section class="onboard">' +
      '<p class="eyebrow">Step ' + (i + 1) + " of " + OB_STEPS.length + "</p>" +
      '<div class="dots" aria-hidden="true">' + dots + "</div>" +
      "<h1 style='font-size:1.6rem'>" + esc(step.q) + "</h1>" +
      '<p class="muted">' + esc(step.sub) + "</p>" +
      '<div class="choices" role="group">' + choices + "</div>" +
      '<div class="onboard-nav">' +
      (i > 0 ? '<button type="button" class="btn ghost" data-action="ob-back">Back</button>' : "<span></span>") +
      '<button type="button" class="btn primary" id="obNext" data-action="' + (isLast ? "ob-finish" : "ob-next") + '"' + (chosen ? "" : " disabled") + ">" +
      (isLast ? "Build my path" : "Continue") + "</button>" +
      "</div>" +
      '<p class="muted" style="font-size:.78rem;margin-top:1rem">No account, no email. Answers stay in this browser and you can retake the assessment any time.</p>' +
      "</section>";
  }

  function updateObButtons() {
    var step = OB_STEPS[ob.step];
    var btn = document.getElementById("obNext");
    if (btn && step) btn.disabled = !ob.answers[step.key];
  }

  function finishOnboarding() {
    var a = ob.answers;
    S.profile = {
      persona: a.persona || "aspiring",
      stage: a.stage || "prelaunch",
      industry: a.industry || "tech",
      capital: a.capital || "none",
      region: a.region || "other",
      time: a.time || "mid"
    };
    if (!S.created) S.created = todayStr();
    S.xp += 20;
    save();
    toast("Path built. Twenty XP for showing up.", "Ready");
    location.hash = "#/dashboard";
  }

  /* ---------------- dashboard ---------------- */
  function viewDashboard() {
    var p = S.profile;
    var next = nextModule();
    var done = doneCount();
    var allDone = done >= MODULES.length;
    var focus = next || MODULES[MODULES.length - 1];
    var l = levelOf(S.xp);
    var pct = (done / MODULES.length) * 100;
    var hour = new Date().getHours();
    var greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

    var nextBadge = BADGES.filter(function (b) { return S.badges.indexOf(b.id) < 0; })[0];

    var minutes = MODULES.filter(function (m) { return isDone(m.id); })
      .reduce(function (t, m) { return t + m.minutes; }, 0);

    var nextCta = allDone
      ? '<a class="btn primary" href="#/tool/runway">Open the runway tool</a>'
      : '<a class="btn primary" href="#/module/' + next.id + '">' + (done ? "Continue: " : "Start: ") + esc(next.title) + "</a>";

    var stats = [
      [done + " / " + MODULES.length, "Modules finished"],
      [S.xp, "XP earned"],
      [S.streak.count, "Day streak"],
      [S.badges.length + " / " + BADGES.length, "Badges"]
    ].map(function (s) {
      return '<div class="stat"><b>' + esc(s[0]) + "</b><span>" + esc(s[1]) + "</span></div>";
    }).join("");

    var badges = BADGES.map(function (b) {
      var on = S.badges.indexOf(b.id) >= 0;
      return '<span class="badge ' + (on ? "on" : "off") + '" title="' + esc(b.desc) + '">' +
        (on ? "★" : "☆") + " " + esc(b.name) + "</span>";
    }).join("");

    var quickTools = TOOLS.slice(0, 4).map(function (t) {
      return '<a class="tool-card" href="#/tool/' + t.id + '">' +
        '<span class="tool-ico">' + t.ico + "</span>" +
        "<h3>" + esc(t.name) + "</h3>" +
        '<p class="muted" style="font-size:.85rem;margin:0">' + esc(t.blurb) + "</p></a>";
    }).join("");

    return '<section class="hero">' +
      '<div class="hero-main">' +
      '<p class="eyebrow">Day ' + S.streak.count + " · " + esc(personaLabel(p.persona)) + " · " + esc(stageLabel(p.stage)) + "</p>" +
      "<h1>" + greeting + ", founder.</h1>" +
      '<p class="lede">Built for ' + esc(industryLabel(p.industry)) + " at the " + esc(stageLabel(p.stage)) + " stage. " +
      (done ? "You have finished " + done + " of " + MODULES.length + " modules." : "Short modules, real numbers, one path.") + "</p>" +
      '<div class="progress" role="progressbar" aria-valuenow="' + Math.round(pct) + '" aria-valuemin="0" aria-valuemax="100"><i style="width:' + pct.toFixed(0) + '%"></i></div>' +
      '<p class="muted" style="font-size:.82rem">' + minutes + " minutes of learning logged · " + (next ? "next up: " + esc(next.title) : "path complete") + "</p>" +
      '<div class="hero-actions">' + nextCta +
      '<a class="btn ghost" href="#/path">See the full path</a></div>' +
      "</div>" +
      '<aside class="level-card">' +
      '<div class="level-top">' +
      '<div class="ring" style="--pct:' + levelPct(S.xp).toFixed(0) + '%"><span>Lv ' + l.n + "</span></div>" +
      "<div><div class='level-name'>" + esc(l.name) + "</div>" +
      '<div class="muted" style="font-size:.8rem">' + S.xp + " XP</div></div>" +
      "</div>" +
      '<div style="border-top:1px solid var(--line);padding-top:.9rem">' +
      '<span class="pill warn">Next badge</span>' +
      (nextBadge
        ? '<p style="margin:.55rem 0 0;font-size:.86rem;color:#cdd6ea"><strong>' + esc(nextBadge.name) + "</strong> — " + esc(nextBadge.desc) + "</p>"
        : '<p style="margin:.55rem 0 0;font-size:.86rem;color:#cdd6ea">Every badge unlocked. The tools are still there.</p>') +
      "</div>" +
      "<div>" +
      '<div class="xp-line"><span>' + (l.next ? "Next: " + esc(l.nextName) : "Top level") + "</span><span>" + (l.next ? (l.next - S.xp) + " XP to go" : "—") + "</span></div>" +
      '<div class="progress"><i style="width:' + levelPct(S.xp).toFixed(0) + '%"></i></div>' +
      '<p class="muted" style="font-size:.76rem;margin-top:.6rem">XP comes from lessons, quizzes, tools and the simulation. Nothing here expires.</p>' +
      "</div></aside></section>" +
      '<div class="grid stats">' + stats + "</div>" +
      '<div class="grid two">' +
      '<section class="card"><span class="pill mint">Today\'s move</span>' +
      "<h2 style='margin-top:.7rem'>" + esc(focus.title) + "</h2>" +
      "<p>" + esc(focus.move) + "</p>" +
      '<a class="btn small" href="#/module/' + focus.id + '">Open the module</a></section>' +
      '<section class="card"><span class="pill warn">Badges</span>' +
      "<h2 style='margin-top:.7rem'>What you have unlocked</h2>" +
      '<div class="badge-row">' + badges + "</div></section>" +
      "</div>" +
      '<div class="section-head"><h2>Quick tools</h2><a href="#/tools">All five tools</a></div>' +
      '<div class="tool-grid">' + quickTools + "</div>";
  }

  /* ---------------- path ---------------- */
  function viewPath() {
    var path = pathFor();
    var done = doneCount();
    var next = nextModule();
    var pct = (done / MODULES.length) * 100;

    var items = path.map(function (m, i) {
      var isDoneM = isDone(m.id);
      var isNext = next && next.id === m.id;
      return '<a class="path-item ' + (isDoneM ? "done" : "") + (isNext ? " next" : "") + '" href="#/module/' + m.id + '">' +
        '<span class="step-num">' + (isDoneM ? "✓" : String(i + 1).padStart(2, "0")) + "</span>" +
        "<span><h3>" + esc(m.title) + "</h3>" +
        '<span class="path-meta"><span>' + esc(m.track) + "</span><span>" + m.minutes + " min</span>" +
        (isNext ? '<span style="color:#c3b5ff">Next up</span>' : "") +
        (isDoneM ? '<span style="color:#8af2d7">Done</span>' : "") +
        "</span></span>" +
        '<span class="go muted">' + (isDoneM ? "Review →" : "Open →") + "</span>" +
        "</a>";
    }).join("");

    return '<p class="eyebrow">Your path</p>' +
      "<h1>" + esc(personaLabel(S.profile.persona)) + "</h1>" +
      '<p class="lede">Ordered for ' + esc(stageLabel(S.profile.stage)) + " in " + esc(industryLabel(S.profile.industry)) + ". " +
      "Modules are independent: if you already know a topic, take the quiz and move on.</p>" +
      '<div class="progress" role="progressbar" aria-valuenow="' + Math.round(pct) + '" aria-valuemin="0" aria-valuemax="100"><i style="width:' + pct.toFixed(0) + '%"></i></div>' +
      '<p class="muted" style="font-size:.82rem;margin-bottom:1.2rem">' + done + " of " + MODULES.length + " complete · " +
      (done ? "keep going" : "start with the first card") + '</p>' +
      '<div class="path-list">' + items + "</div>" +
      '<p class="muted" style="font-size:.82rem;margin-top:1.4rem">Want a different order? <a href="#/onboarding" style="color:#8af2d7">Retake the assessment</a>.</p>';
  }

  /* ---------------- module ---------------- */
  function viewModule(id) {
    var m = BY_ID[id];
    if (!m) { location.hash = "#/dashboard"; return ""; }

    var path = pathFor();
    var idx = path.findIndex(function (x) { return x.id === m.id; });
    var next = idx >= 0 ? path[idx + 1] : null;
    var done = isDone(m.id);

    var lessons = m.lessons.map(function (l, i) {
      var key = m.id + ":" + i;
      var read = !!S.lessons[key];
      return '<details class="lesson" data-lesson="' + key + '">' +
        "<summary>" + esc(l.title) + (read ? ' <span class="pill done" style="margin-left:auto">Read</span>' : "") + "</summary>" +
        '<div class="body">' + l.body.map(function (x) { return "<p>" + esc(x) + "</p>"; }).join("") + "</div>" +
        "</details>";
    }).join("");

    var quizHtml = "";
    if (m.sim) {
      quizHtml = viewSim(m);
    } else {
      quizHtml = viewQuiz(m);
    }

    var nextLink = next
      ? '<a class="btn primary" href="#/module/' + next.id + '">Next: ' + esc(next.title) + "</a>"
      : '<a class="btn primary" href="#/dashboard">Back to dashboard</a>';

    return '<a class="crumb" href="#/path">← Your path</a>' +
      '<header class="module-head">' +
      '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:.7rem">' +
      '<span class="pill">' + esc(m.track) + "</span>" +
      '<span class="pill mint">' + m.minutes + " min</span>" +
      (done ? '<span class="pill done">Complete</span>' : "") +
      "</div>" +
      "<h1>" + esc(m.title) + "</h1>" +
      '<p class="lede" style="margin-bottom:0">' + esc(m.summary) + "</p>" +
      "</header>" +
      '<div class="section-head"><h2>Lessons</h2><span class="muted" style="font-size:.82rem">+10 XP each</span></div>' +
      lessons +
      '<div class="takeaway"><b>Do this next</b>' + esc(m.move) + "</div>" +
      (m.sim ? '<div class="section-head"><h2>The simulation</h2><span class="muted" style="font-size:.82rem">Five decisions</span></div>' : '<div class="section-head"><h2>Check yourself</h2><span class="muted" style="font-size:.82rem">3 questions</span></div>') +
      '<div id="quizArea">' + quizHtml + "</div>" +
      '<div style="display:flex;gap:.6rem;flex-wrap:wrap;margin-top:1.4rem">' + nextLink +
      '<a class="btn ghost" href="#/tools">Open a tool</a></div>';
  }

  function viewQuiz(m) {
    var attempt = S.quiz[m.id];

    if (attempt) {
      var review = m.quiz.map(function (q, qi) {
        var picked = attempt.answers[qi];
        var opts = q.options.map(function (o, oi) {
          var cls = oi === q.a ? " correct" : (oi === picked ? " wrong" : "");
          return '<div class="opt' + cls + '">' + esc(o) +
            (oi === q.a ? " ✓" : oi === picked ? " ✗" : "") + "</div>";
        }).join("");
        return '<div class="q"><p>' + (qi + 1) + ". " + esc(q.q) + "</p>" + opts +
          '<div class="why">' + esc(q.why) + "</div></div>";
      }).join("");

      return '<div class="quiz"><div style="display:flex;justify-content:space-between;gap:1rem;align-items:center;flex-wrap:wrap">' +
        "<h3 style='margin:0'>Your result: " + attempt.score + " / " + attempt.total + "</h3>" +
        '<span class="pill ' + (attempt.score === attempt.total ? "done" : "warn") + '">' +
        (attempt.score === attempt.total ? "Perfect" : "Best attempt") + "</span></div>" +
        review +
        '<button type="button" class="btn small ghost" data-action="quiz-retake" data-id="' + m.id + '">Retake</button>' +
        "</div>";
    }

    var qs = m.quiz.map(function (q, qi) {
      var opts = q.options.map(function (o, oi) {
        return '<label class="opt"><input type="radio" name="q' + qi + '" value="' + oi + '"> <span>' + esc(o) + "</span></label>";
      }).join("");
      return '<div class="q"><p>' + (qi + 1) + ". " + esc(q.q) + "</p>" + opts + "</div>";
    }).join("");

    return '<form class="quiz" id="quizForm" data-id="' + m.id + '">' + qs +
      '<button type="submit" class="btn primary">Check answers</button>' +
      '<span class="muted" style="font-size:.8rem;margin-left:.6rem">First attempt earns XP. You can retake.</span>' +
      "</form>";
  }

  /* ---------------- simulation ---------------- */
  function viewSim(m) {
    var sim = S.sim;
    if (!sim) {
      return '<div class="card pad-lg">' +
        '<p class="eyebrow">Interactive</p>' +
        "<h2>" + esc(m.title) + "</h2>" +
        "<p>" + esc(m.sim.intro) + "</p>" +
        '<p class="muted" style="font-size:.88rem">Five decisions. Each changes cash, monthly spend or revenue. There is no trick answer — only consequences.</p>' +
        '<button type="button" class="btn primary" data-action="sim-start">Start the simulation</button>' +
        "</div>";
    }

    var runway = sim.cash / Math.max(sim.burn - sim.mrr, 1);

    var bar = '<div class="sim-bar">' +
      "<div><span>Cash</span><b>" + money(sim.cash) + "</b></div>" +
      "<div><span>Monthly spend</span><b>" + money(sim.burn) + "</b></div>" +
      "<div><span>Monthly revenue</span><b>" + money(sim.mrr) + "</b></div>" +
      "<div><span>Runway</span><b>" + (sim.burn - sim.mrr <= 0 ? "Profitable" : num(runway) + " mo") + "</b></div>" +
      "</div>";

    if (sim.done) {
      var verdict, tone, headline;
      if (sim.sold) {
        headline = "You sold the company";
        verdict = "You accepted an acquisition. The venture ends here with the team employed and investors whole — a real outcome, not a failure.";
        tone = "mint";
      } else if (sim.burn - sim.mrr <= 0) {
        headline = "You reached break-even";
        verdict = "The company survives without new money. Every month now adds cash rather than consuming it.";
        tone = "done";
      } else if (runway >= 6) {
        headline = "You kept the company alive";
        verdict = "You survived with room. Six or more months of runway and a team that still believes.";
        tone = "done";
      } else if (runway >= 3) {
        headline = "Fragile but alive";
        verdict = "Under six months buys you one more round of decisions, not comfort.";
        tone = "warn";
      } else {
        headline = "The company runs out of cash";
        verdict = "Less than three months of runway is a sale, a raise or a shutdown — decided fast.";
        tone = "warn";
      }

      var log = sim.log.map(function (l) {
        return "<p><strong>" + esc(l.choice) + "</strong> — " + esc(l.outcome) + "</p>";
      }).join("");

      return bar +
        '<div class="card pad-lg"><span class="pill ' + tone + '">Result</span>' +
        '<h2 style="margin-top:.7rem">' + esc(headline) + "</h2>" +
        "<p>" + esc(verdict) + "</p>" +
        '<p class="muted" style="font-size:.88rem">Closing position: ' + money(sim.cash) + " cash · " + money(sim.burn) + " monthly spend · " + money(sim.mrr) + " monthly revenue.</p>" +
        '<div class="log">' + log + "</div>" +
        '<div style="display:flex;gap:.6rem;flex-wrap:wrap;margin-top:1rem">' +
        '<button type="button" class="btn" data-action="sim-restart">Play again</button>' +
        '<a class="btn ghost" href="#/path">Back to path</a></div></div>';
    }

    var turn = m.sim.turns[sim.turn];
    var choices = turn.choices.map(function (c, i) {
      return '<button type="button" class="choice-card" data-action="sim-choice" data-i="' + i + '">' +
        "<strong>" + esc(c.label) + "</strong><small>" + esc(c.detail) + "</small></button>";
    }).join("");

    var prior = sim.log.slice(-1).map(function (l) {
      return "<p><strong>Last move:</strong> " + esc(l.outcome) + "</p>";
    }).join("");

    return bar +
      '<div class="card pad-lg">' +
      '<p class="eyebrow">Turn ' + (sim.turn + 1) + " of " + m.sim.turns.length + "</p>" +
      "<h2>" + esc(turn.title) + "</h2>" +
      "<p>" + esc(turn.text) + "</p>" +
      '<div style="margin-top:1rem">' + choices + "</div>" +
      (prior ? '<div class="log">' + prior + "</div>" : "") +
      "</div>";
  }

  function simStart() {
    var m = BY_ID.crisis;
    S.sim = {
      turn: 0, cash: m.sim.start.cash, burn: m.sim.start.burn, mrr: m.sim.start.mrr,
      log: [], done: false
    };
    save();
    render();
    var bar = document.querySelector(".sim-bar");
    if (bar) bar.scrollIntoView({ block: "start" });
  }

  function simChoice(i) {
    var m = BY_ID.crisis;
    var sim = S.sim;
    if (!sim || sim.done) return;
    var turn = m.sim.turns[sim.turn];
    var c = turn.choices[i];
    if (!c) return;
    sim.cash += c.fx.cash || 0;
    sim.burn += c.fx.burn || 0;
    sim.mrr += c.fx.mrr || 0;
    if (c.fx.sold) sim.sold = true;
    sim.log.push({ choice: c.label, outcome: c.outcome });
    sim.turn += 1;

    if (sim.turn >= m.sim.turns.length) {
      sim.done = true;
      if (!S.simReward) {
        S.simReward = true;
        S.xp += 100;
      }
      var runway = sim.cash / Math.max(sim.burn - sim.mrr, 1);
      if (!sim.sold && (runway >= 3 || sim.burn - sim.mrr <= 0)) award("survivor");
      checkBadges();
      toast("Simulation complete. +100 XP", "Five decisions");
    }
    save();
    render();
    var bar = document.querySelector(".sim-bar");
    if (bar) bar.scrollIntoView({ block: "start" });
  }

  /* ---------------- tools ---------------- */
  function viewTools() {
    var cards = TOOLS.map(function (t) {
      var used = !!S.tools[t.id];
      return '<a class="tool-card" href="#/tool/' + t.id + '">' +
        '<span class="tool-ico">' + t.ico + "</span>" +
        "<h3>" + esc(t.name) + (used ? ' <span class="pill done" style="font-size:.6rem">Used</span>' : "") + "</h3>" +
        '<p class="muted" style="font-size:.85rem;margin:0">' + esc(t.blurb) + "</p></a>";
    }).join("");

    return '<p class="eyebrow">Toolkit</p><h1>Do the numbers, then decide.</h1>' +
      '<p class="lede">Five small tools, no spreadsheet gymnastics. Everything you type stays in this browser, and you can download the output.</p>' +
      '<div class="tool-grid" style="margin-top:1.2rem">' + cards + "</div>";
  }

  function field(label, name, value, step, min) {
    return '<label class="field">' + esc(label) +
      '<input type="number" data-tool-field="' + name + '" value="' + esc(value) + '"' +
      (step ? ' step="' + step + '"' : "") + (min !== undefined ? ' min="' + min + '"' : "") + "></label>";
  }

  function viewTool(id) {
    var t = TOOLS.filter(function (x) { return x.id === id; })[0];
    if (!t) { location.hash = "#/tools"; return ""; }
    var d = S.toolData[id] || {};
    var body = "";

    if (id === "breakeven") {
      body = '<form class="tool-form card" data-tool="breakeven" onsubmit="return false">' +
        '<div class="form-row">' +
        field("Fixed costs per month ($)", "fixed", d.fixed != null ? d.fixed : 12000) +
        field("Price per unit ($)", "price", d.price != null ? d.price : 49) +
        "</div>" +
        '<div class="form-row">' +
        field("Variable cost per unit ($)", "varcost", d.varcost != null ? d.varcost : 12) +
        field("Units you expect to sell", "units", d.units != null ? d.units : 400) +
        "</div></form>" +
        '<div class="result" id="toolOut"></div>' +
        '<p class="muted" style="font-size:.8rem;margin-top:.8rem">Break-even units = fixed costs ÷ (price − variable cost). Contribution margin is what each sale leaves behind.</p>';
    } else if (id === "runway") {
      body = '<form class="tool-form card" data-tool="runway" onsubmit="return false">' +
        '<div class="form-row">' +
        field("Cash in the bank ($)", "cash", d.cash != null ? d.cash : 180000) +
        field("Monthly spend, all in ($)", "burn", d.burn != null ? d.burn : 45000) +
        "</div>" +
        '<div class="form-row">' +
        field("Monthly cash collected ($)", "revenue", d.revenue != null ? d.revenue : 15000) +
        field("Committed one-off costs ($)", "committed", d.committed != null ? d.committed : 0) +
        "</div></form>" +
        '<div class="result" id="toolOut"></div>' +
        '<p class="muted" style="font-size:.8rem;margin-top:.8rem">Runway = cash ÷ (spend − collections). Committed costs are subtracted from cash first. Use money actually collected, not invoiced.</p>';
    } else if (id === "growth") {
      body = '<form class="tool-form card" data-tool="growth" onsubmit="return false">' +
        '<div class="form-row">' +
        field("Customers today", "customers", d.customers != null ? d.customers : 40) +
        field("Price per month ($)", "price", d.price != null ? d.price : 149) +
        "</div>" +
        '<div class="form-row">' +
        field("Monthly churn (%)", "churn", d.churn != null ? d.churn : 4, "0.1") +
        field("New customers per month", "adds", d.adds != null ? d.adds : 12) +
        "</div></form>" +
        '<div class="result" id="toolOut"></div>' +
        '<p class="muted" style="font-size:.8rem;margin-top:.8rem">A projection, not a forecast. Churn compounds against growth: at 4% monthly churn you lose about 39% of the base each year.</p>';
    } else if (id === "swot") {
      var s = S.toolData.swot || {};
      body = '<div class="card"><div class="swot">' +
        '<div><h4>Strengths</h4><textarea data-swot="s" placeholder="What you do better than anyone">' + esc(s.s || "") + "</textarea></div>" +
        '<div><h4>Weaknesses</h4><textarea data-swot="w" placeholder="What is missing or fragile">' + esc(s.w || "") + "</textarea></div>" +
        '<div><h4>Opportunities</h4><textarea data-swot="o" placeholder="What changed in the market">' + esc(s.o || "") + "</textarea></div>" +
        '<div><h4>Threats</h4><textarea data-swot="t" placeholder="What could take this away">' + esc(s.t || "") + "</textarea></div>" +
        "</div>" +
        '<div style="display:flex;gap:.6rem;flex-wrap:wrap;margin-top:1rem">' +
        '<button type="button" class="btn" data-action="swot-save">Save</button>' +
        '<button type="button" class="btn ghost" data-action="download" data-id="swot-txt">Download as text</button>' +
        '<span class="muted" style="font-size:.8rem;align-self:center" id="swotState">Saved locally</span>' +
        "</div></div>" +
        '<p class="muted" style="font-size:.8rem;margin-top:.8rem">Use it as a conversation, not a decoration: every strength should name evidence, every weakness a mitigation.</p>';
    } else if (id === "persona") {
      var p = S.toolData.persona || {};
      var inp = function (label, key, ph) {
        return '<label class="field">' + esc(label) + '<input type="text" data-persona="' + key + '" value="' + esc(p[key] || "") + '" placeholder="' + esc(ph || "") + '"></label>';
      };
      body = '<div class="card"><div class="form-row">' +
        inp("Name or role", "name", "Operations manager") +
        inp("Company size / context", "context", "Clinic, 2–5 chairs") +
        "</div>" +
        '<div class="form-row">' +
        inp("Trigger (what just happened)", "trigger", "A no-show cost them a full slot") +
        inp("Budget owner?", "budget", "Yes, up to $200/month") +
        "</div>" +
        '<label class="field" style="margin-bottom:.8rem">Current workaround<textarea data-persona="workaround" placeholder="Spreadsheet, reminders, an intern">' + esc(p.workaround || "") + "</textarea></label>" +
        '<label class="field" style="margin-bottom:.8rem">What a good outcome looks like<textarea data-persona="outcome" placeholder="Fewer empty slots without extra admin">' + esc(p.outcome || "") + "</textarea></label>" +
        '<div style="display:flex;gap:.6rem;flex-wrap:wrap">' +
        '<button type="button" class="btn ghost" data-action="download" data-id="persona-txt">Download persona</button>' +
        '<span class="muted" style="font-size:.8rem;align-self:center">Saved as you type</span></div></div>' +
        '<div class="result" id="toolOut"></div>';
    }

    return '<a class="crumb" href="#/tools">← All tools</a>' +
      '<header class="module-head"><span class="pill">' + esc(t.name) + "</span>" +
      "<h1 style='margin-top:.6rem'>" + esc(t.name) + "</h1>" +
      '<p class="lede" style="margin-bottom:0">' + esc(t.blurb) + "</p></header>" + body;
  }

  function calcTool(id) {
    var form = document.querySelector('.tool-form[data-tool="' + id + '"]');
    var out = document.getElementById("toolOut");
    if (id === "swot" || id === "persona") {
      if (id === "persona" && out) out.innerHTML = personaCard();
      return;
    }
    if (!form || !out) return;

    var v = {};
    Array.prototype.forEach.call(form.querySelectorAll("[data-tool-field]"), function (el) {
      v[el.getAttribute("data-tool-field")] = parseFloat(el.value) || 0;
    });

    if (id === "breakeven") {
      var margin = v.price - v.varcost;
      if (margin <= 0) {
        out.innerHTML = "<strong>No break-even exists.</strong><p>Your variable cost is at or above the price, so every sale loses money. Fix the price or the cost before scaling.</p>";
      } else {
        var units = Math.ceil(v.fixed / margin);
        out.innerHTML = '<span class="muted" style="font-size:.75rem;text-transform:uppercase;letter-spacing:.08em">Break-even</span>' +
          '<div class="big">' + units.toLocaleString("en-US") + " units / month</div>" +
          "<p style='margin:.3rem 0 0'>Revenue at break-even: <strong>" + money(units * v.price) + "</strong> · Contribution per sale: <strong>" + money(margin) + "</strong> (" + Math.round((margin / (v.price || 1)) * 100) + "% of price)</p>" +
          "<p style='margin-top:.6rem'>At " + v.units + " units you make <strong>" + money(v.units * margin - v.fixed) + "</strong> before tax.</p>";
      }
    } else if (id === "runway") {
      var net = v.burn - v.revenue;
      var cash = v.cash - v.committed;
      if (net <= 0) {
        out.innerHTML = '<span class="muted" style="font-size:.75rem;text-transform:uppercase;letter-spacing:.08em">Position</span>' +
          '<div class="big">Cash-flow positive</div><p style="margin:.3rem 0 0">You add ' + money(-net) + " a month. Keep three months of costs as a buffer for late payments.</p>";
      } else {
        var months = cash / net;
        var d = new Date(); d.setDate(d.getDate() + Math.round(months * 30.44));
        out.innerHTML = '<span class="muted" style="font-size:.75rem;text-transform:uppercase;letter-spacing:.08em">Runway</span>' +
          '<div class="big">' + num(months) + " months</div>" +
          "<p style='margin:.3rem 0 0'>Net burn <strong>" + money(net) + "</strong> a month. Cash runs out around <strong>" +
          d.toLocaleDateString("en-US", { month: "long", year: "numeric" }) + "</strong>.</p>" +
          "<p style='margin-top:.6rem'>" + (months < 6 ? "That is inside the danger zone. Start the cheap levers now and open a raise conversation this month." : months < 12 ? "Enough to operate, not enough to be relaxed. Raising takes 3–6 months." : "Healthy. Keep the 13-week cash view updated so a late payment does not surprise you.") + "</p>";
      }
    } else if (id === "growth") {
      var rows = [];
      var cust = v.customers;
      var maxRev = 0;
      for (var mth = 1; mth <= 12; mth++) {
        cust = cust * (1 - v.churn / 100) + v.adds;
        var rev = cust * v.price;
        if (rev > maxRev) maxRev = rev;
        rows.push({ m: mth, c: Math.round(cust), r: rev });
      }
      var bars = rows.map(function (r) {
        var h = maxRev ? Math.max(3, (r.r / maxRev) * 100) : 3;
        return '<div class="b" style="height:' + h.toFixed(1) + '%" title="Month ' + r.m + ": " + money(r.r) + '"><span>' + r.m + "</span></div>";
      }).join("");
      var last = rows[rows.length - 1];
      out.innerHTML = '<div class="chart-wrap"><div class="chart" aria-hidden="true">' + bars + "</div></div>" +
        "<p style='margin:.8rem 0 0'>Month 12: <strong>" + last.c + " customers</strong> at <strong>" + money(last.r) + " MRR</strong>. Year-one revenue: <strong>" + money(rows.reduce(function (t, r) { return t + r.r; }, 0)) + "</strong>.</p>" +
        '<p style="margin-top:.5rem;font-size:.85rem" class="muted">' + (v.churn >= 8 ? "High churn is eating most of your new sales. Fix retention before adding spend." : v.churn > 5 ? "Churn is meaningful. Check whether the customers you add look like the ones who stay." : "Churn is under control. Watch whether new-customer quality holds as volume grows.") + "</p>";
    }

    if (!S.tools[id]) {
      S.tools[id] = true;
      save();
      checkBadges();
    }
    updateHud();
  }

  function personaCard() {
    var p = S.toolData.persona || {};
    if (!p.name && !p.role) return "";
    return '<span class="muted" style="font-size:.75rem;text-transform:uppercase;letter-spacing:.08em">Persona</span>' +
      '<div class="big" style="font-size:1.3rem">' + esc(p.name || "Unnamed buyer") + "</div>" +
      "<p style='margin:.3rem 0 0'>" + esc(p.context || "Context not set") + "</p>" +
      "<p style='margin-top:.5rem'>Trigger: " + esc(p.trigger || "—") + "</p>" +
      "<p style='margin-top:.3rem'>Workaround: " + esc(p.workaround || "—") + "</p>" +
      "<p style='margin-top:.3rem'>Budget: " + esc(p.budget || "—") + "</p>";
  }

  function download(name, text, mime) {
    var blob = new Blob([text], { type: mime || "text/plain;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url; a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
  }

  function downloadTemplate(id) {
    var t = D.templates.filter(function (x) { return x.id === id; })[0];
    if (t) download(t.file, t.content);
  }

  /* ---------------- library ---------------- */
  function viewLibrary() {
    var types = ["all", "article", "video", "template", "tool", "community"];
    var chips = types.map(function (t) {
      return '<button type="button" class="filter ' + (libFilter === t ? "active" : "") + '" data-filter="' + t + '">' + (t === "all" ? "Everything" : t) + "</button>";
    }).join("");

    return '<p class="eyebrow">Library</p><h1>Read less, choose better.</h1>' +
      '<p class="lede">Four working templates and a short list of sources worth your time. All links open in a new tab.</p>' +
      '<div class="section-head"><h2>Templates</h2></div>' +
      '<div class="res-list">' + D.templates.map(function (t) {
        return '<div class="res"><div class="res-top"><h4>' + esc(t.title) + '</h4><span class="kind">download</span></div>' +
          "<p>" + esc(t.desc) + "</p>" +
          '<button type="button" class="btn small" data-download="' + t.id + '">Download</button></div>';
      }).join("") + "</div>" +
      '<div class="section-head"><h2>Sources</h2></div>' +
      '<div class="filters">' + chips + "</div>" +
      '<label class="field" style="max-width:340px;margin-bottom:1rem">Search the library<input type="text" id="libSearch" value="' + esc(libQuery) + '" placeholder="funding, legal, pricing…"></label>' +
      '<div class="res-list" id="resList">' + resListHtml() + "</div>";
  }

  function resListHtml() {
    var q = libQuery.trim().toLowerCase();
    var list = D.resources.filter(function (r) {
      var okType = libFilter === "all" || r.type === libFilter;
      var hay = (r.title + " " + r.note + " " + r.tags.join(" ")).toLowerCase();
      return okType && (!q || hay.indexOf(q) >= 0);
    });
    if (!list.length) return '<p class="muted">Nothing matches that filter.</p>';
    return list.map(function (r) {
      return '<a class="res" href="' + esc(r.url) + '" target="_blank" rel="noopener noreferrer">' +
        '<div class="res-top"><h4>' + esc(r.title) + '</h4><span class="kind">' + esc(r.type) + "</span></div>" +
        "<p>" + esc(r.note) + "</p>" +
        '<p style="font-size:.72rem;color:#7c8aa8">' + esc(r.url.replace(/^https?:\/\//, "").replace(/\/$/, "")) + "</p></a>";
    }).join("");
  }

  /* ---------------- community ---------------- */
  function viewCommunity() {
    var tracks = [];
    MODULES.forEach(function (m) { if (tracks.indexOf(m.track) < 0) tracks.push(m.track); });
    var opts = tracks.map(function (t) { return '<option value="' + esc(t) + '">' + esc(t) + "</option>"; }).join("");

    var local = (S.posts || []).map(function (p) {
      return '<article class="post"><div class="post-top"><span class="pill">' + esc(p.tag) + "</span><span>You · just now</span></div>" +
        "<h4>" + esc(p.title) + "</h4><p>" + esc(p.body) + "</p></article>";
    }).join("");

    var samples = D.posts.map(function (p) {
      return '<article class="post"><div class="post-top"><span class="pill mint">' + esc(p.tag) + "</span><span>" + esc(p.author) + "</span></div>" +
        "<h4>" + esc(p.title) + "</h4><p>" + esc(p.body) + "</p></article>";
    }).join("");

    return '<p class="eyebrow">Community</p><h1>Ask the question you are avoiding.</h1>' +
      '<p class="lede">This board is a demo: sample threads, and your own posts are stored only in this browser. There is no server and no other member will see them.</p>' +
      '<div class="grid two" style="margin-top:1.2rem">' +
      '<div>' +
      '<form class="card" id="postForm"><h3>Post to the board</h3>' +
      '<label class="field" style="margin-bottom:.6rem">Title<input type="text" name="title" required maxlength="120" placeholder="One sentence, specific"></label>' +
      '<label class="field" style="margin-bottom:.6rem">Topic<select name="tag">' + opts + "</select></label>" +
      '<label class="field" style="margin-bottom:.6rem">Details<textarea name="body" required maxlength="900" placeholder="What you tried, what happened, what you need"></textarea></label>' +
      '<button type="submit" class="btn primary">Post locally</button></form>' +
      '<div class="section-head"><h2>Your posts</h2></div>' +
      (local || '<p class="muted" style="font-size:.88rem">Nothing yet.</p>') +
      "</div>" +
      '<div><div class="section-head" style="margin-top:0"><h2>Sample threads</h2><span class="pill warn">Demo data</span></div>' +
      samples + "</div></div>";
  }

  /* ---------------- events ---------------- */
  document.addEventListener("click", function (e) {
    var el = e.target.closest ? e.target.closest("[data-action],[data-ob],[data-nav],[data-download],[data-filter]") : null;
    if (!el) return;

    if (el.hasAttribute("data-ob")) {
      ob.answers[el.getAttribute("data-ob")] = el.getAttribute("data-val");
      render();
      return;
    }

    var action = el.getAttribute("data-action");

    if (action === "ob-next") {
      var step = OB_STEPS[ob.step];
      if (!ob.answers[step.key]) return;
      if (ob.step < OB_STEPS.length - 1) { ob.step += 1; render(); goTop(); }
      return;
    }
    if (action === "ob-back") {
      if (ob.step > 0) { ob.step -= 1; render(); goTop(); }
      return;
    }
    if (action === "ob-finish") { finishOnboarding(); return; }

    if (action === "quiz-submit") return;

    if (action === "quiz-retake") {
      var qid = el.getAttribute("data-id");
      delete S.quiz[qid];
      save(); render();
      return;
    }

    if (action === "sim-start") { simStart(); return; }
    if (action === "sim-choice") { simChoice(parseInt(el.getAttribute("data-i"), 10)); return; }
    if (action === "sim-restart") { S.sim = null; save(); render(); return; }

    if (action === "swot-save") {
      S.toolData.swot = collectSwot();
      S.tools.swot = true;
      save(); checkBadges(); updateHud();
      var st = document.getElementById("swotState");
      if (st) st.textContent = "Saved " + new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
      toast("SWOT saved on this device.");
      return;
    }

    if (action === "download") {
      var did = el.getAttribute("data-id");
      if (did === "swot-txt") {
        var s = S.toolData.swot || {};
        download("swot.txt", "SWOT\n\nSTRENGTHS\n" + (s.s || "") + "\n\nWEAKNESSES\n" + (s.w || "") + "\n\nOPPORTUNITIES\n" + (s.o || "") + "\n\nTHREATS\n" + (s.t || "") + "\n");
      } else if (did === "persona-txt") {
        var p = S.toolData.persona || {};
        download("buyer-persona.txt", "BUYER PERSONA\n\nWho: " + (p.name || "") + "\nContext: " + (p.context || "") + "\nTrigger: " + (p.trigger || "") + "\nCurrent workaround: " + (p.workaround || "") + "\nBudget: " + (p.budget || "") + "\nDesired outcome: " + (p.outcome || "") + "\n");
      }
      return;
    }

    var dl = el.getAttribute("data-download");
    if (dl) { downloadTemplate(dl); return; }

    var filter = el.getAttribute("data-filter");
    if (filter) {
      libFilter = filter;
      render();
      var search = document.getElementById("libSearch");
      if (search) { search.focus(); search.setSelectionRange(search.value.length, search.value.length); }
      return;
    }
  });

  document.addEventListener("submit", function (e) {
    if (e.target.id === "quizForm") {
      e.preventDefault();
      var id = e.target.getAttribute("data-id");
      submitQuiz(id, e.target);
    }
    if (e.target.id === "postForm") {
      e.preventDefault();
      var f = e.target;
      var title = f.title.value.trim();
      var body = f.body.value.trim();
      if (!title || !body) return;
      S.posts = S.posts || [];
      S.posts.unshift({ title: title, body: body, tag: f.tag.value });
      save();
      toast("Posted to the local board.", "Saved on this device");
      render();
    }
  });

  function submitQuiz(id, form) {
    var m = BY_ID[id];
    if (!m) return;
    var answers = [];
    for (var i = 0; i < m.quiz.length; i++) {
      var picked = form.querySelector('input[name="q' + i + '"]:checked');
      if (!picked) { toast("Answer every question first."); return; }
      answers.push(parseInt(picked.value, 10));
    }
    var score = answers.reduce(function (t, a, i) { return t + (a === m.quiz[i].a ? 1 : 0); }, 0);
    var first = !S.quiz[id];

    if (first) {
      S.quiz[id] = { score: score, total: m.quiz.length, answers: answers, at: Date.now() };
      S.xp += score * 15 + (score === m.quiz.length ? 25 : 0);
    } else if (score > S.quiz[id].score) {
      S.quiz[id].score = score;
      S.quiz[id].answers = answers;
    }

    if (!S.done[id]) {
      S.done[id] = true;
      S.xp += 50;
    }
    if (score === m.quiz.length) award("ace");
    checkBadges();
    save();
    toast("Score " + score + "/" + m.quiz.length + (S.done[id] ? " · module complete, +50 XP" : ""), "Checked");
    render();
  }

  function collectSwot() {
    var o = {};
    Array.prototype.forEach.call(document.querySelectorAll("[data-swot]"), function (el) {
      o[el.getAttribute("data-swot")] = el.value;
    });
    return o;
  }

  document.addEventListener("input", function (e) {
    var el = e.target;

    if (el.closest(".tool-form")) {
      var form = el.closest(".tool-form");
      var id = form.getAttribute("data-tool");
      var data = S.toolData[id] || {};
      data[el.getAttribute("data-tool-field")] = parseFloat(el.value) || 0;
      S.toolData[id] = data;
      save();
      calcTool(id);
      return;
    }

    if (el.hasAttribute("data-swot")) {
      S.toolData.swot = collectSwot();
      S.tools.swot = true;
      save();
      return;
    }

    if (el.hasAttribute("data-persona")) {
      var p = S.toolData.persona || {};
      p[el.getAttribute("data-persona")] = el.value;
      S.toolData.persona = p;
      S.tools.persona = true;
      save();
      var out = document.getElementById("toolOut");
      if (out) out.innerHTML = personaCard();
      updateHud();
      checkBadges();
      return;
    }

    if (el.id === "libSearch") {
      libQuery = el.value;
      var list = document.getElementById("resList");
      if (list) list.innerHTML = resListHtml();
      return;
    }
  });

  document.addEventListener("change", function (e) {
    if (e.target.id === "libSearch") {
      libQuery = e.target.value;
      var list = document.getElementById("resList");
      if (list) list.innerHTML = resListHtml();
    }
  });

  document.addEventListener("toggle", function (e) {
    var d = e.target;
    if (!d || d.tagName !== "DETAILS" || !d.open) return;
    var key = d.getAttribute("data-lesson");
    if (!key || S.lessons[key]) return;
    S.lessons[key] = true;
    S.xp += 10;
    save();
    var summary = d.querySelector("summary");
    if (summary && !summary.querySelector(".pill.done")) {
      var mark = document.createElement("span");
      mark.className = "pill done";
      mark.style.marginLeft = "auto";
      mark.textContent = "Read";
      summary.appendChild(mark);
    }
    award("first");
    checkBadges();
    updateHud();
    toast("+10 XP", "Lesson read");
  }, true);

  /* ---------------- init ---------------- */
  touchStreak();
  checkBadges();
  if (!location.hash) location.hash = S.profile ? "#/dashboard" : "#/onboarding";
  render();
  updateHud();
})();
