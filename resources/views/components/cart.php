<?php include 'header.php'; ?>
<div id="shopify-section-cart-template" class="shopify-section cart-section">
    <div class="container main content">
        <a name="pagecontent" id="pagecontent"></a>

        <div class="section clearfix">
            <div class="sixteen columns">
                <h1>Shopping Cart</h1>
                <div class="feature_divider"></div>
            </div>
        </div>
        <div class="sixteen columns hidden js-empty-cart__message">
            <div class="section clearfix">
                <div class="six columns offset-by-five medium-down--one-whole">
                    <p class="quote">There are no items in your cart.</p> <a href="#" class="action_button continue-button add_to_cart">Continue Shopping</a></div> <br class="clear" /></div>
        </div>
        <form action="/cart" method="post" id="cart_form" data-cart-form="cart-template" data-total-discount="0">
  <div class="section clearfix cart__wrapper">
    <div class="eleven columns medium-down--one-whole">
      <div class="section clearfix cart__item" data-cart-item="" data-line-id="1" data-variant-id="39302155436129">
        <div class="five columns small-down--one-fifth alpha cart__item--image">
          <a href="#" title="5 Liter Icelandic Glacial Refrigerator Pack - LA" class="cart_page_image">
          <div class="image-element__wrap" style=" max-width: 3000px;">
            <img alt="5 Liter Icelandic Glacial Refrigerator Pack - LA" src="images/products/5LBiB-Final_open_400x.png"  
     height="3000" width="3000" style=";" class="transition--blur-up lazyautosizes lazyloaded"     />
          </div></a>
        </div>
        <div class="eleven columns small-down--four-fifths omega cart_content_info cart__item--content">
          <h3 class="cart__item--title">
            <a href="/products/5-liter-icelandic-glacial-refrigerator-pack-la?variant=39302155436129">5 Liter Icelandic Glacial Refrigerator Pack - LA</a>
          </h3>
          <p></p>
          <p class="modal_price">
            <span class="money ">$26.99</span>
          </p>
            <div class="left product-quantity-box">
                <span class="ss-icon product-minus js-change-quantity" data="" -="" func="minus"> 
            <span class="icon-minus"> </span>
            </span> 
            <input type="number" min="0" class="quantity" name="updates[]" id="updates_508224569" value="1" data="" -="" cart="" quantity="" input="mini-cart"> 
                <span class="ss-icon product-plus js-change-quantity" data="" -="" func="plus">
                <span class="icon-plus"> </span>
                </span> 
            </div>
          <p class="price_total">
            <strong>Total:</strong> <span class="money ">$53.98</span>
          </p><a href="/cart/change?line=1&amp;quantity=0" class="cart__remove-btn" data-line-id="1" data-remove-item="cart-template"><span class="remove-text">Remove</span> <span class="remove-icon"></span></a>
        </div>
      </div>
    </div>
    <div class="five columns medium-down--one-whole">
      <div class="section clearfix cart">
        <div class="subtotal">
          <p class="cart_subtotal js-cart_subtotal">
            <span class="right"><span class="money">$53.98</span></span> <span>Subtotal</span>
          </p>
          <p>
            <small>Orders will be processed in USD.</small>
          </p>
          <p class="tos_warning checkout_button">
            <button type="submit" class="action_button add_to_cart" id="checkout" name="checkout">Checkout</button>
          </p>
          <div class="additional-checkout-buttons additional-checkout-buttons--vertical"></div><a href="/collections/la" class="continue-shopping">Continue Shopping</a>
        </div>
      </div>
    </div>
  </div>
</form>
    </div>
    <div class="cart__blocks">
    </div>
</div>
<?php include 'footer.php'; ?>