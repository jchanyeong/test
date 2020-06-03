
var mql = window.matchMedia("all and (min-width: 1200px)");
var gnbMaxHeight = [];
mql.addListener(function(){
	deviceCheck();
});

$(function(){
	var max 

	// PC Gnb
	$(document).on("mouseenter focus",".desktop #gnb>ul>li>a",function(){
		$("#header").addClass("open");
		$("#gnb>ul>li>a , #gnb>ul>li>a+div").removeClass("on");
		$('#header').prepend('<div class="after_bg"></div>');
		$(this).addClass("on").next().addClass("on");
		/* 20200427 수정 */
		gnbMaxHeight=[];

		$("#header #gnb>ul>li>div").each(function(){
	        gnbMaxHeight.push($(this).height());
		});
		
		max = gnbMaxHeight.reduce( function (previous, current) {
			return previous > current ? previous:current;
		});

		$("#header #gnb>ul>li>div").height(max);
		$(".after_bg").height(max+30);
		return false;
	});
	$(document).on("mouseleave",".desktop .h-menu",function(){
		$("#header").removeClass("open");
		$("#gnb>ul>li>a , #gnb>ul>li>a+div").removeClass("on");
		$("#gnb .low-mn").removeClass("open");
		$(".after_bg").remove();
		$("#header #gnb>ul>li>div").removeAttr("style");
	});
	$(document).on("mouseenter",".desktop #header #gnb>ul>li>div",function(){
		$("#gnb>ul>li>a , #gnb>ul>li>a+div").removeClass("on");
		$(this).addClass("on").prev().addClass("on");
	});
	$(document).on("click",".desktop .low-mn",function(){
		$(this).toggleClass("open");
		$("#header #gnb>ul>li>div").removeAttr("style");
		gnbMaxHeight=[];

		$("#header #gnb>ul>li>div").each(function(){
	        gnbMaxHeight.push($(this).height());
		});

		max = gnbMaxHeight.reduce( function (previous, current) {
			return previous > current ? previous:current;
		});

		$("#header #gnb>ul>li>div").height(max);
		$(".after_bg").height(max+30);
		return false;
	});

	// focusout 일 때, gnb 닫힘
	$('#gnb>ul>li:nth-child(6)>div>ul>li:last-child').find(' > a').on('keydown',function(e){
		if(e.which == 9 != e.shiftKey && e.which == 9) {
			$('#header').removeClass('open');
			$(".after_bg").remove();
		}
	});

	$('#gnb>ul>li:first-child').find(' > a').on('keydown',function(e){
		if(e.which == 9 && e.shiftKey) {
			$('#header').removeClass('open');
			$(".after_bg").remove();
		}
	});

	// Mobile Gnb
	$(document).on("click",".mobile #header .btn_m_menu",function(){
		$(".mobile .gnb_wrap").addClass("open");
		$("#header #gnb>ul>li>a").removeClass("on");
		$(".mobile #header #gnb>ul>li:nth-child(1)>a").addClass("on");
		bodyScrollLock.disableBodyScroll(document.getElementById('gnb'));
	});
	$(document).on("click",".mobile .low-mn",function(){
		$(this).toggleClass("open");
		return false;
	});
	$(document).on("click",".mobile #header #gnb>ul>li>a",function(){
		$(this).addClass("on").parent().siblings().find(">a").removeClass("on");
		return false;
	});
	$("#header .mobile-menu-top>button").on("click",function(){
		$(".mobile .gnb_wrap").removeClass("open");
		bodyScrollLock.enableBodyScroll(document.getElementById('gnb'));
	});
	$("#header #gnb>ul>li>div>ul>li").each(function(){
		if($(this).children().length == 2){
			$(this).find(">a").addClass("low-mn");
		}
	});

	//bookmark
	$(document).ready(function() {

		$('.bookmark').on('click', function(e) {
			var bookmarkURL = window.location.href;
			var bookmarkTitle = document.title;
			var triggerDefault = false;

			if (window.sidebar && window.sidebar.addPanel) {
				// Firefox version < 23
				window.sidebar.addPanel(bookmarkTitle, bookmarkURL, '');
			} else if ((window.sidebar && (navigator.userAgent.toLowerCase().indexOf('firefox') > -1)) || (window.opera && window.print)) {
				// Firefox version >= 23 and Opera Hotlist
				var $this = $(this);
				$this.attr('href', bookmarkURL);
				$this.attr('title', bookmarkTitle);
				$this.attr('rel', 'sidebar');
				$this.off(e);
				triggerDefault = true;
			} else if (window.external && ('AddFavorite' in window.external)) {
				// IE Favorite
				window.external.AddFavorite(bookmarkURL, bookmarkTitle);
			} else {
				// WebKit - Safari/Chrome
				alert((navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Cmd' : 'Ctrl') + '+D 키를 눌러 즐겨찾기에 등록하실 수 있습니다.');
			}
			return triggerDefault;
		});
	});

	// lnb script
	// 20200427 수정 $(document).on('click','#lnb .link-box .lnb-current',function(){
	$(document).on('click','#lnb .link-box:last-of-type .lnb-current',function(){
		$(this).parent('.link-box').toggleClass('on');
		if($(this).parent().hasClass('on')){
			$(this).attr('title','메뉴 닫힘');
		} else {
			$(this).attr('title','메뉴 열림');
		}
	});
	// Quick Menu

	var url = window.location.pathname;
	var scrollValue;

	if(url.indexOf('index') != -1 || url.indexOf('main') != -1){
		scrollValue = 654;
		$('.choice_language_pc').css('top', scrollValue+30 +"px");
		// main / sub 분리 시 개별 작업해놓기(수정보완)
	} else{
		scrollValue = 425;
	}

	$(window).scroll(function(){
		if($(this).scrollTop() >= scrollValue){
			$(".choice_language_pc").addClass("fix");
		}else{
			$(".choice_language_pc").removeClass("fix");
		}
	});

	// 언어선택 창
	$(".choice_language_pc>button").on("click",function(){
		$(this).parent().toggleClass("open");
		return false;
	});

	// 달력
	$(".datepicker").datepicker({
		changeYear: true,
		changeMonth: true,
		dateFormat: "yy-mm-dd",
		showMonthAfterYear: true,
		monthSuffix: "년",
		dayNames: ['일요일','월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
		dayNamesMin: ['일','월', '화', '수', '목', '금', '토'],
		monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		numberOfMonths: [1,1],
		buttonImage: "",
		buttonText: "달력 열기",
		showOn: "button",
		yearRange: "c-50:c+10"
	});

	$('.datepicker').datepicker();

	$(".related_org .pop_close").on("click",function(){
		$(".related_org_box").hide();
	});

	// 서브메인 탭
	$(".sub-main .tab-content > div:first-child .board-tab").addClass("active")
	$(document).on("click", ".sub-main .board-area .board-tab", function(){
		$(".sub-main .board-area .board-tab").removeClass("active")
		$(this).addClass("active")
	});

	$(".btn_ag").on("click",function(){
		$(this).parent().toggleClass("ag-hide");
		if($(this).text() == "약관 닫기"){
			$(this).attr("title","약관 열기").find(">span").text("약관 열기");
		}else{
			$(this).attr("title","약관 닫기").find(">span").text("약관 닫기");
		}
	});

	// 트리메뉴
	$("#browser").treeview();

	// language 수정
	$('.language_box>li').on('click', function(){
		$(".h-menu .choice_language").removeClass($(".h-menu .choice_language").attr("data-lang"));
		var langTitle = $(this).find('>a').text();
		var langClass = $(this).attr('class');
		$(".h-menu .choice_language").attr("data-lang",langClass);
		// 타이틀
		$('.choice_language').attr('title',langTitle + " 선택됨");
		$('.choice_language_pc>button').attr('title',langTitle + " 선택됨");

		$('.choice_language_pc>button').removeClass();
		$('.choice_language,.choice_language_pc>button').addClass(langClass);
		$('.choice_language').removeClass('on');
	})

	// 유관기관 찾기
	$(".related_org_map .r a").on("click",function(){
		var region = $(this).data("region");
		$(this).addClass("on").parent().siblings().find(">a").removeClass("on");
		$("#"+region).show().siblings().hide();
		$(".related_org_map .l").focus();
		return false;
	});

	/* main
	setTimeout(function(){
		$('.section_04 .slider_wrap .slide>a>.tit').addClass('ellipsis2');
		$('.section_04 .slider_wrap .slide>a>.cont').addClass('ellipsis5');
	}, 1000);
	*/

	// language span text변경
	$("button[class*='choice_language']").on('click',function(){
		if($(this).hasClass('on')){
			$(this).find('.blind').text('LANGUAGE 닫음');
			$("button[class*='choice_language']+.language_box").on('click',function(){
				$("button[class*='choice_language']").find('.blind').text('LANGUAGE 열림');
			})
		} else {
			$(this).find('.blind').text('LANGUAGE 열림');
		}
	})

	$("div[class*='choice_language_pc']>button").on('click',function(){
		if($(this).parent().hasClass('open')){
			$(this).find('.blind').text('LANGUAGE 닫음');
		} else {
			$(this).find('.blind').text('LANGUAGE 열림');
		}
	})

});

function relatedOrg(){
	$(".related_org_box").show();
}
function languageOn(){
	$(".mobile .choice_language").toggleClass('on');
	if($('.mobile .choice_language').hasClass('on')){
		$('.mobile .choice_language').after($('.language_box'));
	}
}

function currentPage(dep1,dep2){
	$("#aside>nav>ul>li").eq(dep1-1).find(">a").addClass("on");
	if(dep2){
		//$("#aside>nav>ul>li").eq(dep1-1).find(">ul").show();
		$("#aside>nav>ul>li").eq(dep1-1).find(">ul>li").eq(dep2-1).find(">a").addClass("on");
	}
}

function tabOn(){
	$('.tab-menu .title-menu').toggleClass('on');
}

//선택한 관련기관 사이트 이동
 function gotoLinkSite(){
	var f = document.formLinkSite;
	if(f.linkSite.value == ""){
		alert("관련기관을 선택해주세요.");
		document.getElementById("linkSite").focus();
		return false;
	} else {
		window.open(f.linkSite.value)
	}
}

// 개인정보처리방침 이동
function goPrivacy(){
	var f = document.LinkSite;
	window.location.href = f.linkSite.value;
}

// 팝업 열기
function LayerPopupOpen(id){
	var e = $(event.target);
	e.attr("data-wa-btn", "focus");
	$(".layer-popup[data-popup="+id+"]").show();
	$(".layer-popup[data-popup="+id+"]").attr("tabindex","0").focus();
	$(".layer-popup[data-popup="+id+"] .popup-content").attr("tabindex","0");
}

// 팝업 닫기
function LayerPopupClose(id){
	$(".layer-popup[data-popup="+id+"]").hide();
	$("[data-wa-btn='focus']").focus();
	$("[data-wa-btn='focus']").removeAttr("data-wa-btn");
}

// 팝업 - 오늘 하루 보지 않기
function closePopup(popName,expiredays){
	setCookie( popName, "done" , expiredays);
	$("#"+popName).hide();
}

// 쿠키 설정하기
function setCookie(name,value,expiredays) {
   var todayDate = new Date();
   todayDate.setDate( todayDate.getDate() + expiredays );
   document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}

// 쿠키 가져오기
function getCookie(name) {
	var nameOfCookie = name + "=";
	var x = 0;
	while ( x <= document.cookie.length){
	   var y = (x+nameOfCookie.length);
	   if ( document.cookie.substring( x, y ) == nameOfCookie ) {
		   if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )
			   endOfCookie = document.cookie.length;
		   return unescape( document.cookie.substring( y, endOfCookie ) );
	   }
	   x = document.cookie.indexOf( " ", x ) + 1;
	   if ( x == 0 )
		   break;
	}
	return "";
}

// PC,Mobile main_service focus 웹접근성
$(function(){
	var href;
	$(".main_service>ul>li>.cont>a[href*=#ms-]").on("click",function(){
		href = $(this).attr("href");
		$(".main_service>ul>li>.cont").show();
		$(".main_service>ul>li>.content").removeClass("open");
		$(this).closest(".cont").hide();
		$(href).addClass("open");
	})

	// main-section02 focus 웹접근성 수정보완
	/*
	$('.desktop .main_service .cont a').focusin(function(){
		$('.desktop .main_service li').removeClass('on');
		$('.desktop .main_service .content').hide();
		$(this).closest('li').addClass('on');
	});
	*/
	/*
	$(".main_service>ul>li>.cont>a[href*=#ms-]").on("focusin",function(){
		href = $(this).attr("href");
		$(".main_service>ul>li>.cont").show();
		$(".main_service>ul>li>.content").removeClass("open");
		// $(this).closest("div").hide();
		$(href).addClass("open");
	})

	$(".desktop .main_service>ul>li>.cont>a[href*=#ms-]").mouseenter(function(){
		href = $(this).attr("href");
		$(".main_service>ul>li>.content").removeClass("open");
		$(href).addClass("open");
	})

	$(".desktop .main_service>ul>li>.content").mouseleave(function(){
		$(".main_service>ul>li>.content").removeClass("open");
	})
	*/

	$(document).on("focusin",".desktop .main_service>ul>li>.cont>a[href*=#ms-]",function(){
		href = $(this).attr("href");
		$(".main_service>ul>li>.cont").show();
		$(".main_service>ul>li>.content").removeClass("open");
		// $(this).closest("div").hide();
		$(href).addClass("open");
	})

	$(document).on("mouseenter",".desktop .main_service>ul>li>.cont>a[href*=#ms-]",function(){
		href = $(this).attr("href");
		$(".main_service>ul>li>.content").removeClass("open");
		$(href).addClass("open");
	})

	$(document).on("mouseleave",".desktop .main_service>ul>li>.content",function(){
		$(this).removeClass("open");
	})

	// focusout 일 때, section_02 닫힘
	$(".desktop #ms-h2").find("> a").on("keydown",function(e){
		if(e.which == 9 != e.shiftKey && e.which == 9) {
			// $(".main_service>ul>li>.cont").show();
			$(".main_service>ul>li>.content").removeClass("open");
		}
	});

	$(".desktop  #ms-biz>ul>li:first-child,.desktop .main_service>ul>li:first-child>.cont").find("> a").on("keydown",function(e){
		if(e.which == 9 && e.shiftKey) {
			// $(".main_service>ul>li>.cont").show();
			$(".main_service>ul>li>.content").removeClass("open");
		}
	});
})

function deviceCheck(){
	if(mql.matches){
		$("html").removeClass("mobile").addClass("desktop");
		$("#header #gnb>ul>li>a").removeClass("on");
		$(".main_service>ul>li>.cont").show().find("+.content").removeClass("open"); // 웹접근성 수정보완
		// $('.main_service>ul>li>.cont').show().find('+.content').hide(); 웹접근성 수정보완
		$(".desktop .choice_language_pc").append($(".language_box"));
	}else{
		$("html").removeClass("desktop").addClass("mobile");
		$(".main_service>ul>li>.cont").show().find("+.content").removeClass("open"); // 웹접근성 수정보완
		$(".mobile .choice_language").after($(".language_box"));
	}
}deviceCheck();

/* body zoom */
var Browser = { a : navigator.userAgent.toLowerCase() }

   Browser = {
           ie : /*@cc_on true || @*/ false,
           ie6 : Browser.a.indexOf('msie 6') != -1,
           ie7 : Browser.a.indexOf('msie 7') != -1,
           ie8 : Browser.a.indexOf('msie 8') != -1,
           opera : !!window.opera,
           safari : Browser.a.indexOf('safari') != -1,
           safari3 : Browser.a.indexOf('applewebkit/5') != -1,
           mac : Browser.a.indexOf('mac') != -1,
           chrome : Browser.a.indexOf('chrome') != -1,
           firefox : Browser.a.indexOf('firefox') != -1
       }


   // 기본 Zoom
   var nowZoom = 100;
   // 최대 Zoom
   var maxZoom = 150;
   // 최소 Zoom
   var minZoom = 80;

   // 화면크기 확대
   function zoomIn(){

       if( Browser.chrome ) {
           if( nowZoom <= maxZoom ) {
               nowZoom += 10; // 10 = 25%씩 증가
               document.body.style.zoom = nowZoom + "%";
           }
           else{
               alert('최대 확대입니다.');
           }
       }
       else if( Browser.opera ) {
           alert('오페라는 화면크기 기능을 지원하지 않습니다.\n브라우저 내의 확대/축소 기능을 이용하시기 바랍니다.');
       }
       else if( Browser.safari || Browser.safari3 || Browser.mac ) {
           alert('사파리, 맥은 화면크기 기능을 지원하지 않습니다.\n브라우저 내의 확대/축소 기능을 이용하시기 바랍니다.');
       }
       else if( Browser.firefox ) {
           alert('파이어폭스는 화면크기 기능을 지원하지 않습니다.\n브라우저 내의 확대/축소 기능을 이용하시기 바랍니다.');
       }
       else {
           if( nowZoom <= maxZoom ) {
               nowZoom += 10; //10 = 25%씩 증가
               document.body.style.position = "relative";
               document.body.style.zoom = nowZoom + "%";
           }
           else{
               alert('최대 확대입니다.');
           }
       }
   };

   // 화면크기 축소
   function zoomOut(){

       if( Browser.chrome ) {
           if( nowZoom >= minZoom ) {
               nowZoom -= 10; // 10 = 25%씩 증가
               document.body.style.zoom = nowZoom + "%";
           }
           else{
               alert('최대 축소입니다.');
           }
       }
       else if( Browser.opera ) {
           alert('오페라는 화면크기 기능을 지원하지 않습니다.\n브라우저 내의 확대/축소 기능을 이용하시기 바랍니다.');
       }
       else if( Browser.safari || Browser.safari3 || Browser.mac  ) {
           alert('사파리, 맥은 화면크기 기능을 지원하지 않습니다.\n브라우저 내의 확대/축소 기능을 이용하시기 바랍니다.');
       }
       else if( Browser.firefox ) {
           alert('파이어폭스는 화면크기 기능을 지원하지 않습니다.\n브라우저 내의 확대/축소 기능을 이용하시기 바랍니다.');
       }
       else {
           if( nowZoom >= minZoom ) {
               nowZoom -= 10; //10 = 25%씩 증가
               document.body.style.position = "relative";
               document.body.style.zoom = nowZoom + "%";
           }
           else{
               alert('최대 축소입니다.');
           }
       }
   };

   // 화면크기 원래대로(100%)
   function zoomReset(){
       nowZoom = 100;
       document.body.style.zoom = nowZoom + "%";
   };

	// 서브 현재 메뉴 활성화
   function currentMenu(dep1,dep2,dep3){
		$("#dep1>button").text($("#dep1>ul>li").eq(dep1-1).find(">a>span").text());
		$("#dep2>button").text($("#dep2>ul>li").eq(dep2-1).find(">a>span").text());
		//$("#dep3>button").text($("#dep3>ul>li").eq(dep3-1).find(">a>span").text());
		//$("#dep3>button").text($("#dep3>ul>li").eq(dep3-1).find(">a>span").text());

		if(dep3){
			$("#dep3>button").text($("#dep3>ul[data-dep3=" + $("#dep2>button").text() + "]").find(">li").eq(dep3-1).find(">a>span").text());
			$("#dep3>ul[data-dep3=" + $("#dep2>button").text() + "]").addClass("current-dep3");
		}


		//$("#dep3>ul[data-dep3=" + $("#dep2>button").text() + "]").show();

		$(".sub-visual .location>li:nth-child(2)").text($("#dep1>button").text());
		if($("#dep3>button").text() != ""){
			$(".sub-visual .location>li:nth-child(3)").text($("#dep2>button").text());
			$(".sub-visual .location").append("<li class='lct-d3'><strong>" + $("#dep3>button").text() + "</strong></li>");
		}else{
			$(".sub-visual .location>li:nth-child(3)>strong").text($("#dep2>button").text());
		}
   }