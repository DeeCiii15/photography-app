Gallery uploads — categories & photo shoots
==========================================

THREE LEVELS ON THE SITE
------------------------
  1. Category polaroid (home page) — Weddings, Couples / Engagement, etc.
  2. Shoot polaroids — one per session inside that category
  3. Photos — full gallery for one shoot


ADD A NEW PHOTO SHOOT (2 steps)
-------------------------------

STEP 1 — Create a folder and add images:

  public/images/galleries/{category-folder}/{shoot-slug}/
    cover.jpg     ← polaroid thumbnail (any favorite shot)
    (other photos with any names — sync renames them)

  Examples:
    couples-engagement/couple-2/
    weddings/smith-wedding/

  Category folders:
    weddings/  motherhood/  couples-engagement/
    special-events/  family/  portraits/


STEP 2 — Register the shoot in code:

  File: src/lib/portfolioShoots.ts

  Add under the right category:

    { slug: 'couple-2', name: 'Couple 2' },

  slug must match your folder name exactly.


STEP 3 — Sync (renames photos & refreshes the site list):

    npm run galleries:sync

  This runs automatically before npm run dev and npm run build.
  You can also run it manually after uploading new files.


WHAT SYNC DOES
--------------
  • Renames gallery photos to 01.jpg, 02.jpg, 03.jpg, …
  • Normalizes cover.jpg
  • Updates src/lib/galleryManifest.json (the site reads this)


TIPS
----
  • Drop photos in with camera names — sync handles renaming
  • Use lowercase folder slugs (couple-2, not Couple-2)
  • JPG recommended; large files over ~10 MB may load slowly
  • After sync, hard-refresh the browser (Ctrl+Shift+R)
