<?php include 'header.php'; ?><div class="container main content">
  <a id="pagecontent"></a>
  <div class="sixteen columns clearfix collection_nav">
    <h1 class="collection_title">
      Page Not Found
    </h1>
  </div>
  <div class="sixteen columns">
    <div class="section clearfix">
      <p class="quote">
        We're sorry, but the page you requested could not be found.
      </p>
    </div>
  </div>
  <div class="section clearfix search_page">
    <div class="sixteen columns center">
      <p class="extra_padding">
        Try searching or <a href="/collections/all">continue shopping →</a>
      </p>
    </div>
    <div class="six columns offset-by-five">
      <form class="search" action="/search">
        <input type="text" name="q" class="search_box" placeholder="Search..." value="" autocomplete="off">
        <div class="search__results-wrapper">
          <ul class="search__results"></ul>
        </div>
      </form>
    </div>
  </div><!-- Start : SEO Manager 404 Catcher -->
  <script type="text/javascript">
  var f=document.createElement('script')
  f.setAttribute("type","text/javascript")
  f.setAttribute("src", "https://api.seomanager.com/linkCatcher?k=2890132&r=" + encodeURIComponent(document.referrer))
  document.getElementsByTagName("head")[0].appendChild(f)
  </script> <!-- END : SEO Manager 404 Catcher -->
</div>
<?php include 'footer.php'; ?>