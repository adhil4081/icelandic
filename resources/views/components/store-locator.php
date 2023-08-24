<?php include 'header.php'; ?><div class="container main content">
<link href="css/frontend5ed3.css" rel="stylesheet">
    <div id="col-main" class="all">
       
        <h2 id="store-locator-title">Store Locator</h2>
        <div class="header_html"></div>
        <div class="search_bar">
            <div class="main_search_bar">
                <label class="main_search_label" for="address_search">Find stores near this location</label>
                <input type="text" id="address_search" name="address_search" value="City or Postal/Zip Code" onfocus="if(this.value=='City or Postal/Zip Code'){this.value=''}" />
            </div>
            <div class="search_within_distance">
                <label for="within_distance" class="distance_label">Distance</label>
                <select id="within_distance" name="within_distance">
                    <option value="25" selected="selected">25 Mi</option>
                    <option value="50">50 Mi</option>
                    <option value="100">100 Mi</option>
                    <option value="0">No Limit</option>
                </select>
            </div>
            <div class="search_limit">
                <label class="search_limit_label" for="limit">Results</label>
                <select id="limit" name="limit">
                    <option value="25" selected="selected">25</option>
                    <option value="50">50</option>
                    <option value="75">75</option>
                    <option value="100">100</option>
                </select>
            </div>
            <label class="search_limit_label" for="limit"></label>
            <button id="submitBtn" onclick="codeAddress()">Search</button>
            <div style="clear: both;"></div>
        </div>
        <style>
            #directions_text #direction_destination .name,
            .addresses li a .name {
                color: #006699;
            }
            #directions_text #direction_destination,
            .addresses li {
                background-image: url("images/map-pin-lightblue2.png");
            }
        </style>
        <div id="store_map" style="height: 400px;"></div>
        <div class="addresses" id="addresses_list" style="height: 400px;">
            <ul>
                <li><div class="no_stores_found">Enter your city or postal/zip code to find locations near you.</div></li>
            </ul>
        </div>
        <div class="addresses" id="directions_text" style="height: 400px; display: none;">
            <a href="#" onclick="end_directions(); return false;" class="return_to_results">&lt;&lt; Back to Results</a>
            <div id="direction_destination"></div>
            <div id="directions_steps"></div>
        </div>
        <div class="footer_html">
          
        </div>
    </div>
</div>

<?php include 'footer.php'; ?>