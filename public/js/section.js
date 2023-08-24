var featuredCollectionSection = {
    init: function() {
        $(".js-product-slider .products-slider").each(function(i, a) {
            var t = $(this).data("products-per-slide"),
                n = $(this).data("products-limit"),
                o = $(this).data("products-available"),
                d, s, c, r, l, h = !!navigator.userAgent.match(/Trident.*rv\:11\./);
            h || window.Shopify.loadFeatures([{
                name: "model-viewer",
                version: "0.8"
            }, {
                name: "shopify-xr",
                version: "1.0"
            }, {
                name: "model-viewer-ui",
                version: "1.0"
            }], productMedia.setupMedia), t == "2" && o > t && n > t || t == "4" && o > t && n > t || t == "6" && o > t && n > t ? d = "left" : d = "center", o > t && n > t ? (s = !0, c = !0, r = !0) : (s = !1, c = !1, r = !1), t == "2" && o > t || t == "4" && o > t || t == "6" && o > t ? l = 0 : t == "3" && o ? l = 1 : t == "5" && o ? l = 2 : t == "7" && o && (l = 3), $(window).width() <= 798 && (d = "center", s = !0, c = !0, r = !0, l = 1, $(this).parents(".even-num-slides").removeClass("even-num-slides")), $(this).flickity({
                lazyLoad: 2,
                imagesLoaded: !0,
                draggable: s,
                prevNextButtons: c,
                wrapAround: r,
                cellAlign: d,
                pageDots: usePageDots,
                contain: !0,
                freeScroll: !0,
                arrowShape: arrowSize,
                initialIndex: l
            }), $(this).addClass("slider-initialized")
        })
    },
    unload: function(i) {
        var a = i.find(".js-product-slider");
        a.hasClass("flickity-enabled") && a.flickity("destroy")
    }
},
featuredPromotions = {
    init: function() {
        ($(window).width() > 798 || $(window).width() == 0) && ($(".feature-overlay").hover(function() {
            $(this).find(".feature-details").slideDown("100", function() {
                $(this).addClass("reveal-details")
            })
        }, function() {
            $(this).find(".feature-details").removeClass("reveal-details"), $(this).find(".feature-details").slideUp("100")
        }), $(".js-featured-promotions").each(function(i, a) {
            var t = $(this),
                n = $(this).data("promo-animation");
            t.waypoint(function() {
                $(this.element).find(".feature-section").addClass("animated " + n)
            }, {
                offset: "80%"
            })
        }))
    }
},
slideshow = {
    init: function() {
        $(".js-homepage-slideshow").each(function(i, a) {
            var t = $(this),
                n = {
                    slideshowSpeed: t.data("slideshow-speed") * 1e3,
                    slideshowTextAnimation: t.data("slideshow-text-animation"),
                    adaptiveHeight: t.data("adaptive-height")
                };
            if (!t.hasClass("flickity-enabled")) {
                var o = t.find(".gallery-cell").length !== 1;
                if (t.flickity({
                        adaptiveHeight: n.adaptiveHeight,
                        wrapAround: !0,
                        cellAlign: "left",
                        imagesLoaded: !0,
                        prevNextButtons: o,
                        draggable: o,
                        pageDots: usePageDots,
                        autoPlay: n.slideshowSpeed,
                        arrowShape: arrowSize
                    }), n.slideshowTextAnimation != "") {
                    var d = t.data("flickity");
                    setTimeout(function() {
                        t.find(".gallery-cell:nth-child(1) .caption-content").addClass("animated " + n.slideshowTextAnimation)
                    }, 400), t.on("select.flickity", function() {
                        if (t.is(":visible")) {
                            var s = d.selectedIndex + 1;
                            setTimeout(function() {
                                t.find(".caption-content").removeClass("animated " + n.slideshowTextAnimation), t.find(".gallery-cell:nth-child(" + s + ") .caption-content").addClass("animated " + n.slideshowTextAnimation)
                            }, 400)
                        }
                    })
                }
            }
            t.find(".gallery-cell").length > 1 ? t.addClass("multi-image") : t.addClass("single-image"), t.find(".gallery-cell").each(function() {
                var s = 0;
                $(this).find(".action_button").each(function() {
                    $button = $(this), $(this).width() > s && (s = $(this).width())
                }), $(this).find(".action_button").width(s)
            })
        })
    },
    unload: function(i) {
        var a = i.find(".js-homepage-slideshow");
        a.flickity("destroy")
    }
},
testimonial = {
    init: function() {
        $(".js-testimonial").each(function(i, a) {
            var t = $(this),
                n = {
                    slideshowSpeed: t.data("slideshow-speed") * 1e3,
                    slideshowTextAnimation: t.data("slideshow-text-animation")
                };
            if ($(".testimonial-image").length > 0 && $(".testimonial-block").each(function() {
                    if ($(this).find(".testimonial-image").length == 0) {
                        var s = $(this).closest(".testimonial-block");
                        $(s).addClass("set-testimonial-height")
                    }
                }), !t.hasClass("flickity-enabled")) {
                var o = t.find(".gallery-cell").length !== 1;
                if (t.flickity({
                        wrapAround: !0,
                        cellAlign: "left",
                        imagesLoaded: !0,
                        prevNextButtons: o,
                        draggable: o,
                        pageDots: usePageDots,
                        autoPlay: n.slideshowSpeed,
                        arrowShape: arrowSize
                    }), n.slideshowTextAnimation != "") {
                    var d = t.data("flickity");
                    setTimeout(function() {
                        t.find(".gallery-cell:nth-child(1) .caption-content").addClass("animated " + n.slideshowTextAnimation)
                    }, 400), t.on("select.flickity", function() {
                        if (t.is(":visible")) {
                            var s = d.selectedIndex + 1;
                            setTimeout(function() {
                                t.find(".caption-content").removeClass("animated " + n.slideshowTextAnimation), t.find(".gallery-cell:nth-child(" + s + ") .caption-content").addClass("animated " + n.slideshowTextAnimation)
                            }, 400)
                        }
                    })
                }
            }
            t.find(".gallery-cell").length > 1 ? t.addClass("multi-image") : t.addClass("single-image"), t.find(".gallery-cell").each(function() {
                var s = 0;
                $(this).find(".action_button").each(function() {
                    $button = $(this), $(this).width() > s && (s = $(this).width())
                }), $(this).find(".action_button").width(s)
            })
        })
    },
    unload: function(i) {
        var a = i.find(".js-testimonial");
        a.flickity("destroy")
    }
},
gallery = {
    init: function() {
        $(".gallery-horizontal").find(".gallery-image-wrapper").each(function() {
            var i = $(this),
                a = $(this).find("img"),
                t, n;
            $("<img />").attr("src", $(a).attr("src")).on("load", function() {
                t = this.width, n = this.height, $(i).css("flex-basis", t * 200 / n), $(i).css("flex-grow", t * 200 / n), $(i).find("i").css("padding-bottom", n / t * 100 + "%")
            })
        }), $("[rel=gallery]").length && $("[rel=gallery]").fancybox({
            baseClass: "gallery-section__lightbox",
            clickContent: "nextOrClose"
        })
    }
},
videoSection = {
    init: function() {
        var i = $("[data-video-element]").get(),
            a = Plyr.setup(i, {
                controls: videoControls,
                fullscreen: {
                    enabled: !0,
                    fallback: !0,
                    iosNative: !0
                },
                storage: {
                    enabled: !1
                }
            });
        $.each(a, function(t, n) {
            var o = n.id,
                d;
            n.isHTML5 && (d = $(n.elements.wrapper).find("video"), d.attr("data-plyr-video-id", o)), n.on("play", function(s) {
                var c = s.detail.plyr;
                $.each(a, function(r, l) {
                    c.id != l.id && l.pause()
                })
            }), globalVideoPlayers && globalVideoPlayers.push(n)
        }), $("[data-video-element]").each(function(t, n) {
            var o = $(n),
                d = o.parents(".shopify-section").attr("id", k),
                s = d.find(o),
                c = s.parents(".video-wrapper"),
                r = c.find("[data-play-button]"),
                l = c.find("[data-secondary-button]"),
                h = c.find("[data-video-text]"),
                _ = c.find("[data-video-text-container]"),
                b = c.find(".video-wrapper__image"),
                P = c.data("poster-image-uploaded"),
                T = c.data("aspect-ratio"),
                k = c.data("video-src"),
                S = c.data("autoplay"),
                C = c.data("autoloop"),
                D = c.data("mute-video");
            $.each(a, function(I, v) {
                var u, f;
                if (v.isYouTube || v.isVimeo) var u = c.attr("id"),
                    f = $(v.elements.original).attr("id");
                else if (v.isHTML5) {
                    var u = c.find("[data-plyr-video-id]").data("plyr-video-id"),
                        f = v.id;
                    s = d.find(".plyr--video")
                }
                if (f == u) return c.removeClass("play-button-icon--visible"), S ? $(window).width() > 768 || v.isYouTube || v.isVimeo ? (v.autoplay = !0, b.hide(), s.show(), _.hasClass("display-text-over-video--false") ? h.hide() : h.show(), r.hide()) : $(window).width() < 768 && v.isHTML5 && (b.hide(), s.show(), r.show(), v.on("play", function() {
                    s.show(), r.hide()
                })) : P ? (b.show(), s.hide()) : (b.hide(), s.show()), b.on("click", function() {
                    $(this).hide(), s.show(), v.play()
                }), D && (v.muted = !0), T && (v.ratio = T), C && (v.loop = !0), r && r.on("click", function() {
                    v.play()
                }), v.on("play", function() {
                    b.hide(), c.removeClass("play-button-icon--visible"), s.show(), _.hasClass("display-text-over-video--false") ? _.hide() : _.show(), r && r.hide(), l && l.hide()
                }), v.on("pause", function() {
                    (r.is(":hidden") || r.length == 0) && c.addClass("play-button-icon--visible")
                }), (!v.playing && r.is(":hidden") || r.length == 0) && c.addClass("play-button-icon--visible"), !1
            })
        })
    }
},
cart = {
    init: function() {
        $("#cart_form .tos_agree").length && $("body").on("click", "#cart_form input[type='submit']", function() {
            if ($(this).parents("form").find(".tos_agree").is(":checked")) $(this).submit();
            else {
                var i = '<p class="warning animated bounceIn">' + Shopify.translation.agree_to_terms_warning + "</p>";
                return $("p.warning").length == 0 && $(this).before(i), !1
            }
        })
    }
};
selectCallback = function(i, a) {
var t = $(".product-" + a.product.id),
    n = $(".notify-form-" + a.product.id),
    o = $(".product_form, .shopify-product-form", t),
    d = o.data("variant-inventory"),
    s = $(".notify_form__inputs"),
    c = Shopify.translation.notify_email,
    r = "",
    l = Shopify.translation.notify_email_send,
    h = s.data("url");
if (i) {
    if (i.title != null) var _ = i.title.replace(/"/g, "&quot;"),
        b = Shopify.translation.notify_message_first + _ + Shopify.translation.notify_message_last + h
} else var b = Shopify.translation.notify_message_first + Shopify.translation.notify_message_last + h;
if (s.hasClass("customer--true")) var P = "",
    T = '<input type="hidden" class="notify_email" name="contact[email]" id="contact[email]" value="' + P + '" />';
else var T = '<input required type="email" class="notify_email" name="contact[email]" id="contact[email]" placeholder="' + c + '" value="' + r + '" />';
var k = T + '<input type="hidden" name="challenge" value="false" /><input type="hidden" name="contact[body]" class="notify_form_message" data-body="' + b + '" value="' + b + '" /><input class="action_button" type="submit" value="' + l + '" style="margin-bottom:0px" />';
if (i && i.featured_image && t.is(":visible")) {
    var S = $(".js-product-gallery, .js-gallery-modal", t);
    S.each(function() {
        var f = $(this),
            p = Flickity.data(this);
        if (f.is(":visible") && p != null) {
            var m = $('[data-image-id="' + i.featured_media.id + '"]').data("index");
            p.select(m, !1, !0)
        }
    })
}
if (i)
    if (d && d.forEach(function(f) {
            f.id === i.id && (i.inventory_quantity = f.inventory_quantity, i.inventory_management = f.inventory_management, i.inventory_policy = f.inventory_policy)
        }), $(".sku span", t).text(i.sku), product_form_style == "swatches")
        for (var C = 0, D = i.options.length; C < D; C++) {
            var I = o.find('.swatch[data-option-index="' + escape(C) + '"] :radio[value="' + i.options[C].replace(/\"/g, '\\"') + '"]');
            I.length && (I.get(0).checked = !0)
        } else $(".notify_form_message", t).attr("value", $(".notify_form_message", t).data("body") + " - " + _);
if (i && i.available == !0) {
    if (i.price < i.compare_at_price ? ($(".was_price", t).html('<span class="money">' + Shopify.formatMoney(i.compare_at_price, $("body").data("money-format")) + "</span>"), $(".savings", t).html(Shopify.translation.savings_text + " " + parseInt((i.compare_at_price - i.price) * 100 / i.compare_at_price) + '% (<span class="money">' + Shopify.formatMoney(i.compare_at_price - i.price, $("body").data("money-format")) + "</span>)"), $(".current_price", t).parent().addClass("sale")) : ($(".was_price", t).html(""), $(".savings", t).html(""), $(".current_price", t).parent().removeClass("sale")), i.inventory_management && i.inventory_quantity > 0) {
        if (Shopify.theme_settings.display_inventory_left) {
            i.inventory_quantity == 1 ? items_left_text = Shopify.translation.one_item_left : items_left_text = Shopify.translation.items_left_text;
            var v = parseInt(Shopify.theme_settings.inventory_threshold);
            i.inventory_quantity <= v ? $(".items_left", t).html(i.inventory_quantity + " " + items_left_text) : $(".items_left", t).html("")
        }
        Shopify.theme_settings.limit_quantity && i.inventory_policy == "deny" && $(".quantity", t).attr("max", i.inventory_quantity)
    } else $(".items_left", t).text(""), $(".quantity", t).removeAttr("max");
    $(".sold_out", t).text(""), i.price > 0 ? $(".current_price", t).removeClass("sold_out").html('<span class="money">' + Shopify.formatMoney(i.price, $("body").data("money-format")) + "</span>") : $(".current_price", t).removeClass("sold_out").html(Shopify.theme_settings.free_text), $(".add_to_cart", t).removeClass("disabled").removeAttr("disabled").find("span").text($(".add_to_cart", t).data("label")), $(".shopify-payment-button", t).removeClass("disabled"), $(".purchase-details__buttons", t).removeClass("product-is-unavailable"), $(".modal_price", t).removeClass("variant-unavailable"), n.hide(), s.empty()
} else {
    var u = i ? Shopify.theme_settings.sold_out_text : Shopify.translation.unavailable_text;
    i ? (i.price > 0 ? $(".current_price", t).html('<span class="money">' + Shopify.formatMoney(i.price, $("body").data("money-format")) + "</span>") : $(".current_price", t).html(Shopify.theme_settings.free_text), Shopify.theme_settings.display_sold_out_price && $(".current_price", t).parents(".price__container--display-price-true").addClass("has-margin-right"), $(".modal_price", t).removeClass("variant-unavailable")) : ($(".modal_price", t).addClass("variant-unavailable"), $(".current_price", t).html(""), $(".was_price", t).html(""), $(".savings", t).html(""), $(".current_price", t).parents(".price__container--display-price-true").removeClass("has-margin-right")), Shopify.theme_settings.display_sold_out_price || ($(".current_price", t).html(""), $(".was_price", t).html(""), $(".savings", t).html("")), $(".items_left", t).text(""), $(".quantity", t).removeAttr("max"), $(".sold_out", t).text(u), $(".purchase-details__buttons", t).addClass("product-is-unavailable"), $(".add_to_cart", t).addClass("disabled").attr("disabled", "disabled").find("span").text(u), $(".shopify-payment-button").addClass("disabled"), n.hide(), s.empty(), i && !i.available && (n.fadeIn(), s.empty(), s.append(k))
}
Currency.show_multiple_currencies && currencyConverter.convertCurrencies()
};
var productPage = {
    init: function() {
        var i = !!navigator.userAgent.match(/Trident.*rv\:11\./);
        i || window.Shopify.loadFeatures([{
            name: "model-viewer",
            version: "0.8"
        }, {
            name: "shopify-xr",
            version: "1.0"
        }, {
            name: "model-viewer-ui",
            version: "1.0"
        }], productMedia.setupMedia), $(".js-full-width-product-images").length && imageFunctions.fullWidth(".product-template .product .description img", ".js-full-width-product-images"), $("[data-product-gallery]").each(function(t, n) {
            var o = $(this);
            productPage.enableGallery(o)
        }), window.location.search === "?contact_posted=true" && ($(".notify_form .contact-form").hide(), $(".notify_form .contact-form").prev(".message").html(Shopify.translation.notify_success_text));
        var a = $(".notify_form .contact-form");
        a.each(function() {
            var t = $(this);
            t.on("submit", function(n) {
                $('input[name="challenge"]', t).val() !== "true" && ($.ajax({
                    type: t.attr("method"),
                    url: t.attr("action"),
                    data: t.serialize(),
                    success: function(o) {
                        t.fadeOut("slow", function() {
                            t.prev(".message").html(Shopify.translation.notify_success_text)
                        })
                    },
                    error: function(o) {
                        $('input[name="challenge"]', t).val("true"), t.submit()
                    }
                }), n.preventDefault())
            })
        }), product_form_style == "swatches" && $("body").on("change", ".swatch :radio", function() {
            var t = $(this).closest(".swatch").attr("data-option-index"),
                n = $(this).val(),
                o = $(this).closest(".product_form form");
            if (o.siblings(".notify_form").length) var d = o.siblings(".notify_form");
            else var d = $(".js-notify-form");
            var s = o.find(".swatch_options input:checked").eq(0).val(),
                c = o.find(".swatch_options input:checked").eq(1).val() || "",
                r = o.find(".swatch_options input:checked").eq(2).val() || "";
            if (s && c && r) var l = s + " / " + c + " / " + r;
            else if (s && c) var l = s + " / " + c;
            else var l = s;
            d.find(".notify_form_message").attr("value", d.find(".notify_form_message").data("body") + " - " + l), $(this).closest("form").find(".single-option-selector").eq(t).val(n).trigger("change")
        }), $(".js-product-gallery a").fancybox({
            width: 800,
            height: 800,
            baseClass: "product-section__lightbox",
            clickContent: !1,
            afterShow: function(t, n) {
                var o = t.$trigger.first().parents(".js-product-gallery").data("zoom");
                o && $(".fancybox-image").wrap('<span class="zoom-wrap" style="display:inline-block"></span>').css("display", "block").parent().zoom({
                    touch: !1,
                    magnify: 1
                })
            },
            afterClose: function(t, n) {
                var o = t.$trigger.first().parents(".js-product-gallery");
                o.hide(), setTimeout(function() {
                    o.fadeIn(100), $(".js-product-gallery").find(".is-selected a").focus()
                }, 1)
            }
        }), $(".js-product_section .product_form_options").each(function() {
            $(this).find(".selector-wrapper select").length != $(this).data("options-size") && new Shopify.OptionSelectors($(this).data("select-id"), {
                product: $(this).data("product"),
                onVariantSelected: selectCallback,
                enableHistoryState: $(this).data("enable-state")
            })
        }), $(".product-recommendations").length && productPage.loadProductRecommendations(), this.initializeQuantityBox()
    },
    enableGallery: function(i) {
        var a = $(i),
            t = a.find(".gallery-cell"),
            n = a.closest(".js-product_section").find(".product_gallery_nav"),
            o = n.find(".gallery-cell"),
            d = !0,
            s = !0,
            c = a.data("zoom"),
            r = a.data("product-lightbox"),
            l = a.data("thumbnails-enabled"),
            h = a.data("thumbnails-slider-enabled"),
            _ = a.data("thumbnails-position"),
            b = a.data("gallery-arrows-enabled"),
            P = a.data("slideshow-animation"),
            T = a.data("slideshow-speed");
        c === !0 && (is_touch_device() && $(window).width() < 768 ? r === "false" && (document.addEventListener("lazybeforeunveil", imageFunctions.zoom), d = !1) : document.addEventListener("lazybeforeunveil", imageFunctions.zoom)), a.on("ready.flickity", function() {
            t.each(function(f, p) {
                var m = $(p).data("media-type") || $(p).find("[data-media-type]").data("media-type"),
                    y;
                switch (m) {
                    case "external_video":
                        if (y = $(p).find("[data-plyr-video-id]").data("plyr-video-id"), videoPlayers)
                            for (var g = 0; g < videoPlayers.length; g++)(videoPlayers[g].id == y || videoPlayers[g].media.id == y) && ($(p).hasClass("is-selected") || (videoPlayers[g].keyboard = {
                                focused: !1,
                                global: !1
                            }));
                        break;
                    case "video":
                        if (y = $(p).find("[data-plyr-video-id]").data("plyr-video-id"), videoPlayers)
                            for (var g = 0; g < videoPlayers.length; g++)(videoPlayers[g].id == y || videoPlayers[g].media.id == y) && ($(p).hasClass("is-selected") || (videoPlayers[g].keyboard = {
                                focused: !1,
                                global: !1
                            }));
                        break;
                    case "model":
                        $(p).hasClass("is-selected") && m == "model" && isScreenSizeLarge() && ($(p).on("mouseenter", function() {
                            a.flickity("unbindDrag")
                        }), $(p).on("mouseleave", function() {
                            a.flickity("bindDrag")
                        }));
                        break;
                    default:
                        break
                }
            });
            var u = a.data("video-loop");
            $.each(videoPlayers, function(f, p) {
                p.loop = u
            })
        }), a.on("change.flickity", function() {
            t.each(function(u, f) {
                var p = $(f).data("media-type") || $(f).find("[data-media-type]").data("media-type");
                if ($(f).hasClass("is-selected")) switch (p) {
                    case "model":
                        isScreenSizeLarge() && ($(f).on("mouseenter", function() {
                            a.flickity("unbindDrag")
                        }), $(f).on("mouseleave", function() {
                            a.flickity("bindDrag")
                        })), $(f).find("model-viewer").on("shopify_model_viewer_ui_toggle_play", function() {
                            a.flickity("unbindDrag")
                        }), $(f).find("model-viewer").on("shopify_model_viewer_ui_toggle_pause", function() {
                            a.flickity("bindDrag")
                        });
                        break;
                    default:
                        a.flickity("bindDrag");
                        break
                } else switch (p) {
                    case "external_video":
                        $.each(videoPlayers, function(m, y) {
                            y.pause()
                        });
                        break;
                    case "video":
                        $.each(videoPlayers, function(m, y) {
                            y.pause()
                        });
                        break;
                    case "model":
                        $.each(productMedia.models, function(m, y) {
                            y.pause()
                        })
                }
            }), productMedia.showModelIcon(a)
        }), a.flickity({
            wrapAround: !0,
            adaptiveHeight: !0,
            dragThreshold: 10,
            imagesLoaded: !0,
            pageDots: !1,
            prevNextButtons: a.data("media-count") > 1 || t.length > 1,
            autoPlay: T * 1e3,
            fade: P === "fade",
            watchCSS: !1,
            arrowShape: arrowSize
        }), $.each(videoPlayers, function(u, f) {
            f.on("controlshidden", function(p) {
                a.find(".flickity-prev-next-button").css("height", "auto")
            }), f.on("controlsshown", function(p) {
                a.find(".flickity-prev-next-button").css("height", "calc(100% - 64px)")
            })
        });
        var k = a.find(".flickity-prev-next-button");
        (k || o) && isScreenSizeLarge() && (k.on("click", function() {
            var u = a.data("product-id");
            return a.on("settle.flickity", function(f, p) {
                var m = a.find(".gallery-cell.is-selected"),
                    y = m.data("media-type") || m.find("[data-media-type]").data("media-type");
                if ((y == "video" || y == "external_video") && S(), y == "model") {
                    var g = [];
                    $.each(productMedia.models, function(x, w) {
                        $(w.container).closest(".gallery-cell").data("product-id") == u && g.push(w)
                    }), $.each(g, function(x, w) {
                        var M = $(w.container).closest(".gallery-cell");
                        M.hasClass("is-selected") && w.play()
                    })
                }
                a.off("settle.flickity")
            }), !1
        }), o.on("click", function(u) {
            var f = $(u.currentTarget).index(),
                p = a.data("product-id");
            return a.flickity("select", f), a.on("settle.flickity", function(m, y) {
                var g = a.find(".gallery-cell.is-selected"),
                    x = g.data("media-type") || g.find("[data-media-type]").data("media-type");
                if ((x == "video" || x == "external_video") && S(), x == "model") {
                    var w = [];
                    $.each(productMedia.models, function(M, z) {
                        $(z.container).closest(".gallery-cell").data("product-id") == p && w.push(z)
                    }), $.each(w, function(M, z) {
                        var j = $(z.container).closest(".gallery-cell");
                        j.hasClass("is-selected") && z.play()
                    })
                }
                a.off("settle.flickity")
            }), !1
        }), o.keypress(function(u) {
            var f = $(u.currentTarget).index(),
                p = a.data("product-id");
            if (u.which == 13) {
                a.flickity("select", f);
                var m = a.find(".gallery-cell.is-selected");
                a.on("settle.flickity", function(x, w) {
                    m.find("[data-youtube-video]").attr("tabindex", "0"), m.find("model-viewer, .plyr, a").focus(), a.off("settle.flickity")
                });
                var y = m.data("media-type") || m.find("[data-media-type]").data("media-type");
                if ((y == "video" || y == "external_video") && S(), y == "model") {
                    var g = [];
                    $.each(productMedia.models, function(x, w) {
                        $(w.container).closest(".gallery-cell").data("product-id") == p && g.push(w)
                    }), $.each(g, function(x, w) {
                        var M = $(w.container).closest(".gallery-cell");
                        M.hasClass("is-selected") && w.play()
                    })
                }
                return !1
            }
        }));

        function S() {
            t.each(function(u, f) {
                var p = $(f),
                    m = p.data("media-type") || p.find("[data-media-type]").data("media-type"),
                    y = p.find("video").data("plyr-video-id"),
                    g = p.find("iframe"),
                    x = g.attr("id");
                p.hasClass("is-selected") && (m == "video" ? (y = p.find("video").data("plyr-video-id"), y && C(y, p)) : m == "external_video" && x && D(x, p))
            })
        }

        function C(u, f) {
            $.each(videoPlayers, function(p, m) {
                m.media.dataset.plyrVideoId == u && (m.play(), m.on("exitfullscreen", function() {
                    f.closest(".product-gallery").find(".product-gallery__thumbnails").focus()
                }))
            })
        }

        function D(u, f) {
            $.each(videoPlayers, function(p, m) {
                m.playing && m.pause(), m.media.id == u && (m.play(), m.on("exitfullscreen", function() {
                    f.closest(".product-gallery").find(".product-gallery__thumbnails").focus()
                }))
            })
        }
        if (l == !0 && h == !0 && t.length > 1)
            if ($(window).width() > 798)
                if (_ == "left" || _ == "right") {
                    n.css("max-height", a.closest(".product-gallery").outerHeight()), n.addClass("vertical-slider-enabled"), o.on("click", function(u) {
                        var f = $(u.currentTarget).index();
                        a.flickity("select", f)
                    });
                    var I = o.height(),
                        v = n.height();
                    a.on("select.flickity", function() {
                        var u = a.data("flickity");
                        n.find(".is-nav-selected").removeClass("is-nav-selected");
                        var f = o.eq(u.selectedIndex).addClass("is-nav-selected"),
                            p = f.position().top + n.scrollTop() - (v + I) / 2;
                        n.animate({
                            scrollTop: p
                        })
                    })
                } else n.flickity({
                    cellAlign: "center",
                    contain: !0,
                    groupCells: "80%",
                    imagesLoaded: !0,
                    pageDots: !1,
                    prevNextButtons: o.length > 5 ? b : !1,
                    asNavFor: a[0],
                    arrowShape: arrowSize
                }), setTimeout(function() {
                    n.flickity("resize")
                }, 500), $(window).on("load", function() {
                    n.flickity("resize")
                }), $.each(o, function(u, f) {
                    var p = $(f);
                    p.hasClass("is-selected") && p.on("focus", function() {
                        n.flickity("selectCell", u)
                    })
                });
        else n.flickity({
            cellAlign: "center",
            contain: !0,
            groupCells: "80%",
            imagesLoaded: !0,
            pageDots: !1,
            prevNextButtons: o.length > 5 ? b : !1,
            asNavFor: a[0],
            arrowShape: arrowSize
        });
        else l == !0 && n.find(".product-gallery__thumbnail").on("click", function() {
            var u = $(this).index();
            a.flickity("selectCell", u)
        });
        $(window).on("load", function() {
            a.flickity("resize")
        }), setTimeout(function() {
            a.flickity("resize")
        }, 500)
    },
    loadProductRecommendations: function() {
        var i = $(".product-recommendations");
        if (i.length === 0) return !1;
        var a = i.data("product-id"),
            t = i.data("limit"),
            n = i.data("recommendations-url"),
            o = n + "?section_id=product-recommendations&limit=" + t + "&product_id=" + a,
            d = $(".js-recommended-products-slider");
        $.ajax({
            type: "GET",
            url: o,
            success: function(s) {
                var c = $(s).find(".product-recommendations").html();
                i.html(c), d.length && productPage.recommendedProductsSlider(), $("[data-product-recommendations-container] .js-product_section .product_form_options").each(function() {
                    new Shopify.OptionSelectors($(this).data("select-id"), {
                        product: $(this).data("product"),
                        onVariantSelected: selectCallback,
                        enableHistoryState: $(this).data("enable-state")
                    })
                }), Currency.show_multiple_currencies && currencyConverter.convertCurrencies(), Shopify.PaymentButton && Shopify.PaymentButton.init(), videoFeature.setupRecommendedVideoPlayer(), Shopify.theme_settings.collection_secondary_image && imageFunctions.showSecondaryImage(), hideNoScript()
            }
        })
    },
    productSwatches: function() {
        if (product_form_style == "swatches") {
            if ($(".js-product_section").length) {
                var i = $(".js-product_section").find(".product_form");
                i.addClass("is-visible"), i.each(function() {
                    var a = $(this).data("product"),
                        t = $(this).data("product-id"),
                        n = ".product-" + t + " .js-product_section",
                        o = $(this).find(".swatch_options .swatch");
                    o.length > 1 && Shopify.linkOptionSelectors(a, n)
                })
            }
            $(".js-product_section").length > 1 && $("body").on("click", ".swatch-element", function() {
                var a = $(this).data("value").toString();
                $(this).siblings('input[value="' + a.replace(/\"/g, '\\"') + '"]').prop("checked", !0).trigger("change");
                var t = $(this).parents(".product_form").data("product"),
                    n = $(this).parents(".product_form").data("product-id"),
                    o = ".product-" + n + " .js-product_section",
                    d = $(this).parents(".product_form").find(".swatch_options .swatch");
                d.length > 1 && Shopify.linkOptionSelectors(t, o)
            })
        }
    },
    recommendedProductsSlider: function() {
        $(".js-recommended-products-slider .products-slider").each(function(i, a) {
            var t = $(this).data("products-per-slide"),
                n = $(this).data("products-limit"),
                o = $(this).data("products-available"),
                d, s, c, r, l;
            t == "2" && o > t && n > t || t == "4" && o > t && n > t || t == "6" && o > t && n > t ? d = "left" : d = "center", o > t && n > t ? (s = !0, c = !0, r = !0) : (s = !1, c = !1, r = !1), t == "2" && o > t || t == "4" && o > t || t == "6" && o > t ? l = 0 : t == "3" && o ? l = 1 : t == "5" && o ? l = 2 : t == "7" && o && (l = 3), $(window).width() <= 798 && (d = "center", s = !0, c = !0, r = !0, l = 1, $(this).parents(".even-num-slides").removeClass("even-num-slides")), $(this).flickity({
                lazyLoad: 2,
                imagesLoaded: !0,
                draggable: s,
                cellAlign: d,
                prevNextButtons: c,
                wrapAround: r,
                pageDots: usePageDots,
                contain: !0,
                freeScroll: !0,
                arrowShape: arrowSize,
                initialIndex: l
            })
        })
    },
    initializeQuantityBox: function() {
        $("body").on("click", ".js-change-quantity", function() {
            var i = $(this),
                a = $(this).siblings("input"),
                t = parseInt(a.val()),
                n = 1e29,
                o = a.attr("min") || 0;
            if (a.attr("max") != null && (n = a.attr("max")), isNaN(t) || t < o) return a.val(o), !1;
            if (t > n) return a.val(n), !1;
            i.data("func") == "plus" ? t < n && a.val(t + 1) : (t > o && a.val(t - 1), i.parents(".cart_item").length && t - 1 == 0 && i.closest(".cart_item").addClass("animated fadeOutUp")), a.trigger("change")
        })
    },
    unload: function(i) {
        var a = i.find(".products-slider");
        a.flickity("destroy"), $("body").off("click", ".js-change-quantity")
    }
},
header = {
    init: function() {
        var i = function() {
                $("body").removeClass("is-active"), $(".dropdown_link").removeClass("active_link"), $(".dropdown_container").hide(), $(".mobile_nav").find("div").removeClass("open")
            },
            a = function() {
                $("body").removeClass("is-active").removeClass("blocked-scroll"), $(".dropdown_link").toggleClass("active_link"), $(".cart-container").removeClass("active_link")
            },
            t = function(r) {
                $("body").addClass("blocked-scroll"), $(".mobile_nav div").removeClass("open"), $(".dropdown_link").removeClass("active_link"), r.addClass("active_link")
            },
            n = function() {
                $(".vertical-menu_sub-submenu").removeClass("is-visible"), $(".vertical-menu_sub-submenu").prev("a").attr("data-click-count", 0)
            },
            o = function() {
                $(".vertical-menu_submenu").removeClass("is-visible"), $(".vertical-menu_submenu").prev("a").attr("data-click-count", 0), $(".mega-menu-parent").attr("data-click-count", 0), n()
            },
            d = $(".main-nav__wrapper").find("[data-show-dropdown-on-click]");
        if ($(".dropdown_link--vertical").length && ($(".dropdown_link--vertical, .mega-menu-parent").attr("data-click-count", 0), d.length == 0 && $(".dropdown_link--vertical, .vertical-menu_submenu").on("mouseover", function(r) {
                var l = $(this).parents(".main-nav").find('[data-dropdown="' + $(this).data("dropdown-rel") + '"]');
                $(".dropdown_container").hide(), $(".active_link").removeClass("active_link"), $(this).hasClass("active_link") || ($(".dropdown_container").hide(), $(this).children("a").addClass("active_link"), $(".is-absolute").parent().addClass("feature_image"))
            }), (is_touch_device() || d.length >= 1) && $("body").on("touchstart click", ".vertical-menu .sublink a, .vertical-menu_submenu .sublink a", function(r) {
                var l, h = $(this),
                    _ = $(h).next(".vertical-menu_submenu"),
                    b = $(h).next(".vertical-menu_sub-submenu"),
                    P = function() {
                        _.removeClass("hidden"), b.removeClass("hidden"), _.addClass("is-visible"), b.addClass("is-visible")
                    };
                r.type == "touchstart" ? (l = !0, $(this).attr("data-click-count") < 1 && (T(h, r.target), r.preventDefault(), r.stopPropagation())) : r.type == "click" && !l ? $(this).attr("data-click-count") < 1 && (T(h, r.target), r.preventDefault(), r.stopPropagation()) : l = !1;

                function T(k, S) {
                    var C = $(k).parents(".main-nav").find('[data-dropdown="' + $(this).data("dropdown-rel") + '"]'),
                        D = $(k).attr("data-click-count");
                    if ($(".dropdown_link--vertical").not(k).attr("data-click-count", 0), $(".mega-menu-parent").attr("data-click-count", 0), $(".dropdown_link--vertical").attr("data-no-instant", !0), $(".dropdown_container").hide(), C.show(), $(S).parents(".vertical-menu_submenu").hasClass("is-visible") ? (n(), $(".is-absolute").parent().addClass("feature_image")) : (o(), $(".is-absolute").parent().addClass("feature_image")), P(), D++, $(k).attr("data-click-count", D), D < 2) return r.preventDefault(), r.stopPropagation(), !1
                }
                $("html").on("click", function(k) {
                    !$(k.target).closest(".dropdown_container").length && !$(k.target).hasClass("url-deadlink") && (o(), $(".is-absolute").parent().addClass("feature_image"))
                })
            })), $(".promo-banner").length) {
            var s = Cookies.get("promo-banner");
            s != "dismiss" && ($("body").addClass("promo-banner--show"), $(".promo-banner").on("click", ".promo-banner__close", function() {
                $("body").removeClass("promo-banner--show"), Cookies.set("promo-banner", "dismiss", {
                    expires: 30
                })
            }))
        }
        if ($(".vertical-menu_submenu, .vertical-menu_sub-submenu").each(function() {
                $(this).is(":off-right") && $(this).addClass("vertical-menu--align-right")
            }), $("html").on("click", function(r) {
                !$(r.target).closest(".cart-container").length && $(".cart_content").is(":visible") && a(), !$(r.target).closest(".dropdown_container").length && $(".dropdown").is(":visible") && !$(r.target).hasClass("url-deadlink") && !$(r.target).hasClass("mega-menu-parent") && ($(".is-absolute").parent().addClass("feature_image"), $("body").removeClass("is-active"), i(), d.length && $(".dropdown_link").attr("data-click-count", 0))
            }), $(window).width() > 798) {
            if ($(".header").hasClass("header-fixed--true")) {
                if ($("body").on("click", '.banner a[href^="#"]', function(r) {
                        r.preventDefault();
                        var l = $(this).attr("href"),
                            h = $(".main-nav__wrapper.sticky_nav").outerHeight();
                        $("html, body").animate({
                            scrollTop: $(l).offset().top - h
                        }, 2e3)
                    }), !$(".main-nav__wrapper").hasClass("sticky_nav")) var c = new Headhesive(".main-nav__wrapper", {
                    offset: 700,
                    throttle: 300,
                    classes: {
                        clone: "sticky_nav",
                        stick: "sticky_nav--stick",
                        unstick: "sticky_nav--unstick"
                    },
                    onInit: function() {
                        $(".sticky_nav .secondary_logo").css("display", "none"), $(".sticky_nav .primary_logo").css("display", "block"), $(".sticky_nav .icon-search").css("display", "block"), $(".sticky_nav .search_form").css("display", "none"), $(".sticky_nav .search-link").css("display", "block"), $(".sticky_nav .main-nav").append($(".header .cart-container").clone())
                    },
                    onStick: function() {
                        var r = 0,
                            l = $(".sticky_nav .main-nav");
                        l.each(function() {
                            r = r > $(this).outerHeight() ? r : $(this).outerHeight()
                        }), $(".sticky_nav .mini_cart").css("height", r), $(".sticky_nav .cart_content").css("top", r)
                    },
                    onUnstick: function() {
                        $(".cart-container").removeClass("active_link")
                    }
                })
            } else $(".header-fixed--true").removeClass("header-fixed--true"), $(".main-nav__wrapper").length > 1 && $(".main-nav__wrapper").first().remove();
            $("img.primary_logo:visible") ? $(".logo img", $(".feature_image .header")).attr("src", $(".logo img").data("src-home")) : $(".logo img").attr("src", $(".logo img").data("src"))
        } else $("#header").hasClass("mobile_nav-fixed--true") ? ($("body").addClass("mobile_nav-fixed--true"), $("body").on("click", '.banner a[href^="#"]', function(r) {
            r.preventDefault();
            var l = $(this).attr("href"),
                h = $("#header").outerHeight();
            $("html, body").animate({
                scrollTop: $(l).offset().top - h
            }, 2e3)
        })) : $("body").addClass("mobile_nav-fixed--false");
        if ($("#header .cart_content").length < 1 && $("#header .cart-container").append($(".header .cart_content").clone()), is_touch_device() && $(window).width() <= 798 || $(window).width() <= 798) $(".dropdown_link").attr("data-no-instant", !0), $("body").on("click", ".dropdown_link, .vertical--dropdown", function(r) {
            if ($(".nav a").removeClass("active_link"), $("#header").is(":visible")) {
                var l = $(this).parents("#header").find('[data-dropdown="' + $(this).data("dropdown-rel") + '"]');
                $(this).hasClass("mini_cart") || $(".cart-container").removeClass("active_link")
            } else {
                if ($(this).hasClass("icon-search")) return window.location = $(this).attr("href"), !1;
                var l = $(this).parents(".main-nav").find('[data-dropdown="' + $(this).data("dropdown-rel") + '"]')
            }
            if (l.is(":visible") || l.attr("class") === void 0 ? (l.hide(), $("body").removeClass("is-active")) : ($(".dropdown_container").hide(), $(this).hasClass("cart-container") || $(".is-absolute").parent().removeClass("feature_image"), l.show(), $("body").addClass("is-active"), $(".mobile_nav").find("div").removeClass("open")), l.is(":visible")) return r.stopPropagation(), !1
        }), $("body").on("click", ".mobile_nav", function() {
            $(this).find("div").toggleClass("open")
        }), Shopify.theme_settings.cart_action != "redirect_cart" && $(".mini_cart").on("click", function(r) {
            var l = $(this).parent();
            l.hasClass("active_link") ? (a(), $("body").removeClass("blocked-scroll")) : (t(l), $("body").addClass("blocked-scroll")), (is_touch_device() || $(window).width() <= 798) && r.preventDefault()
        }), $(".cart_content__continue-shopping").on("click", function(r) {
            a()
        });
        else {
            var d = $(".main-nav__wrapper").find("[data-show-dropdown-on-click]");
            (d.length || is_touch_device()) && ($(".dropdown_link").attr("data-click-count", 0), $(".dropdown_link").on("click", function(l) {
                var h = $(this).parents(".main-nav").find('[data-dropdown="' + $(this).data("dropdown-rel") + '"]'),
                    _ = $(this).attr("data-click-count");
                if (o(), i(), $(".dropdown_link").not(this).attr("data-click-count", 0), $(".dropdown_link").attr("data-no-instant", !0), $(".active_link").removeClass("active_link"), $(this).hasClass("active_link") || (h.show(), $(this).hasClass("mini_cart") ? $("body").hasClass("cart") || $(this).parent(".cart-container").addClass("active_link") : ($(this).addClass("active_link"), $(".is-absolute").parent().removeClass("feature_image"))), l.type == "click" && (_++, $(this).attr("data-click-count", _), _ < 2)) return l.preventDefault(), l.stopPropagation(), !1
            })), d.length == 0 && ($(".nav a, .logo a").not(".cart_content a").on("mouseenter", function() {
                $(this).hasClass("active_link") || ($(".dropdown_container").hide(), $(".active_link").removeClass("active_link"), $(".is-absolute").parent().addClass("feature_image"))
            }), $(".main-nav, .top-bar, .cart-container").on("mouseleave", function() {
                $(".dropdown_container").hide(), $(".active_link").removeClass("active_link"), $(".is-absolute").parent().addClass("feature_image"), $("body").removeClass("is-active")
            }), $(".dropdown_link").on("mouseover", function(l) {
                $(".dropdown_container").hide();
                var h = $(this).parents(".main-nav").find('[data-dropdown="' + $(this).data("dropdown-rel") + '"]');
                $(".active_link").removeClass("active_link"), $(this).hasClass("active_link") || (h.show(), $(this).hasClass("mini_cart") ? $("body").hasClass("cart") || $(this).parent(".cart-container").addClass("active_link") : ($(this).addClass("active_link"), $(".is-absolute").parent().removeClass("feature_image")))
            }))
        }
    },
    removeDataAttributes: function(i) {
        if ($(i).length) {
            var a, t = $(i),
                n, o = [],
                d = t.get(0).attributes,
                s = d.length;
            for (a = 0; a < s; a++) d[a].name.substring(0, 5) === "data-" && o.push(d[a].name);
            $.each(o, function(c, r) {
                t.removeAttr(r)
            })
        }
    },
    loadMegaMenu: function() {
        $(".sticky_nav .mega-menu").remove(), $(".header .mega-menu").remove(), $(".mega-menu-container .mega-menu").clone().appendTo(".sticky_nav .main-nav"), header.removeDataAttributes(".sticky_nav .mega-menu.dropdown_container .dropdown_column"), $(".mega-menu-container .mega-menu").each(function(a) {
            var t = $(this).data("dropdown");
            $('[data-dropdown-rel="' + t + '"]').find("span").remove(), $('[data-dropdown-rel="' + t + '"]').not(".icon-search").append(' <span class="icon-down-arrow"></span>').addClass("mega-menu-parent").addClass("dropdown_link").removeClass("top_link"), $('[data-dropdown="' + t + '"]').each(function(n) {
                $(this).hasClass("mega-menu") || $(this).remove()
            }), $(this).clone().appendTo(".header .main-nav")
        }), $(".dropdown_link--vertical").length && ($(".dropdown_link--vertical.mega-menu-parent + .vertical-menu_submenu").remove(), $(".dropdown_link--vertical:not(.mega-menu-parent)").each(function(a) {
            var t = $(this).data("dropdown-rel");
            $('[data-dropdown="' + t + '"]').remove()
        }));
        var i = $(".main-nav__wrapper").find("[data-show-dropdown-on-click]");
        i.length && $(".mega-menu-parent").on("click", function(a) {
            $(this).hasClass("active_link") || ($(".dropdown_container").hide(), $(this).parents(".main-nav").find('[data-dropdown="' + $(this).data("dropdown-rel") + '"]').toggle(), $(this).addClass("active_link"), $(".is-absolute").parent().removeClass("feature_image"))
        }), header.removeDataAttributes(".header .mega-menu.dropdown_container .dropdown_column"), (is_touch_device() || $(window).width() <= 798) && $(".dropdown_link").attr("data-no-instant", !0), header.loadMobileMegaMenu()
    },
    loadMobileMegaMenu: function() {
        $(".mega-menu-container .mobile-mega-menu").each(function(i) {
            $('[data-mobile-dropdown-rel="' + $(this).data("mobile-dropdown") + '"]').find("span").remove(), $('[data-mobile-dropdown-rel="' + $(this).data("mobile-dropdown") + '"] > a').append(' <span class="right icon-down-arrow"></span>').attr("data-no-instant", "true"), $('[data-mobile-dropdown-rel="' + $(this).data("mobile-dropdown") + '"]').addClass("mobile-mega-menu-parent sublink"), $('[data-mobile-dropdown-rel="' + $(this).data("mobile-dropdown") + '"]').append(this), $('[data-mobile-dropdown-rel="' + $(this).data("mobile-dropdown") + '"] > ul').each(function(a) {
                $(this).hasClass("mobile-mega-menu") || $(this).remove()
            })
        })
    },
    unloadMegaMenu: function() {
        $(".header .mega-menu").remove(), $(".mega-menu-container .mega-menu").each(function(i) {
            var a = $(this).data("dropdown");
            $('.mega-menu-parent[data-dropdown-rel="' + $(this).data("dropdown") + '"]').find(".icon-down-arrow").remove()
        })
    },
    unload: function() {
        $("body").off("click", ".mobile_nav"), $("body").off("click", ".dropdown_link"), $("html").off("click"), $(".mini_cart").off("click"), $(".cart_content__continue-shopping").off("click"), $("body").off("click", '.banner a[href^="#"]'), $(".main-nav__wrapper.sticky_nav").remove()
    }
},
mapFunction = {
    init: function() {
        if ($(".lazymap").length > 0 && lazyframe(".lazymap"), $(".maps").hasClass("js-api-map")) {
            var i = [];
            $(".map").each(function(a, t) {
                i.push(this), i[a].sectionid = $(this).data("id"), i[a].address = $(this).data("address"), i[a].directions = $(this).data("directions-address"), i[a].zoom = $(this).data("zoom"), i[a].mapstyle = $(this).data("style"), i[a].showpin = $(this).data("pin"), i[a].apikey = $(this).data("api-key")
            }), $.each(i, function(a, t) {
                $.ajaxSetup({
                    cache: !0
                }), $.getScript("https://maps.googleapis.com/maps/api/js?key=" + i[a].apikey).then(function() {
                    mapFunction.findLocation(i[a]), $.ajaxSetup({
                        cache: !1
                    })
                })
            })
        }
    },
    findLocation: function(i) {
        var a, t, n = new google.maps.Geocoder;
        n.geocode({
            address: i.address
        }, function(o, d) {
            d == google.maps.GeocoderStatus.OK ? (a = o[0].geometry.location.lat(), t = o[0].geometry.location.lng(), mapFunction.initMap(a, t, i)) : console.log("Error:" + d)
        })
    },
    initMap: function(i, a, t) {
        var n = {
                lat: i,
                lng: a
            },
            o = [];
        t.mapstyle == "aubergine" ? o = [{
            elementType: "geometry",
            stylers: [{
                color: "#1d2c4d"
            }]
        }, {
            elementType: "labels.text.fill",
            stylers: [{
                color: "#8ec3b9"
            }]
        }, {
            elementType: "labels.text.stroke",
            stylers: [{
                color: "#1a3646"
            }]
        }, {
            featureType: "administrative.country",
            elementType: "geometry.stroke",
            stylers: [{
                color: "#4b6878"
            }]
        }, {
            featureType: "administrative.land_parcel",
            elementType: "labels.text.fill",
            stylers: [{
                color: "#64779e"
            }]
        }, {
            featureType: "administrative.province",
            elementType: "geometry.stroke",
            stylers: [{
                color: "#4b6878"
            }]
        }, {
            featureType: "landscape.man_made",
            elementType: "geometry.stroke",
            stylers: [{
                color: "#334e87"
            }]
        }, {
            featureType: "landscape.natural",
            elementType: "geometry",
            stylers: [{
                color: "#023e58"
            }]
        }, {
            featureType: "poi",
            elementType: "geometry",
            stylers: [{
                color: "#283d6a"
            }]
        }, {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{
                color: "#6f9ba5"
            }]
        }, {
            featureType: "poi",
            elementType: "labels.text.stroke",
            stylers: [{
                color: "#1d2c4d"
            }]
        }, {
            featureType: "poi.park",
            elementType: "geometry.fill",
            stylers: [{
                color: "#023e58"
            }]
        }, {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [{
                color: "#3C7680"
            }]
        }, {
            featureType: "road",
            elementType: "geometry",
            stylers: [{
                color: "#304a7d"
            }]
        }, {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{
                color: "#98a5be"
            }]
        }, {
            featureType: "road",
            elementType: "labels.text.stroke",
            stylers: [{
                color: "#1d2c4d"
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{
                color: "#2c6675"
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{
                color: "#255763"
            }]
        }, {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [{
                color: "#b0d5ce"
            }]
        }, {
            featureType: "road.highway",
            elementType: "labels.text.stroke",
            stylers: [{
                color: "#023e58"
            }]
        }, {
            featureType: "transit",
            elementType: "labels.text.fill",
            stylers: [{
                color: "#98a5be"
            }]
        }, {
            featureType: "transit",
            elementType: "labels.text.stroke",
            stylers: [{
                color: "#1d2c4d"
            }]
        }, {
            featureType: "transit.line",
            elementType: "geometry.fill",
            stylers: [{
                color: "#283d6a"
            }]
        }, {
            featureType: "transit.station",
            elementType: "geometry",
            stylers: [{
                color: "#3a4762"
            }]
        }, {
            featureType: "water",
            elementType: "geometry",
            stylers: [{
                color: "#0e1626"
            }]
        }, {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{
                color: "#4e6d70"
            }]
        }] : t.mapstyle == "retro" ? o = [{
            elementType: "geometry",
            stylers: [{
                color: "#ebe3cd"
            }]
        }, {
            elementType: "labels.text.fill",
            stylers: [{
                color: "#523735"
            }]
        }, {
            elementType: "labels.text.stroke",
            stylers: [{
                color: "#f5f1e6"
            }]
        }, {
            featureType: "administrative",
            elementType: "geometry.stroke",
            stylers: [{
                color: "#c9b2a6"
            }]
        }, {
            featureType: "administrative.land_parcel",
            elementType: "geometry.stroke",
            stylers: [{
                color: "#dcd2be"
            }]
        }, {
            featureType: "administrative.land_parcel",
            elementType: "labels.text.fill",
            stylers: [{
                color: "#ae9e90"
            }]
        }, {
            featureType: "landscape.natural",
            elementType: "geometry",
            stylers: [{
                color: "#dfd2ae"
            }]
        }, {
            featureType: "poi",
            elementType: "geometry",
            stylers: [{
                color: "#dfd2ae"
            }]
        }, {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{
                color: "#93817c"
            }]
        }, {
            featureType: "poi.park",
            elementType: "geometry.fill",
            stylers: [{
                color: "#a5b076"
            }]
        }, {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [{
                color: "#447530"
            }]
        }, {
            featureType: "road",
            elementType: "geometry",
            stylers: [{
                color: "#f5f1e6"
            }]
        }, {
            featureType: "road.arterial",
            elementType: "geometry",
            stylers: [{
                color: "#fdfcf8"
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{
                color: "#f8c967"
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{
                color: "#e9bc62"
            }]
        }, {
            featureType: "road.highway.controlled_access",
            elementType: "geometry",
            stylers: [{
                color: "#e98d58"
            }]
        }, {
            featureType: "road.highway.controlled_access",
            elementType: "geometry.stroke",
            stylers: [{
                color: "#db8555"
            }]
        }, {
            featureType: "road.local",
            elementType: "labels.text.fill",
            stylers: [{
                color: "#806b63"
            }]
        }, {
            featureType: "transit.line",
            elementType: "geometry",
            stylers: [{
                color: "#dfd2ae"
            }]
        }, {
            featureType: "transit.line",
            elementType: "labels.text.fill",
            stylers: [{
                color: "#8f7d77"
            }]
        }, {
            featureType: "transit.line",
            elementType: "labels.text.stroke",
            stylers: [{
                color: "#ebe3cd"
            }]
        }, {
            featureType: "transit.station",
            elementType: "geometry",
            stylers: [{
                color: "#dfd2ae"
            }]
        }, {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: [{
                color: "#b9d3c2"
            }]
        }, {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{
                color: "#92998d"
            }]
        }] : t.mapstyle == "silver" ? o = [{
            elementType: "geometry",
            stylers: [{
                color: "#f5f5f5"
            }]
        }, {
            elementType: "labels.icon",
            stylers: [{
                visibility: "off"
            }]
        }, {
            elementType: "labels.text.fill",
            stylers: [{
                color: "#616161"
            }]
        }, {
            elementType: "labels.text.stroke",
            stylers: [{
                color: "#f5f5f5"
            }]
        }, {
            featureType: "administrative.land_parcel",
            elementType: "labels.text.fill",
            stylers: [{
                color: "#bdbdbd"
            }]
        }, {
            featureType: "poi",
            elementType: "geometry",
            stylers: [{
                color: "#eeeeee"
            }]
        }, {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{
                color: "#757575"
            }]
        }, {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{
                color: "#e5e5e5"
            }]
        }, {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [{
                color: "#9e9e9e"
            }]
        }, {
            featureType: "road",
            elementType: "geometry",
            stylers: [{
                color: "#ffffff"
            }]
        }, {
            featureType: "road.arterial",
            elementType: "labels.text.fill",
            stylers: [{
                color: "#757575"
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{
                color: "#dadada"
            }]
        }, {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [{
                color: "#616161"
            }]
        }, {
            featureType: "road.local",
            elementType: "labels.text.fill",
            stylers: [{
                color: "#9e9e9e"
            }]
        }, {
            featureType: "transit.line",
            elementType: "geometry",
            stylers: [{
                color: "#e5e5e5"
            }]
        }, {
            featureType: "transit.station",
            elementType: "geometry",
            stylers: [{
                color: "#eeeeee"
            }]
        }, {
            featureType: "water",
            elementType: "geometry",
            stylers: [{
                color: "#c9c9c9"
            }]
        }, {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{
                color: "#9e9e9e"
            }]
        }] : t.mapstyle == "night" ? o = [{
            elementType: "geometry",
            stylers: [{
                color: "#242f3e"
            }]
        }, {
            elementType: "labels.text.fill",
            stylers: [{
                color: "#746855"
            }]
        }, {
            elementType: "labels.text.stroke",
            stylers: [{
                color: "#242f3e"
            }]
        }, {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [{
                color: "#d59563"
            }]
        }, {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{
                color: "#d59563"
            }]
        }, {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{
                color: "#263c3f"
            }]
        }, {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [{
                color: "#6b9a76"
            }]
        }, {
            featureType: "road",
            elementType: "geometry",
            stylers: [{
                color: "#38414e"
            }]
        }, {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{
                color: "#212a37"
            }]
        }, {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{
                color: "#9ca5b3"
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{
                color: "#746855"
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{
                color: "#1f2835"
            }]
        }, {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [{
                color: "#f3d19c"
            }]
        }, {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{
                color: "#2f3948"
            }]
        }, {
            featureType: "transit.station",
            elementType: "labels.text.fill",
            stylers: [{
                color: "#d59563"
            }]
        }, {
            featureType: "water",
            elementType: "geometry",
            stylers: [{
                color: "#17263c"
            }]
        }, {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{
                color: "#515c6d"
            }]
        }, {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [{
                color: "#17263c"
            }]
        }] : o = [], $(".js-map-link").attr("href", "https://www.google.com/maps/place/" + t.directions + "/@" + i + "," + a);
        var d = {
                zoom: t.zoom,
                center: n,
                styles: o,
                disableDefaultUI: !1
            },
            s = new google.maps.Map(document.getElementById(t.sectionid), d);
        if (t.showpin == !0) var c = new google.maps.Marker({
            position: n,
            map: s
        })
    }
},
globalAccordions = {
    init: function() {
        var i = 0,
            a = $(".faqAccordion > dt > button, .accordion > dt > a");
        $(".faqAccordion > dd, .accordion > dd").attr("aria-hidden", !0), a.attr("aria-expanded", !1), a.on("click activate", function() {
            if (i) return !1;
            i = 1;
            var t = $(this).attr("aria-expanded") === "false";
            return $(this).attr("aria-expanded", t), $(this).parent().next().slideToggle(function() {
                i = 0
            }), $(this).parent().next().attr("aria-hidden", !t), !1
        }), a.on("keydown", function(t) {
            var n = t.keyCode || e.which;
            n === 13 && $(this).trigger("activate")
        })
    }
};
//# sourceMappingURL=/s/files/1/0289/0132/t/24/assets/sections.js.map?v=1851228134141366390