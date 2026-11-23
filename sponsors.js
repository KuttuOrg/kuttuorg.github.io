/* Kuttu: homepage sponsor strip (the "Homepage sponsor strip" on the Advertise page, Rs 2,500 a month).
   It shows nothing while SPONSORS is empty. To start a sponsor, add one object; to stop, delete it.
     name   business name
     line   one line about what they sell (keep it short and true)
     url    https:// link opened when the strip is tapped (a website, or https://wa.me/91XXXXXXXXXX)
     logo   optional https:// or relative image address (square, about 120 px)
   The strip always carries the word "Sponsored". With more than one sponsor, they take turns on each visit. */
window.KUTTU_SPONSORS = [
];
(function () {
  var list = (window.KUTTU_SPONSORS || []).filter(function (s) { return s && s.name && /^https:\/\//.test(s.url || ''); });
  var band = document.getElementById('sponsor-band');
  if (!band || !list.length) return;
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  var s = list[Math.floor(Math.random() * list.length)];
  var logo = s.logo ? '<img src="' + esc(s.logo) + '" alt="" width="46" height="46" style="border-radius:8px;flex:none">' : '';
  band.querySelector('.wrap').innerHTML =
    '<a class="ad" href="' + esc(s.url) + '" target="_blank" rel="sponsored noopener" style="gap:14px;text-decoration:none;color:inherit">' +
    '<small>Sponsored</small>' + logo + '<span><b>' + esc(s.name) + '</b>' + (s.line ? ': ' + esc(s.line) : '') + '</span></a>';
  band.hidden = false;
})();
