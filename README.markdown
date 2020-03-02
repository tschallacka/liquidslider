# Liquid Slider 

## A Responsive jQuery HTML Content Slider

Originally this plugin was developed by Kevin Batdorf and he may be still working on it, 
Visit his github to see the original projec this one is based upon: https://github.com/KevinBatdorf/liquidslider

I decided to rewrite this plugin to become more node compatible because I was in need with a more memory conservative approach to this item. 
And since I kinda need this project now I published it under my own namespace.

There's a lot of the original repository in here still, and the old liquidSlider is still here.
It is considered in my repository as legacy, and will not be updated, nor will I provide support for who uses it.
It's only here for those who halfway upgrade to npm and can't for reasons update their code to use the npm version
This plugin is written to be included in an index.js which is then compiled in the big javascript file served to the browser. There are no individual files to include except the legacy files(not recommended)

[Example Page (Advanced)](/examples/page1.npm.html)

I'm on Twitter: [@Tschallacka](http://twitter.com/#!/tschallacka) and have a personal website [tschallacka.de](https://www.tschallacka.de), have an [imgur](https://imgur.com/user/tschallacka), [stackoverflow](https://stackoverflow.com/users/1356107/tschallacka), [reddit](http://reddit.com/u/tschallacka), [royalroad](https://www.royalroad.com/profile/94454) account. So enough ways to get in touch with me, it may even be a safe bet to assume that anyone you encounter with this username may be me. My email is tschallacka [a]t outlook d[ot] com.

## Installation

### NPM
```bash
npm -i @tschallacka/liquidslider
```

Then in your js file add
```js
let LiquidSlider = require('@tschallacka/liquidslider')
```

The stylesheet is developed in less and can be found in `src/less/liquid-slider.less`  
Compiled versions can be found in the css directory.   
The legacy marked file is the css file as provided originally by Kevin Batdorf.

To load the stylesheet with less:
```less
@import "node_modules/@tschallacka/liquidslider/src/less/liquid-slider.less";
```

To load the stylesheet with sass:
```scss
@import "node_modules/@tschallacka/liquidslider/css/liquid-slider.css";
```

To load it directly in your html:
```html
<link rel="stylesheet" href="node_modules/@tschallacka/liquidslider/css/liquid-slider.css">
```

## How to use

### HTML Structure
Structure your HTML in a manner similar to below:

- One wrapper div.  
- Several segment div to reprensent the indivdual slides.  
- .title class marked titles for evental "tab" contents if you want navigation tabs.  

```html
<section class="liquid-slider" id="main-slider">
  <div>
    <h2 class="title">Slide 1</h2>
    <p>Content</p>
  </div>
  <div>
    <h2 class="title">Slide 2</h2>
    <p>Content</p>
  </div>
</section>
```

### Initialize the content slider 

```javascript
let slider = document.getElementById('main-slider'),
    LiquidSlider = require('@tschallacka/liquidslider'),
    mySliderInstance = new LiquidSlider(slider);
```

or

```javascript
$('#main-slider').liquidSlider();
```

or by adding `data-liquid-slider` to the wrapping `.liquid-slider` div.

```html
<section class="liquid-slider" id="main-slider" data-liquid-slider>
```

This however requires you to trigger the `render` event on the document, on page load.

```javascript
$(document).trigger('render');
```

If you would like to edit a setting, do so like this:

```javascript
  $('#main-slider').liquidSlider({
    setting: value,
    setting: value
  });
```

or

```javascript
  let mySliderInstance = new LiquidSlider(slider, {
    setting: value,
    setting: value
  });
```

Or via data attributes(replace uppercase letters with a lowercase letter preceeded by a dash and preceed it all with `data-`. For example `autoHeight: true` becomes `data-auto-height="true"`)

```html
<section class="liquid-slider" 
         id="main-slider" 
         data-liquid-slider 
         data-auto-height="false" 
         data-slide-ease-function="animate.css" 
         data-animate-in="rollIn" 
         data-animate-out="rollOut">
```

### Destroy the slider

This version of liquid slider allows itself to be destroyed. For working examples please see page3.npm.html in the examples directory.

For destroying the liquid slider via an instance reference you need to invoke `sysDestroy()` **NOT** `destroy()`
```javascript
    let mySliderInstance = new LiquidSlider(slider, {
    setting: value,
    setting: value
  });
  mySliderInstance.sysDestroy()
```

You can also trigger the `'dispose-control'` event. It's best to use `triggerHandler`, if your slider is wrapped in another
october foundation framework handler it would bubble up if you use `trigger` destroying the elements wrapping your slider.

```javascript
   $('some selector for the liquid slider here').triggerHandler('dispose-control');
```

## Default Settings
----------------
### Easing functions
You can add more easing functions by adding it to `LiquidSlider.EASING_FUNCTIONS['YourEasingName'] = 'your-definition';`, 
or if you have an instance to `myLiquidSlider.easing['YourEasingName'] = 'your-definition';` to limit that easing function to that instance.

```javascript
    let LiquidSlider = require('@tschallacka/liquidslider');
    
    // Available to all new LiquidSliders instances, not the already instantiated ones.
    LiquidSlider.EASING_FUNCTIONS['popGoesTheWeasel'] = 'cubic-bezier(1,-0.5,0,1.64)';
    let ls = new LiquidSlider(someElement,{
        slideEaseFunction: 'popGoesTheWeasel'
    });
    
    // Wait for it is now only available to this liquid slider instance.
    ls.easing['waitForIt'] = 'cubic-bezier(1,.02,1,-0.16)';
    ls.options.slideEaseFunction = 'waitForIt';    
```

```javascript
    {
    easeOutCubic: 'cubic-bezier(.215,.61,.355,1)',
    easeInOutCubic: 'cubic-bezier(.645,.045,.355,1)',
    easeInCirc: 'cubic-bezier(.6,.04,.98,.335)',
    easeOutCirc: 'cubic-bezier(.075,.82,.165,1)',
    easeInOutCirc: 'cubic-bezier(.785,.135,.15,.86)',
    easeInExpo: 'cubic-bezier(.95,.05,.795,.035)',
    easeOutExpo: 'cubic-bezier(.19,1,.22,1)',
    easeInOutExpo: 'cubic-bezier(1,0,0,1)',
    easeInQuad: 'cubic-bezier(.55,.085,.68,.53)',
    easeOutQuad: 'cubic-bezier(.25,.46,.45,.94)',
    easeInOutQuad: 'cubic-bezier(.455,.03,.515,.955)',
    easeInQuart: 'cubic-bezier(.895,.03,.685,.22)',
    easeOutQuart: 'cubic-bezier(.165,.84,.44,1)',
    easeInOutQuart: 'cubic-bezier(.77,0,.175,1)',
    easeInQuint: 'cubic-bezier(.755,.05,.855,.06)',
    easeOutQuint: 'cubic-bezier(.23,1,.32,1)',
    easeInOutQuint: 'cubic-bezier(.86,0,.07,1)',
    easeInSine: 'cubic-bezier(.47,0,.745,.715)',
    easeOutSine: 'cubic-bezier(.39,.575,.565,1)',
    easeInOutSine: 'cubic-bezier(.445,.05,.55,.95)',
    easeInBack: 'cubic-bezier(.6,-.28,.735,.045)',
    easeOutBack: 'cubic-bezier(.175,.885,.32,1.275)',
    easeInOutBack: 'cubic-bezier(.68,-.55,.265,1.55)'
    }
```

```javascript
autoHeight: true,  // Should the height be adjusted when the slides have different sizes?
minHeight: 0,      // minimal height
heightEaseDuration: 1500,   // Time it takes to adjust the height
heightEaseFunction: 'easeInOutExpo', // Which method to use to adjust the height. See https://daneden.github.io/animate.css/ if you use animate.css

slideEaseDuration: 1500,
slideEaseFunction: 'easeInOutExpo',
slideEaseFunctionFallback: 'swing',
animateIn: 'bounceInRight',
animateOut: 'bounceOutRight',
continuous: true,
fadeInDuration: 500,
fadeOutDuration: 500,

autoSlide: false,
autoSlideDirection: 'right',
autoSlideInterval: 6000,
forceAutoSlide: false,
pauseOnHover: false,

dynamicArrows: true,
dynamicArrowsGraphical: true,
dynamicArrowLeftText: '&#171; left',
dynamicArrowRightText: 'right &#187;',
hideSideArrows: false,
hideSideArrowsDuration: 750,
hoverArrows: true,
hoverArrowDuration: 250,

dynamicTabs: true,
dynamicTabsHtml: true,
includeTitle: true,
panelTitleSelector: '.title',
dynamicTabsAlign: 'left',
dynamicTabsPosition: 'top',
navElementTag: 'div',

firstPanelToLoad: 1,
hashLinking: false,
hashTitleSelector: '.title',

keyboardNavigation: false,
leftKey: 39,
rightKey: 37,
panelKeys: {
  1: 49,
  2: 50,
  3: 51,
  4: 52
},

responsive: true,
mobileNavigation: true,
mobileNavDefaultText: 'Menu',
mobileUIThreshold: 0,
hideArrowsWhenMobile: true,
hideArrowsThreshold: 0,
useCSSMaxWidth: 3000,

preload: function() {
  this.finalize();
},
onload: function() {},
pretransition: function() {
  this.transition();
},
callback: function() {},

preloader: false,
swipe: true,
swipeArgs: undefined,
removeGlobalNoJsMarker: true
```


Versions
--------
Version 3.0.0
- Update to NPM compatible version
- Please read the page3.npm.html for added functionality.

Version 2.3.8
- Fixes bug with text arrows and no mobile nav

Version 2.3.7
- Fixes compatability with Bootstrap

Version 2.3.6
- Recalculates panel width based on container
- Minor CSS update

Version 2.3.2
- Fixes trim

Version 2.3.2
- Updates examples
- Fixes hashlink bug

Version 2.3.1
- Updates for jQuery repo

Version 2.3.0
- Adds bower
- Uses px instead of %

Version 2.2.0
- Fixes hash linking (new approach)
- Uses API for cross links

Version 2.1
- Fixes currentPanel bug
- Switches to a new (better?) modular strategy
- Switches license to MIT
- Improves coding style
- Sets focus/blur for autoslide
- Fixes class for cross links
- sanaziteNumber() -> sanitizeNumber() spelling fix
- Fixes autoSlide pauseOnHover bug 

Version 2.0.12
- Adds currentPanel class to the current panel

Version 2.0.11
- Had to revert a autoslide bug fix

Version 2.0.10
- Fixes how RegEx works (hashLinking)
- Fixes a bug when dynamic arrows is disabled (@joeworkman)
- Adds a fallback for animate.css when css not supported (@joeworkman)
- Fixes autoslide bug (@joeworkman)

Version 2.0.9
- Fixes a few of the problems with cross links

Version 2.0.8
- Changes the way the slider builds with fade

Version 2.0.7
- Fixes swipe bug

Version 2.0.6
- Fixes mobile width

Version 2.0.5
- Updates touchSwipe and allows user to add options (not documented though)

Version 2.0.4
- Changes how the slider downgrades to IE

Version 2.0.3
- Fixes a bug that didn't call pretransition when using animate.css

Version 2.0.2
- Fixes a bug that loses menu names in select box when includeTitle:false

Version 2.0.1
- Fixes auto height on resize bug

Version 2.0.0
- Completely rebuilt from the ground up
- New API
- Faster, smaller, more flexible
- Many, many new features

Version 1.3.7
- Overhauls the cross linking functionality
- Removes the hashCrossLinks setting.
- Contributed by @joeworkman

Version 1.3.6
- Fixes autoslide bug and callback functionality
- Updates website on jquery repository

Version 1.3.5
- Prepares code for new site launch
- Fixes a bug when hover arrows is disabled

Version 1.3.4
- Fixes a bug when using fade transitions
- Allows crossLinks to control multiple sliders

Version 1.3.3
- Fixes an autoslide bug

Version 1.3.2
- Fixes a hashLinking bug

Version 1.3.1
- Fixes a bug when using fade and swipe

Version 1.3.0
- Fixes how the current class is applied when nesting sliders

Version 1.2.9
- Fixes and updates the TouchSwipe settings and script

Version 1.2.8
- Fixes the way the preloader works when continuous is off

Version 1.2.7
- Fixes some bugs

Version 1.2.6
- Fixes a few minor bugs.
- Organizes code for upcoming custom build

Version 1.2.4 - 1.2.5
- Pushes new version # to jQuery repository.

Version 1.2.3
- Fixes a bug when using crosslinks on multiple sliders wont apply the current class properly.

Version 1.2.2
- Fixes a bug where keyboard navigation fails.

Version 1.2.1
- Removes the depreciated $.browser() call.
- Fixes a bug when using hashNames that started the slider on the wrong panel.

Version 1.2.0
- Adapts a new semantic versioning system
- Adds touch functionality via touchSwipe (thanks @appzuka for recommending this plugin)
- Removes jQuery and included only the link to the CDN
- Replaces jQueryUI easing with the much lighter jQuery Easing plugin.
