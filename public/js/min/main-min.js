!function($,o,a,e){"use strict";var t=".main-nav",s="header--hidden",l=500,n=$(t);if(!n.length)return!0;var i=$(o),r=0,c=0,d=0,u=0,v=$(a),f=0,h=function(o,a){var e,t;return function(){var s=this,l=arguments,n=+new Date;e&&e+o>n?(clearTimeout(t),t=setTimeout(function(){e=n,a.apply(s,l)},o)):(e=n,a.apply(s,l))}};i.on("scroll",h(l,function(){f=v.height(),r=i.height(),c=i.scrollTop(),u=d-c,0>=c?n.removeClass(s):u>0&&n.hasClass(s)?n.removeClass(s):0>u&&(c+r>=f&&n.hasClass(s)?n.removeClass(s):n.addClass(s)),d=c}));var m="Come back to fly again!",p;$(o).focus(function(){p&&(a.title=p)}).blur(function(){var o=$("title").text();o!=m&&(p=o),a.title=m});var C=$("header").outerHeight();$(o).scroll(function(){$(a).scrollTop()>C?$("#up-nav").addClass("white-nav"):$("#up-nav").removeClass("white-nav"),$(a).scrollTop()>C?$(".main-nav").addClass("white-nav"):$(".main-nav").removeClass("white-nav")});var w=400,b=1200,T=700,g=$(".cd-top");$(o).scroll(function(){$(this).scrollTop()>w?g.addClass("cd-is-visible"):g.removeClass("cd-is-visible cd-fade-out"),$(this).scrollTop()>w?$(".main-footer").addClass("show-footer"):$(".main-footer").removeClass("show-footer"),$(this).scrollTop()>b&&g.addClass("cd-fade-out")}),g.on("click",function(o){o.preventDefault(),$("body,html").animate({scrollTop:0},T)}),$(".arrow").on("click",function(o){o.preventDefault(),$("body,html").animate({scrollTop:C},T)})}(jQuery,window,document),$(function(){$(".button-collapse").sideNav(),$(".dropdown-button").dropdown(),$("ul.tabs").tabs(),$("select").material_select();var o=0});