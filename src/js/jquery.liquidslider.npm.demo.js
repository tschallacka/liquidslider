/*!
 *  Liquid Slider
 *  Copyright 2012 Kevin Batdorf
 *  http://liquidslider.com
 *  MIT license
 *  Updated version using foundation framework NPM friendly
 *  Copyright 2020 Michael Dibbets
 *  MIT license
 */
var $ = window.$ = window.jQuery = require('jquery');
// replace the local import with the npm registry name in your own application
// or call npm link in this directory and npm link liquidslider in your working
// directory and then require('liquidslider');
var LiquidSlider = require('./jquery.liquidslider.npm.js');

// Should show an error in console.
LiquidSlider.bindTojQuery($);

document.addEventListener("DOMContentLoaded", () => {
  let slider9 = document.getElementById('slider-9');
  if(slider9) {
    //let LiquidSlider = require('liquid-slider'),
    let slider_nine = new LiquidSlider(slider9, {
      autoHeight:true,
      slideEaseFunction:'animate.css',
      slideEaseDuration:1000,
      heightEaseDuration:1000,
      animateIn:"rotateInUpRight",
      animateOut:"rotateOutUpLeft"     
    });
  }
  
  let $destroyable = $('#destroyable_from_npm');
  
  if($destroyable.length > 0) {
    let slider_destroy = new LiquidSlider($destroyable, {
      autoHeight:true,
      slideEaseFunction:'animate.css',
      slideEaseDuration:1000,
      heightEaseDuration:1000,
      animateIn:"rollIn",
      animateOut:"rollOut"     
    });
    $destroyable.on('what_can_i_say_except_delete_this', () => {
      slider_destroy.sysDestroy();
      setTimeout(()=>{$destroyable.fadeOut('slow');}, 3000);
    });
  }
  
  LiquidSlider.EASING_FUNCTIONS['popGoesTheWeasel'] = 'cubic-bezier(1,-0.5,0,1.64)';
  let $easing = $('#easingExample');
  if($easing.length > 0) {
    let ls = new LiquidSlider($easing, {
        slideEaseFunction: 'popGoesTheWeasel'
    });
    $('#change_easing').on('click', () => {
       ls.easing['waitForIt'] = 'cubic-bezier(1,.02,1,-0.16)';
       ls.options.slideEaseFunction = 'waitForIt';     
    });
  } 
  
  let $easing_demo = $('#changing-the-easing');
  if($easing_demo.length > 0) {
      let ls = new LiquidSlider($easing_demo.find('#slider-easing'), {
        slideEaseFunction: 'easeOutCubic',  
      });
      let $button_wrap = $easing_demo.find(".default-easings");
      let $buttons = $button_wrap.find('.pure-button');
      $button_wrap.on('click','.pure-button', (e) => {
          let $target = $(e.currentTarget);
          $buttons.removeClass('pure-button-primary');
          $target.addClass('pure-button-primary');
          ls.options.slideEaseFunction = $target.text();
      });
      $easing_demo.find('#dynamic_change_easing').on('click', (e) => {
        if(!ls.easing['waitForIt']) {
            ls.easing['waitForIt'] = 'cubic-bezier(1,.02,1,-0.16)';
        }
        ls.options.slideEaseFunction = 'waitForIt';   
      });
  }
  
  $(document).trigger('render');
});