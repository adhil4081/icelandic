@include('components.header')
<div class="container main content"> <a name="pagecontent" id="pagecontent"></a>

    <div class="sixteen columns clearfix collection_nav">
        <h1>Customer Login</h1>
        <div class="feature_divider"></div>
    </div>

    <div class="clearfix" id="customer"> <br class="clear" />
        <div class="six columns offset-by-five animated fadeInUp" id="login_form">
            <form method="post" action="https://icelandicglacial.com/account/login" id="customer_login" accept-charset="UTF-8"><input type="hidden" name="form_type" value="customer_login" /><input type="hidden" name="utf8" value="✓" /> <label for="customer_email" class="login">Email</label> <input type="email" value="" name="customer[email]" id="customer_email" class="large"
                    size="30" autocorrect="off" autocapitalize="off" tabindex="1" /> <small class="right"><em><a href="#" onclick="showRecoverPasswordForm()">Forgot your password?</a></em></small> <label for="customer_password" class="login">Password</label>                <input type="password" value="" name="customer[password]" id="customer_password" class="large password" size="16" tabindex="2" /> <input class="btn action_button" type="submit" value="Login" style="margin-bottom: 5px !important" tabindex="3"
                />
                <p class="right" style="padding-top: 10px;">
                    New Customer? <a href="register.html" id="customer_register_link">Sign up &rarr;</a></p>
            </form>
            <style>
                div#rc_login {
                    display: block;
                    width: 100%;
                    text-align: center;
                    margin: 20px auto;
                }
            </style>
            <div id="rc_login">
               
            </div>
            <div class="large--right"></div>
        </div>
        <div id="recover-password" style='display:none'>
            <div class="six columns offset-by-five animated fadeInUp">
                <h4>Reset Password</h4>
                <form method="post" action="https://icelandicglacial.com/account/recover" accept-charset="UTF-8"><input type="hidden" name="form_type" value="recover_customer_password" /><input type="hidden" name="utf8" value="✓" />
                    <div id="recover_email" class="clearfix large_form"> <label for="email" class="large">Email</label> <input type="email" value="" size="30" name="email" id="recover-email" class="large" autocorrect="off" autocapitalize="off" /></div>
                    <p> <em class="note">We will send you an email to reset your password.</em></p>
                    <div class="action_bottom"> <input class="btn action_button" type="submit" value="Submit" /> <span class="note">or <a href="#" onclick="hideRecoverPasswordForm()">Cancel</a></span></div>
                </form>
            </div>
        </div>
    </div>
</div>
@include('components.footer')