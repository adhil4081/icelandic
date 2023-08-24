<?php include 'header.php'; ?>
<div class="container main content"> <a name="pagecontent" id="pagecontent"></a>

    <div class="sixteen columns clearfix collection_nav text-center">
        <h1>Order Tracking Form</h1>
        <div>
        <div class="six columns offset-by-five animated fadeInUp" id="login_form">
            <form   id="customer_login" accept-charset="UTF-8">
                <label for="customer_email" class="login">Email</label> 
                <input type="email" value=""  class="large"
                    size="30" autocorrect="off" autocapitalize="off" tabindex="1" /> 
                     <label for="customer_password" class="login">Order Number</label>
                      <input type="text" value=""  class="large password"  /> 
                      <input class="btn action_button" type="submit" value="Track Order" style="margin-bottom: 5px !important"  />
               
            </form>
            <style>
                div#rc_login {
                    display: block;
                    width: 100%;
                    text-align: center;
                    margin: 20px auto;
                }
            </style>
            <div id="rc_login" style="display: block;">
                <h5 class="red">NOTE: </h5>
                <p >You can track the order using following details.</p>
                <p>Email: <span>dev@hulkcode.com</span></p>
                <p>Order #No: <span>1006</span></p>
                
            </div>
        </div>
    
</div>

    </div>

    
</div>
<?php include 'footer.php'; ?>