var myTheme = {
    init : function(){
		var ie_v = $exe.isIE();
        if (ie_v && ie_v<8) return false;
        var l = $('<p id="nav-toggler"><a href="#" onclick="myTheme.toggleMenu(this)" class="hide-nav" id="toggle-nav" title="'+$exe_i18n.hide+'"><span>'+$exe_i18n.menu+'</span></a></p>');
        var n = $("#siteNav");
		n.before(l);
        var url = window.location.href;
        url = url.split("?");
        if (url.length>1){
            if (url[1].indexOf("nav=false")!=-1) {
                myTheme.hideMenu();
				return false;
            }
        }
		// border-radius
		var last = "";
		$("A",n).each(function(i){
			if (i==0) this.className+=" top-right-radius";
			if ($(this).is(":visible")) last = this;
		});
		if (last!="") last.className+=" bottom-right-radius";
		this.addNavArrows(n);
    },
	setIcons : function(k){
		$(".iDevice_wrapper").each(function(i){
			if (this.className.indexOf("em_iDevice")!=-1) {
				var e = $(this);
				// Provisional solution so the user can use the iDevice Editor to choose an icon
				$(".iDevice_header",e).each(function(){
					var i = this.style.backgroundImage;
					if (i!="") $(".iDeviceTitle",this).css("background-image",i);
					this.style.backgroundImage = "none";
				});
				var t = $(".iDeviceTitle",e);
				var c = t.css("background-image");
				if (c!="") {
					t.css("background-image","none");
					e.prepend("<div class='icon_wrapper' style='background-image:"+c+"'></div>");
				}
			}
		});		
	},
	addNavArrows : function(n){
		$("ul ul .daddy",n).each(
			function(){
				this.innerHTML+=' <span>&#9658;</span>';
			}
		);
	},
    hideMenu : function(){
        $("#siteNav").hide();
        $("#toggle-nav").removeClass("hide-nav").addClass("show-nav").attr("title",$exe_i18n.show).find("span").html($exe_i18n.menu);
        $("#main-wrapper").addClass("no-nav");
    },
    toggleMenu : function(e){
        var n = $("#siteNav");
        var mw = $("#main-wrapper");
        if (n.is(":visible")) {
            n.hide();
            mw.addClass("no-nav");
            $(e).removeClass("hide-nav").addClass("show-nav").attr("title",$exe_i18n.show).find("span").html($exe_i18n.menu);
            myTheme.params("add");
        } else {
            n.show();
            mw.removeClass("no-nav");
            $(e).removeClass("show-nav").addClass("hide-nav").attr("title",$exe_i18n.hide).find("span").html($exe_i18n.menu);
            myTheme.params("remove");
        }
    },
	param : function(e,act) {
		var hr = e.href;
		var param = "nav=false";
		if (act=="add") {
			if (hr.indexOf("?")!=-1) {
				if (hr.indexOf(param)==-1) e.href = hr + "&" + param;
			} else {
				e.href = hr + "?" + param;
			}
		} else {
			e.href = hr.replace("&"+param,"").replace("?"+param,"");
		}
	},
	params : function(act){
		var as = $("#siteNav a, #topPagination a, #bottomPagination a");
		as.each(function(){
			myTheme.param(this,act);
		});
	}
}

$(function(){
	myTheme.init();
	myTheme.setIcons();
});