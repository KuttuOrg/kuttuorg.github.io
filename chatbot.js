/* Kuttu website helper: a small question-and-answer chat window.
   How it works: it matches the words a visitor types against the topics in TOPICS below and shows the written answer.
   Privacy: it runs entirely in the visitor's browser. What they type is not sent anywhere, not stored, and not counted.
   WhatsApp opens only if the visitor taps the WhatsApp button (the question is then put in the message for them to send).
   To change an answer, edit its text in TOPICS. To add a topic, add one object: { id, label (optional quick button), keys (words), a (answer), acts (buttons) }.
   Keep every answer true to the website (prices, offer dates, what Kuttu does not do). English only. */
(function () {
  var WA = 'https://wa.me/917207629246?text=';
  function wa(t) { return WA + encodeURIComponent(t); }
  var TOPICS = [
    { id: 'price', label: 'Price', keys: ['price', 'prices', 'pricing', 'cost', 'how much', 'rate', 'rates', 'rupee', 'rupees', 'rs', 'offer', 'discount', 'fees', 'charge', 'expensive', 'cheap', '999', '4999', '4,999', 'edition', 'plan'],
      a: 'There are two desktop editions, both with all eleven modules, one PC and one year. Offline: Rs 999 (list price Rs 24,999). Online Backup: Rs 4,999 (list price Rs 50,000), which adds an hourly cloud copy of your data. These offer prices are valid only till 31 December 2026. Kuttu Web is billed per month and its price is not announced yet.',
      acts: [{ t: 'See pricing', h: '/#pricing' }, { t: 'Ask on WhatsApp', h: wa('Hi Kuttu, I have a question about the price') }] },
    { id: 'buy', label: 'How to buy', keys: ['buy', 'purchase', 'order', 'pay', 'payment', 'download', 'install link', 'get kuttu', 'start'],
      a: 'Message us on WhatsApp or call +91 72076 29246. We take your shop details, confirm the payment and send you a private download link for the installer. After installing, Kuttu shows your PC\'s Machine ID; send it to us and we reply with your license key.',
      acts: [{ t: 'Buy on WhatsApp', h: wa('Hi Kuttu, I\'d like to buy the Kuttu Application') }, { t: 'Call', h: 'tel:+917207629246' }] },
    { id: 'what', label: 'What does Kuttu do?', keys: ['what is kuttu', 'what does kuttu', 'what kuttu', 'about kuttu', 'feature', 'features', 'module', 'modules', 'billing', 'stock', 'inventory', 'stitching', 'salary', 'attendance', 'report', 'reports', 'analytics', 'bill', 'bills', 'invoice', 'ledger', 'software do'],
      a: 'Kuttu is a Windows software suite for the garment industry. Eleven modules open from one Home screen: Astar, Saree and Readymade ledgers and sales, Stitching Measurement, Employee Tracker, Print Bill, Stationery and Misc Purchases, Salary and Rent, plus Consolidated Analytics and GST Summary for reports across the whole shop. It handles stock, GST bills, stitching orders, who cut and stitched what, attendance, salary and reports.',
      acts: [{ t: 'See all modules', h: '/#suite' }] },
    { id: 'who', label: 'Is it for my shop?', keys: ['boutique', 'saree', 'tailor', 'tailoring', 'factory', 'wholesale', 'wholesaler', 'showroom', 'readymade', 'my shop', 'my business', 'suit', 'for whom', 'who is'],
      a: 'Kuttu is for the whole garment industry: wholesalers, factories, garment showrooms, saree shops, readymade stores, boutiques and tailoring units. You can use only the modules you need. It does not yet do challans, e-way bills or production planning, so if you need those, please ask us before you buy.',
      acts: [{ t: 'Ask if it suits me', h: wa('Hi Kuttu, please tell me if Kuttu suits my shop') }] },
    { id: 'offline', label: 'Works offline?', keys: ['offline', 'internet', 'wifi', 'connection', 'without net', 'no internet'],
      a: 'Yes. Kuttu works fully offline: billing, stock, stitching orders and staff records need no internet. Internet is used only if you share a bill by WhatsApp and, in the Online Backup edition, to send the hourly backup copy.',
      acts: [] },
    { id: 'data', label: 'Is my data safe?', keys: ['data', 'safe', 'secure', 'security', 'backup', 'back up', 'online backup', 'cloud', 'restore', 'lose', 'lost', 'privacy', 'where stored'],
      a: 'Your records stay on your own PC, in a folder you choose. With the Offline edition nothing is uploaded, so please back up the data folder every week. The Online Backup edition also sends a backup copy to the Kuttu cloud every hour while Kuttu is open, keeps the copies for one week, and we can guide you through restoring one.',
      acts: [{ t: 'Privacy Note', h: '/#privacy' }] },
    { id: 'license', label: 'License and activation', keys: ['license', 'licence', 'key', 'activate', 'activation', 'machine id', 'one pc', 'how many pc', 'computers', 'another pc', 'second pc'],
      a: 'One license covers one PC for one year. When you first open Kuttu it shows your PC\'s Machine ID; send it to us and we reply with a key made for that PC. If you want Kuttu on another computer, that needs its own license.',
      acts: [] },
    { id: 'renew', keys: ['renew', 'renewal', 'expire', 'expiry', 'after one year', 'after a year', 'year end'],
      a: 'Kuttu reminds you on the Home screen about 60 days before your license ends. To renew, send us your Machine ID again and we reply with a new key. Your data and settings stay exactly as they are, and your records are never deleted or locked. Ask us on WhatsApp for the renewal price.',
      acts: [{ t: 'Ask renewal price', h: wa('Hi Kuttu, what is the renewal price?') }] },
    { id: 'upgrade', keys: ['upgrade', 'upgrade to online', 'upgrade to online backup', 'upgrade my edition', 'move to online', 'offline to online', 'switch edition'],
      a: 'Yes, you can start with Offline and move to Online Backup later. The upgrade is Rs 4,000. Message us and we reply with a new license key for your PC; you click Renew License in System Settings, paste the key and activate. No reinstall, and your data stays as it is.',
      acts: [{ t: 'Ask for the upgrade', h: wa('Hi Kuttu, I\'d like to upgrade to the Online Backup edition') }] },
    { id: 'lang', keys: ['hindi', 'telugu', 'language', 'english', 'languages'],
      a: 'Every screen can be switched between English, Hindi and Telugu from the Home screen. Bills and messages sent to your customers stay in English. We can also help you set up in Telugu or Hindi.',
      acts: [] },
    { id: 'web', keys: ['web', 'browser', 'phone', 'mobile', 'app', 'android', 'iphone', 'tablet', 'any device'],
      a: 'Kuttu Web is available in beta: you use Kuttu from a browser and your shop records are kept in a cloud database we host for you. The Windows suite is still the main product and works fully offline. Message us on WhatsApp if you want to try Kuttu Web for your shop.',
      acts: [{ t: 'Tell me about Kuttu Web', h: wa('Hi Kuttu, I\'d like to try Kuttu Web') }] },
    { id: 'gst', keys: ['e way', 'eway', 'e way bill', 'gst', 'gstin', 'tax', 'cgst', 'sgst', 'igst', 'hsn', 'companies', 'company'],
      a: 'Kuttu makes GST bills with CGST, SGST and IGST, and you can add up to five companies, each with its own GSTIN, address and bill numbers. The GST Summary shows one company or all of them. A company with no GSTIN charges no GST. It does not yet do e-way bills.',
      acts: [] },
    { id: 'system', keys: ['windows', 'requirement', 'requirements', 'system', 'laptop', 'computer', 'disk', 'space', 'printer', 'scanner', 'barcode', 'mac', 'linux'],
      a: 'You need a Windows 10 or 11 (64-bit) PC with about 1 GB of free space. No administrator rights or internet are needed. A printer, WhatsApp on the PC and a USB barcode scanner are optional. The desktop suite does not run on Mac or Linux.',
      acts: [] },
    { id: 'updates', keys: ['update', 'updates', 'upgrade free', 'new version', 'bug', 'fix'],
      a: 'Common updates with bug fixes are free for customers who have bought a license. We send the new installer; you run it over your existing Kuttu and your data and license are kept. Updates never install by themselves. New modules are paid add-ons, and we tell you the price first.',
      acts: [] },
    { id: 'refund', keys: ['refund', 'money back', 'cancel', 'return'],
      a: 'There are no refunds: your purchase covers a one-year license for one PC that we activate for you. Please ask us any questions before you buy. The full wording is in the Terms and Conditions.',
      acts: [{ t: 'Terms and Conditions', h: '/#terms' }] },
    { id: 'custom', keys: ['custom', 'customise', 'customize', 'special', 'change for my', 'enhancement'],
      a: 'Yes. A customised change is built for the customer who asks for it and stays with that customer. It is charged separately, and we agree the price with you before we start.',
      acts: [{ t: 'Ask on WhatsApp', h: wa('Hi Kuttu, I need a change made for my business') }] },
    { id: 'pc', keys: ['change pc', 'new pc', 'reinstall', 'formatted', 'format', 'new computer', 'changed my'],
      a: 'The license is tied to the PC. If you change your computer or reinstall Windows, Kuttu shows a new Machine ID; send it to us and we reply with a new key. Copy your data folder across to keep your records.',
      acts: [] },
    { id: 'help', label: 'Talk to someone', keys: ['help', 'support', 'contact', 'call', 'phone number', 'whatsapp', 'email', 'talk', 'human', 'person', 'agent', 'problem', 'issue', 'not working', 'error', 'train', 'training', 'demo', 'trial', 'free trial'],
      a: 'You can reach us on WhatsApp or call +91 72076 29246, or write to enquiry@kuttu.org. We help you install, set up and learn Kuttu in Telugu, Hindi or English. There is no free trial listed on this website; message us and we will show you what Kuttu does for your shop and tell you honestly whether it suits you.',
      acts: [{ t: 'WhatsApp us', h: wa('Hi Kuttu, I need some help') }, { t: 'Call', h: 'tel:+917207629246' }] },
    { id: 'ads', label: 'Advertise with Kuttu', keys: ['advertise', 'advertising', 'advert', 'ad ', 'ads', 'sponsor', 'sponsored', 'vendor', 'directory', 'list my', 'supplier', 'listing', 'promote'],
      a: 'If you sell to the garment trade, you can advertise with Kuttu. A directory listing is free for the first 3 months, then Rs 300 a month. A Featured listing is Rs 1,000 a month. A Homepage sponsor strip is Rs 2,500 a month. Paid items are always marked Sponsored, we never share a Kuttu user\'s records, and there is no lock-in.',
      acts: [{ t: 'Advertise page', h: '/advertise.html' }, { t: 'Vendor directory', h: '/vendors.html' }, { t: 'List my business', h: wa('Hi Kuttu, I\'d like to advertise my business with Kuttu') }] },
    { id: 'jobs', keys: ['job', 'jobs', 'career', 'careers', 'hiring', 'vacancy', 'vacancies', 'work with kuttu', 'work at kuttu'],
      a: 'We are a small team making software that garment businesses use every day. You can see the open roles and apply on the Careers page.',
      acts: [{ t: 'Careers', h: '/careers.html' }] },
    { id: 'hello', keys: ['hello', 'hi', 'hey', 'namaste', 'good morning', 'good evening'],
      a: 'Hello! I can answer common questions about Kuttu: price, how to buy, what it does, your data, licenses and advertising. Pick a question below or type your own.',
      acts: [] },
    { id: 'thanks', keys: ['thanks', 'thank you', 'ok thanks', 'great'],
      a: 'You\'re welcome! If you want to talk to a person, tap the WhatsApp button below.',
      acts: [{ t: 'WhatsApp us', h: wa('Hi Kuttu, I have a question') }] }
  ];
  var QUICK = TOPICS.filter(function (t) { return t.label; });

  function norm(s) { return ' ' + String(s).toLowerCase().replace(/[^a-z0-9, ]+/g, ' ').replace(/\s+/g, ' ') + ' '; }
  function score(text, t) {
    var n = 0;
    t.keys.forEach(function (k) {
      var kk = k.toLowerCase().trim().replace(/[^a-z0-9, ]+/g, ' ').replace(/\s+/g, ' ');
      if (!kk) return;
      var re = new RegExp(' ' + kk + '(?:s|es)? ');   // keys hold only letters, digits, commas and spaces
      if (re.test(text)) n += kk.indexOf(' ') >= 0 ? 3 : 2;
    });
    return n;
  }
  function answer(q) {
    if (/[ऀ-ॿఀ-౿]/.test(q)) {
      return { a: 'I can reply in English only. For Hindi or Telugu, please message us on WhatsApp and we will help you.', acts: [{ t: 'WhatsApp us', h: wa(q) }] };
    }
    var text = norm(q), best = null, bs = 0;
    TOPICS.forEach(function (t) { var s = score(text, t); if (s > bs) { bs = s; best = t; } });
    if (best && bs > 0) return best;
    return { a: 'I am not sure I understood that. You can pick one of the questions below, or message us on WhatsApp and a person will answer.', acts: [{ t: 'Send this on WhatsApp', h: wa('Hi Kuttu, ' + q.slice(0, 300)) }] };
  }

  var css = '.kbot-btn{position:fixed;right:16px;bottom:18px;z-index:70;display:flex;align-items:center;gap:8px;border:0;border-radius:999px;background:#0d5f5f;color:#fff;font:700 .95rem/1 system-ui,-apple-system,"Segoe UI",sans-serif;padding:13px 18px;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.25)}' +
    '.kbot-btn:focus-visible,.kbot-x:focus-visible,.kbot-chip:focus-visible,.kbot-send:focus-visible,.kbot-in:focus-visible,.kbot-act:focus-visible,.kbot-more:focus-visible{outline:3px solid #f0d78a;outline-offset:2px}' +
    '.kbot{position:fixed;right:16px;bottom:18px;z-index:71;width:min(360px,calc(100vw - 32px));height:min(520px,calc(100vh - 36px));display:none;flex-direction:column;background:#fbf8f2;color:#1c2626;border:1px solid #e4ddd0;border-radius:16px;box-shadow:0 10px 34px rgba(0,0,0,.3);overflow:hidden;font:15px/1.45 system-ui,-apple-system,"Segoe UI",sans-serif}' +
    '.kbot.on{display:flex}' +
    '.kbot-h{display:flex;align-items:center;justify-content:space-between;background:#083f3f;color:#fff;padding:12px 14px;font-weight:700}' +
    '.kbot-x{border:0;background:transparent;color:#fff;font-size:1.4rem;line-height:1;cursor:pointer;padding:2px 8px;border-radius:8px}' +
    '.kbot-log{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px}' +
    '.kbot-m{max-width:88%;padding:9px 12px;border-radius:14px;white-space:pre-wrap;overflow-wrap:anywhere}' +
    '.kbot-m.bot{align-self:flex-start;background:#fff;border:1px solid #e4ddd0}' +
    '.kbot-m.me{align-self:flex-end;background:#0d5f5f;color:#fff}' +
    '.kbot-acts,.kbot-chips{display:flex;gap:6px;flex-wrap:wrap}' +
    '.kbot-act{display:inline-block;background:#0d5f5f;color:#fff;text-decoration:none;font-weight:700;font-size:.85rem;padding:7px 12px;border-radius:999px}' +
    '.kbot-chips{padding:0 12px 8px;max-height:132px;overflow-y:auto}.kbot-chips.off{display:none}' +
    '.kbot-more{width:100%;border:0;border-top:1px solid #e4ddd0;background:#fbf8f2;color:#0d5f5f;font:700 .85rem system-ui,-apple-system,"Segoe UI",sans-serif;padding:8px 14px;text-align:left;cursor:pointer}' +
    '.kbot-chip{border:2px solid #0d5f5f;background:#fff;color:#0d5f5f;font:700 .82rem system-ui,sans-serif;padding:5px 11px;border-radius:999px;cursor:pointer}' +
    '.kbot-f{display:flex;gap:8px;padding:10px 12px;border-top:1px solid #e4ddd0;background:#fff}' +
    '.kbot-in{flex:1;min-width:0;border:2px solid #0d5f5f;border-radius:999px;padding:9px 14px;font:inherit;background:#fff;color:#1c2626}' +
    '.kbot-send{border:0;border-radius:999px;background:#0d5f5f;color:#fff;font-weight:700;padding:0 16px;cursor:pointer}' +
    '.kbot-note{font-size:.74rem;color:#5a6a68;padding:0 12px 10px;background:#fff}' +
    '@media (prefers-reduced-motion:no-preference){.kbot.on{animation:kbotin .18s ease-out}@keyframes kbotin{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var btn = document.createElement('button');
  btn.type = 'button'; btn.className = 'kbot-btn'; btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-controls', 'kbot');
  btn.textContent = 'Chat with us';
  var box = document.createElement('div');
  box.id = 'kbot'; box.className = 'kbot'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-label', 'Kuttu helper chat');
  box.innerHTML = '<div class="kbot-h"><span>Kuttu helper</span><button type="button" class="kbot-x" aria-label="Close chat">&times;</button></div>' +
    '<div class="kbot-log" role="log" aria-live="polite"></div><button type="button" class="kbot-more" aria-expanded="true">Questions &#9662;</button><div class="kbot-chips"></div>' +
    '<form class="kbot-f"><input class="kbot-in" type="text" maxlength="200" placeholder="Type your question" aria-label="Type your question" autocomplete="off"><button class="kbot-send" type="submit">Send</button></form>' +
    '<div class="kbot-note">Automatic answers from this website. What you type stays in your browser.</div>';
  document.body.appendChild(btn); document.body.appendChild(box);
  var log = box.querySelector('.kbot-log'), chips = box.querySelector('.kbot-chips'), more = box.querySelector('.kbot-more'), form = box.querySelector('form'), input = box.querySelector('input');

  function place() {
    var wf = document.querySelector('.wa-float'), b = wf ? 88 : 18;
    btn.style.bottom = b + 'px'; box.style.bottom = (wf ? 88 : 18) + 'px';
  }
  place();

  function add(text, who, acts) {
    var m = document.createElement('div'); m.className = 'kbot-m ' + who; m.textContent = text; log.appendChild(m);
    if (acts && acts.length) {
      var w = document.createElement('div'); w.className = 'kbot-acts';
      acts.forEach(function (a) {
        var l = document.createElement('a'); l.className = 'kbot-act'; l.textContent = a.t; l.href = a.h;
        if (/^https?:/.test(a.h)) { l.target = '_blank'; l.rel = 'noopener'; }
        w.appendChild(l);
      });
      log.appendChild(w);
    }
    log.scrollTop = log.scrollHeight;
  }
  function chipsFor() {
    chips.innerHTML = '';
    QUICK.forEach(function (t) {
      var c = document.createElement('button'); c.type = 'button'; c.className = 'kbot-chip'; c.textContent = t.label;
      c.addEventListener('click', function () { ask(t.label, t); });
      chips.appendChild(c);
    });
  }
  /* The question buttons hide once a question is asked, so the answer has room; the Questions bar brings them back. */
  function setChips(openIt) {
    chips.classList.toggle('off', !openIt);
    more.setAttribute('aria-expanded', openIt ? 'true' : 'false');
    more.innerHTML = openIt ? 'Questions &#9662;' : 'Questions &#9656;';
  }
  more.addEventListener('click', function () { setChips(chips.classList.contains('off')); });
  function ask(q, topic) {
    setChips(false);
    add(q, 'me');
    var r = topic || answer(q);
    add(r.a, 'bot', r.acts);
  }
  var started = false;
  function open() {
    box.classList.add('on'); btn.style.display = 'none'; btn.setAttribute('aria-expanded', 'true');
    if (!started) { started = true; add('Hello! I am the Kuttu helper. Ask me about price, how to buy, what Kuttu does, your data, licenses or advertising. For anything else, a person answers on WhatsApp.', 'bot', [{ t: 'WhatsApp us', h: wa('Hi Kuttu, I have a question') }]); chipsFor(); }
    input.focus();
  }
  function close() { box.classList.remove('on'); btn.style.display = ''; btn.setAttribute('aria-expanded', 'false'); btn.focus(); }
  btn.addEventListener('click', open);
  box.querySelector('.kbot-x').addEventListener('click', close);
  box.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var q = input.value.trim(); if (!q) return;
    input.value = ''; ask(q);
  });
  window.KuttuChat = { answer: answer, TOPICS: TOPICS };
})();
