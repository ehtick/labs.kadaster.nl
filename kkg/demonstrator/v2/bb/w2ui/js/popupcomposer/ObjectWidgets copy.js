var ObjectWidgets=function(){}


function changePopupToMultipopup()
{
    
      console.log("changePopupToMultipopup ");
      
    try {	
        	if ($('#w2ui-popup')[0].multi)
        		{
        	    		Widget.nid++;
        			$('#w2ui-popup').attr("id", "w2ui-popup"+ Widget.nid);
                    
        		}
	} 
    catch(e){} 
    
    try
    {
        
        Perspective.getCurrentPerspective().popupWidgets.push("w2ui-popup"+ Widget.nid);
      //  $("#w2ui-popup"+ Widget.nid).detach().appendTo(div);
        
    }
    catch(e){console.log(e);}

}


function correctMultiplePopup(event)
{
    changePopupToMultipopup();
    
    try {var pid = event.toElement.parentNode.id;} catch(e) {var pid = event.currentTarget.parentNode.id;}
    try {$('#'+pid).attr("id", "w2ui-popup");} catch(e){}
     
}


function closeMultiPopup(obj,event)
{
    //console.log(obj,event);
    
    try {var pid = event.target.parentNode.parentNode.id;
  //  console.log("chrome",event,pid);
    } catch(e) {
	
	
	var pid = event.target.parentNode.parentNode.id;
	
	}
  
    if (pid=="w2ui-popup")
	{

    	w2popup.status="open";
    	w2popup.close();
    	return;
	}
    
    try {	
	if ($('#w2ui-popup')[0].multi)
		{
	    		Widget.nid++;
			$('#w2ui-popup').attr("id", "w2ui-popup"+ Widget.nid);
		}
	} catch(e){} 
	
    try {$('#'+pid).attr("id", "w2ui-popup");
    w2popup.status="open";
    
    w2popup.close();} catch(e){console.log(e);} 
    


}

ObjectWidgets.preProcessMultiPopup=function()
{
  
    
    
    changePopupToMultipopup();

}
/*
var ObjectWidgetsPopup=function(title)
{
  this.title = title;
  ObjectWidgets.preProcessMultiPopup();
}
*/

ObjectWidgets.createOverlay=function()
{
    if (document.getElementById("mypopupUnderlay")==null)
    {
        //create overlay
         var div ="<div id='mypopupUnderlay' style='position: fixed; display: none; width: 100%; height: 100%; top: 0; left: 0;  right: 0;  bottom: 0;  background-color: rgba(0,0,0,0.0);  z-index: 900; '></div>";
         
         
         
         
         
         $('#main').append(div);
      
          $('#mypopupUnderlay').on('mouseup', function(e) {ObjectWidgets.deleteOverlay();});
          $('#mypopupUnderlay').on('mouseenter', function(e) {if (e.buttons!=1){ObjectWidgets.deleteOverlay()}});
          $('#mypopupUnderlay').on('mouseup', function(e) {ObjectWidgets.deleteOverlay();});
          
          
    }
    document.getElementById("mypopupUnderlay").style.display = "block";
 
    
    
}


ObjectWidgets.deleteOverlay=function()
{
     if (document.getElementById("mypopupUnderlay")!=null)
    {
        document.getElementById("mypopupUnderlay").style.display = "none"; //of
        ObjectWidgets.dragging=false;
        
    }
}





ObjectWidgets.showChartPopupDirect=function(title,chartType,cols,ar,options,width, height)
{
   
     var gchart =this.showChartPopupBase("uri",chartType,title,"",width, height,options);
     gchart.drawChartDirectly(chartType, cols,ar,options);
   return gchart;
   
    
}

ObjectWidgets.showChartPopup=function(uri,chartType,title,sparql,width, height,options)
{
    var gchart =this.showChartPopupBase(uri,chartType,title,sparql,width, height,options);
      MySparql.select(sparql,function(arg){
      
    
        gchart.setSparqlResults(arg,sparql);
    });
    
    
 }
    
ObjectWidgets.showChartPopupBase=function(uri,chartType,title,sparql,width, height,options)
{
  //  console.log("shop chart popupbase");
    if (uri==null){uri="";}
    uri=uri.replace("<","").replace(">","");
    
    if (width==null)
	{
	   width =850;
	}
    if (height==null)
	{
	  height =450;
	}
   // ObjectWidgets.showPopup("RWS Val deflectie meting (OB02871)","under construction",800,400);
    
  
    ObjectWidgets.preProcessMultiPopup();
    
    
    Widget.nid++;
    var layoutid='pimlaout'+Widget.nid;
    
   var layout= {
        name: layoutid,
        padding: 0,
        panels: [
            { type: 'main', minSize: 350, overflow: 'hidden' }
        ]
    };
   
    
    $().w2layout(layout);
    
  
    var xanimate=V2+"animate";
    var gchart =new GChart(null,null,{xanimate:true,connect:function(){}},null);
    gchart.options.animation={startup:true,
 	        duration: 500,
 	        easing: 'inAndOut',
 	      };
           
        if (options!=null)
        {
            for (var key in options)
            {
                gchart.options[key]=options[key];
            }
        }   
           
           
    gchart.options.chartArea={height:"95%",top:15,bottom:85};
  //  gchart.options.chartArea={height:"95%",width:"90%",top:0,bottom:0};
    gchart.type=chartType;
    //g.type="Bar2";
    try
    {
        console.log("w2popup");
        if (w2popup.lockScreen==null)
        {
            w2popup.lockScreen=function(arg){console.log("dummy lockscreen ",arg)};
        }
      w2popup.lockScreen({ modal: false });
    }
    catch(e){console.log("23",e);}

    var d=w2popup.open({
        title   : title,
        width   : width,
        height  : height,
        modal	: false,
        showMax : false,
        keybord :false,
        body    : "<div   id='"+gchart.htmlid+"'></div>",
        onOpen  : function (event) {
            event.onComplete = function () {
             
        	 $('#w2ui-popup')[0].multi=true;
             $('#w2ui-popup #main').w2render(layoutid);
             $('#w2ui-popup').on('mouseenter', function(e) {ObjectWidgets.createOverlay()});
            }
        },
        onToggle: function (event) { 
            event.onComplete = function () {
               w2ui[layoutid].resize();
              //  var height=$("#"+gchart.htmlid).visibleHeight()-10;
            }
        }        
    });


    d.unlockScreen();
    
     
   
  
  return gchart;
    
}


//
//experimental
//
//

ObjectWidgets.showChartsPopup=function(title,sparqls,optionss,width,height)
{
    // multiple charts// werkt nog niet goed
    
   
    
   
    if (width==null)
    {
       width =850;
    }
    if (height==null)
    {
      height =450*optionss.length;
    }
    
    ObjectWidgets.preProcessMultiPopup();
    Widget.nid++;
    var layoutid='pimlaout'+Widget.nid;
    
   var layout= {
        name: layoutid,
        padding: 0,
        panels: [
            { type: 'main', minSize: 350, overflow: 'hidden' }
        ]
    };
    
    $().w2layout(layout);
    
    
    var body="";
    var gcharts=[];
    for (var n in optionss)
    {
         
       var options= optionss[n];
        var xanimate=V2+"animate";
        var gchart =new GChart(null,null,{xanimate:true,connect:function(){}},null);
        gchart.options.animation={startup:true,
                duration: 500,
                easing: 'inAndOut',
              };
               
            if (options!=null)
            {
                for (var key in options)
                {
                    gchart.options[key]=options[key];
                }
            }   
               
               
     //   gchart.options.chartArea={height:"50%",top:15,bottom:85};
        gchart.options.chartArea={height:"400px"};
      //  gchart.options.chartArea={height:"95%",width:"90%",top:0,bottom:0};
        gchart.type=options.chartType;
        //g.type="Bar2";
       body+= "<div   id='"+gchart.htmlid+"'></div><br>";
       gcharts.push(gchart);
    }
      
    
   try{
    w2popup.lockScreen({ modal: false });
}
catch(e){console.log("24",e);}


    var d=w2popup.open({
        title   : title,
        width   : width,
        height  : height,
        modal   : false,
        showMax : false,
        keybord :false,
          body    :body,
        onOpen  : function (event) {
            event.onComplete = function () {
             $('#w2ui-popup')[0].multi=true;
                $('#w2ui-popup #main').w2render(layoutid);
                 $('#w2ui-popup').on('mouseenter', function(e) {ObjectWidgets.createOverlay()});
            }
        },
        onToggle: function (event) { 
            event.onComplete = function () {
               w2ui[layoutid].resize();
              //  var height=$("#"+gchart.htmlid).visibleHeight()-10;
            }
        }        
    });
    d.unlockScreen();
   
   
   for (var n in gcharts)
   {
    var gchart=gcharts[n];
    var sparql = sparqls[n];
        MySparql.select(sparql,function(arg,a,gchart){
         // console.log("setting sparql results for chart ",b,c,d);
            gchart.setSparqlResults(arg,sparql);
          
          //  gchart.refresh();
          //  gchart.resize();
        
        },null,null,gchart);
    }
 
}



ObjectWidgets.showPopup=function(title,div,width,height)
{
      
    ObjectWidgets.preProcessMultiPopup();
  var d=  w2popup.open({
	       title   : title,
	       width   : width,
	       height  : height,
	       showMax : false,
	       body    : div,
	       onOpen  : function (event) {
	           event.onComplete = function () {
	               $('#w2ui-popup')[0].multi=true;
                   $('#w2ui-popup').on('mouseenter', function(e) {ObjectWidgets.createOverlay()});
	           }
	       },
	       onToggle: function (event) { 
	           event.onComplete = function () {
	             
	             // w2ui[layoutid].resize();
	             //  var height=$("#"+gchart.htmlid).visibleHeight()-10;
	           }
	       }        
	   });

  d.unlockScreen();
  
 
}





























/************************************************************************
*   Library: Web 2.0 UI for jQuery (using prototypical inheritance)
*   - Following objects defined
*        - w2popup      - popup widget
*        - $().w2popup  - jQuery wrapper
*   - Dependencies: jQuery, w2utils
*
* == changes
*   - added onMove event
*   - w2prompt.options.ok_class, cancel_class
*   - w2confirm.options.onOpen, w2confirm.options.onClose
*   - w2prompt.options.onOpen, w2prompt.options.onClose
*   - w2popup.actions, w2popup.action, w2popup.onAction
*   - w2popup.onMsgOpen, w2popup.onMsgClose
*   - options.multiple
*
* == NICE TO HAVE ==
*   - hide overlay on esc
*   - make popup width/height in %
*
************************************************************************/
/*
var w2popup2 = {};

(function ($) {

    // ====================================================
    // -- Registers as a jQuery plugin

    $.fn.w2popup = function(method, options) {
        if (method == null) {
            options = {};
            method  = 'open';
        }
        if ($.isPlainObject(method)) {
            options = method;
            method  = 'open';
        }
        method = method.toLowerCase();
        if (method === 'load' && typeof options === 'string') {
            options = $.extend({ url: options }, arguments.length > 2 ? arguments[2] : {});
        }
        if (method === 'open' && options.url != null) method = 'load';
        options = options || {};
        // load options from markup
        var dlgOptions = {};
        if ($(this).length > 0 && method == 'open') {
            if ($(this).find('div[rel=title], div[rel=body], div[rel=buttons]').length > 0) {
                // remember previous tempalte
                if ($('#w2ui-popup').length > 0) {
                    var tmp  = $('#w2ui-popup').data('options');
                    w2popup._prev = {
                        template : w2popup._template,
                        title    : tmp.title,
                        body     : tmp.body,
                        buttons  : tmp.buttons
                    };
                }
                w2popup._template = this;

                if ($(this).find('div[rel=title]').length > 0) {
                    dlgOptions['title'] = $(this).find('div[rel=title]');
                }
                if ($(this).find('div[rel=body]').length > 0) {
                    dlgOptions['body']  = $(this).find('div[rel=body]');
                    dlgOptions['style'] = $(this).find('div[rel=body]')[0].style.cssText;
                }
                if ($(this).find('div[rel=buttons]').length > 0) {
                    dlgOptions['buttons'] = $(this).find('div[rel=buttons]');
                }
            } else {
                dlgOptions['title'] = '&#160;';
                dlgOptions['body']  = $(this).html();
            }
            if (parseInt($(this).css('width')) !== 0)  dlgOptions['width']  = parseInt($(this).css('width'));
            //if the popup will have a title bar, we must add the height of title bar to the popup height
            var hasTitlebar = options.title || (options.showClose || options.showClose === undefined) || (options.showMax || options.showMax === undefined) ;
            if (parseInt($(this).css('height')) !== 0) dlgOptions['height'] = parseInt($(this).css('height')) + (hasTitlebar?32:0);
        }
        // show popup
        return w2popup[method]($.extend({}, dlgOptions, options));
    };

    // ====================================================
    // -- Implementation of core functionality (SINGLETON)

    w2popup = {
        defaults: {
            title     : '',
            body      : '',
            buttons   : '',
            style     : '',
            color     : '#000',
            opacity   : 0.4,
            speed     : 0.3,
            modal     : false,
            maximized : false,
            keyboard  : true,     // will close popup on esc if not modal
            width     : 500,
            height    : 300,
            showClose : true,
            showMax   : false,
            transition: null,
            multiple  : false     // if popup already open, opens as a message
        },
        status    : 'closed',     // string that describes current status
        handlers  : [],
        onOpen    : null,
        onClose   : null,
        onMax     : null,
        onMin     : null,
        onToggle  : null,
        onKeydown : null,

        open: function (options) {
            var obj = this;
            var orig_options = $.extend(true, {}, options);
            if (w2popup.status == 'closing') {
                setTimeout(function () { obj.open.call(obj, options); }, 100);
                return;
            }
            // get old options and merge them
            var old_options = $('#w2ui-popup').data('options');
            var options = $.extend({}, this.defaults, old_options, { title: '', body : '', buttons: '' }, options, { maximized: false });
            // need timer because popup might not be open
            setTimeout(function () { $('#w2ui-popup').data('options', options); }, 100);
            // if new - reset event handlers
            if ($('#w2ui-popup').length === 0) {
                // w2popup.handlers  = []; // if commented, allows to add w2popup.on() for all
                w2popup.onMax     = null;
                w2popup.onMin     = null;
                w2popup.onToggle  = null;
                w2popup.onOpen    = null;
                w2popup.onClose   = null;
                w2popup.onKeydown = null;
                w2popup.onAction  = null;
            }
            if (options.onOpen)    w2popup.onOpen    = options.onOpen;
            if (options.onClose)   w2popup.onClose   = options.onClose;
            if (options.onMax)     w2popup.onMax     = options.onMax;
            if (options.onMin)     w2popup.onMin     = options.onMin;
            if (options.onToggle)  w2popup.onToggle  = options.onToggle;
            if (options.onKeydown) w2popup.onKeydown = options.onKeydown;
            if (options.onAction)  w2popup.onAction  = options.onAction;
            options.width  = parseInt(options.width);
            options.height = parseInt(options.height);

            var maxW, maxH;
            if (window.innerHeight == undefined) {
                maxW  = parseInt(document.documentElement.offsetWidth);
                maxH = parseInt(document.documentElement.offsetHeight);
                if (w2utils.engine === 'IE7') { maxW += 21; maxH += 4; }
            } else {
                maxW  = parseInt(window.innerWidth);
                maxH = parseInt(window.innerHeight);
            }
            if (maxW  - 10 < options.width) options.width  = maxW  - 10;
            if (maxH - 10 < options.height) options.height = maxH - 10;
            var top  = (maxH - options.height) / 2 * 0.6;
            var left = (maxW - options.width) / 2;

            // convert action arrays into buttons
            if (options.actions != null) {
                options.buttons = '';
                Object.keys(options.actions).forEach(function (action) {
                    var handler = options.actions[action];
                    if (typeof handler == 'function') {
                        options.buttons += '<button class="w2ui-btn" onclick="w2popup.action(\''+ action +'\')">'+ action +'</button>'
                    }
                    if (typeof handler == 'object') {
                        options.buttons += '<button class="w2ui-btn '+ (handler['class'] || '') +'" style="'+ (handler['style'] || '') +'"'
                            + 'onclick="w2popup.action(\''+ action +'\')">'+ (handler['text'] || action) +'</button>'
                    }
                    if (typeof handler == 'string') {
                        options.buttons += handler
                    }
                });
            }

            // check if message is already displayed
            if ($('#w2ui-popup').length === 0) {
                // trigger event
                var edata = this.trigger({ phase: 'before', type: 'open', target: 'popup', options: options, present: false });
                if (edata.isCancelled === true) return;
                w2popup.status = 'opening';
                // output message
                try
                {
                w2popup.lockScreen(options);
               
            }
            catch(e){console.log("22",e);}
        
                var btn = '';
                if (options.showClose) {
                    btn += '<div class="w2ui-popup-button w2ui-popup-close"  ondragend="console.log(\"dragend\")"   onmouseup="console.log(\"mouse up\")"   onmousedown="event.stopPropagation()" onclick="closeMultiPopup(this,event)">Close</div>';
                }
                if (options.showMax) {
                    btn += '<div class="w2ui-popup-button w2ui-popup-max"  ondragend="console.log(\"dragend\")"   onmouseup="console.log(\"mouse up\")"  onmousedown="event.stopPropagation()" onclick="w2popup.toggle()">Max</div>';
                }
                // first insert just body
                var msg = '<div id="w2ui-popup" class="w2ui-popup" style="opacity: 0; left: '+ left +'px; top: '+ top +'px;'+
                          '     width: ' + parseInt(options.width) + 'px; height: ' + parseInt(options.height) + 'px; '+
                              w2utils.cssPrefix('transform', 'scale(0.8)', true) + '"></div>';
                $('body').append(msg);
                // parse rel=*
                var parts = $('#w2ui-popup');
                if (parts.find('div[rel=title], div[rel=body], div[rel=buttons]').length > 0) {
                    // title
                    var tmp = parts.find('div[rel=title]');
                    if (tmp.length > 0) { options.title = tmp.html(); tmp.remove(); }
                    // buttons
                    var tmp = parts.find('div[rel=buttons]');
                    if (tmp.length > 0) { options.buttons = tmp.html(); tmp.remove(); }
                    // body
                    var tmp = parts.find('div[rel=body]');
                    if (tmp.length > 0) options.body = tmp.html(); else options.body = parts.html();
                }
                // then content
                var msg = '<div class="w2ui-popup-title" style="'+ (!options.title ? 'display: none' : '') +'">' + btn + '</div>'+
                          '<div class="w2ui-box" style="'+ (!options.title ? 'top: 0px !important;' : '') +
                                    (!options.buttons ? 'bottom: 0px !important;' : '') + '">'+
                          '    <div class="w2ui-popup-body' + (!options.title !== '' ? ' w2ui-popup-no-title' : '') +
                                    (!options.buttons ? ' w2ui-popup-no-buttons' : '') + '" style="' + options.style + '">' +
                          '    </div>'+
                          '</div>'+
                          '<div class="w2ui-popup-buttons" style="'+ (!options.buttons ? 'display: none' : '') +'"></div>'+
                          '<input class="w2ui-popup-hidden" style="position: absolute; top: -100px"/>'; // this is needed to keep focus in popup
                $('#w2ui-popup').html(msg);

                if (options.title) $('#w2ui-popup .w2ui-popup-title').append(options.title);
                if (options.buttons) $('#w2ui-popup .w2ui-popup-buttons').append(options.buttons);
                if (options.body) $('#w2ui-popup .w2ui-popup-body').append(options.body);

                // allow element to render
                setTimeout(function () {
                    $('#w2ui-popup')
                        .css('opacity', '1')
                        .css(w2utils.cssPrefix({
                            'transition': options.speed + 's opacity, ' + options.speed + 's -webkit-transform',
                            'transform' : 'scale(1)'
                        }));
                        obj.focus();
                }, 1);
                // clean transform
                setTimeout(function () {
                    $('#w2ui-popup').css(w2utils.cssPrefix('transform', ''));
                }, options.speed * 1000);
                // event after
                w2popup.status = 'open';
                obj.trigger($.extend(edata, { phase: 'after' }));

            } else if (options.multiple === true) {
                // popup is not compatible with w2popup.message
                w2popup.message(orig_options)
            } else {
                // if was from template and now not
                if (w2popup._prev == null && w2popup._template != null) obj.restoreTemplate();

                // trigger event
                var edata = this.trigger({ phase: 'before', type: 'open', target: 'popup', options: options, present: true });
                if (edata.isCancelled === true) return;
                // check if size changed
                w2popup.status = 'opening';
                if (old_options != null) {
                    if (!old_options.maximized && (old_options['width'] != options['width'] || old_options['height'] != options['height'])) {
                        w2popup.resize(options.width, options.height);
                    }
                    options.prevSize  = options.width + 'px:' + options.height + 'px';
                    options.maximized = old_options.maximized;
                }
                // show new items
                var cloned = $('#w2ui-popup .w2ui-box').clone();
                cloned.removeClass('w2ui-box').addClass('w2ui-box-temp').find('.w2ui-popup-body').empty().append(options.body);
                // parse rel=*
                if (typeof options.body == 'string' && cloned.find('div[rel=title], div[rel=body], div[rel=buttons]').length > 0) {
                    // title
                    var tmp = cloned.find('div[rel=title]');
                    if (tmp.length > 0) { options['title'] = tmp.html(); tmp.remove(); }
                    // buttons
                    var tmp = cloned.find('div[rel=buttons]');
                    if (tmp.length > 0) { options['buttons'] = tmp.html(); tmp.remove(); }
                    // body
                    var tmp = cloned.find('div[rel=body]');
                    if (tmp.length > 0) options['body'] = tmp.html(); else options['body'] = cloned.html();
                    // set proper body
                    cloned.html(options.body);
                }
                $('#w2ui-popup .w2ui-box').after(cloned);

                if (options.buttons) {
                    $('#w2ui-popup .w2ui-popup-buttons').show().html('').append(options.buttons);
                    $('#w2ui-popup .w2ui-popup-body').removeClass('w2ui-popup-no-buttons');
                    $('#w2ui-popup .w2ui-box, #w2ui-popup .w2ui-box-temp').css('bottom', '');
                } else {
                    $('#w2ui-popup .w2ui-popup-buttons').hide().html('');
                    $('#w2ui-popup .w2ui-popup-body').addClass('w2ui-popup-no-buttons');
                    $('#w2ui-popup .w2ui-box, #w2ui-popup .w2ui-box-temp').css('bottom', '0px');
                }
                if (options.title) {
                    $('#w2ui-popup .w2ui-popup-title')
                        .show()
                        .html((options.showClose ? '<div class="w2ui-popup-button w2ui-popup-close" onmousedown="event.stopPropagation()" onclick="w2popup.close()">Close</div>' : '') +
                              (options.showMax ? '<div class="w2ui-popup-button w2ui-popup-max" onmousedown="event.stopPropagation()" onclick="w2popup.toggle()">Max</div>' : ''))
                        .append(options.title);
                    $('#w2ui-popup .w2ui-popup-body').removeClass('w2ui-popup-no-title');
                    $('#w2ui-popup .w2ui-box, #w2ui-popup .w2ui-box-temp').css('top', '');
                } else {
                    $('#w2ui-popup .w2ui-popup-title').hide().html('');
                    $('#w2ui-popup .w2ui-popup-body').addClass('w2ui-popup-no-title');
                    $('#w2ui-popup .w2ui-box, #w2ui-popup .w2ui-box-temp').css('top', '0px');
                }
                // transition
                var div_old = $('#w2ui-popup .w2ui-box')[0];
                var div_new = $('#w2ui-popup .w2ui-box-temp')[0];
                w2utils.transition(div_old, div_new, options.transition, function () {
                    // clean up
                    obj.restoreTemplate();
                    $(div_old).remove();
                    $(div_new).removeClass('w2ui-box-temp').addClass('w2ui-box');
                    var $body = $(div_new).find('.w2ui-popup-body');
                    if ($body.length == 1) $body[0].style.cssText = options.style;
                    // remove max state
                    $('#w2ui-popup').data('prev-size', null);
                    // focus on first button
                    obj.focus();
                });
                // call event onOpen
                w2popup.status = 'open';
                obj.trigger($.extend(edata, { phase: 'after' }));
            }

            // save new options
            options._last_focus = $(':focus');
            // keyboard events
            if (options.keyboard) $(document).on('keydown', this.keydown);

            // initialize move
            var tmp = {
                resizing : false,
                mvMove   : mvMove,
                mvStop   : mvStop
            };
          
                
            $('#w2ui-popup .w2ui-popup-title').on('mousedown', function (event) {
        	
        	
        	correctMultiplePopup(event);
        	event.stopPropagation();
        	        	
        	
                if (!w2popup.get().maximized) mvStart(event);
            });

            return this;

            // handlers
            function mvStart(evnt) {
                if (!evnt) evnt = window.event;
                w2popup.status = 'moving';
                tmp.resizing = true;
                tmp.isLocked = $('#w2ui-popup > .w2ui-lock').length == 1 ? true : false;
                tmp.x = evnt.screenX;
                tmp.y = evnt.screenY;
                tmp.pos_x = $('#w2ui-popup').position().left;
                tmp.pos_y = $('#w2ui-popup').position().top;
                if (!tmp.isLocked)  w2popup.lock({ opacity: 0 });
                $(document).on('mousemove', tmp.mvMove);
                $(document).on('mouseup', tmp.mvStop);
                if (evnt.stopPropagation) evnt.stopPropagation(); else evnt.cancelBubble = true;
                if (evnt.preventDefault) evnt.preventDefault(); else return false;
            }

            function mvMove(evnt) {
        	evnt.stopPropagation();
                if (tmp.resizing != true) return;
                if (!evnt) evnt = window.event;
                tmp.div_x = evnt.screenX - tmp.x;
                tmp.div_y = evnt.screenY - tmp.y;
                // trigger event
                var edata = w2popup.trigger({ phase: 'before', type: 'move', target: 'popup', div_x: tmp.div_x, div_y: tmp.div_y });
                if (edata.isCancelled === true) return;
                // default behavior
                $('#w2ui-popup').css(w2utils.cssPrefix({
                    'transition': 'none',
                    'transform' : 'translate3d('+ tmp.div_x +'px, '+ tmp.div_y +'px, 0px)'
                }));
                // event after
                w2popup.trigger($.extend(edata, { phase: 'after'}));
            }

            function mvStop(evnt) {
               
                if (tmp.resizing != true) return;
                if (!evnt) evnt = window.event;
                w2popup.status = 'open';
                tmp.div_x = (evnt.screenX - tmp.x);
                tmp.div_y = (evnt.screenY - tmp.y);
                $('#w2ui-popup').css({
                    'left': (tmp.pos_x + tmp.div_x) + 'px',
                    'top' : (tmp.pos_y  + tmp.div_y) + 'px'
                }).css(w2utils.cssPrefix({
                    'transition': 'none',
                    'transform' : 'translate3d(0px, 0px, 0px)'
                }));
                tmp.resizing = false;
                $(document).off('mousemove', tmp.mvMove);
                $(document).off('mouseup', tmp.mvStop);
                if (!tmp.isLocked) w2popup.unlock();
            }
        },

        action: function (action, msgId) {
            var obj = this;
            var options = $('#w2ui-popup').data('options');
            if (msgId != null) {
                options = $('#w2ui-message' + msgId).data('options');
                obj = {
                    parent: this,
                    options: options,
                    close: function () {
                        w2popup.message({ msgId: msgId })
                    }
                }
            }
            var act   = options.actions[action];
            var click = act;
            if ($.isPlainObject(act) && act.onClick) click = act.onClick;
            // event before
            var edata = this.trigger({ phase: 'before', target: action, msgId: msgId, type: 'action', action: act, originalEvent: event });
            if (edata.isCancelled === true) return;
            // default actions
            if (typeof click === 'function') click.call(obj, event);
            // event after
            this.trigger($.extend(edata, { phase: 'after' }));
        },

        keydown: function (event) {
            var options = $('#w2ui-popup').data('options');
            if (options && !options.keyboard) return;
            // trigger event
            var edata = w2popup.trigger({ phase: 'before', type: 'keydown', target: 'popup', options: options, originalEvent: event });
            if (edata.isCancelled === true) return;
            // default behavior
            switch (event.keyCode) {
                case 27:
                    event.preventDefault();
                    if ($('#w2ui-popup .w2ui-message').length > 0) w2popup.message(); else w2popup.close();
                    break;
            }
            // event after
            w2popup.trigger($.extend(edata, { phase: 'after'}));
        },

        close: function (options) {
            var obj = this;
            var options = $.extend({}, $('#w2ui-popup').data('options'), options);
            if ($('#w2ui-popup').length === 0 || this.status == 'closed') return;
            if (this.status == 'opening') {
                setTimeout(function () { w2popup.close(); }, 100);
                return;
            }
            // trigger event
            var edata = this.trigger({ phase: 'before', type: 'close', target: 'popup', options: options });
            if (edata.isCancelled === true) return;
            // default behavior
            w2popup.status = 'closing';
            $('#w2ui-popup')
                .css('opacity', '0')
                .css(w2utils.cssPrefix({
                    'transition': options.speed + 's opacity, ' + options.speed + 's -webkit-transform',
                    'transform' : 'scale(0.9)'
                }));
            w2popup.unlockScreen(options);
            setTimeout(function () {
                // return template
                obj.restoreTemplate();
                $('#w2ui-popup').remove();
                w2popup.status = 'closed';
                // restore active
                if (options._last_focus && options._last_focus.length > 0) options._last_focus.focus();
                // event after
                obj.trigger($.extend(edata, { phase: 'after'}));
            }, options.speed * 1000);
            // remove keyboard events
            if (options.keyboard) $(document).off('keydown', this.keydown);
        },

        toggle: function () {
            var obj     = this;
            var options = $('#w2ui-popup').data('options');
            // trigger event
            var edata = this.trigger({ phase: 'before', type: 'toggle', target: 'popup', options: options });
            if (edata.isCancelled === true) return;
            // defatul action
            if (options.maximized === true) w2popup.min(); else w2popup.max();
            // event after
            setTimeout(function () {
                obj.trigger($.extend(edata, { phase: 'after'}));
            }, (options.speed * 1000) + 50);
        },

        max: function () {
            var obj = this;
            var options = $('#w2ui-popup').data('options');
            if (options.maximized === true) return;
            // trigger event
            var edata = this.trigger({ phase: 'before', type: 'max', target: 'popup', options: options });
            if (edata.isCancelled === true) return;
            // default behavior
            w2popup.status   = 'resizing';
            options.prevSize = $('#w2ui-popup').css('width') + ':' + $('#w2ui-popup').css('height');
            // do resize
            w2popup.resize(10000, 10000, function () {
                w2popup.status    = 'open';
                options.maximized = true;
                obj.trigger($.extend(edata, { phase: 'after'}));
                // resize gird, form, layout inside popup
                $('#w2ui-popup .w2ui-grid, #w2ui-popup .w2ui-form, #w2ui-popup .w2ui-layout').each(function () {
                    var name = $(this).attr('name');
                    if (w2ui[name] && w2ui[name].resize) w2ui[name].resize();
                })
            });
        },

        min: function () {
            var obj = this;
            var options = $('#w2ui-popup').data('options');
            if (options.maximized !== true) return;
            var size = options.prevSize.split(':');
            // trigger event
            var edata = this.trigger({ phase: 'before', type: 'min', target: 'popup', options: options });
            if (edata.isCancelled === true) return;
            // default behavior
            w2popup.status = 'resizing';
            // do resize
            w2popup.resize(parseInt(size[0]), parseInt(size[1]), function () {
                w2popup.status = 'open';
                options.maximized = false;
                options.prevSize  = null;
                obj.trigger($.extend(edata, { phase: 'after'}));
                // resize gird, form, layout inside popup
                $('#w2ui-popup .w2ui-grid, #w2ui-popup .w2ui-form, #w2ui-popup .w2ui-layout').each(function () {
                    var name = $(this).attr('name');
                    if (w2ui[name] && w2ui[name].resize) w2ui[name].resize();
                })
            });
        },

        get: function () {
            return $('#w2ui-popup').data('options');
        },

        set: function (options) {
            w2popup.open(options);
        },

        clear: function() {
            $('#w2ui-popup .w2ui-popup-title').html('');
            $('#w2ui-popup .w2ui-popup-body').html('');
            $('#w2ui-popup .w2ui-popup-buttons').html('');
        },

        reset: function () {
            w2popup.open(w2popup.defaults);
        },

        load: function (options) {
            w2popup.status = 'loading';
            if (options.url == null) {
                console.log('ERROR: The url parameter is empty.');
                return;
            }
            var tmp = String(options.url).split('#');
            var url = tmp[0];
            var selector = tmp[1];
            if (options == null) options = {};
            // load url
            var html = $('#w2ui-popup').data(url);
            if (html != null) {
                popup(html, selector);
            } else {
                $.get(url, function (data, status, obj) { // should always be $.get as it is template
                    popup(obj.responseText, selector);
                    $('#w2ui-popup').data(url, obj.responseText); // remember for possible future purposes
                });
            }
            function popup(html, selector) {
                delete options.url;
                $('body').append('<div id="w2ui-tmp" style="display: none">' + html + '</div>');
                if (selector != null && $('#w2ui-tmp #'+selector).length > 0) {
                    $('#w2ui-tmp #' + selector).w2popup(options);
                } else {
                    $('#w2ui-tmp > div').w2popup(options);
                }
                // link styles
                if ($('#w2ui-tmp > style').length > 0) {
                    var style = $('<div>').append($('#w2ui-tmp > style').clone()).html();
                    if ($('#w2ui-popup #div-style').length === 0) {
                        $('#w2ui-popup').append('<div id="div-style" style="position: absolute; left: -100; width: 1px"></div>');
                    }
                    $('#w2ui-popup #div-style').html(style);
                }
                $('#w2ui-tmp').remove();
            }
        },

        message: function (options) {
            var obj = this;
            $().w2tag(); // hide all tags
            if (!options) options = { width: 200, height: 100 };
            var pWidth   = parseInt($('#w2ui-popup').width());
            var pHeight  = parseInt($('#w2ui-popup').height());
            options.originalWidth  = options.width;
            options.originalHeight = options.height;
            if (parseInt(options.width) < 10)  options.width  = 10;
            if (parseInt(options.height) < 10) options.height = 10;
            if (options.hideOnClick == null) options.hideOnClick = false;
            var poptions    = $('#w2ui-popup').data('options') || {};
            var titleHeight = parseInt($('#w2ui-popup > .w2ui-popup-title').css('height'));
            if (options.width == null || options.width > poptions.width - 10) {
                options.width = poptions.width - 10;
            }
            if (options.height == null || options.height > poptions.height - titleHeight - 5) {
                options.height = poptions.height - titleHeight - 5; // need margin from bottom only
            }
            // negative value means margin
            if (options.originalHeight < 0) options.height = pHeight + options.originalHeight - titleHeight;
            if (options.originalWidth < 0) options.width = pWidth + options.originalWidth * 2; // x 2 because there is left and right margin

            var head     = $('#w2ui-popup .w2ui-popup-title');
            var msgCount = $('#w2ui-popup .w2ui-message').length;

            // convert action arrays into buttons
            if (options.actions != null) {
                options.buttons = '';
                Object.keys(options.actions).forEach(function (action) {
                    var handler = options.actions[action];
                    if (typeof handler == 'function') {
                        options.buttons += '<button class="w2ui-btn" onclick="w2popup.action(\''+ action +'\', '+ msgCount +')">'+ action +'</button>'
                    }
                    if (typeof handler == 'object') {
                        options.buttons += '<button class="w2ui-btn '+ (handler['class'] || '') +'" style="'+ (handler['style'] || '') +'"'
                            + 'onclick="w2popup.action(\''+ action +'\', '+ msgCount +')">'+ (handler['text'] || action) +'</button>'
                    }
                    if (typeof handler == 'string') {
                        options.buttons += handler
                    }
                });
            }

            // remove message
            if ($.trim(options.html) === '' && $.trim(options.body) === '' && $.trim(options.buttons) === '') {
                var $msg = $('#w2ui-popup .w2ui-message').last();
                if (options.msgId != null) {
                    $msg = $('#w2ui-message'+ options.msgId);
                }
                var options = $msg.data('options') || {};
                // message close event
                var edata = obj.trigger({ phase: 'before', type: 'msgClose', msgId: $msg.attr('data-msgId'), target: 'popup', options: options });
                if (edata.isCancelled === true) return;
                // start hide transition
                $msg.css(w2utils.cssPrefix({
                    'transition': '0.15s',
                    'transform': 'translateY(-' + options.height + 'px)'
                }));
                var $focus = $('#w2ui-popup .w2ui-message');
                $focus = $($focus[$focus.length - 2])
                    .css('z-index', 1500)
                    .data('msg-focus');
                if ($focus && $focus.length > 0) $focus.focus(); else obj.focus();
                if (msgCount == 1) w2popup.unlock(150);
                setTimeout(function () {
                    $msg.remove();
                    // default action
                    console.log("on close ?");
                    
                    if (typeof options.onClose == 'function') {
                	
                        options.onClose(edata);
                    }
                    // event after
                    obj.trigger($.extend(edata, { phase: 'after' }));
                }, 150);
            } else {
                if ($.trim(options.body) !== '' || $.trim(options.buttons) !== '') {
                    options.html = '<div class="w2ui-message-body">'+ options.body +'</div>'+
                        '<div class="w2ui-message-buttons">'+ options.buttons +'</div>';
                }
                // hide previous messages
                $('#w2ui-popup .w2ui-message').css('z-index', 1390).data('msg-focus', $(':focus'));
                head.css('z-index', 1501);
                if (options.close == null) {
                    options.close = function () {
                        w2popup.message({ msgId: msgCount })
                    }
                }
                // add message
                $('#w2ui-popup .w2ui-box')
                    .before('<div id="w2ui-message' + msgCount + '" class="w2ui-message" style="display: none; z-index: 1500; ' +
                                (head.length === 0 ? 'top: 0px;' : 'top: ' + w2utils.getSize(head, 'height') + 'px;') +
                                (options.width  != null ? 'width: ' + options.width + 'px; left: ' + ((pWidth - options.width) / 2) + 'px;' : 'left: 10px; right: 10px;') +
                                (options.height != null ? 'height: ' + options.height + 'px;' : 'bottom: 6px;') +
                                w2utils.cssPrefix('transition', '0s', true) + '" data-msgId="' + msgCount +'" ' +
                                (options.hideOnClick === true ? 'onclick="w2popup.message();"' : '') + '>' +
                            '</div>');
                $('#w2ui-popup #w2ui-message'+ msgCount).data('options', options);
                var display = $('#w2ui-popup #w2ui-message'+ msgCount).css('display');
                $('#w2ui-popup #w2ui-message'+ msgCount).css(w2utils.cssPrefix({
                    'transform': (display == 'none' ? 'translateY(-' + options.height + 'px)' : 'translateY(0px)')
                }));
                if (display == 'none') {
                    $('#w2ui-popup #w2ui-message'+ msgCount).show().html(options.html);
                    // timer needs to animation
                    setTimeout(function () {
                        $('#w2ui-popup #w2ui-message'+ msgCount).css(
                            $.extend(
                                w2utils.cssPrefix('transition', '.3s', false),
                                w2utils.cssPrefix({
                                    'transform': (display == 'none' ? 'translateY(0px)' : 'translateY(-' + options.height + 'px)')
                                })
                            )
                        );
                    }, 1);
                    // timer for lock
                    if (msgCount === 0) w2popup.lock();
                    // message open event
                    var edata = obj.trigger({ phase: 'before', type: 'msgOpen', msgId: msgCount, target: 'popup', options: options });
                    if (edata.isCancelled === true) return;
                    setTimeout(function() {
                        obj.focus();
                        // has to be on top of lock
                        $('#w2ui-popup #w2ui-message'+ msgCount).css(w2utils.cssPrefix({ 'transition': '0s' }));
                        if (typeof options.onOpen == 'function') {
                            options.onOpen(edata);
                        }
                        // event after
                        obj.trigger($.extend(edata, { phase: 'after' }));
                    }, 350);
                }
            }
        },

        focus: function () {
            var tmp = null;
            var pop = $('#w2ui-popup');
            var sel = 'input:visible, button:visible, select:visible, textarea:visible, [contentEditable], .w2ui-input';
            // clear previous blur
            $(pop).find(sel).off('.keep-focus');
            // in message or popup
            var cnt = $('#w2ui-popup .w2ui-message').length - 1;
            var msg = $('#w2ui-popup #w2ui-message' + cnt);
            if (msg.length > 0) {
                var btn =$(msg[msg.length - 1]).find('button');
                if (btn.length > 0) btn[0].focus();
                tmp = msg;
            } else if (pop.length > 0) {
                var btn = pop.find('.w2ui-popup-buttons button');
                if (btn.length > 0) btn[0].focus();
                tmp = pop;
            }
            // keep focus/blur inside popup
            $(tmp).find(sel)
                .on('blur.keep-focus', function (event) {
                    setTimeout(function () {
                        var focus = $(':focus');
                        if ((focus.length > 0 && !$(tmp).find(sel).is(focus)) || focus.hasClass('w2ui-popup-hidden')) {
                            var el = $(tmp).find(sel);
                            if (el.length > 0) el[0].focus();
                        }
                    }, 1);
                });
        },

        lock: function (msg, showSpinner) {
            var args = Array.prototype.slice.call(arguments, 0);
            args.unshift($('#w2ui-popup'));
            w2utils.lock.apply(window, args);
        },

        unlock: function (speed) {
            w2utils.unlock($('#w2ui-popup'), speed);
        },

        // --- INTERNAL FUNCTIONS

        lockScreen: function (options) {
            if ($('#w2ui-lock').length > 0) return false;
            if (options == null) options = $('#w2ui-popup').data('options');
            if (options == null) options = {};
            options = $.extend({}, w2popup.defaults, options);
            // show element
            $('body').append('<div id="w2ui-lock" ' +
                '    onmousewheel="if (event.stopPropagation) event.stopPropagation(); else event.cancelBubble = true; if (event.preventDefault) event.preventDefault(); else return false;"'+
                '    style="position: ' + (w2utils.engine == 'IE5' ? 'absolute' : 'fixed') + '; z-Index: 1199; left: 0px; top: 0px; ' +
                '           padding: 0px; margin: 0px; background-color: ' + options.color + '; width: 100%; height: 100%; opacity: 0;"></div>');
            // lock screen
            setTimeout(function () {
                $('#w2ui-lock')
                    .css('opacity', options.opacity)
                    .css(w2utils.cssPrefix('transition', options.speed + 's opacity'));
            }, 1);
            // add events
            if (options.modal == true) {
                $('#w2ui-lock').on('mousedown', function () {
                    $('#w2ui-lock')
                        .css('opacity', '0.6')
                        .css(w2utils.cssPrefix('transition', '.1s'));
                });
                $('#w2ui-lock').on('mouseup', function () {
                    setTimeout(function () {
                        $('#w2ui-lock')
                            .css('opacity', options.opacity)
                            .css(w2utils.cssPrefix('transition', '.1s'));
                    }, 100);
                });
            } else {
                $('#w2ui-lock').on('mousedown', function () {
                    console.log("mouse down");
                    
                    w2popup.close();
                    });
            }
            return true;
        },

        unlockScreen: function (options) {
            if ($('#w2ui-lock').length === 0) return false;
            if (options == null) options = $('#w2ui-popup').data('options');
            if (options == null) options = {};
            options = $.extend({}, w2popup.defaults, options);
            $('#w2ui-lock')
                .css('opacity', '0')
                .css(w2utils.cssPrefix('transition', options.speed + 's opacity'));
            setTimeout(function () {
                $('#w2ui-lock').remove();
            }, options.speed * 1000);
            return true;
        },

        resizeMessages: function () {
            var obj = this;
            var options = $('#w2ui-popup').data('options');
            // see if there are messages and resize them
            $('#w2ui-popup .w2ui-message').each(function () {
                var moptions = $(this).data('options');
                var $popup   = $('#w2ui-popup');
                if (parseInt(moptions.width) < 10)  moptions.width  = 10;
                if (parseInt(moptions.height) < 10) moptions.height = 10;
                var titleHeight = parseInt($popup.find('> .w2ui-popup-title').css('height'));
                var pWidth      = parseInt($popup.width());
                var pHeight     = parseInt($popup.height());
                // recalc width
                moptions.width = moptions.originalWidth;
                if (moptions.width > pWidth - 10) {
                    moptions.width = pWidth - 10;
                }
                // recalc height
                moptions.height = moptions.originalHeight;
                if (moptions.height > pHeight - titleHeight - 5) {
                    moptions.height = pHeight - titleHeight - 5;
                }
                if (moptions.originalHeight < 0) moptions.height = pHeight + moptions.originalHeight - titleHeight;
                if (moptions.originalWidth < 0) moptions.width = pWidth + moptions.originalWidth * 2; // x 2 because there is left and right margin
                $(this).css({
                    left    : ((pWidth - moptions.width) / 2) + 'px',
                    width   : moptions.width + 'px',
                    height  : moptions.height + 'px'
                });
            });
        },

        resize: function (width, height, callBack) {
            var obj = this;
            var options = $('#w2ui-popup').data('options') || {};
            if (options.speed == null) options.speed = 0;
            width  = parseInt(width);
            height = parseInt(height);
            // calculate new position
            var maxW, maxH;
            if (window.innerHeight == undefined) {
                maxW  = parseInt(document.documentElement.offsetWidth);
                maxH = parseInt(document.documentElement.offsetHeight);
                if (w2utils.engine === 'IE7') { maxW += 21; maxH += 4; }
            } else {
                maxW  = parseInt(window.innerWidth);
                maxH = parseInt(window.innerHeight);
            }
            if (maxW  - 10 < width) width  = maxW  - 10;
            if (maxH - 10 < height) height = maxH - 10;
            var top  = (maxH - height) / 2 * 0.6;
            var left = (maxW - width) / 2;
            // resize there
            $('#w2ui-popup')
                .css(w2utils.cssPrefix({
                    'transition': options.speed + 's width, ' + options.speed + 's height, ' + options.speed + 's left, ' + options.speed + 's top'
                }))
                .css({
                    'top'   : top,
                    'left'  : left,
                    'width' : width,
                    'height': height
                });
            var tmp_int = setInterval(function () { obj.resizeMessages(); }, 10); // then messages resize nicely
            setTimeout(function () {
                clearInterval(tmp_int);
                options.width  = width;
                options.height = height;
                obj.resizeMessages();
                if (typeof callBack == 'function') callBack();
            }, (options.speed * 1000) + 50); // give extra 50 ms
        },

        /***********************
        *  Internal
        **/

        // restores template
        restoreTemplate: function () {
            var options  = $('#w2ui-popup').data('options');
            if (options == null) return;
            var template = w2popup._template;
            var title    = options.title;
            var body     = options.body;
            var buttons  = options.buttons;
            if (w2popup._prev) {
                template = w2popup._prev.template;
                title    = w2popup._prev.title;
                body     = w2popup._prev.body;
                buttons  = w2popup._prev.buttons;
                delete w2popup._prev;
            } else {
                delete w2popup._template;
            }
            if (template != null) {
                var $tmp = $(template);
                if ($tmp.length === 0) return;
                if ($(body).attr('rel') == 'body') {
                    if (title) $tmp.append(title);
                    if (body) $tmp.append(body);
                    if (buttons) $tmp.append(buttons);
                } else {
                    $tmp.append(body);
                }
            }
        }
    };

    // merge in event handling
    $.extend(w2popup, w2utils.event);

})(jQuery);

// ============================================
// --- Common dialogs

var w2alert = function (msg, title, callBack) {
    var $ = jQuery;
    if (title == null) title = w2utils.lang('Notification');
    if ($('#w2ui-popup').length > 0 && w2popup.status != 'closing') {
        w2popup.message({
            width   : 400,
            height  : 170,
            body    : '<div class="w2ui-centered w2ui-alert-msg" style="font-size: 13px;">' + msg + '</div>',
            buttons : '<button onclick="w2popup.message();" class="w2ui-popup-btn w2ui-btn">' + w2utils.lang('Ok') + '</button>',
            onOpen: function () {
                $('#w2ui-popup .w2ui-message .w2ui-popup-btn').focus();
            },
            onClose: function () {
                if (typeof callBack == 'function') callBack();
            }
        });
    } else {
        w2popup.open({
            width     : 450,
            height    : 220,
            showMax   : false,
            showClose : false,
            title     : title,
            body      : '<div class="w2ui-centered w2ui-alert-msg" style="font-size: 13px;">' + msg + '</div>',
            buttons   : '<button onclick="w2popup.close();" class="w2ui-popup-btn w2ui-btn">' + w2utils.lang('Ok') + '</button>',
            onOpen: function (event) {
                // do not use onComplete as it is slower
                setTimeout(function () { $('#w2ui-popup .w2ui-popup-btn').focus(); }, 1);
            },
            onKeydown: function (event) {
                $('#w2ui-popup .w2ui-popup-btn').focus().addClass('clicked');
            },
            onClose: function () {
                if (typeof callBack == 'function') callBack();
            }
        });
    }
    return {
        ok: function (fun) {
            callBack = fun;
            return this;
        },
        done: function (fun) {
            callBack = fun;
            return this;
        }
    };
};

var w2confirm = function (msg, title, callBack) {
    var $ = jQuery;
    var options  = {};
    var defaults = {
        msg         : '',
        title       : w2utils.lang('Confirmation'),
        width       : ($('#w2ui-popup').length > 0 ? 400 : 450),
        height      : ($('#w2ui-popup').length > 0 ? 170 : 220),
        yes_text    : 'Yes',
        yes_class   : '',
        yes_style   : '',
        yes_callBack: null,
        no_text     : 'No',
        no_class    : '',
        no_style    : '',
        no_callBack : null,
        focus_to_no : false,
        callBack    : null
    };
    if (arguments.length == 1 && typeof msg == 'object') {
        $.extend(options, defaults, msg);
    } else {
        if (typeof title == 'function') {
            $.extend(options, defaults, {
                msg     : msg,
                callBack: title
            })
        } else {
            $.extend(options, defaults, {
                msg     : msg,
                title   : title,
                callBack: callBack
            })
        }
    }
    // if there is a yes/no button object
    if (typeof options.btn_yes == 'object') {
        options.yes_text     = options.btn_yes.text || options.yes_text;
        options.yes_class    = options.btn_yes["class"] || options.yes_class;
        options.yes_style    = options.btn_yes.style || options.yes_style;
        options.yes_callBack = options.btn_yes.callBack || options.yes_callBack;
    }
    if (typeof options.btn_no == 'object') {
        options.no_text      = options.btn_no.text || options.no_text;
        options.no_class     = options.btn_no["class"] || options.no_class;
        options.no_style     = options.btn_no.style || options.no_style;
        options.no_callBack  = options.btn_no.callBack || options.no_callBack;
    }
    if ($('#w2ui-popup').length > 0 && w2popup.status != 'closing' && w2popup.get()) {
        if (options.width > w2popup.get().width) options.width = w2popup.get().width;
        if (options.height > (w2popup.get().height - 50)) options.height = w2popup.get().height - 50;
          w2popup.message({
            width   : options.width,
            height  : options.height,
            body    : '<div class="w2ui-centered w2ui-confirm-msg" style="font-size: 13px;">' + options.msg + '</div>',
            buttons : (w2utils.settings.macButtonOrder
                ? '<button id="No" class="w2ui-popup-btn w2ui-btn '+ options.no_class +'" style="'+ options.no_style +'">' + w2utils.lang(options.no_text) + '</button>' +
                  '<button id="Yes" class="w2ui-popup-btn w2ui-btn '+ options.yes_class +'" style="'+ options.yes_style +'">' + w2utils.lang(options.yes_text) + '</button>'
                : '<button id="Yes" class="w2ui-popup-btn w2ui-btn '+ options.yes_class +'" style="'+ options.yes_style +'">' + w2utils.lang(options.yes_text) + '</button>' +
                  '<button id="No" class="w2ui-popup-btn w2ui-btn '+ options.no_class +'" style="'+ options.no_style +'">' + w2utils.lang(options.no_text) + '</button>'
                ),
            onOpen: function (event) {
                $('#w2ui-popup .w2ui-message .w2ui-btn').on('click.w2confirm', function (event) {
                    w2popup._confirm_btn = event.target.id;
                    w2popup.message();
                });
                if (typeof options.onOpen == 'function') options.onOpen()
            },
            onClose: function (event) {
                // needed this because there might be other messages
                $('#w2ui-popup .w2ui-message .w2ui-btn').off('click.w2confirm');
                // need to wait for message to slide up
                setTimeout(function () {
                    if (typeof options.callBack == 'function') options.callBack(w2popup._confirm_btn);
                    if (w2popup._confirm_btn == 'Yes' && typeof options.yes_callBack == 'function') options.yes_callBack();
                    if (w2popup._confirm_btn == 'No'  && typeof options.no_callBack == 'function') options.no_callBack();
                }, 300);
                if (typeof options.onClose == 'function') options.onClose()
            }
            // onKeydown will not work here
        });

    } else {

        if (!w2utils.isInt(options.height)) options.height = options.height + 50;
        w2popup.open({
            width      : options.width,
            height     : options.height,
            title      : options.title,
            modal      : true,
            showClose  : false,
            body       : '<div class="w2ui-centered w2ui-confirm-msg" style="font-size: 13px;">' + options.msg + '</div>',
            buttons    : (w2utils.settings.macButtonOrder
                    ? '<button id="No" class="w2ui-popup-btn w2ui-btn '+ options.no_class +'" style="'+ options.no_style +'">'+ w2utils.lang(options.no_text) +'</button>' +
                      '<button id="Yes" class="w2ui-popup-btn w2ui-btn '+ options.yes_class +'" style="'+ options.yes_style +'">'+ w2utils.lang(options.yes_text) +'</button>'
                    : '<button id="Yes" class="w2ui-popup-btn w2ui-btn '+ options.yes_class +'" style="'+ options.yes_style +'">'+ w2utils.lang(options.yes_text) +'</button>' +
                      '<button id="No" class="w2ui-popup-btn w2ui-btn '+ options.no_class +'" style="'+ options.no_style +'">'+ w2utils.lang(options.no_text) +'</button>'
                    ),
            onOpen: function (event) {
                // do not use onComplete as it is slower
                setTimeout(function () {
                    $('#w2ui-popup .w2ui-popup-btn').on('click', function (event) {
                        w2popup.close();
                        if (typeof options.callBack == 'function') options.callBack(event.target.id);
                        if (event.target.id == 'Yes' && typeof options.yes_callBack == 'function') options.yes_callBack();
                        if (event.target.id == 'No'  && typeof options.no_callBack == 'function') options.no_callBack();
                    });
                    if(options.focus_to_no){
                        $('#w2ui-popup .w2ui-popup-btn#No').focus();
                    }else{
                        $('#w2ui-popup .w2ui-popup-btn#Yes').focus();
                    }
                    if (typeof options.onOpen == 'function') options.onOpen()
                }, 1);
            },
            onClose: function (event) {
                if (typeof options.onClose == 'function') options.onClose()
            },
            onKeydown: function (event) {
                // if there are no messages
                if ($('#w2ui-popup .w2ui-message').length === 0) {
                    switch (event.originalEvent.keyCode) {
                        case 13: // enter
                            $('#w2ui-popup .w2ui-popup-btn#Yes').focus().addClass('clicked'); // no need fo click as enter will do click
                            w2popup.close();
                            break;
                        case 27: // esc
                            $('#w2ui-popup .w2ui-popup-btn#No').focus().click();
                            w2popup.close();
                            break;
                    }
                }
            }
        });
    }

    return {
        yes: function (fun) {
            options.yes_callBack = fun;
            return this;
        },
        no: function (fun) {
            options.no_callBack = fun;
            return this;
        }
    };
};

var w2prompt = function (label, title, callBack) {
    var $ = jQuery;
    var options  = {};
    var defaults = {
        label       : '',
        value       : '',
        attrs       : '',
        textarea    : false,
        title       : w2utils.lang('Notification'),
        ok_text     : w2utils.lang('Ok'),
        cancel_text : w2utils.lang('Cancel'),
        width       : ($('#w2ui-popup').length > 0 ? 400 : 450),
        height      : ($('#w2ui-popup').length > 0 ? 170 : 220),
        callBack    : null
    }

    if (arguments.length == 1 && typeof label == 'object') {
        $.extend(options, defaults, label);
    } else {
        if (typeof title == 'function') {
            $.extend(options, defaults, {
                label   : label,
                callBack: title
            })
        } else {
            $.extend(options, defaults, {
                label   : label,
                title   : title,
                callBack: callBack
            })
        }
    }

    if ($('#w2ui-popup').length > 0 && w2popup.status != 'closing' && w2popup.get()) {
        if (options.width > w2popup.get().width) options.width = w2popup.get().width;
        if (options.height > (w2popup.get().height - 50)) options.height = w2popup.get().height - 50;
          w2popup.message({
            width   : options.width,
            height  : options.height,
            body    : (options.textarea
                     ?  '<div class="w2ui-prompt textarea">'+
                        '  <div>' + options.label + '</div>'+
                        '  <textarea id="w2prompt" class="w2ui-input" '+ options.attrs +'></textarea>'+
                        '</div>'
                     :  '<div class="w2ui-prompt w2ui-centered">'+
                        '  <label>' + options.label + '</label>'+
                        '  <input id="w2prompt" class="w2ui-input" '+ options.attrs +'>'+
                        '</div>'
                    ),
            buttons : (w2utils.settings.macButtonOrder
                ? '<button id="Cancel" class="w2ui-popup-btn w2ui-btn '+ options.cancel_class +'">' + options.cancel_text + '</button>' +
                  '<button id="Ok" class="w2ui-popup-btn w2ui-btn '+ options.ok_class +'">' + options.ok_text + '</button>'
                : '<button id="Ok" class="w2ui-popup-btn w2ui-btn '+ options.ok_class +'">' + options.ok_text + '</button>' +
                  '<button id="Cancel" class="w2ui-popup-btn w2ui-btn '+ options.cancel_class +'">' + options.cancel_text + '</button>'
                ),
            onOpen: function () {
                $('#w2prompt').val(options.value);
                $('#w2ui-popup .w2ui-message .w2ui-btn#Ok').on('click.w2prompt', function (event) {
                    w2popup._prompt_value = $('#w2prompt').val();
                    w2popup.message();
                });
                $('#w2ui-popup .w2ui-message .w2ui-btn#Cancel').on('click.w2prompt', function (event) {
                    w2popup._prompt_value = null;
                    w2popup.message();
                });
                // set focus
                setTimeout(function () { $('#w2prompt').focus(); }, 100);
                // some event
                if (typeof options.onOpen == 'function') options.onOpen()
            },
            onClose: function () {
                // needed this because there might be other messages
                $('#w2ui-popup .w2ui-message .w2ui-btn').off('click.w2prompt');
                // need to wait for message to slide up
                setTimeout(function () {
                    if (typeof options.callBack == 'function') {
                        options.callBack(w2popup._prompt_value);
                    }
                }, 300);
                // some event
                if (typeof options.onClose == 'function') options.onClose()
            }
            // onKeydown will not work here
        });

    } else {

        if (!w2utils.isInt(options.height)) options.height = options.height + 50;
        w2popup.open({
            width      : options.width,
            height     : options.height,
            title      : options.title,
            modal      : true,
            showClose  : false,
            body       : (options.textarea
                         ?  '<div class="w2ui-prompt">'+
                            '  <div>' + options.label + '</div>'+
                            '  <textarea id="w2prompt" class="w2ui-input" '+ options.attrs +'></textarea>'+
                            '</div>'
                         :  '<div class="w2ui-prompt w2ui-centered" style="font-size: 13px;">'+
                            '  <label>' + options.label + '</label>'+
                            '  <input id="w2prompt" class="w2ui-input" '+ options.attrs +'>'+
                            '</div>'
                        ),
            buttons    : (w2utils.settings.macButtonOrder
                ? '<button id="Cancel" class="w2ui-popup-btn w2ui-btn">' + options.cancel_text + '</button>' +
                  '<button id="Ok" class="w2ui-popup-btn w2ui-btn">' + options.ok_text + '</button>'
                : '<button id="Ok" class="w2ui-popup-btn w2ui-btn">' + options.ok_text + '</button>'+
                  '<button id="Cancel" class="w2ui-popup-btn w2ui-btn">' + options.cancel_text + '</button>'
                ),
            onOpen: function (event) {
                // do not use onComplete as it is slower
                setTimeout(function () {
                    $('#w2prompt').val(options.value);
                    $('#w2prompt').w2field('text');
                    $('#w2ui-popup .w2ui-popup-btn#Ok').on('click', function (event) {
                        w2popup._prompt_value = $('#w2prompt').val();
                        w2popup.close();
                        if (typeof options.callBack == 'function') options.callBack(w2popup._prompt_value);
                    });
                    $('#w2ui-popup .w2ui-popup-btn#Cancel').on('click', function (event) {
                        w2popup._prompt_value = null;
                        w2popup.close();
                        if (typeof options.callBack == 'function') options.callBack(w2popup._prompt_value);
                    });
                    $('#w2ui-popup .w2ui-popup-btn#Ok');
                    // set focus
                    setTimeout(function () { $('#w2prompt').focus(); }, 100);
                    // some event
                    if (typeof options.onOpen == 'function') options.onOpen()
                }, 1);
            },
            onClose: function (event) {
                // some event
                if (typeof options.onClose == 'function') options.onClose()
            },
            onKeydown: function (event) {
                // if there are no messages
                if ($('#w2ui-popup .w2ui-message').length === 0) {
                    switch (event.originalEvent.keyCode) {
                        case 13: // enter
                            $('#w2ui-popup .w2ui-popup-btn#Ok').focus().addClass('clicked'); // no need fo click as enter will do click
                            w2popup.close();
                            break;
                        case 27: // esc
                            w2popup.close();
                            break;
                    }
                }
            }
        });
    }
    return {
        change: function (fun) {
            $('#w2prompt').on('keyup', fun).keyup();
            return this;
        },
        ok: function (fun) {
            options.callBack = fun;
            return this;
        }
    };
};








