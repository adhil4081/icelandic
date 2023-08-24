$(function() {
    var utils = {
        createAccordion: function(t, e, s) {
            var a = $(t),
                r = $(t).find(e),
                o = $(t).find(s),
                l = t + " " + e;
            if (t.indexOf(".accordion-tabs") >= 0) {
                var n = $.map(r, function(c, u) {
                    return [c, o[u]]
                });
                a.empty(), $.each(n, function(c, u) {
                    a.append(this)
                }), o.removeClass("active"), a.find(".active").next().slideToggle(), e = t + "> a"
            }
            $(t).children("a").each(function(c, f) {
                var f = $(this),
                    p = f.attr("href");
                f.attr("data-tab-value", p), f.removeAttr("href")
            }), $(t).find(e + ".active").next().slideToggle(), $("body").on("click", l, function(c) {
                c.preventDefault(), $(this).toggleClass("active"), $(this).next().slideToggle()
            })
        },
        mobileAccordion: function(t, e, s) {
            $container = $(t), $tab = $(t).find(e), $content = $(t).find(s), $(e + ".active").next().slideToggle(), $("body").on("click", e, function(a) {
                a.preventDefault(), $(this).toggleClass("active"), $(this).next().slideToggle()
            })
        },
        mobileParentActiveAccordion: function(t, e, s) {
            $container = $(t), $tab = $(t).find(e), $content = $(t).find(s), $(e + ".active").parent().next().slideToggle(), $("body").on("click", e, function(a) {
                a.preventDefault(), $(this).toggleClass("active"), $(this).parent().next().slideToggle()
            })
        },
        initializeTabs: function() {
            $("ul.tabs > li > a").attr("data-no-instant", !0), $("body").on("click", "ul.tabs > li > a", function(t) {
                t.preventDefault();
                var e = $(this).attr("href");
                e.charAt(0) == "#" && ($("ul.tabs > li > a.active").removeClass("active"), $(this).addClass("active"), $(this).parents("ul.tabs").next().find(e).show().css({
                    display: "block"
                }).addClass("active").siblings().hide().removeClass("active"))
            })
        },
        pageBannerCheck: function() {
            !$(".page-banner").length > 0 || $(".header").hasClass("header-background--solid") ? ($(".feature_image").removeClass("feature_image"), $(".header.is-absolute").removeClass("is-absolute"), $(".secondary_logo--true").find(".secondary_logo").css("display", "none"), $(".secondary_logo--true").find(".primary_logo").css("display", "block")) : $(".page-banner").hasClass("full-width--true") ? ($(".header").parent().addClass("feature_image"), $(".header").addClass("is-absolute"), $("header.feature_image").hasClass("secondary_logo--true") && ($(".secondary_logo--true").find(".secondary_logo").css("display", "block"), $(".secondary_logo--true").find(".primary_logo").css("display", "none"))) : ($(".header").parent().removeClass("feature_image"), $(".header").removeClass("is-absolute")), $(".index-sections").children().first(".under-menu").find(".full-width--true").length ? ($(".header").hasClass("header-background--solid") || ($(".index .header").parent().addClass("feature_image"), $(".index .header").addClass("is-absolute")), $("header.feature_image").hasClass("secondary_logo--true") && ($(".secondary_logo--true").find(".secondary_logo").show(), $(".secondary_logo--true").find(".primary_logo").hide())) : ($(".index .feature_image").removeClass("feature_image"), $(".index .header.is-absolute").removeClass("is-absolute"), $("header.feature_image").hasClass("secondary_logo--true") || ($(".secondary_logo--true").find(".secondary_logo").hide(), $(".secondary_logo--true").find(".primary_logo").show())), $(".detail-sections").children().first().hasClass("under-menu") ? ($(".header").hasClass("header-background--solid") || ($('[class^="page-details"] .header').parent().addClass("feature_image"), $('[class^="page-details"] .header').addClass("is-absolute")), $("header.feature_image").hasClass("secondary_logo--true") && ($(".secondary_logo--true").find(".secondary_logo").show(), $(".secondary_logo--true").find(".primary_logo").hide())) : ($('[class^="page-details"] .feature_image').removeClass("feature_image"), $('[class^="page-details"] .header.is-absolute').removeClass("is-absolute"), $("header.feature_image").hasClass("secondary_logo--true") || ($(".secondary_logo--true").find(".secondary_logo").hide(), $(".secondary_logo--true").find(".primary_logo").show()))
        },
        resizeActionButtons: function() {
            $(".js-caption:visible").each(function() {
                var t = 0;
                $(this).find(".action_button").each(function() {
                    $button = $(this), $(this).width() > t && (t = $(this).width())
                }), $(this).find(".action_button").width(t)
            })
        },
        enableDisclosure: function() {
            var t = $("[data-disclosure]"),
                e = $("[data-disclosure-toggle]"),
                s = $(".disclosure__list-wrap");

            function a(o) {
                o.siblings(".disclosure__list-wrap").is(":off-right") && o.siblings(".disclosure__list-wrap").addClass("disclosure--left")
            }

            function r(o, l) {
                o === !0 ? (e.not(l).removeClass("is-clicked"), e.not(l).attr("aria-expanded", "false")) : (e.removeClass("is-clicked"), e.attr("aria-expanded", "false")), s.removeClass("disclosure--left")
            }
            $("body").on("keyup", function(o) {
                o.which == "27" && r()
            }), t.on("mouseleave", function(o) {
                r()
            }), e.on("mouseenter focus", function(o) {
                r(!0, this);
                var l = $(o.currentTarget);
                l.attr("aria-expanded", "true").addClass("is-clicked"), a(l)
            }), $(".disclosure__button").on("focusout", function(o) {
                (!$(o.relatedTarget).hasClass("disclosure__button") || $(o.relatedTarget).hasClass("disclosure__toggle")) && r()
            }), e.on("touchstart", function(o) {
                if ($(window).width() < 798 || !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    var l = $(o.currentTarget);
                    r(!0, this), l.hasClass("is-clicked") ? (l.attr("aria-expanded", "false").removeClass("is-clicked"), s.removeClass("disclosure--left")) : (l.attr("aria-expanded", "true").addClass("is-clicked"), a(l))
                }
            })
        },
        unload: function(t) {
            $("[data-disclosure]").off(), $("[data-disclosure-toggle]").off()
        }
    }

utils.createAccordion(".toggle-all--true", "h4.toggle", "ul.toggle_list"), utils.createAccordion(".footer_menu", "h6", "ul"), utils.createAccordion(".footer_content", "h6", "div.toggle_content"), utils.createAccordion(".product_section .accordion-tabs", ".tabs li > a", ".tabs-content li"), utils.mobileParentActiveAccordion("#mobile_menu", "li.sublink > a.parent-link--true span", "li.sublink ul"), utils.mobileAccordion("#mobile_menu", "li.sublink > a.parent-link--false", "li.sublink ul"), utils.initializeTabs(), utils.resizeActionButtons(), globalAccordions.init(), $(window).on("resize", function() {
    utils.resizeActionButtons()
})
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
}
var arrowSize = {
    x0: 10,
    x1: 60,
    y1: 50,
    x2: 62,
    y2: 40,
    x3: 22
}
$(document).ready(function () {
    slideshow.init()
})


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
}
$(document).on("shopify:section:load", function(t) {
    var a = $("#shopify-section-" + t.detail.sectionId);
    utils.pageBannerCheck(), utils.enableDisclosure(), Shopify.theme_settings.newsletter_popup && newsletter_popup.init(), a.hasClass("image-gallery-section") && gallery.init(a), a.hasClass("faq-section") && globalAccordions.init(), a.hasClass("cart-section") && (cart.init(), $(".block__featured_collection").length && featuredCollectionSection.init()), a.hasClass("featured-promotions-section") && featuredPromotions.init(), a.hasClass("slideshow-section") && slideshow.init(), Shopify.theme_settings.enable_autocomplete && a.hasClass("search-section") && searchAutocomplete.init(), a.hasClass("testimonial-section") && testimonial.init(), a.hasClass("featured-products-section") && (productPage.init(), videoFeature.init(), productPage.productSwatches(), Shopify.theme_settings.enable_shopify_review_comments && $(".shopify-product-reviews-badge").length && SPR.$(document).ready(function() {
        return SPR.registerCallbacks(), SPR.initRatingHandler(), SPR.initDomEls(), SPR.loadProducts(), SPR.loadBadges()
    })), a.hasClass("map-section") && mapFunction.init(), a.hasClass("featured-collection-section") && (featuredCollectionSection.init(), videoFeature.init()), a.hasClass("video-section") && videoSection.init(), a.hasClass("recently-viewed__section") && recentlyViewed.init(), a.hasClass("product-template") && (productPage.init(), videoFeature.init(), productPage.productSwatches(), recentlyViewed.init(), Shopify.theme_settings.enable_shopify_review_comments && ($("#shopify-product-reviews").length || $(".shopify-product-reviews-badge").length) && SPR.$(document).ready(function() {
        return SPR.registerCallbacks(), SPR.initRatingHandler(), SPR.initDomEls(), SPR.loadProducts(), SPR.loadBadges()
    })), a.hasClass("recommended-products-section") && productPage.init(), a.hasClass("article-template-section") && window.location.pathname.indexOf("/comments") != -1 && $("html,body").animate({
        scrollTop: $("#new-comment").offset().top - 140
    }, "slow"), a.hasClass("collection-template-section") && (collectionSidebarFilter.init(), recentlyViewed.init()), a.hasClass("contact-section") && mapFunction.init(), a.hasClass("search-template-section") && (Shopify.theme_settings.enable_autocomplete && searchAutocomplete.init(), collectionSidebarFilter.init()), a.hasClass("header-section") && (header.init(), header.loadMegaMenu()), a.hasClass("mega-menu-section") && header.loadMegaMenu(), a.hasClass("page-details-section") && (featuredCollectionSection.init(), videoSection.init(), recentlyViewed.init(), $(".block__image_gallery").length && gallery.init()), a.hasClass("product-details-section") && (featuredCollectionSection.init(), videoSection.init(), mapFunction.init(), $(".block__image_gallery").length && gallery.init(), recentlyViewed.init(), productPage.init())
})
$(document).ready(function () {
    featuredPromotions.init()

});

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
        }), $(".mini_cart").on("click", function(r) {
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
}
function is_touch_device() {
    return "ontouchstart" in window || navigator.maxTouchPoints
}
var touch_device = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
$(document).ready(function () {
    header.init()

});
showSecondaryImage = {
    init: function() {
    $(window).width() > 798 && ($(".has-secondary-media-swap").off().on("mouseenter", function() {
        $(this).find(".image-element__wrap img").toggleClass("secondary-media-hidden");
        $(this).find(".image__container .image-element__wrap").toggleClass("active");
        $(this).find(".secondary-image-opc").toggleClass("active");
        
    }), $(".has-secondary-media-swap").on("mouseleave", function() {
        $(this).find(".image-element__wrap img").toggleClass("secondary-media-hidden");
        $(this).find(".secondary-image-opc").toggleClass("active");
        $(this).find(".image__container .image-element__wrap").toggleClass("active");
    }))
}
}
$(document).ready(function () {
    showSecondaryImage.init()

});
productMedia = {
    models: [],
    setupMedia: function() {
        var t = {
            controls: ["zoom-in", "zoom-out", "fullscreen"],
            focusOnPlay: !1
        };
        $($("model-viewer", $(".js-product-gallery, .js-gallery-modal"))).each(function(e, s) {
            s = new Shopify.ModelViewerUI(s, t), productMedia.models.push(s)
        }), $(".product-gallery__model model-viewer").on("mousedown", function() {
            productMedia.hideModelIcon(this)
        })
    },
    showModelIcon: function(t) {
        $(t).find(".button--poster, .model-icon-button-control").show()
    },
    hideModelIcon: function(t) {
        $(t).find(".button--poster, .model-icon-button-control").hide()
    }
}
videoEl = {
    playButtonIcon: '<button type="button" class="plyr__control plyr__control--overlaid" aria-label="Play, {title}" data-plyr="play"><svg class="play-icon-button-control" width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="60" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M23 20V40L39 29.4248L23 20Z" fill="#323232"/></svg><span class="plyr__sr-only">Play</span></button>',
    playButton: '<button type="button" class="plyr__controls__item plyr__control" aria-label="Play, {title}" data-plyr="play"><svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-pause"></use></svg><svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-play"></use></svg><span class="label--pressed plyr__tooltip" role="tooltip">Pause</span><span class="label--not-pressed plyr__tooltip" role="tooltip">Play</span></button>',
    muteButton: '<button type="button" class="plyr__controls__item plyr__control" aria-label="Mute" data-plyr="mute"><svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-muted"></use></svg><svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-volume"></use></svg><span class="label--pressed plyr__tooltip" role="tooltip">Unmute</span><span class="label--not-pressed plyr__tooltip" role="tooltip">Mute</span></button>',
    progressInput: '<div class="plyr__controls__item plyr__progress__container"><div class="plyr__progress"><input data-plyr="seek" type="range" min="0" max="100" step="0.01" value="0" aria-label="Seek"><progress class="plyr__progress__buffer" min="0" max="100" value="0">% buffered</progress><span role="tooltip" class="plyr__tooltip">00:00</span></div></div>',
    volume: '<div class="plyr__controls__item plyr__volume"><input data-plyr="volume" type="range" min="0" max="1" step="0.05" value="1" autocomplete="off" aria-label="Volume"></div>',
    fullscreen: '<button type="button" class="plyr__controls__item plyr__control" data-plyr="fullscreen"><svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-exit-fullscreen"></use></svg><svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-enter-fullscreen"></use></svg><span class="label--pressed plyr__tooltip" role="tooltip">Exit fullscreen</span><span class="label--not-pressed plyr__tooltip" role="tooltip">Enter fullscreen</span></button>'
},
videoControls = videoEl.playButtonIcon + '<div class="plyr__controls">' + videoEl.playButton + videoEl.progressInput + videoEl.muteButton + videoEl.volume + videoEl.fullscreen + "</div>",
globalVideoPlayers = [],
videoPlayers = [];
videoFeature = {
init: function() {
    this.setupVideoPlayer(), this.setupRecommendedVideoPlayer()
},
setupVideoPlayer: function() {
    var t = document.querySelectorAll("[data-html5-video] video, [data-youtube-video]"),
        e = Plyr.setup(t, {
            controls: videoControls,
            ratio: this.aspect_ratio,
            fullscreen: {
                enabled: !0,
                fallback: !0,
                iosNative: !0
            },
            storage: {
                enabled: !1
            }
        });
    globalVideoPlayers && $.each(e, function(a, r) {
        globalVideoPlayers.push(r)
    });
    var s = $("[data-video-loop]").data("video-loop") || !1;
    $.each(e, function(a, r) {
        r.loop = s, videoPlayers.push(r)
    }), this.setupListeners()
},
setupPlayerForRecentlyViewedProducts: function(t) {
    if (t) {
        var e = new Plyr(t, {
            controls: videoControls,
            ratio: this.aspect_ratio,
            fullscreen: {
                enabled: !0,
                fallback: !0,
                iosNative: !0
            },
            storage: {
                enabled: !1
            }
        });
        videoPlayers !== null && (videoPlayers.push(e), this.setupListeners())
    }
},
setupRecommendedVideoPlayer: function() {
    var t = document.querySelectorAll("[data-product-recommendations-container] [data-html5-video] video, [data-product-recommendations-container] [data-youtube-video]");
    if (t.length > 0)
        if (videosInRecommendedProductsPlayer = Plyr.setup(t, {
                controls: videoControls,
                fullscreen: {
                    enabled: !0,
                    fallback: !0,
                    iosNative: !0
                },
                storage: {
                    enabled: !1
                }
            }), videoPlayers !== null) {
            var e = videoPlayers.concat(videosInRecommendedProductsPlayer);
            videoPlayers = e
        } else videoPlayers = videosInRecommendedProductsPlayer;
    this.setupListeners()
},
setupListeners: function() {
    $.each(videoPlayers, function(t, e) {
        var s = e.id || e.media.dataset.plyrVideoId,
            a;
        e.isHTML5 && (a = $(e.elements.wrapper).find("video"), a.attr("data-plyr-video-id", s))
    }), $.each(globalVideoPlayers, function(t, e) {
        e.on("play", function(s) {
            var a = s.detail.plyr;
            $.each(globalVideoPlayers, function(r, o) {
                a.id != o.id && o.pause()
            })
        })
    })
},
enableVideoOnHover: function(t) {
    var e = t.find("[data-html5-video]"),
        s = t.find("[data-youtube-video]"),
        a;
    e.length > 0 ? a = e.find("[data-plyr-video-id]").data("plyr-video-id") : s.length > 0 && (a = s.find("iframe").attr("id")), a && $.each(videoPlayers, function(r, o) {
        (o.id == a || o.media.id == a) && (o.toggleControls(!1), o.muted = !0, o.play())
    })
},
disableVideoOnHover: function(t) {
    var e = t.find("[data-html5-video]"),
        s = t.find("[data-youtube-video]"),
        a;
    e.length > 0 ? a = e.find("[data-plyr-video-id]").data("plyr-video-id") : s.length > 0 && (a = s.find("iframe").attr("id")), a && $.each(videoPlayers, function(r, o) {
        (o.id == a || o.media.id == a) && o.playing && o.pause()
    })
}
};
function isScreenSizeLarge() {
    if ($(window).width() > 1024) return !0
}



var productPage = {
    init: function() {
        $(".js-full-width-product-images").length && imageFunctions.fullWidth(".product-template .product .description img", ".js-full-width-product-images"), $("[data-product-gallery]").each(function(t, n) {
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
        }),$(".js-product-gallery a").fancybox({
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
}
$(document).ready(function () {
    productPage.init()

});
newsletter_popup = {
    init: function() {
        ($(window).width() > 798) && setTimeout(function() {
            $.fancybox.open($(".js-newsletter-popup"), {
                baseClass: "newsletter__lightbox",
                hash: !1,
                infobar: !1,
                toolbar: !1,
                loop: !0,
                smallBtn: !0,
                mobile: {
                    preventCaptionOverlap: !1,
                    toolbar: !0,
                    buttons: ["close"]
                }
            })
        }, 5000)
    }
}
$(document).ready(function () {
    newsletter_popup.init()

});
});
