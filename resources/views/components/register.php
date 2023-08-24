<?php include 'header.php'; ?><div class="container main content">
    <div id="shopify-section-registration-form" class="shopify-section register-section"><a name="pagecontent" id="pagecontent"></a>

        <div class="sixteen columns clearfix collection_nav">
            <h1>Create Account</h1>
            <div class="feature_divider"></div>
        </div>

        <div class="section clearfix">
            <div class="six columns offset-by-five"> <br class="clear" />
                <div id="customer">
                    <!-- Create Customer -->
                    <div id="create-customer">
                        <form method="post" action="https://icelandicglacial.com/account" id="create_customer" accept-charset="UTF-8"><input type="hidden" name="form_type" value="create_customer" /><input type="hidden" name="utf8" value="✓" />
                            <div id="first_name" class="clearfix large_form"> <label for="first_name" class="login">First Name</label> <input type="text" value="" name="customer[first_name]" id="first_name" class="large" size="30" /></div>
                            <div id="last_name" class="clearfix large_form"> <label for="last_name" class="login">Last Name</label> <input type="text" value="" name="customer[last_name]" id="last_name" class="large" size="30" /></div>
                            <div id="email" class="clearfix large_form"> <label for="email" class="login">Email</label> <input type="email" value="" name="customer[email]" id="email" class="large" size="30" /></div>
                            <div id="password" class="clearfix large_form"> <label for="password" class="login">Password</label> <input type="password" value="" name="customer[password]" id="password" class="large password" size="30" /></div>
                            <div class="acceptsMarketing"> <input type="checkbox" id="customer[accepts_marketing]" name="customer[accepts_marketing]"> <label for="customer[accepts_marketing]">Subscribe to our newsletter?</label></div>
                            <div class="action_bottom"> <input class="btn action_button" type="submit" value="Sign Up" />
                                <p class="right" style="padding-top: 8px;">
                                    Returning Customer? <a href="login.html" id="customer_login_link">Login &rarr;</a></p>
                            </div>
                        </form>
                    </div>
                    <!-- /#create-customer -->
                </div>
            </div>
        </div>
       


    </div>
</div>
<?php include 'footer.php'; ?>