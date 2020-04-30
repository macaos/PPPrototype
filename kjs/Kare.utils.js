/*
 * utils class
 *
 * @class kare.utils
 */

define(function() {
    var ka;
    var self = {
        initialization: function(d) {
            ka = d;
            jqueryExtend(jQuery);
        },
        getTimestemp: ()=>{
            const dd = new Date();
            return dd.getFullYear()+''+
                    ka.utils.digit2(dd.getMonth()+1)+''+
                    ka.utils.digit2(dd.getDate())+''+
                    ka.utils.digit2(dd.getHours())+''+
                    ka.utils.digit2(dd.getMinutes())+''+
                    ka.utils.digit2(dd.getSeconds());
        },
        digit2: function(n) {
            if (n < 10) return "0" + String(n);
            return String(n);
        },
        blankRemove: function(str) {
            return str.replace(/\s/g, '');
        },
        /**
         * YYYYMMDD 형태를 DATE형으로 변환
         * @method stringToDate
         * @param  {String}     val YYYYMMDD형태의 날짜 
         * @return {Date}         변환한 DATE형 날짜 
         */
        stringToDate: function(val) {

            var str = '';
            if(val.length >= 8){
                str = val.substr(0, 4)+'-'+val.substr(4, 2)+'-'+val.substr(6, 2);
            } 
            if(val.length == 14){
                str +='T'+val.substr(8, 2)+':'+val.substr(10, 2)+':'+val.substr(12, 2);
            }
            console.log('str',str);
            return new Date(str);
        },
        /*/*
         * DATE형을 YYYYMMDD로 변환
         * @method dateToString
         * @param  {DATE}     val DATE포멧의 날짜 
         * @return {String}       YYYYMMDD 변환 리턴 
         */
        dateToString: function(val) {
            var yyyy = val.getFullYear();
            var mm = ka.utils.digit2(val.getMonth() + 1);
            var dd = ka.utils.digit2(val.getDate());
            return yyyy + '' + mm + '' + dd;
        },
        dateDifferent: function(val1,val2,returnType){
            returnType = returnType || 'day';
            console.log('typeof val1',typeof val1,typeof val2);
            if(typeof val1 == 'string'){
                val1 = ka.utils.stringToDate(val1)
            }
            if(typeof val2 == 'string'){
                val2 = ka.utils.stringToDate(val2)
            }
            var time = val1 - val2;
            if(returnType == 'day'){
                return parseInt((((_time/1000)/60)/60)/24);
            } else if(returnType == 'hour'){
                return Number(((time/1000)/60)/60);
            }

        },
        endVal: ''
    };

    function jqueryExtend($) {
        $.fn.extend({
            focusTextToEnd: function() {
                this.focus();
                var $thisVal = this.val();
                this.val('').val($thisVal);
                return this;
            },
            hasEvent: function() {
                var ty = arguments[0], fn = arguments[1], da = $._data(this[0], 'events') || undefined;
                if (da === undefined || ty === undefined || da[ty] === undefined || da[ty].length === 0)  return false;
                if (fn === undefined) return true;
                return Boolean(fn == da[ty][0].handler);
            },
            isVisible: function() {
                console.log($(this),$(this).css('display'),$(this).css('opacity'),(this).css('visibility'));
                if( $(this).css('display') == 'none' )return false;
                if( $(this).css('opacity') == '0' )return false;
                if( $(this).css('visibility') == 'hidden' )return false;
                return true;
            },
            cssWidth: function(val) {
                if(val || val==0){
                    $(this).css('width',val);
                }else{
                    return Number($(this).css('width').replace(/px/,''));
                }
            },
            cssHeight: function(val) {
                if(val || val==0){
                    $(this).css('height',val);
                }else{
                    return Number($(this).css('height').replace(/px/,''));
                }
            },
            cssLeft: function(val) {
                if(val || val==0){
                    $(this).css('left',val);
                }else{
                    return Number($(this).css('left').replace(/px/,''));
                }
            },
            cssTop: function(val) {
                if(val || val==0){
                    $(this).css('top',val);
                }else{
                    return Number($(this).css('top').replace(/px/,''));
                }
            },
            showTween: function(time,delay){
                if(!time)time = 300;
                if(!delay)delay = 0;
                this.css('opacity',0);
                this.show();
                this.stop().delay( delay ).animate({
                    opacity: 1
                }, time);
            },
            hideTween: function(time,delay){
                if(!time)time = 300;
                if(!delay)delay = 0;
                var _that = this;
                this.stop().delay( delay ).animate({
                    opacity: 0
                }, time, $.proxy(function() {
                    this.hide();
                },this));
            },
            _endVal:''
            
        })

        jQuery.easing['jswing'] = jQuery.easing['swing'];

        jQuery.extend( jQuery.easing,
        {
            def: 'easeOutQuad',
            swing: function (x, t, b, c, d) {
                //alert(jQuery.easing.default);
                return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
            },
            easeInQuad: function (x, t, b, c, d) {
                return c*(t/=d)*t + b;
            },
            easeOutQuad: function (x, t, b, c, d) {
                return -c *(t/=d)*(t-2) + b;
            },
            easeInOutQuad: function (x, t, b, c, d) {
                if ((t/=d/2) < 1) return c/2*t*t + b;
                return -c/2 * ((--t)*(t-2) - 1) + b;
            },
            easeInCubic: function (x, t, b, c, d) {
                return c*(t/=d)*t*t + b;
            },
            easeOutCubic: function (x, t, b, c, d) {
                return c*((t=t/d-1)*t*t + 1) + b;
            },
            easeInOutCubic: function (x, t, b, c, d) {
                if ((t/=d/2) < 1) return c/2*t*t*t + b;
                return c/2*((t-=2)*t*t + 2) + b;
            },
            easeInQuart: function (x, t, b, c, d) {
                return c*(t/=d)*t*t*t + b;
            },
            easeOutQuart: function (x, t, b, c, d) {
                return -c * ((t=t/d-1)*t*t*t - 1) + b;
            },
            easeInOutQuart: function (x, t, b, c, d) {
                if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
                return -c/2 * ((t-=2)*t*t*t - 2) + b;
            },
            easeInQuint: function (x, t, b, c, d) {
                return c*(t/=d)*t*t*t*t + b;
            },
            easeOutQuint: function (x, t, b, c, d) {
                return c*((t=t/d-1)*t*t*t*t + 1) + b;
            },
            easeInOutQuint: function (x, t, b, c, d) {
                if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
                return c/2*((t-=2)*t*t*t*t + 2) + b;
            },
            easeInSine: function (x, t, b, c, d) {
                return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
            },
            easeOutSine: function (x, t, b, c, d) {
                return c * Math.sin(t/d * (Math.PI/2)) + b;
            },
            easeInOutSine: function (x, t, b, c, d) {
                return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
            },
            easeInExpo: function (x, t, b, c, d) {
                return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
            },
            easeOutExpo: function (x, t, b, c, d) {
                return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
            },
            easeInOutExpo: function (x, t, b, c, d) {
                if (t==0) return b;
                if (t==d) return b+c;
                if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
                return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
            },
            easeInCirc: function (x, t, b, c, d) {
                return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
            },
            easeOutCirc: function (x, t, b, c, d) {
                return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
            },
            easeInOutCirc: function (x, t, b, c, d) {
                if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
                return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
            },
            easeInElastic: function (x, t, b, c, d) {
                var s=1.70158;var p=0;var a=c;
                if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
                if (a < Math.abs(c)) { a=c; var s=p/4; }
                else var s = p/(2*Math.PI) * Math.asin (c/a);
                return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            },
            easeOutElastic: function (x, t, b, c, d) {
                var s=1.70158;var p=0;var a=c;
                if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
                if (a < Math.abs(c)) { a=c; var s=p/4; }
                else var s = p/(2*Math.PI) * Math.asin (c/a);
                return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
            },
            easeInOutElastic: function (x, t, b, c, d) {
                var s=1.70158;var p=0;var a=c;
                if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
                if (a < Math.abs(c)) { a=c; var s=p/4; }
                else var s = p/(2*Math.PI) * Math.asin (c/a);
                if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
                return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
            },
            easeInBack: function (x, t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                return c*(t/=d)*t*((s+1)*t - s) + b;
            },
            easeOutBack: function (x, t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
            },
            easeInOutBack: function (x, t, b, c, d, s) {
                if (s == undefined) s = 1.70158; 
                if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
                return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
            },
            easeInBounce: function (x, t, b, c, d) {
                return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
            },
            easeOutBounce: function (x, t, b, c, d) {
                if ((t/=d) < (1/2.75)) {
                    return c*(7.5625*t*t) + b;
                } else if (t < (2/2.75)) {
                    return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
                } else if (t < (2.5/2.75)) {
                    return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
                } else {
                    return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
                }
            },
            easeInOutBounce: function (x, t, b, c, d) {
                if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
                return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
            }
        });
    };

    
    
    return self;


    

});
