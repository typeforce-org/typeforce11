<?php
  $title = 'Typeforce 11';
  $description = 'Typeforce 11: the annual Chicago-based exhibit celebrating type is now open for submissions.';
  $image = 'http://typeforce.com/11/assets/images/social-media-sharing.png';
  $imageW = 2400;
  $imageH = 1350;
  $url = 'http://typeforce.com/11/';
  $author = 'Bryant Smith';
  $cta_url = '#';
  $ga_tracking = 'UA-998109-32';
  $twitter_handle = '@firebellydesign';
  $script_version = date_timestamp_get(date_create());
  $cta_url = "submit/";

  $winners = [ // [winner,url]
    'Alex Sanchez',
    'Ariel Rudolph',
    'Astha Thakkar',
    'Brandon & Sir Charles',
    'Colleen',
    'David Wright & Hannah Mowrey',
    'Elaine Lopez',
    'Grace Harms',
    'Heather Snyder Quinn',
    'Holly Akkerman',
    'Hope Meng',
    'Hyeong Geun Song',
    'Jennifer Farrell',
    'Jeremy Hlinak',
    'Jessica Mueller',
    'Jim Zimmer',
    'Span',
    'Judy K Suh',
    'Kaleb Dean',
    'Kyle Eertmoed',
    'Mia Cinelli',
    'Mohamed Samir',
    'Taekyeom Lee ',
  ];
?>

<!doctype html>
<!--[if IE 8]> <html lang="en" class="no-js ie8 lt-ie9 lt-ie10"> <![endif]-->
<!--[if IE 9 ]> <html lang="en" class="no-js ie9 lt-ie10"> <![endif]-->
<!--[if gt IE 9]><!--> <html lang="en" class="no-js"> <!--<![endif]-->
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <title><?= $title ?></title>
    <!-- BEGIN meta -->
    <meta itemprop="name" content="<?= $title ?>">
    <meta itemprop="image" content="<?= $image ?>">
    <meta itemprop="description" content="<?= $description ?>">
    <meta name="description" content="<?= $description ?>">
    <meta name="author" content="<?= $author ?>">
    <!-- facebook/og -->
    <meta property="og:title" content="<?= $title ?>">
    <meta property="og:type" content="website">
    <meta property="og:description" content="<?= $description ?>">
    <meta property="og:image" content="<?= $image ?>">
    <meta property="og:image:width" content="<?= $imageW ?>">
    <meta property="og:image:height" content="<?= $imageH ?>">
    <meta property="og:url" content="<?= $url ?>">
    <meta property="og:site_name" content="<?= $title ?>">
    <meta property="og:locale" content="en_us">
    <!-- twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?= $title ?>">
    <meta name="twitter:creator" content="<?= $twitter_handle ?>">
    <meta name="twitter:site" content="<?= $twitter_handle ?>">
    <meta name="twitter:description" content="<?= $description ?>">
    <meta name="twitter:image" content="<?= $image ?>">
    <meta name="twitter:url" content="<?= $url ?>">
    <!-- END meta -->
    <link rel="stylesheet" href="assets/css/main.min.css?<?= $script_version ?>">
    <link rel="shortcut icon" type="image/ico" href="assets/images/favicon.png">
  </head>
  <body>
    <div class="load-screen" aria-hidden="true"><div class="load-text">Loading...</div></div>
    <header class="site-header">
      <div class="header-wrap">
        <h1 class="title">Typeforce 11</h1>
        <div class="theater">
          <div class="eleven" aria-hidden="true">
            <span>1</span><span>1</span>
          </div>
        </div>
        <p class="announcement">
          Opening Night<br>
          2 — 28 — 20
        </p>
        <div class="winners">
          <h2>Artists</h2>
          <ul >
            <?php foreach ($winners as $winner) { echo '<li>'.$winner.'</li>'; } ?>
          </ul>
        </div>
      </div>
    </header>
    <div class="content-wrap">
      <main class="site-main row">
        <div class="module half-lg">
          <h2>Typeforce</h2>
          <p>An annual exhibit celebrating wildly talented, emerging typographic artists and designers.</p>
          <h2>Eligibility</h2>
          <p>All type and typography related entries are eligible. This is not a Typeface design exhibition, so please only include work that’s gallery friendly. Ideal submissions are a series of pieces or enough work to take up a 10'×10' wall. Submissions can be by anyone associated with the entry (studio or individual).</p>
        </div>
        <div class="module quarter-lg two-thirds-md" id="contact">
          <h2>Contact</h2>
          <p>
            For questions email:<br>
            <a href="mailto:info@typeforce.com">info@typeforce.com</a>
          </p>
        </div>
        <div class="module quarter-lg third-md" id="social">
          <h2 class="sr-only">Social</h2>
          <ul class="semantic-only-list">
            <li><a href="https://www.instagram.com/typeforce/">Instagram</a></li>
            <li><a href="https://www.facebook.com/events/3846945538664346/">Facebook</a></li>
            <li><a href="https://www.eventbrite.com/e/typeforce-11-opening-night-tickets-83885853847">Eventbrite</a></li>
          </ul>
        </div>
      </main>
      <footer class="site-footer row">
        <div class="module half-lg third-md">
          <h2>Sponsors</h2>
          <p><a href="http://www.lumpen.com/" target="_blank">Public Media Institute</a></p>
          <p>Supported by <a href="https://chicago.aiga.org/" target="_blank">AIGA Chicago</a></p>
        </div>
        <div class="module quarter-lg third-md">
          <h2>Design</h2>
          <p><a target="_blank" href="https://www.instagram.com/nmoufti">Nermin Moufti</a> + <a target="_blank" href="https://www.instagram.com/q_type">Will Miller</a></p>
          <h2>Development</h2>
          <p><a target="_blank" href="https://barefootfunk.com">Bryant Smith</a></p>
        </div>
        <div class="module quarter-lg third-md">
          <p>©Typeforce <?= date("Y") ?></p>
        </div>
      </footer>
    </div>
    <script src="assets/js/build/site.js?<?= $script_version ?>"></script>
    <script type="text/javascript">// Google Analytics
      var _gaq = _gaq || [];
      _gaq.push(['_setAccount', '<?= $ga_tracking ?>']);
      _gaq.push(['_trackPageview']);
      (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
      })();
    </script>
  </body>
</html>