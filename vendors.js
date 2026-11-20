/* Kuttu vendor directory: the listings.
   To add a real vendor, add one object to VENDORS (and delete a sample one). Fields:
     name      business name
     category  one of the keys in CATEGORIES (vendors.html)
     area      one of the keys in AREAS (vendors.html), or 'other'
     about     one or two plain sentences: what they sell
     phone     digits with country code, e.g. '917207629246' (used for Call and WhatsApp)
     featured  true = top of its category with a "Featured" badge (paid)
     sponsored true = shows a "Sponsored" tag (every paid listing must show it)
     sample    true = a placeholder, shown as "Sample listing" with no Call or WhatsApp button
   Nothing here is sent anywhere: the page filters this list in the visitor's own browser. */
window.KUTTU_VENDORS = [
  { sample: true, name: 'Your astar and lining shop could be here', category: 'astar', area: 'charminar',
    about: 'Tell factories and tailors which astar, lining and interlining you stock.' },
  { sample: true, name: 'Your fabric shop could be here', category: 'fabric', area: 'secunderabad',
    about: 'Show the fabrics you sell and the minimum quantity.' },
  { sample: true, name: 'Your buttons and trims shop could be here', category: 'trims', area: 'dilsukhnagar',
    about: 'Buttons, zips, laces and threads for tailors and boutiques.' },
  { sample: true, name: 'Your machine and spares dealer could be here', category: 'machines', area: 'kukatpally',
    about: 'Sewing machines, needles and spares, with service.' },
  { sample: true, name: 'Your packaging supplier could be here', category: 'packaging', area: 'madhapur',
    about: 'Poly bags, hangers, boxes and labels for garment shops.' },
  { sample: true, name: 'Your transport service could be here', category: 'transport', area: 'banjara',
    about: 'Carry goods between factories, wholesalers and shops.' }
];
