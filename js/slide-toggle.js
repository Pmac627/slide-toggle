//Enclosing the javascript code into a function to use strict mode.
(function () {
    'use strict';
    
    /**
     * This widget toggles the visibility of an element by animating the height of the element. It
     * animates the height using CSS Transitions and falls back to a javascript solution if not 
     * supported by the browser. Javascript animation can be forced by sending jsOnly as true.
     */
    var ST = window.SlideToggle = function (id, options) {
        
        //id is a mandatory parameter to initialize the widget. Otherwise throws an error
        if(!id) { throw "Element id parameter missing to create SlideToggle object"; }
        
        //keep the reference to the element to prevent diving into DOM again and again
        this.el = document.getElementById(id);

        options = options || {};
        this.id = id
        
        //option for disabling CSS transitions
        this.jsOnly = options.jsOnly || false;
        
        //animation parameters
        this.speed = options.speed || 400;
        this.interval = options.interval || 13;
        
        // css transitions doesn't work without an initial height, hence setting the height
        if (this.isTransitions() && !this.jsOnly) {
            this.el.style.height = this.el.clientHeight + 'px';
        }
    };

    ST.prototype = {
        
        slideToggle: function () {
            
            //if transitions are not supported then fallback to javascript animation
            (this.isTransitions() && !this.jsOnly) ? this.slideCSS() : this.slideJS();
            
        },
        
        /**
         * function animates the element height using css transitions by setting the vendor specific
         * css propery on height
         */
        slideCSS: function () {
            var el = this.el,
                that = this;
            el.style[ST.vprefix] = 'height ' + this.speed + 'ms linear';

            if (this.visible()) {
                setTimeout(function () {
                    el.style.height = '0';
                }, 50);

                //this code could be better using cross browser transition end callback
                setTimeout(function () {
                    that.visible('none');
                }, this.speed + 70);
            } else {
                this.visible('block');
                var h = that.findAutoHeight();
                setTimeout(function () {
                    el.style.height = h + 'px';
                }, 50);
            }

        },


        /**
         * function animates the element height using javascript using a setInterval()
         */
        slideJS: function () {
            var that = this,
                elHeight = this.el.clientHeight,
                animHeight = elHeight,
                finalDisplay = 'none',
                step = 1;

            if (!this.visible()) { // slideDown
                elHeight = that.findAutoHeight();
                animHeight = 0;
                step = -1
                finalDisplay = 'block';
            }

            step *= Math.ceil(elHeight / (this.speed / this.interval));

            // set initial height and display	
            this.el.style.height = animHeight + 'px';
            this.visible('block');

            //function used to increase/decrease the height of element
            var animate = function () { 

                if (animHeight >= step && animHeight <= elHeight) {
                    animHeight = animHeight - step;
                    that.el.style.height = animHeight + 'px';
                } else {
                    // set final display property
                    that.visible(finalDisplay);
                    clearInterval(id);
                }
            };
            
            //the value of d could be dynamic for non-linear animations
            var id = setInterval(animate, this.interval);

        },

        /**
         * Function to check if transitions are supported in the browser. For performance, this
         * function calculates the value only once and persist it for future calls.
         */
        isTransitions: function () {

            if (ST.transition === undefined) {
                ST.transition = false;
                var style = this.el.style,
                    vendors = [ 'transition',
                                'webkitTransition',
                                'MozTransition',
                                'OTransition',
                                'MsTransition' ];

                for (var i = 0, l = vendors.length; i < l; i++) {
                    if (vendors[i] in style) {
                        ST.vprefix = vendors[i];
                        ST.transition = true;
                    }
                }
            }
            return ST.transition;

        },


        // function to set/get visibility of the element
        visible: function (visibility) {
            if (visibility) {
                this.el.style.display = visibility;
            } else {
                return (this.el.clientHeight !== 0);
            }
        },

        /**
         * Function to find the auto height of the element when showing the element.
         * It displays the element out of the view and gets its height.
         */
        findAutoHeight: function () {
            var el = this.el,
                oldCssText = el.style.cssText,
                w = el.parentNode.clientWidth;
            el.style.cssText = oldCssText + 
                        'display:block;position:absolute;top:-999px;height:auto;width:' + w + 'px';
            var h = el.clientHeight;
            el.style.cssText = oldCssText;
            return h;
        }
    };
})();