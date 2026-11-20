/* Kuttu: location-based adverts (sample).
   Privacy: the visitor's position is used only inside their own browser to pick the
   nearest area. It is never sent to a server and never stored. */
(function () {
  var AREAS = [
    { key: 'charminar', name: 'Charminar', lat: 17.3616, lng: 78.4747 },
    { key: 'banjara', name: 'Banjara Hills', lat: 17.4156, lng: 78.4347 },
    { key: 'secunderabad', name: 'Secunderabad', lat: 17.4399, lng: 78.4983 },
    { key: 'kukatpally', name: 'Kukatpally', lat: 17.4948, lng: 78.3996 },
    { key: 'madhapur', name: 'Madhapur', lat: 17.4483, lng: 78.3915 },
    { key: 'dilsukhnagar', name: 'Dilsukhnagar', lat: 17.3688, lng: 78.5247 }
  ];
  var MAX_KM = 8; // farther than this from every area: show the general list
  // SAMPLE adverts. Replace with paying advertisers; every paid advert shows "Sponsored".
  var ADS = {
    charminar: [
      { type: 'Wholesale store', title: 'Your wholesale store could be here', text: 'Reach shop owners buying around Charminar.' },
      { type: 'Boutique', title: 'Your boutique could be here', text: 'Show your collection to people nearby.' }
    ],
    banjara: [
      { type: 'Designer boutique', title: 'Your designer boutique could be here', text: 'Premium customers browse near Banjara Hills.' },
      { type: 'Restaurant', title: 'Your restaurant could be here', text: 'Be seen by people close to your door.' }
    ],
    secunderabad: [
      { type: 'Electronics store', title: 'Your electronics store could be here', text: 'Reach buyers around Secunderabad.' },
      { type: 'Supermarket', title: 'Your supermarket could be here', text: 'Show offers to families nearby.' }
    ],
    kukatpally: [
      { type: 'Fabric and trims dealer', title: 'Your fabric or trims shop could be here', text: 'Reach tailors and small units around Kukatpally.' },
      { type: 'Supermarket', title: 'Your supermarket could be here', text: 'Show offers to families nearby.' }
    ],
    madhapur: [
      { type: 'Designer boutique', title: 'Your designer boutique could be here', text: 'Reach working professionals near Madhapur.' },
      { type: 'Restaurant or cafe', title: 'Your restaurant could be here', text: 'Be seen by people close to your door.' }
    ],
    dilsukhnagar: [
      { type: 'Wholesale store', title: 'Your wholesale store could be here', text: 'Reach shop owners buying around Dilsukhnagar.' },
      { type: 'Electronics store', title: 'Your electronics store could be here', text: 'Reach buyers nearby.' }
    ],
    general: [
      { type: 'Any business', title: 'Your business could be here', text: 'Tell us your area and we show you to people near it.' }
    ]
  };

  function km(a, b, c, d) {
    var r = Math.PI / 180, x = (c - a) * r, y = (d - b) * r;
    var h = Math.sin(x / 2) * Math.sin(x / 2) + Math.cos(a * r) * Math.cos(c * r) * Math.sin(y / 2) * Math.sin(y / 2);
    return 12742 * Math.asin(Math.sqrt(h));
  }
  function nearest(lat, lng) {
    var best = null, bd = 1e9;
    AREAS.forEach(function (a) {
      var d = km(lat, lng, a.lat, a.lng);
      if (d < bd) { bd = d; best = a; }
    });
    return bd <= MAX_KM ? best : null;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  window.KuttuNearby = { nearest: nearest, ADS: ADS, AREAS: AREAS };

  var root = document.getElementById('nearby');
  if (!root) return;
  var out = root.querySelector('[data-out]'), msg = root.querySelector('[data-msg]'),
      sel = root.querySelector('select'), btn = root.querySelector('[data-loc]');
  AREAS.forEach(function (a) { var o = document.createElement('option'); o.value = a.key; o.textContent = a.name; sel.appendChild(o); });

  function show(key, label) {
    var list = ADS[key] || ADS.general;
    out.innerHTML = list.map(function (a) {
      return '<div class="card"><h3>' + esc(a.title) + ' <span class="tag" style="position:static;display:inline-block;margin-left:6px;font-size:.7rem">Sponsored sample</span></h3><p><b>' + esc(a.type) + '</b> &middot; ' + esc(a.text) + '</p></div>';
    }).join('');
    msg.textContent = label;
  }
  sel.addEventListener('change', function () { if (sel.value) show(sel.value, 'Showing adverts for ' + sel.options[sel.selectedIndex].text + '.'); });
  btn.addEventListener('click', function () {
    if (!navigator.geolocation) { msg.textContent = 'Your browser cannot share location. Please pick an area.'; return; }
    msg.textContent = 'Asking your browser for your location...';
    navigator.geolocation.getCurrentPosition(function (p) {
      var a = nearest(p.coords.latitude, p.coords.longitude);
      if (a) { sel.value = a.key; show(a.key, 'You seem to be near ' + a.name + '. Your location stayed in your browser.'); }
      else { sel.value = ''; show('general', 'No listed area near you yet. Pick one from the list.'); }
    }, function () { msg.textContent = 'Location was not shared. Please pick an area instead.'; }, { timeout: 10000, maximumAge: 600000 });
  });
  show('general', 'Pick your area, or let your browser find it.');
})();
