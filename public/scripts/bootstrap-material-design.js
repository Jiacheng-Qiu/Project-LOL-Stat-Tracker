(function (global, factory) ***REMOVED***
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('jquery'), require('popper.js')) :
	typeof define === 'function' && define.amd ? define(['jquery', 'popper.js'], factory) :
	(factory(global.jQuery,global.Popper));
***REMOVED***(this, (function ($,Popper$1) ***REMOVED*** 'use strict';

$ = $ && $.hasOwnProperty('default') ? $['default'] : $;
Popper$1 = Popper$1 && Popper$1.hasOwnProperty('default') ? Popper$1['default'] : Popper$1;

function _defineProperties(target, props) ***REMOVED***
  for (var i = 0; i < props.length; i++) ***REMOVED***
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  ***REMOVED***
***REMOVED***

function _createClass(Constructor, protoProps, staticProps) ***REMOVED***
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
***REMOVED***

function _extends() ***REMOVED***
  _extends = Object.assign || function (target) ***REMOVED***
    for (var i = 1; i < arguments.length; i++) ***REMOVED***
      var source = arguments[i];

      for (var key in source) ***REMOVED***
        if (Object.prototype.hasOwnProperty.call(source, key)) ***REMOVED***
          target[key] = source[key];
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***

    return target;
  ***REMOVED***;

  return _extends.apply(this, arguments);
***REMOVED***

function _inheritsLoose(subClass, superClass) ***REMOVED***
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
***REMOVED***

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0): util.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Util = function ($$$1) ***REMOVED***
  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */
  var transition = false;
  var MAX_UID = 1000000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

  function toType(obj) ***REMOVED***
    return ***REMOVED******REMOVED***.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  ***REMOVED***

  function getSpecialTransitionEndEvent() ***REMOVED***
    return ***REMOVED***
      bindType: transition.end,
      delegateType: transition.end,
      handle: function handle(event) ***REMOVED***
        if ($$$1(event.target).is(this)) ***REMOVED***
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        ***REMOVED***

        return undefined; // eslint-disable-line no-undefined
      ***REMOVED***
    ***REMOVED***;
  ***REMOVED***

  function transitionEndTest() ***REMOVED***
    if (typeof window !== 'undefined' && window.QUnit) ***REMOVED***
      return false;
    ***REMOVED***

    return ***REMOVED***
      end: 'transitionend'
    ***REMOVED***;
  ***REMOVED***

  function transitionEndEmulator(duration) ***REMOVED***
    var _this = this;

    var called = false;
    $$$1(this).one(Util.TRANSITION_END, function () ***REMOVED***
      called = true;
    ***REMOVED***);
    setTimeout(function () ***REMOVED***
      if (!called) ***REMOVED***
        Util.triggerTransitionEnd(_this);
      ***REMOVED***
    ***REMOVED***, duration);
    return this;
  ***REMOVED***

  function setTransitionEndSupport() ***REMOVED***
    transition = transitionEndTest();
    $$$1.fn.emulateTransitionEnd = transitionEndEmulator;

    if (Util.supportsTransitionEnd()) ***REMOVED***
      $$$1.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
    ***REMOVED***
  ***REMOVED***

  function escapeId(selector) ***REMOVED***
    // We escape IDs in case of special selectors (selector = '#myId:something')
    // $.escapeSelector does not exist in jQuery < 3
    selector = typeof $$$1.escapeSelector === 'function' ? $$$1.escapeSelector(selector).substr(1) : selector.replace(/(:|\.|\[|\]|,|=|@)/g, '\\$1');
    return selector;
  ***REMOVED***
  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */


  var Util = ***REMOVED***
    TRANSITION_END: 'bsTransitionEnd',
    getUID: function getUID(prefix) ***REMOVED***
      do ***REMOVED***
        // eslint-disable-next-line no-bitwise
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      ***REMOVED*** while (document.getElementById(prefix));

      return prefix;
    ***REMOVED***,
    getSelectorFromElement: function getSelectorFromElement(element) ***REMOVED***
      var selector = element.getAttribute('data-target');

      if (!selector || selector === '#') ***REMOVED***
        selector = element.getAttribute('href') || '';
      ***REMOVED*** // If it's an ID


      if (selector.charAt(0) === '#') ***REMOVED***
        selector = escapeId(selector);
      ***REMOVED***

      try ***REMOVED***
        var $selector = $$$1(document).find(selector);
        return $selector.length > 0 ? selector : null;
      ***REMOVED*** catch (err) ***REMOVED***
        return null;
      ***REMOVED***
    ***REMOVED***,
    reflow: function reflow(element) ***REMOVED***
      return element.offsetHeight;
    ***REMOVED***,
    triggerTransitionEnd: function triggerTransitionEnd(element) ***REMOVED***
      $$$1(element).trigger(transition.end);
    ***REMOVED***,
    supportsTransitionEnd: function supportsTransitionEnd() ***REMOVED***
      return Boolean(transition);
    ***REMOVED***,
    isElement: function isElement(obj) ***REMOVED***
      return (obj[0] || obj).nodeType;
    ***REMOVED***,
    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) ***REMOVED***
      for (var property in configTypes) ***REMOVED***
        if (Object.prototype.hasOwnProperty.call(configTypes, property)) ***REMOVED***
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = value && Util.isElement(value) ? 'element' : toType(value);

          if (!new RegExp(expectedTypes).test(valueType)) ***REMOVED***
            throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***;
  setTransitionEndSupport();
  return Util;
***REMOVED***($);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0): alert.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Alert = function ($$$1) ***REMOVED***
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = 'alert';
  var VERSION = '4.0.0';
  var DATA_KEY = 'bs.alert';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
  var TRANSITION_DURATION = 150;
  var Selector = ***REMOVED***
    DISMISS: '[data-dismiss="alert"]'
  ***REMOVED***;
  var Event = ***REMOVED***
    CLOSE: "close" + EVENT_KEY,
    CLOSED: "closed" + EVENT_KEY,
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
  ***REMOVED***;
  var ClassName = ***REMOVED***
    ALERT: 'alert',
    FADE: 'fade',
    SHOW: 'show'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  ***REMOVED***;

  var Alert =
  /*#__PURE__*/
  function () ***REMOVED***
    function Alert(element) ***REMOVED***
      this._element = element;
    ***REMOVED*** // Getters


    var _proto = Alert.prototype;

    // Public
    _proto.close = function close(element) ***REMOVED***
      element = element || this._element;

      var rootElement = this._getRootElement(element);

      var customEvent = this._triggerCloseEvent(rootElement);

      if (customEvent.isDefaultPrevented()) ***REMOVED***
        return;
      ***REMOVED***

      this._removeElement(rootElement);
    ***REMOVED***;

    _proto.dispose = function dispose() ***REMOVED***
      $$$1.removeData(this._element, DATA_KEY);
      this._element = null;
    ***REMOVED***; // Private


    _proto._getRootElement = function _getRootElement(element) ***REMOVED***
      var selector = Util.getSelectorFromElement(element);
      var parent = false;

      if (selector) ***REMOVED***
        parent = $$$1(selector)[0];
      ***REMOVED***

      if (!parent) ***REMOVED***
        parent = $$$1(element).closest("." + ClassName.ALERT)[0];
      ***REMOVED***

      return parent;
    ***REMOVED***;

    _proto._triggerCloseEvent = function _triggerCloseEvent(element) ***REMOVED***
      var closeEvent = $$$1.Event(Event.CLOSE);
      $$$1(element).trigger(closeEvent);
      return closeEvent;
    ***REMOVED***;

    _proto._removeElement = function _removeElement(element) ***REMOVED***
      var _this = this;

      $$$1(element).removeClass(ClassName.SHOW);

      if (!Util.supportsTransitionEnd() || !$$$1(element).hasClass(ClassName.FADE)) ***REMOVED***
        this._destroyElement(element);

        return;
      ***REMOVED***

      $$$1(element).one(Util.TRANSITION_END, function (event) ***REMOVED***
        return _this._destroyElement(element, event);
      ***REMOVED***).emulateTransitionEnd(TRANSITION_DURATION);
    ***REMOVED***;

    _proto._destroyElement = function _destroyElement(element) ***REMOVED***
      $$$1(element).detach().trigger(Event.CLOSED).remove();
    ***REMOVED***; // Static


    Alert._jQueryInterface = function _jQueryInterface(config) ***REMOVED***
      return this.each(function () ***REMOVED***
        var $element = $$$1(this);
        var data = $element.data(DATA_KEY);

        if (!data) ***REMOVED***
          data = new Alert(this);
          $element.data(DATA_KEY, data);
        ***REMOVED***

        if (config === 'close') ***REMOVED***
          data[config](this);
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***;

    Alert._handleDismiss = function _handleDismiss(alertInstance) ***REMOVED***
      return function (event) ***REMOVED***
        if (event) ***REMOVED***
          event.preventDefault();
        ***REMOVED***

        alertInstance.close(this);
      ***REMOVED***;
    ***REMOVED***;

    _createClass(Alert, null, [***REMOVED***
      key: "VERSION",
      get: function get() ***REMOVED***
        return VERSION;
      ***REMOVED***
    ***REMOVED***]);
    return Alert;
  ***REMOVED***();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $$$1(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $$$1.fn[NAME] = Alert._jQueryInterface;
  $$$1.fn[NAME].Constructor = Alert;

  $$$1.fn[NAME].noConflict = function () ***REMOVED***
    $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
    return Alert._jQueryInterface;
  ***REMOVED***;

  return Alert;
***REMOVED***($);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0): button.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Button = function ($$$1) ***REMOVED***
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = 'button';
  var VERSION = '4.0.0';
  var DATA_KEY = 'bs.button';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
  var ClassName = ***REMOVED***
    ACTIVE: 'active',
    BUTTON: 'btn',
    FOCUS: 'focus'
  ***REMOVED***;
  var Selector = ***REMOVED***
    DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
    DATA_TOGGLE: '[data-toggle="buttons"]',
    INPUT: 'input',
    ACTIVE: '.active',
    BUTTON: '.btn'
  ***REMOVED***;
  var Event = ***REMOVED***
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
    FOCUS_BLUR_DATA_API: "focus" + EVENT_KEY + DATA_API_KEY + " " + ("blur" + EVENT_KEY + DATA_API_KEY)
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  ***REMOVED***;

  var Button =
  /*#__PURE__*/
  function () ***REMOVED***
    function Button(element) ***REMOVED***
      this._element = element;
    ***REMOVED*** // Getters


    var _proto = Button.prototype;

    // Public
    _proto.toggle = function toggle() ***REMOVED***
      var triggerChangeEvent = true;
      var addAriaPressed = true;
      var rootElement = $$$1(this._element).closest(Selector.DATA_TOGGLE)[0];

      if (rootElement) ***REMOVED***
        var input = $$$1(this._element).find(Selector.INPUT)[0];

        if (input) ***REMOVED***
          if (input.type === 'radio') ***REMOVED***
            if (input.checked && $$$1(this._element).hasClass(ClassName.ACTIVE)) ***REMOVED***
              triggerChangeEvent = false;
            ***REMOVED*** else ***REMOVED***
              var activeElement = $$$1(rootElement).find(Selector.ACTIVE)[0];

              if (activeElement) ***REMOVED***
                $$$1(activeElement).removeClass(ClassName.ACTIVE);
              ***REMOVED***
            ***REMOVED***
          ***REMOVED***

          if (triggerChangeEvent) ***REMOVED***
            if (input.hasAttribute('disabled') || rootElement.hasAttribute('disabled') || input.classList.contains('disabled') || rootElement.classList.contains('disabled')) ***REMOVED***
              return;
            ***REMOVED***

            input.checked = !$$$1(this._element).hasClass(ClassName.ACTIVE);
            $$$1(input).trigger('change');
          ***REMOVED***

          input.focus();
          addAriaPressed = false;
        ***REMOVED***
      ***REMOVED***

      if (addAriaPressed) ***REMOVED***
        this._element.setAttribute('aria-pressed', !$$$1(this._element).hasClass(ClassName.ACTIVE));
      ***REMOVED***

      if (triggerChangeEvent) ***REMOVED***
        $$$1(this._element).toggleClass(ClassName.ACTIVE);
      ***REMOVED***
    ***REMOVED***;

    _proto.dispose = function dispose() ***REMOVED***
      $$$1.removeData(this._element, DATA_KEY);
      this._element = null;
    ***REMOVED***; // Static


    Button._jQueryInterface = function _jQueryInterface(config) ***REMOVED***
      return this.each(function () ***REMOVED***
        var data = $$$1(this).data(DATA_KEY);

        if (!data) ***REMOVED***
          data = new Button(this);
          $$$1(this).data(DATA_KEY, data);
        ***REMOVED***

        if (config === 'toggle') ***REMOVED***
          data[config]();
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***;

    _createClass(Button, null, [***REMOVED***
      key: "VERSION",
      get: function get() ***REMOVED***
        return VERSION;
      ***REMOVED***
    ***REMOVED***]);
    return Button;
  ***REMOVED***();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) ***REMOVED***
    event.preventDefault();
    var button = event.target;

    if (!$$$1(button).hasClass(ClassName.BUTTON)) ***REMOVED***
      button = $$$1(button).closest(Selector.BUTTON);
    ***REMOVED***

    Button._jQueryInterface.call($$$1(button), 'toggle');
  ***REMOVED***).on(Event.FOCUS_BLUR_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) ***REMOVED***
    var button = $$$1(event.target).closest(Selector.BUTTON)[0];
    $$$1(button).toggleClass(ClassName.FOCUS, /^focus(in)?$/.test(event.type));
  ***REMOVED***);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $$$1.fn[NAME] = Button._jQueryInterface;
  $$$1.fn[NAME].Constructor = Button;

  $$$1.fn[NAME].noConflict = function () ***REMOVED***
    $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
    return Button._jQueryInterface;
  ***REMOVED***;

  return Button;
***REMOVED***($);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0): carousel.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Carousel = function ($$$1) ***REMOVED***
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = 'carousel';
  var VERSION = '4.0.0';
  var DATA_KEY = 'bs.carousel';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
  var TRANSITION_DURATION = 600;
  var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key

  var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

  var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

  var Default = ***REMOVED***
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true
  ***REMOVED***;
  var DefaultType = ***REMOVED***
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean'
  ***REMOVED***;
  var Direction = ***REMOVED***
    NEXT: 'next',
    PREV: 'prev',
    LEFT: 'left',
    RIGHT: 'right'
  ***REMOVED***;
  var Event = ***REMOVED***
    SLIDE: "slide" + EVENT_KEY,
    SLID: "slid" + EVENT_KEY,
    KEYDOWN: "keydown" + EVENT_KEY,
    MOUSEENTER: "mouseenter" + EVENT_KEY,
    MOUSELEAVE: "mouseleave" + EVENT_KEY,
    TOUCHEND: "touchend" + EVENT_KEY,
    LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY,
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
  ***REMOVED***;
  var ClassName = ***REMOVED***
    CAROUSEL: 'carousel',
    ACTIVE: 'active',
    SLIDE: 'slide',
    RIGHT: 'carousel-item-right',
    LEFT: 'carousel-item-left',
    NEXT: 'carousel-item-next',
    PREV: 'carousel-item-prev',
    ITEM: 'carousel-item'
  ***REMOVED***;
  var Selector = ***REMOVED***
    ACTIVE: '.active',
    ACTIVE_ITEM: '.active.carousel-item',
    ITEM: '.carousel-item',
    NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
    INDICATORS: '.carousel-indicators',
    DATA_SLIDE: '[data-slide], [data-slide-to]',
    DATA_RIDE: '[data-ride="carousel"]'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  ***REMOVED***;

  var Carousel =
  /*#__PURE__*/
  function () ***REMOVED***
    function Carousel(element, config) ***REMOVED***
      this._items = null;
      this._interval = null;
      this._activeElement = null;
      this._isPaused = false;
      this._isSliding = false;
      this.touchTimeout = null;
      this._config = this._getConfig(config);
      this._element = $$$1(element)[0];
      this._indicatorsElement = $$$1(this._element).find(Selector.INDICATORS)[0];

      this._addEventListeners();
    ***REMOVED*** // Getters


    var _proto = Carousel.prototype;

    // Public
    _proto.next = function next() ***REMOVED***
      if (!this._isSliding) ***REMOVED***
        this._slide(Direction.NEXT);
      ***REMOVED***
    ***REMOVED***;

    _proto.nextWhenVisible = function nextWhenVisible() ***REMOVED***
      // Don't call next when the page isn't visible
      // or the carousel or its parent isn't visible
      if (!document.hidden && $$$1(this._element).is(':visible') && $$$1(this._element).css('visibility') !== 'hidden') ***REMOVED***
        this.next();
      ***REMOVED***
    ***REMOVED***;

    _proto.prev = function prev() ***REMOVED***
      if (!this._isSliding) ***REMOVED***
        this._slide(Direction.PREV);
      ***REMOVED***
    ***REMOVED***;

    _proto.pause = function pause(event) ***REMOVED***
      if (!event) ***REMOVED***
        this._isPaused = true;
      ***REMOVED***

      if ($$$1(this._element).find(Selector.NEXT_PREV)[0] && Util.supportsTransitionEnd()) ***REMOVED***
        Util.triggerTransitionEnd(this._element);
        this.cycle(true);
      ***REMOVED***

      clearInterval(this._interval);
      this._interval = null;
    ***REMOVED***;

    _proto.cycle = function cycle(event) ***REMOVED***
      if (!event) ***REMOVED***
        this._isPaused = false;
      ***REMOVED***

      if (this._interval) ***REMOVED***
        clearInterval(this._interval);
        this._interval = null;
      ***REMOVED***

      if (this._config.interval && !this._isPaused) ***REMOVED***
        this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
      ***REMOVED***
    ***REMOVED***;

    _proto.to = function to(index) ***REMOVED***
      var _this = this;

      this._activeElement = $$$1(this._element).find(Selector.ACTIVE_ITEM)[0];

      var activeIndex = this._getItemIndex(this._activeElement);

      if (index > this._items.length - 1 || index < 0) ***REMOVED***
        return;
      ***REMOVED***

      if (this._isSliding) ***REMOVED***
        $$$1(this._element).one(Event.SLID, function () ***REMOVED***
          return _this.to(index);
        ***REMOVED***);
        return;
      ***REMOVED***

      if (activeIndex === index) ***REMOVED***
        this.pause();
        this.cycle();
        return;
      ***REMOVED***

      var direction = index > activeIndex ? Direction.NEXT : Direction.PREV;

      this._slide(direction, this._items[index]);
    ***REMOVED***;

    _proto.dispose = function dispose() ***REMOVED***
      $$$1(this._element).off(EVENT_KEY);
      $$$1.removeData(this._element, DATA_KEY);
      this._items = null;
      this._config = null;
      this._element = null;
      this._interval = null;
      this._isPaused = null;
      this._isSliding = null;
      this._activeElement = null;
      this._indicatorsElement = null;
    ***REMOVED***; // Private


    _proto._getConfig = function _getConfig(config) ***REMOVED***
      config = _extends(***REMOVED******REMOVED***, Default, config);
      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    ***REMOVED***;

    _proto._addEventListeners = function _addEventListeners() ***REMOVED***
      var _this2 = this;

      if (this._config.keyboard) ***REMOVED***
        $$$1(this._element).on(Event.KEYDOWN, function (event) ***REMOVED***
          return _this2._keydown(event);
        ***REMOVED***);
      ***REMOVED***

      if (this._config.pause === 'hover') ***REMOVED***
        $$$1(this._element).on(Event.MOUSEENTER, function (event) ***REMOVED***
          return _this2.pause(event);
        ***REMOVED***).on(Event.MOUSELEAVE, function (event) ***REMOVED***
          return _this2.cycle(event);
        ***REMOVED***);

        if ('ontouchstart' in document.documentElement) ***REMOVED***
          // If it's a touch-enabled device, mouseenter/leave are fired as
          // part of the mouse compatibility events on first tap - the carousel
          // would stop cycling until user tapped out of it;
          // here, we listen for touchend, explicitly pause the carousel
          // (as if it's the second time we tap on it, mouseenter compat event
          // is NOT fired) and after a timeout (to allow for mouse compatibility
          // events to fire) we explicitly restart cycling
          $$$1(this._element).on(Event.TOUCHEND, function () ***REMOVED***
            _this2.pause();

            if (_this2.touchTimeout) ***REMOVED***
              clearTimeout(_this2.touchTimeout);
            ***REMOVED***

            _this2.touchTimeout = setTimeout(function (event) ***REMOVED***
              return _this2.cycle(event);
            ***REMOVED***, TOUCHEVENT_COMPAT_WAIT + _this2._config.interval);
          ***REMOVED***);
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***;

    _proto._keydown = function _keydown(event) ***REMOVED***
      if (/input|textarea/i.test(event.target.tagName)) ***REMOVED***
        return;
      ***REMOVED***

      switch (event.which) ***REMOVED***
        case ARROW_LEFT_KEYCODE:
          event.preventDefault();
          this.prev();
          break;

        case ARROW_RIGHT_KEYCODE:
          event.preventDefault();
          this.next();
          break;

        default:
      ***REMOVED***
    ***REMOVED***;

    _proto._getItemIndex = function _getItemIndex(element) ***REMOVED***
      this._items = $$$1.makeArray($$$1(element).parent().find(Selector.ITEM));
      return this._items.indexOf(element);
    ***REMOVED***;

    _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) ***REMOVED***
      var isNextDirection = direction === Direction.NEXT;
      var isPrevDirection = direction === Direction.PREV;

      var activeIndex = this._getItemIndex(activeElement);

      var lastItemIndex = this._items.length - 1;
      var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

      if (isGoingToWrap && !this._config.wrap) ***REMOVED***
        return activeElement;
      ***REMOVED***

      var delta = direction === Direction.PREV ? -1 : 1;
      var itemIndex = (activeIndex + delta) % this._items.length;
      return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
    ***REMOVED***;

    _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) ***REMOVED***
      var targetIndex = this._getItemIndex(relatedTarget);

      var fromIndex = this._getItemIndex($$$1(this._element).find(Selector.ACTIVE_ITEM)[0]);

      var slideEvent = $$$1.Event(Event.SLIDE, ***REMOVED***
        relatedTarget: relatedTarget,
        direction: eventDirectionName,
        from: fromIndex,
        to: targetIndex
      ***REMOVED***);
      $$$1(this._element).trigger(slideEvent);
      return slideEvent;
    ***REMOVED***;

    _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) ***REMOVED***
      if (this._indicatorsElement) ***REMOVED***
        $$$1(this._indicatorsElement).find(Selector.ACTIVE).removeClass(ClassName.ACTIVE);

        var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

        if (nextIndicator) ***REMOVED***
          $$$1(nextIndicator).addClass(ClassName.ACTIVE);
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***;

    _proto._slide = function _slide(direction, element) ***REMOVED***
      var _this3 = this;

      var activeElement = $$$1(this._element).find(Selector.ACTIVE_ITEM)[0];

      var activeElementIndex = this._getItemIndex(activeElement);

      var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

      var nextElementIndex = this._getItemIndex(nextElement);

      var isCycling = Boolean(this._interval);
      var directionalClassName;
      var orderClassName;
      var eventDirectionName;

      if (direction === Direction.NEXT) ***REMOVED***
        directionalClassName = ClassName.LEFT;
        orderClassName = ClassName.NEXT;
        eventDirectionName = Direction.LEFT;
      ***REMOVED*** else ***REMOVED***
        directionalClassName = ClassName.RIGHT;
        orderClassName = ClassName.PREV;
        eventDirectionName = Direction.RIGHT;
      ***REMOVED***

      if (nextElement && $$$1(nextElement).hasClass(ClassName.ACTIVE)) ***REMOVED***
        this._isSliding = false;
        return;
      ***REMOVED***

      var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

      if (slideEvent.isDefaultPrevented()) ***REMOVED***
        return;
      ***REMOVED***

      if (!activeElement || !nextElement) ***REMOVED***
        // Some weirdness is happening, so we bail
        return;
      ***REMOVED***

      this._isSliding = true;

      if (isCycling) ***REMOVED***
        this.pause();
      ***REMOVED***

      this._setActiveIndicatorElement(nextElement);

      var slidEvent = $$$1.Event(Event.SLID, ***REMOVED***
        relatedTarget: nextElement,
        direction: eventDirectionName,
        from: activeElementIndex,
        to: nextElementIndex
      ***REMOVED***);

      if (Util.supportsTransitionEnd() && $$$1(this._element).hasClass(ClassName.SLIDE)) ***REMOVED***
        $$$1(nextElement).addClass(orderClassName);
        Util.reflow(nextElement);
        $$$1(activeElement).addClass(directionalClassName);
        $$$1(nextElement).addClass(directionalClassName);
        $$$1(activeElement).one(Util.TRANSITION_END, function () ***REMOVED***
          $$$1(nextElement).removeClass(directionalClassName + " " + orderClassName).addClass(ClassName.ACTIVE);
          $$$1(activeElement).removeClass(ClassName.ACTIVE + " " + orderClassName + " " + directionalClassName);
          _this3._isSliding = false;
          setTimeout(function () ***REMOVED***
            return $$$1(_this3._element).trigger(slidEvent);
          ***REMOVED***, 0);
        ***REMOVED***).emulateTransitionEnd(TRANSITION_DURATION);
      ***REMOVED*** else ***REMOVED***
        $$$1(activeElement).removeClass(ClassName.ACTIVE);
        $$$1(nextElement).addClass(ClassName.ACTIVE);
        this._isSliding = false;
        $$$1(this._element).trigger(slidEvent);
      ***REMOVED***

      if (isCycling) ***REMOVED***
        this.cycle();
      ***REMOVED***
    ***REMOVED***; // Static


    Carousel._jQueryInterface = function _jQueryInterface(config) ***REMOVED***
      return this.each(function () ***REMOVED***
        var data = $$$1(this).data(DATA_KEY);

        var _config = _extends(***REMOVED******REMOVED***, Default, $$$1(this).data());

        if (typeof config === 'object') ***REMOVED***
          _config = _extends(***REMOVED******REMOVED***, _config, config);
        ***REMOVED***

        var action = typeof config === 'string' ? config : _config.slide;

        if (!data) ***REMOVED***
          data = new Carousel(this, _config);
          $$$1(this).data(DATA_KEY, data);
        ***REMOVED***

        if (typeof config === 'number') ***REMOVED***
          data.to(config);
        ***REMOVED*** else if (typeof action === 'string') ***REMOVED***
          if (typeof data[action] === 'undefined') ***REMOVED***
            throw new TypeError("No method named \"" + action + "\"");
          ***REMOVED***

          data[action]();
        ***REMOVED*** else if (_config.interval) ***REMOVED***
          data.pause();
          data.cycle();
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***;

    Carousel._dataApiClickHandler = function _dataApiClickHandler(event) ***REMOVED***
      var selector = Util.getSelectorFromElement(this);

      if (!selector) ***REMOVED***
        return;
      ***REMOVED***

      var target = $$$1(selector)[0];

      if (!target || !$$$1(target).hasClass(ClassName.CAROUSEL)) ***REMOVED***
        return;
      ***REMOVED***

      var config = _extends(***REMOVED******REMOVED***, $$$1(target).data(), $$$1(this).data());
      var slideIndex = this.getAttribute('data-slide-to');

      if (slideIndex) ***REMOVED***
        config.interval = false;
      ***REMOVED***

      Carousel._jQueryInterface.call($$$1(target), config);

      if (slideIndex) ***REMOVED***
        $$$1(target).data(DATA_KEY).to(slideIndex);
      ***REMOVED***

      event.preventDefault();
    ***REMOVED***;

    _createClass(Carousel, null, [***REMOVED***
      key: "VERSION",
      get: function get() ***REMOVED***
        return VERSION;
      ***REMOVED***
    ***REMOVED***, ***REMOVED***
      key: "Default",
      get: function get() ***REMOVED***
        return Default;
      ***REMOVED***
    ***REMOVED***]);
    return Carousel;
  ***REMOVED***();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_SLIDE, Carousel._dataApiClickHandler);
  $$$1(window).on(Event.LOAD_DATA_API, function () ***REMOVED***
    $$$1(Selector.DATA_RIDE).each(function () ***REMOVED***
      var $carousel = $$$1(this);

      Carousel._jQueryInterface.call($carousel, $carousel.data());
    ***REMOVED***);
  ***REMOVED***);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $$$1.fn[NAME] = Carousel._jQueryInterface;
  $$$1.fn[NAME].Constructor = Carousel;

  $$$1.fn[NAME].noConflict = function () ***REMOVED***
    $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
    return Carousel._jQueryInterface;
  ***REMOVED***;

  return Carousel;
***REMOVED***($);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0): collapse.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Collapse = function ($$$1) ***REMOVED***
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = 'collapse';
  var VERSION = '4.0.0';
  var DATA_KEY = 'bs.collapse';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
  var TRANSITION_DURATION = 600;
  var Default = ***REMOVED***
    toggle: true,
    parent: ''
  ***REMOVED***;
  var DefaultType = ***REMOVED***
    toggle: 'boolean',
    parent: '(string|element)'
  ***REMOVED***;
  var Event = ***REMOVED***
    SHOW: "show" + EVENT_KEY,
    SHOWN: "shown" + EVENT_KEY,
    HIDE: "hide" + EVENT_KEY,
    HIDDEN: "hidden" + EVENT_KEY,
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
  ***REMOVED***;
  var ClassName = ***REMOVED***
    SHOW: 'show',
    COLLAPSE: 'collapse',
    COLLAPSING: 'collapsing',
    COLLAPSED: 'collapsed'
  ***REMOVED***;
  var Dimension = ***REMOVED***
    WIDTH: 'width',
    HEIGHT: 'height'
  ***REMOVED***;
  var Selector = ***REMOVED***
    ACTIVES: '.show, .collapsing',
    DATA_TOGGLE: '[data-toggle="collapse"]'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  ***REMOVED***;

  var Collapse =
  /*#__PURE__*/
  function () ***REMOVED***
    function Collapse(element, config) ***REMOVED***
      this._isTransitioning = false;
      this._element = element;
      this._config = this._getConfig(config);
      this._triggerArray = $$$1.makeArray($$$1("[data-toggle=\"collapse\"][href=\"#" + element.id + "\"]," + ("[data-toggle=\"collapse\"][data-target=\"#" + element.id + "\"]")));
      var tabToggles = $$$1(Selector.DATA_TOGGLE);

      for (var i = 0; i < tabToggles.length; i++) ***REMOVED***
        var elem = tabToggles[i];
        var selector = Util.getSelectorFromElement(elem);

        if (selector !== null && $$$1(selector).filter(element).length > 0) ***REMOVED***
          this._selector = selector;

          this._triggerArray.push(elem);
        ***REMOVED***
      ***REMOVED***

      this._parent = this._config.parent ? this._getParent() : null;

      if (!this._config.parent) ***REMOVED***
        this._addAriaAndCollapsedClass(this._element, this._triggerArray);
      ***REMOVED***

      if (this._config.toggle) ***REMOVED***
        this.toggle();
      ***REMOVED***
    ***REMOVED*** // Getters


    var _proto = Collapse.prototype;

    // Public
    _proto.toggle = function toggle() ***REMOVED***
      if ($$$1(this._element).hasClass(ClassName.SHOW)) ***REMOVED***
        this.hide();
      ***REMOVED*** else ***REMOVED***
        this.show();
      ***REMOVED***
    ***REMOVED***;

    _proto.show = function show() ***REMOVED***
      var _this = this;

      if (this._isTransitioning || $$$1(this._element).hasClass(ClassName.SHOW)) ***REMOVED***
        return;
      ***REMOVED***

      var actives;
      var activesData;

      if (this._parent) ***REMOVED***
        actives = $$$1.makeArray($$$1(this._parent).find(Selector.ACTIVES).filter("[data-parent=\"" + this._config.parent + "\"]"));

        if (actives.length === 0) ***REMOVED***
          actives = null;
        ***REMOVED***
      ***REMOVED***

      if (actives) ***REMOVED***
        activesData = $$$1(actives).not(this._selector).data(DATA_KEY);

        if (activesData && activesData._isTransitioning) ***REMOVED***
          return;
        ***REMOVED***
      ***REMOVED***

      var startEvent = $$$1.Event(Event.SHOW);
      $$$1(this._element).trigger(startEvent);

      if (startEvent.isDefaultPrevented()) ***REMOVED***
        return;
      ***REMOVED***

      if (actives) ***REMOVED***
        Collapse._jQueryInterface.call($$$1(actives).not(this._selector), 'hide');

        if (!activesData) ***REMOVED***
          $$$1(actives).data(DATA_KEY, null);
        ***REMOVED***
      ***REMOVED***

      var dimension = this._getDimension();

      $$$1(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);
      this._element.style[dimension] = 0;

      if (this._triggerArray.length > 0) ***REMOVED***
        $$$1(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
      ***REMOVED***

      this.setTransitioning(true);

      var complete = function complete() ***REMOVED***
        $$$1(_this._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.SHOW);
        _this._element.style[dimension] = '';

        _this.setTransitioning(false);

        $$$1(_this._element).trigger(Event.SHOWN);
      ***REMOVED***;

      if (!Util.supportsTransitionEnd()) ***REMOVED***
        complete();
        return;
      ***REMOVED***

      var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      var scrollSize = "scroll" + capitalizedDimension;
      $$$1(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
      this._element.style[dimension] = this._element[scrollSize] + "px";
    ***REMOVED***;

    _proto.hide = function hide() ***REMOVED***
      var _this2 = this;

      if (this._isTransitioning || !$$$1(this._element).hasClass(ClassName.SHOW)) ***REMOVED***
        return;
      ***REMOVED***

      var startEvent = $$$1.Event(Event.HIDE);
      $$$1(this._element).trigger(startEvent);

      if (startEvent.isDefaultPrevented()) ***REMOVED***
        return;
      ***REMOVED***

      var dimension = this._getDimension();

      this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
      Util.reflow(this._element);
      $$$1(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.SHOW);

      if (this._triggerArray.length > 0) ***REMOVED***
        for (var i = 0; i < this._triggerArray.length; i++) ***REMOVED***
          var trigger = this._triggerArray[i];
          var selector = Util.getSelectorFromElement(trigger);

          if (selector !== null) ***REMOVED***
            var $elem = $$$1(selector);

            if (!$elem.hasClass(ClassName.SHOW)) ***REMOVED***
              $$$1(trigger).addClass(ClassName.COLLAPSED).attr('aria-expanded', false);
            ***REMOVED***
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***

      this.setTransitioning(true);

      var complete = function complete() ***REMOVED***
        _this2.setTransitioning(false);

        $$$1(_this2._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
      ***REMOVED***;

      this._element.style[dimension] = '';

      if (!Util.supportsTransitionEnd()) ***REMOVED***
        complete();
        return;
      ***REMOVED***

      $$$1(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
    ***REMOVED***;

    _proto.setTransitioning = function setTransitioning(isTransitioning) ***REMOVED***
      this._isTransitioning = isTransitioning;
    ***REMOVED***;

    _proto.dispose = function dispose() ***REMOVED***
      $$$1.removeData(this._element, DATA_KEY);
      this._config = null;
      this._parent = null;
      this._element = null;
      this._triggerArray = null;
      this._isTransitioning = null;
    ***REMOVED***; // Private


    _proto._getConfig = function _getConfig(config) ***REMOVED***
      config = _extends(***REMOVED******REMOVED***, Default, config);
      config.toggle = Boolean(config.toggle); // Coerce string values

      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    ***REMOVED***;

    _proto._getDimension = function _getDimension() ***REMOVED***
      var hasWidth = $$$1(this._element).hasClass(Dimension.WIDTH);
      return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
    ***REMOVED***;

    _proto._getParent = function _getParent() ***REMOVED***
      var _this3 = this;

      var parent = null;

      if (Util.isElement(this._config.parent)) ***REMOVED***
        parent = this._config.parent; // It's a jQuery object

        if (typeof this._config.parent.jquery !== 'undefined') ***REMOVED***
          parent = this._config.parent[0];
        ***REMOVED***
      ***REMOVED*** else ***REMOVED***
        parent = $$$1(this._config.parent)[0];
      ***REMOVED***

      var selector = "[data-toggle=\"collapse\"][data-parent=\"" + this._config.parent + "\"]";
      $$$1(parent).find(selector).each(function (i, element) ***REMOVED***
        _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
      ***REMOVED***);
      return parent;
    ***REMOVED***;

    _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) ***REMOVED***
      if (element) ***REMOVED***
        var isOpen = $$$1(element).hasClass(ClassName.SHOW);

        if (triggerArray.length > 0) ***REMOVED***
          $$$1(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***; // Static


    Collapse._getTargetFromElement = function _getTargetFromElement(element) ***REMOVED***
      var selector = Util.getSelectorFromElement(element);
      return selector ? $$$1(selector)[0] : null;
    ***REMOVED***;

    Collapse._jQueryInterface = function _jQueryInterface(config) ***REMOVED***
      return this.each(function () ***REMOVED***
        var $this = $$$1(this);
        var data = $this.data(DATA_KEY);

        var _config = _extends(***REMOVED******REMOVED***, Default, $this.data(), typeof config === 'object' && config);

        if (!data && _config.toggle && /show|hide/.test(config)) ***REMOVED***
          _config.toggle = false;
        ***REMOVED***

        if (!data) ***REMOVED***
          data = new Collapse(this, _config);
          $this.data(DATA_KEY, data);
        ***REMOVED***

        if (typeof config === 'string') ***REMOVED***
          if (typeof data[config] === 'undefined') ***REMOVED***
            throw new TypeError("No method named \"" + config + "\"");
          ***REMOVED***

          data[config]();
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***;

    _createClass(Collapse, null, [***REMOVED***
      key: "VERSION",
      get: function get() ***REMOVED***
        return VERSION;
      ***REMOVED***
    ***REMOVED***, ***REMOVED***
      key: "Default",
      get: function get() ***REMOVED***
        return Default;
      ***REMOVED***
    ***REMOVED***]);
    return Collapse;
  ***REMOVED***();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) ***REMOVED***
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.currentTarget.tagName === 'A') ***REMOVED***
      event.preventDefault();
    ***REMOVED***

    var $trigger = $$$1(this);
    var selector = Util.getSelectorFromElement(this);
    $$$1(selector).each(function () ***REMOVED***
      var $target = $$$1(this);
      var data = $target.data(DATA_KEY);
      var config = data ? 'toggle' : $trigger.data();

      Collapse._jQueryInterface.call($target, config);
    ***REMOVED***);
  ***REMOVED***);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $$$1.fn[NAME] = Collapse._jQueryInterface;
  $$$1.fn[NAME].Constructor = Collapse;

  $$$1.fn[NAME].noConflict = function () ***REMOVED***
    $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
    return Collapse._jQueryInterface;
  ***REMOVED***;

  return Collapse;
***REMOVED***($);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0): modal.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Modal = function ($$$1) ***REMOVED***
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = 'modal';
  var VERSION = '4.0.0';
  var DATA_KEY = 'bs.modal';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
  var TRANSITION_DURATION = 300;
  var BACKDROP_TRANSITION_DURATION = 150;
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

  var Default = ***REMOVED***
    backdrop: true,
    keyboard: true,
    focus: true,
    show: true
  ***REMOVED***;
  var DefaultType = ***REMOVED***
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean',
    show: 'boolean'
  ***REMOVED***;
  var Event = ***REMOVED***
    HIDE: "hide" + EVENT_KEY,
    HIDDEN: "hidden" + EVENT_KEY,
    SHOW: "show" + EVENT_KEY,
    SHOWN: "shown" + EVENT_KEY,
    FOCUSIN: "focusin" + EVENT_KEY,
    RESIZE: "resize" + EVENT_KEY,
    CLICK_DISMISS: "click.dismiss" + EVENT_KEY,
    KEYDOWN_DISMISS: "keydown.dismiss" + EVENT_KEY,
    MOUSEUP_DISMISS: "mouseup.dismiss" + EVENT_KEY,
    MOUSEDOWN_DISMISS: "mousedown.dismiss" + EVENT_KEY,
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
  ***REMOVED***;
  var ClassName = ***REMOVED***
    SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
    BACKDROP: 'modal-backdrop',
    OPEN: 'modal-open',
    FADE: 'fade',
    SHOW: 'show'
  ***REMOVED***;
  var Selector = ***REMOVED***
    DIALOG: '.modal-dialog',
    DATA_TOGGLE: '[data-toggle="modal"]',
    DATA_DISMISS: '[data-dismiss="modal"]',
    FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
    STICKY_CONTENT: '.sticky-top',
    NAVBAR_TOGGLER: '.navbar-toggler'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  ***REMOVED***;

  var Modal =
  /*#__PURE__*/
  function () ***REMOVED***
    function Modal(element, config) ***REMOVED***
      this._config = this._getConfig(config);
      this._element = element;
      this._dialog = $$$1(element).find(Selector.DIALOG)[0];
      this._backdrop = null;
      this._isShown = false;
      this._isBodyOverflowing = false;
      this._ignoreBackdropClick = false;
      this._originalBodyPadding = 0;
      this._scrollbarWidth = 0;
    ***REMOVED*** // Getters


    var _proto = Modal.prototype;

    // Public
    _proto.toggle = function toggle(relatedTarget) ***REMOVED***
      return this._isShown ? this.hide() : this.show(relatedTarget);
    ***REMOVED***;

    _proto.show = function show(relatedTarget) ***REMOVED***
      var _this = this;

      if (this._isTransitioning || this._isShown) ***REMOVED***
        return;
      ***REMOVED***

      if (Util.supportsTransitionEnd() && $$$1(this._element).hasClass(ClassName.FADE)) ***REMOVED***
        this._isTransitioning = true;
      ***REMOVED***

      var showEvent = $$$1.Event(Event.SHOW, ***REMOVED***
        relatedTarget: relatedTarget
      ***REMOVED***);
      $$$1(this._element).trigger(showEvent);

      if (this._isShown || showEvent.isDefaultPrevented()) ***REMOVED***
        return;
      ***REMOVED***

      this._isShown = true;

      this._checkScrollbar();

      this._setScrollbar();

      this._adjustDialog();

      $$$1(document.body).addClass(ClassName.OPEN);

      this._setEscapeEvent();

      this._setResizeEvent();

      $$$1(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, function (event) ***REMOVED***
        return _this.hide(event);
      ***REMOVED***);
      $$$1(this._dialog).on(Event.MOUSEDOWN_DISMISS, function () ***REMOVED***
        $$$1(_this._element).one(Event.MOUSEUP_DISMISS, function (event) ***REMOVED***
          if ($$$1(event.target).is(_this._element)) ***REMOVED***
            _this._ignoreBackdropClick = true;
          ***REMOVED***
        ***REMOVED***);
      ***REMOVED***);

      this._showBackdrop(function () ***REMOVED***
        return _this._showElement(relatedTarget);
      ***REMOVED***);
    ***REMOVED***;

    _proto.hide = function hide(event) ***REMOVED***
      var _this2 = this;

      if (event) ***REMOVED***
        event.preventDefault();
      ***REMOVED***

      if (this._isTransitioning || !this._isShown) ***REMOVED***
        return;
      ***REMOVED***

      var hideEvent = $$$1.Event(Event.HIDE);
      $$$1(this._element).trigger(hideEvent);

      if (!this._isShown || hideEvent.isDefaultPrevented()) ***REMOVED***
        return;
      ***REMOVED***

      this._isShown = false;
      var transition = Util.supportsTransitionEnd() && $$$1(this._element).hasClass(ClassName.FADE);

      if (transition) ***REMOVED***
        this._isTransitioning = true;
      ***REMOVED***

      this._setEscapeEvent();

      this._setResizeEvent();

      $$$1(document).off(Event.FOCUSIN);
      $$$1(this._element).removeClass(ClassName.SHOW);
      $$$1(this._element).off(Event.CLICK_DISMISS);
      $$$1(this._dialog).off(Event.MOUSEDOWN_DISMISS);

      if (transition) ***REMOVED***
        $$$1(this._element).one(Util.TRANSITION_END, function (event) ***REMOVED***
          return _this2._hideModal(event);
        ***REMOVED***).emulateTransitionEnd(TRANSITION_DURATION);
      ***REMOVED*** else ***REMOVED***
        this._hideModal();
      ***REMOVED***
    ***REMOVED***;

    _proto.dispose = function dispose() ***REMOVED***
      $$$1.removeData(this._element, DATA_KEY);
      $$$1(window, document, this._element, this._backdrop).off(EVENT_KEY);
      this._config = null;
      this._element = null;
      this._dialog = null;
      this._backdrop = null;
      this._isShown = null;
      this._isBodyOverflowing = null;
      this._ignoreBackdropClick = null;
      this._scrollbarWidth = null;
    ***REMOVED***;

    _proto.handleUpdate = function handleUpdate() ***REMOVED***
      this._adjustDialog();
    ***REMOVED***; // Private


    _proto._getConfig = function _getConfig(config) ***REMOVED***
      config = _extends(***REMOVED******REMOVED***, Default, config);
      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    ***REMOVED***;

    _proto._showElement = function _showElement(relatedTarget) ***REMOVED***
      var _this3 = this;

      var transition = Util.supportsTransitionEnd() && $$$1(this._element).hasClass(ClassName.FADE);

      if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) ***REMOVED***
        // Don't move modal's DOM position
        document.body.appendChild(this._element);
      ***REMOVED***

      this._element.style.display = 'block';

      this._element.removeAttribute('aria-hidden');

      this._element.scrollTop = 0;

      if (transition) ***REMOVED***
        Util.reflow(this._element);
      ***REMOVED***

      $$$1(this._element).addClass(ClassName.SHOW);

      if (this._config.focus) ***REMOVED***
        this._enforceFocus();
      ***REMOVED***

      var shownEvent = $$$1.Event(Event.SHOWN, ***REMOVED***
        relatedTarget: relatedTarget
      ***REMOVED***);

      var transitionComplete = function transitionComplete() ***REMOVED***
        if (_this3._config.focus) ***REMOVED***
          _this3._element.focus();
        ***REMOVED***

        _this3._isTransitioning = false;
        $$$1(_this3._element).trigger(shownEvent);
      ***REMOVED***;

      if (transition) ***REMOVED***
        $$$1(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(TRANSITION_DURATION);
      ***REMOVED*** else ***REMOVED***
        transitionComplete();
      ***REMOVED***
    ***REMOVED***;

    _proto._enforceFocus = function _enforceFocus() ***REMOVED***
      var _this4 = this;

      $$$1(document).off(Event.FOCUSIN) // Guard against infinite focus loop
      .on(Event.FOCUSIN, function (event) ***REMOVED***
        if (document !== event.target && _this4._element !== event.target && $$$1(_this4._element).has(event.target).length === 0) ***REMOVED***
          _this4._element.focus();
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***;

    _proto._setEscapeEvent = function _setEscapeEvent() ***REMOVED***
      var _this5 = this;

      if (this._isShown && this._config.keyboard) ***REMOVED***
        $$$1(this._element).on(Event.KEYDOWN_DISMISS, function (event) ***REMOVED***
          if (event.which === ESCAPE_KEYCODE) ***REMOVED***
            event.preventDefault();

            _this5.hide();
          ***REMOVED***
        ***REMOVED***);
      ***REMOVED*** else if (!this._isShown) ***REMOVED***
        $$$1(this._element).off(Event.KEYDOWN_DISMISS);
      ***REMOVED***
    ***REMOVED***;

    _proto._setResizeEvent = function _setResizeEvent() ***REMOVED***
      var _this6 = this;

      if (this._isShown) ***REMOVED***
        $$$1(window).on(Event.RESIZE, function (event) ***REMOVED***
          return _this6.handleUpdate(event);
        ***REMOVED***);
      ***REMOVED*** else ***REMOVED***
        $$$1(window).off(Event.RESIZE);
      ***REMOVED***
    ***REMOVED***;

    _proto._hideModal = function _hideModal() ***REMOVED***
      var _this7 = this;

      this._element.style.display = 'none';

      this._element.setAttribute('aria-hidden', true);

      this._isTransitioning = false;

      this._showBackdrop(function () ***REMOVED***
        $$$1(document.body).removeClass(ClassName.OPEN);

        _this7._resetAdjustments();

        _this7._resetScrollbar();

        $$$1(_this7._element).trigger(Event.HIDDEN);
      ***REMOVED***);
    ***REMOVED***;

    _proto._removeBackdrop = function _removeBackdrop() ***REMOVED***
      if (this._backdrop) ***REMOVED***
        $$$1(this._backdrop).remove();
        this._backdrop = null;
      ***REMOVED***
    ***REMOVED***;

    _proto._showBackdrop = function _showBackdrop(callback) ***REMOVED***
      var _this8 = this;

      var animate = $$$1(this._element).hasClass(ClassName.FADE) ? ClassName.FADE : '';

      if (this._isShown && this._config.backdrop) ***REMOVED***
        var doAnimate = Util.supportsTransitionEnd() && animate;
        this._backdrop = document.createElement('div');
        this._backdrop.className = ClassName.BACKDROP;

        if (animate) ***REMOVED***
          $$$1(this._backdrop).addClass(animate);
        ***REMOVED***

        $$$1(this._backdrop).appendTo(document.body);
        $$$1(this._element).on(Event.CLICK_DISMISS, function (event) ***REMOVED***
          if (_this8._ignoreBackdropClick) ***REMOVED***
            _this8._ignoreBackdropClick = false;
            return;
          ***REMOVED***

          if (event.target !== event.currentTarget) ***REMOVED***
            return;
          ***REMOVED***

          if (_this8._config.backdrop === 'static') ***REMOVED***
            _this8._element.focus();
          ***REMOVED*** else ***REMOVED***
            _this8.hide();
          ***REMOVED***
        ***REMOVED***);

        if (doAnimate) ***REMOVED***
          Util.reflow(this._backdrop);
        ***REMOVED***

        $$$1(this._backdrop).addClass(ClassName.SHOW);

        if (!callback) ***REMOVED***
          return;
        ***REMOVED***

        if (!doAnimate) ***REMOVED***
          callback();
          return;
        ***REMOVED***

        $$$1(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
      ***REMOVED*** else if (!this._isShown && this._backdrop) ***REMOVED***
        $$$1(this._backdrop).removeClass(ClassName.SHOW);

        var callbackRemove = function callbackRemove() ***REMOVED***
          _this8._removeBackdrop();

          if (callback) ***REMOVED***
            callback();
          ***REMOVED***
        ***REMOVED***;

        if (Util.supportsTransitionEnd() && $$$1(this._element).hasClass(ClassName.FADE)) ***REMOVED***
          $$$1(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
        ***REMOVED*** else ***REMOVED***
          callbackRemove();
        ***REMOVED***
      ***REMOVED*** else if (callback) ***REMOVED***
        callback();
      ***REMOVED***
    ***REMOVED***; // ----------------------------------------------------------------------
    // the following methods are used to handle overflowing modals
    // todo (fat): these should probably be refactored out of modal.js
    // ----------------------------------------------------------------------


    _proto._adjustDialog = function _adjustDialog() ***REMOVED***
      var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      if (!this._isBodyOverflowing && isModalOverflowing) ***REMOVED***
        this._element.style.paddingLeft = this._scrollbarWidth + "px";
      ***REMOVED***

      if (this._isBodyOverflowing && !isModalOverflowing) ***REMOVED***
        this._element.style.paddingRight = this._scrollbarWidth + "px";
      ***REMOVED***
    ***REMOVED***;

    _proto._resetAdjustments = function _resetAdjustments() ***REMOVED***
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    ***REMOVED***;

    _proto._checkScrollbar = function _checkScrollbar() ***REMOVED***
      var rect = document.body.getBoundingClientRect();
      this._isBodyOverflowing = rect.left + rect.right < window.innerWidth;
      this._scrollbarWidth = this._getScrollbarWidth();
    ***REMOVED***;

    _proto._setScrollbar = function _setScrollbar() ***REMOVED***
      var _this9 = this;

      if (this._isBodyOverflowing) ***REMOVED***
        // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
        //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
        // Adjust fixed content padding
        $$$1(Selector.FIXED_CONTENT).each(function (index, element) ***REMOVED***
          var actualPadding = $$$1(element)[0].style.paddingRight;
          var calculatedPadding = $$$1(element).css('padding-right');
          $$$1(element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this9._scrollbarWidth + "px");
        ***REMOVED***); // Adjust sticky content margin

        $$$1(Selector.STICKY_CONTENT).each(function (index, element) ***REMOVED***
          var actualMargin = $$$1(element)[0].style.marginRight;
          var calculatedMargin = $$$1(element).css('margin-right');
          $$$1(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) - _this9._scrollbarWidth + "px");
        ***REMOVED***); // Adjust navbar-toggler margin

        $$$1(Selector.NAVBAR_TOGGLER).each(function (index, element) ***REMOVED***
          var actualMargin = $$$1(element)[0].style.marginRight;
          var calculatedMargin = $$$1(element).css('margin-right');
          $$$1(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) + _this9._scrollbarWidth + "px");
        ***REMOVED***); // Adjust body padding

        var actualPadding = document.body.style.paddingRight;
        var calculatedPadding = $$$1('body').css('padding-right');
        $$$1('body').data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + "px");
      ***REMOVED***
    ***REMOVED***;

    _proto._resetScrollbar = function _resetScrollbar() ***REMOVED***
      // Restore fixed content padding
      $$$1(Selector.FIXED_CONTENT).each(function (index, element) ***REMOVED***
        var padding = $$$1(element).data('padding-right');

        if (typeof padding !== 'undefined') ***REMOVED***
          $$$1(element).css('padding-right', padding).removeData('padding-right');
        ***REMOVED***
      ***REMOVED***); // Restore sticky content and navbar-toggler margin

      $$$1(Selector.STICKY_CONTENT + ", " + Selector.NAVBAR_TOGGLER).each(function (index, element) ***REMOVED***
        var margin = $$$1(element).data('margin-right');

        if (typeof margin !== 'undefined') ***REMOVED***
          $$$1(element).css('margin-right', margin).removeData('margin-right');
        ***REMOVED***
      ***REMOVED***); // Restore body padding

      var padding = $$$1('body').data('padding-right');

      if (typeof padding !== 'undefined') ***REMOVED***
        $$$1('body').css('padding-right', padding).removeData('padding-right');
      ***REMOVED***
    ***REMOVED***;

    _proto._getScrollbarWidth = function _getScrollbarWidth() ***REMOVED***
      // thx d.walsh
      var scrollDiv = document.createElement('div');
      scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
      document.body.appendChild(scrollDiv);
      var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      return scrollbarWidth;
    ***REMOVED***; // Static


    Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) ***REMOVED***
      return this.each(function () ***REMOVED***
        var data = $$$1(this).data(DATA_KEY);

        var _config = _extends(***REMOVED******REMOVED***, Modal.Default, $$$1(this).data(), typeof config === 'object' && config);

        if (!data) ***REMOVED***
          data = new Modal(this, _config);
          $$$1(this).data(DATA_KEY, data);
        ***REMOVED***

        if (typeof config === 'string') ***REMOVED***
          if (typeof data[config] === 'undefined') ***REMOVED***
            throw new TypeError("No method named \"" + config + "\"");
          ***REMOVED***

          data[config](relatedTarget);
        ***REMOVED*** else if (_config.show) ***REMOVED***
          data.show(relatedTarget);
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***;

    _createClass(Modal, null, [***REMOVED***
      key: "VERSION",
      get: function get() ***REMOVED***
        return VERSION;
      ***REMOVED***
    ***REMOVED***, ***REMOVED***
      key: "Default",
      get: function get() ***REMOVED***
        return Default;
      ***REMOVED***
    ***REMOVED***]);
    return Modal;
  ***REMOVED***();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) ***REMOVED***
    var _this10 = this;

    var target;
    var selector = Util.getSelectorFromElement(this);

    if (selector) ***REMOVED***
      target = $$$1(selector)[0];
    ***REMOVED***

    var config = $$$1(target).data(DATA_KEY) ? 'toggle' : _extends(***REMOVED******REMOVED***, $$$1(target).data(), $$$1(this).data());

    if (this.tagName === 'A' || this.tagName === 'AREA') ***REMOVED***
      event.preventDefault();
    ***REMOVED***

    var $target = $$$1(target).one(Event.SHOW, function (showEvent) ***REMOVED***
      if (showEvent.isDefaultPrevented()) ***REMOVED***
        // Only register focus restorer if modal will actually get shown
        return;
      ***REMOVED***

      $target.one(Event.HIDDEN, function () ***REMOVED***
        if ($$$1(_this10).is(':visible')) ***REMOVED***
          _this10.focus();
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***);

    Modal._jQueryInterface.call($$$1(target), config, this);
  ***REMOVED***);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $$$1.fn[NAME] = Modal._jQueryInterface;
  $$$1.fn[NAME].Constructor = Modal;

  $$$1.fn[NAME].noConflict = function () ***REMOVED***
    $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
    return Modal._jQueryInterface;
  ***REMOVED***;

  return Modal;
***REMOVED***($);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0): tooltip.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Tooltip = function ($$$1) ***REMOVED***
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = 'tooltip';
  var VERSION = '4.0.0';
  var DATA_KEY = 'bs.tooltip';
  var EVENT_KEY = "." + DATA_KEY;
  var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
  var TRANSITION_DURATION = 150;
  var CLASS_PREFIX = 'bs-tooltip';
  var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
  var DefaultType = ***REMOVED***
    animation: 'boolean',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string',
    delay: '(number|object)',
    html: 'boolean',
    selector: '(string|boolean)',
    placement: '(string|function)',
    offset: '(number|string)',
    container: '(string|element|boolean)',
    fallbackPlacement: '(string|array)',
    boundary: '(string|element)'
  ***REMOVED***;
  var AttachmentMap = ***REMOVED***
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    LEFT: 'left'
  ***REMOVED***;
  var Default = ***REMOVED***
    animation: true,
    template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    selector: false,
    placement: 'top',
    offset: 0,
    container: false,
    fallbackPlacement: 'flip',
    boundary: 'scrollParent'
  ***REMOVED***;
  var HoverState = ***REMOVED***
    SHOW: 'show',
    OUT: 'out'
  ***REMOVED***;
  var Event = ***REMOVED***
    HIDE: "hide" + EVENT_KEY,
    HIDDEN: "hidden" + EVENT_KEY,
    SHOW: "show" + EVENT_KEY,
    SHOWN: "shown" + EVENT_KEY,
    INSERTED: "inserted" + EVENT_KEY,
    CLICK: "click" + EVENT_KEY,
    FOCUSIN: "focusin" + EVENT_KEY,
    FOCUSOUT: "focusout" + EVENT_KEY,
    MOUSEENTER: "mouseenter" + EVENT_KEY,
    MOUSELEAVE: "mouseleave" + EVENT_KEY
  ***REMOVED***;
  var ClassName = ***REMOVED***
    FADE: 'fade',
    SHOW: 'show'
  ***REMOVED***;
  var Selector = ***REMOVED***
    TOOLTIP: '.tooltip',
    TOOLTIP_INNER: '.tooltip-inner',
    ARROW: '.arrow'
  ***REMOVED***;
  var Trigger = ***REMOVED***
    HOVER: 'hover',
    FOCUS: 'focus',
    CLICK: 'click',
    MANUAL: 'manual'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  ***REMOVED***;

  var Tooltip =
  /*#__PURE__*/
  function () ***REMOVED***
    function Tooltip(element, config) ***REMOVED***
      /**
       * Check for Popper dependency
       * Popper - https://popper.js.org
       */
      if (typeof Popper$1 === 'undefined') ***REMOVED***
        throw new TypeError('Bootstrap tooltips require Popper.js (https://popper.js.org)');
      ***REMOVED*** // private


      this._isEnabled = true;
      this._timeout = 0;
      this._hoverState = '';
      this._activeTrigger = ***REMOVED******REMOVED***;
      this._popper = null; // Protected

      this.element = element;
      this.config = this._getConfig(config);
      this.tip = null;

      this._setListeners();
    ***REMOVED*** // Getters


    var _proto = Tooltip.prototype;

    // Public
    _proto.enable = function enable() ***REMOVED***
      this._isEnabled = true;
    ***REMOVED***;

    _proto.disable = function disable() ***REMOVED***
      this._isEnabled = false;
    ***REMOVED***;

    _proto.toggleEnabled = function toggleEnabled() ***REMOVED***
      this._isEnabled = !this._isEnabled;
    ***REMOVED***;

    _proto.toggle = function toggle(event) ***REMOVED***
      if (!this._isEnabled) ***REMOVED***
        return;
      ***REMOVED***

      if (event) ***REMOVED***
        var dataKey = this.constructor.DATA_KEY;
        var context = $$$1(event.currentTarget).data(dataKey);

        if (!context) ***REMOVED***
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $$$1(event.currentTarget).data(dataKey, context);
        ***REMOVED***

        context._activeTrigger.click = !context._activeTrigger.click;

        if (context._isWithActiveTrigger()) ***REMOVED***
          context._enter(null, context);
        ***REMOVED*** else ***REMOVED***
          context._leave(null, context);
        ***REMOVED***
      ***REMOVED*** else ***REMOVED***
        if ($$$1(this.getTipElement()).hasClass(ClassName.SHOW)) ***REMOVED***
          this._leave(null, this);

          return;
        ***REMOVED***

        this._enter(null, this);
      ***REMOVED***
    ***REMOVED***;

    _proto.dispose = function dispose() ***REMOVED***
      clearTimeout(this._timeout);
      $$$1.removeData(this.element, this.constructor.DATA_KEY);
      $$$1(this.element).off(this.constructor.EVENT_KEY);
      $$$1(this.element).closest('.modal').off('hide.bs.modal');

      if (this.tip) ***REMOVED***
        $$$1(this.tip).remove();
      ***REMOVED***

      this._isEnabled = null;
      this._timeout = null;
      this._hoverState = null;
      this._activeTrigger = null;

      if (this._popper !== null) ***REMOVED***
        this._popper.destroy();
      ***REMOVED***

      this._popper = null;
      this.element = null;
      this.config = null;
      this.tip = null;
    ***REMOVED***;

    _proto.show = function show() ***REMOVED***
      var _this = this;

      if ($$$1(this.element).css('display') === 'none') ***REMOVED***
        throw new Error('Please use show on visible elements');
      ***REMOVED***

      var showEvent = $$$1.Event(this.constructor.Event.SHOW);

      if (this.isWithContent() && this._isEnabled) ***REMOVED***
        $$$1(this.element).trigger(showEvent);
        var isInTheDom = $$$1.contains(this.element.ownerDocument.documentElement, this.element);

        if (showEvent.isDefaultPrevented() || !isInTheDom) ***REMOVED***
          return;
        ***REMOVED***

        var tip = this.getTipElement();
        var tipId = Util.getUID(this.constructor.NAME);
        tip.setAttribute('id', tipId);
        this.element.setAttribute('aria-describedby', tipId);
        this.setContent();

        if (this.config.animation) ***REMOVED***
          $$$1(tip).addClass(ClassName.FADE);
        ***REMOVED***

        var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

        var attachment = this._getAttachment(placement);

        this.addAttachmentClass(attachment);
        var container = this.config.container === false ? document.body : $$$1(this.config.container);
        $$$1(tip).data(this.constructor.DATA_KEY, this);

        if (!$$$1.contains(this.element.ownerDocument.documentElement, this.tip)) ***REMOVED***
          $$$1(tip).appendTo(container);
        ***REMOVED***

        $$$1(this.element).trigger(this.constructor.Event.INSERTED);
        this._popper = new Popper$1(this.element, tip, ***REMOVED***
          placement: attachment,
          modifiers: ***REMOVED***
            offset: ***REMOVED***
              offset: this.config.offset
            ***REMOVED***,
            flip: ***REMOVED***
              behavior: this.config.fallbackPlacement
            ***REMOVED***,
            arrow: ***REMOVED***
              element: Selector.ARROW
            ***REMOVED***,
            preventOverflow: ***REMOVED***
              boundariesElement: this.config.boundary
            ***REMOVED***
          ***REMOVED***,
          onCreate: function onCreate(data) ***REMOVED***
            if (data.originalPlacement !== data.placement) ***REMOVED***
              _this._handlePopperPlacementChange(data);
            ***REMOVED***
          ***REMOVED***,
          onUpdate: function onUpdate(data) ***REMOVED***
            _this._handlePopperPlacementChange(data);
          ***REMOVED***
        ***REMOVED***);
        $$$1(tip).addClass(ClassName.SHOW); // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

        if ('ontouchstart' in document.documentElement) ***REMOVED***
          $$$1('body').children().on('mouseover', null, $$$1.noop);
        ***REMOVED***

        var complete = function complete() ***REMOVED***
          if (_this.config.animation) ***REMOVED***
            _this._fixTransition();
          ***REMOVED***

          var prevHoverState = _this._hoverState;
          _this._hoverState = null;
          $$$1(_this.element).trigger(_this.constructor.Event.SHOWN);

          if (prevHoverState === HoverState.OUT) ***REMOVED***
            _this._leave(null, _this);
          ***REMOVED***
        ***REMOVED***;

        if (Util.supportsTransitionEnd() && $$$1(this.tip).hasClass(ClassName.FADE)) ***REMOVED***
          $$$1(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(Tooltip._TRANSITION_DURATION);
        ***REMOVED*** else ***REMOVED***
          complete();
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***;

    _proto.hide = function hide(callback) ***REMOVED***
      var _this2 = this;

      var tip = this.getTipElement();
      var hideEvent = $$$1.Event(this.constructor.Event.HIDE);

      var complete = function complete() ***REMOVED***
        if (_this2._hoverState !== HoverState.SHOW && tip.parentNode) ***REMOVED***
          tip.parentNode.removeChild(tip);
        ***REMOVED***

        _this2._cleanTipClass();

        _this2.element.removeAttribute('aria-describedby');

        $$$1(_this2.element).trigger(_this2.constructor.Event.HIDDEN);

        if (_this2._popper !== null) ***REMOVED***
          _this2._popper.destroy();
        ***REMOVED***

        if (callback) ***REMOVED***
          callback();
        ***REMOVED***
      ***REMOVED***;

      $$$1(this.element).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) ***REMOVED***
        return;
      ***REMOVED***

      $$$1(tip).removeClass(ClassName.SHOW); // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support

      if ('ontouchstart' in document.documentElement) ***REMOVED***
        $$$1('body').children().off('mouseover', null, $$$1.noop);
      ***REMOVED***

      this._activeTrigger[Trigger.CLICK] = false;
      this._activeTrigger[Trigger.FOCUS] = false;
      this._activeTrigger[Trigger.HOVER] = false;

      if (Util.supportsTransitionEnd() && $$$1(this.tip).hasClass(ClassName.FADE)) ***REMOVED***
        $$$1(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
      ***REMOVED*** else ***REMOVED***
        complete();
      ***REMOVED***

      this._hoverState = '';
    ***REMOVED***;

    _proto.update = function update() ***REMOVED***
      if (this._popper !== null) ***REMOVED***
        this._popper.scheduleUpdate();
      ***REMOVED***
    ***REMOVED***; // Protected


    _proto.isWithContent = function isWithContent() ***REMOVED***
      return Boolean(this.getTitle());
    ***REMOVED***;

    _proto.addAttachmentClass = function addAttachmentClass(attachment) ***REMOVED***
      $$$1(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
    ***REMOVED***;

    _proto.getTipElement = function getTipElement() ***REMOVED***
      this.tip = this.tip || $$$1(this.config.template)[0];
      return this.tip;
    ***REMOVED***;

    _proto.setContent = function setContent() ***REMOVED***
      var $tip = $$$1(this.getTipElement());
      this.setElementContent($tip.find(Selector.TOOLTIP_INNER), this.getTitle());
      $tip.removeClass(ClassName.FADE + " " + ClassName.SHOW);
    ***REMOVED***;

    _proto.setElementContent = function setElementContent($element, content) ***REMOVED***
      var html = this.config.html;

      if (typeof content === 'object' && (content.nodeType || content.jquery)) ***REMOVED***
        // Content is a DOM node or a jQuery
        if (html) ***REMOVED***
          if (!$$$1(content).parent().is($element)) ***REMOVED***
            $element.empty().append(content);
          ***REMOVED***
        ***REMOVED*** else ***REMOVED***
          $element.text($$$1(content).text());
        ***REMOVED***
      ***REMOVED*** else ***REMOVED***
        $element[html ? 'html' : 'text'](content);
      ***REMOVED***
    ***REMOVED***;

    _proto.getTitle = function getTitle() ***REMOVED***
      var title = this.element.getAttribute('data-original-title');

      if (!title) ***REMOVED***
        title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
      ***REMOVED***

      return title;
    ***REMOVED***; // Private


    _proto._getAttachment = function _getAttachment(placement) ***REMOVED***
      return AttachmentMap[placement.toUpperCase()];
    ***REMOVED***;

    _proto._setListeners = function _setListeners() ***REMOVED***
      var _this3 = this;

      var triggers = this.config.trigger.split(' ');
      triggers.forEach(function (trigger) ***REMOVED***
        if (trigger === 'click') ***REMOVED***
          $$$1(_this3.element).on(_this3.constructor.Event.CLICK, _this3.config.selector, function (event) ***REMOVED***
            return _this3.toggle(event);
          ***REMOVED***);
        ***REMOVED*** else if (trigger !== Trigger.MANUAL) ***REMOVED***
          var eventIn = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSEENTER : _this3.constructor.Event.FOCUSIN;
          var eventOut = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSELEAVE : _this3.constructor.Event.FOCUSOUT;
          $$$1(_this3.element).on(eventIn, _this3.config.selector, function (event) ***REMOVED***
            return _this3._enter(event);
          ***REMOVED***).on(eventOut, _this3.config.selector, function (event) ***REMOVED***
            return _this3._leave(event);
          ***REMOVED***);
        ***REMOVED***

        $$$1(_this3.element).closest('.modal').on('hide.bs.modal', function () ***REMOVED***
          return _this3.hide();
        ***REMOVED***);
      ***REMOVED***);

      if (this.config.selector) ***REMOVED***
        this.config = _extends(***REMOVED******REMOVED***, this.config, ***REMOVED***
          trigger: 'manual',
          selector: ''
        ***REMOVED***);
      ***REMOVED*** else ***REMOVED***
        this._fixTitle();
      ***REMOVED***
    ***REMOVED***;

    _proto._fixTitle = function _fixTitle() ***REMOVED***
      var titleType = typeof this.element.getAttribute('data-original-title');

      if (this.element.getAttribute('title') || titleType !== 'string') ***REMOVED***
        this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
        this.element.setAttribute('title', '');
      ***REMOVED***
    ***REMOVED***;

    _proto._enter = function _enter(event, context) ***REMOVED***
      var dataKey = this.constructor.DATA_KEY;
      context = context || $$$1(event.currentTarget).data(dataKey);

      if (!context) ***REMOVED***
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $$$1(event.currentTarget).data(dataKey, context);
      ***REMOVED***

      if (event) ***REMOVED***
        context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
      ***REMOVED***

      if ($$$1(context.getTipElement()).hasClass(ClassName.SHOW) || context._hoverState === HoverState.SHOW) ***REMOVED***
        context._hoverState = HoverState.SHOW;
        return;
      ***REMOVED***

      clearTimeout(context._timeout);
      context._hoverState = HoverState.SHOW;

      if (!context.config.delay || !context.config.delay.show) ***REMOVED***
        context.show();
        return;
      ***REMOVED***

      context._timeout = setTimeout(function () ***REMOVED***
        if (context._hoverState === HoverState.SHOW) ***REMOVED***
          context.show();
        ***REMOVED***
      ***REMOVED***, context.config.delay.show);
    ***REMOVED***;

    _proto._leave = function _leave(event, context) ***REMOVED***
      var dataKey = this.constructor.DATA_KEY;
      context = context || $$$1(event.currentTarget).data(dataKey);

      if (!context) ***REMOVED***
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $$$1(event.currentTarget).data(dataKey, context);
      ***REMOVED***

      if (event) ***REMOVED***
        context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
      ***REMOVED***

      if (context._isWithActiveTrigger()) ***REMOVED***
        return;
      ***REMOVED***

      clearTimeout(context._timeout);
      context._hoverState = HoverState.OUT;

      if (!context.config.delay || !context.config.delay.hide) ***REMOVED***
        context.hide();
        return;
      ***REMOVED***

      context._timeout = setTimeout(function () ***REMOVED***
        if (context._hoverState === HoverState.OUT) ***REMOVED***
          context.hide();
        ***REMOVED***
      ***REMOVED***, context.config.delay.hide);
    ***REMOVED***;

    _proto._isWithActiveTrigger = function _isWithActiveTrigger() ***REMOVED***
      for (var trigger in this._activeTrigger) ***REMOVED***
        if (this._activeTrigger[trigger]) ***REMOVED***
          return true;
        ***REMOVED***
      ***REMOVED***

      return false;
    ***REMOVED***;

    _proto._getConfig = function _getConfig(config) ***REMOVED***
      config = _extends(***REMOVED******REMOVED***, this.constructor.Default, $$$1(this.element).data(), config);

      if (typeof config.delay === 'number') ***REMOVED***
        config.delay = ***REMOVED***
          show: config.delay,
          hide: config.delay
        ***REMOVED***;
      ***REMOVED***

      if (typeof config.title === 'number') ***REMOVED***
        config.title = config.title.toString();
      ***REMOVED***

      if (typeof config.content === 'number') ***REMOVED***
        config.content = config.content.toString();
      ***REMOVED***

      Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);
      return config;
    ***REMOVED***;

    _proto._getDelegateConfig = function _getDelegateConfig() ***REMOVED***
      var config = ***REMOVED******REMOVED***;

      if (this.config) ***REMOVED***
        for (var key in this.config) ***REMOVED***
          if (this.constructor.Default[key] !== this.config[key]) ***REMOVED***
            config[key] = this.config[key];
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***

      return config;
    ***REMOVED***;

    _proto._cleanTipClass = function _cleanTipClass() ***REMOVED***
      var $tip = $$$1(this.getTipElement());
      var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

      if (tabClass !== null && tabClass.length > 0) ***REMOVED***
        $tip.removeClass(tabClass.join(''));
      ***REMOVED***
    ***REMOVED***;

    _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(data) ***REMOVED***
      this._cleanTipClass();

      this.addAttachmentClass(this._getAttachment(data.placement));
    ***REMOVED***;

    _proto._fixTransition = function _fixTransition() ***REMOVED***
      var tip = this.getTipElement();
      var initConfigAnimation = this.config.animation;

      if (tip.getAttribute('x-placement') !== null) ***REMOVED***
        return;
      ***REMOVED***

      $$$1(tip).removeClass(ClassName.FADE);
      this.config.animation = false;
      this.hide();
      this.show();
      this.config.animation = initConfigAnimation;
    ***REMOVED***; // Static


    Tooltip._jQueryInterface = function _jQueryInterface(config) ***REMOVED***
      return this.each(function () ***REMOVED***
        var data = $$$1(this).data(DATA_KEY);

        var _config = typeof config === 'object' && config;

        if (!data && /dispose|hide/.test(config)) ***REMOVED***
          return;
        ***REMOVED***

        if (!data) ***REMOVED***
          data = new Tooltip(this, _config);
          $$$1(this).data(DATA_KEY, data);
        ***REMOVED***

        if (typeof config === 'string') ***REMOVED***
          if (typeof data[config] === 'undefined') ***REMOVED***
            throw new TypeError("No method named \"" + config + "\"");
          ***REMOVED***

          data[config]();
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***;

    _createClass(Tooltip, null, [***REMOVED***
      key: "VERSION",
      get: function get() ***REMOVED***
        return VERSION;
      ***REMOVED***
    ***REMOVED***, ***REMOVED***
      key: "Default",
      get: function get() ***REMOVED***
        return Default;
      ***REMOVED***
    ***REMOVED***, ***REMOVED***
      key: "NAME",
      get: function get() ***REMOVED***
        return NAME;
      ***REMOVED***
    ***REMOVED***, ***REMOVED***
      key: "DATA_KEY",
      get: function get() ***REMOVED***
        return DATA_KEY;
      ***REMOVED***
    ***REMOVED***, ***REMOVED***
      key: "Event",
      get: function get() ***REMOVED***
        return Event;
      ***REMOVED***
    ***REMOVED***, ***REMOVED***
      key: "EVENT_KEY",
      get: function get() ***REMOVED***
        return EVENT_KEY;
      ***REMOVED***
    ***REMOVED***, ***REMOVED***
      key: "DefaultType",
      get: function get() ***REMOVED***
        return DefaultType;
      ***REMOVED***
    ***REMOVED***]);
    return Tooltip;
  ***REMOVED***();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $$$1.fn[NAME] = Tooltip._jQueryInterface;
  $$$1.fn[NAME].Constructor = Tooltip;

  $$$1.fn[NAME].noConflict = function () ***REMOVED***
    $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
    return Tooltip._jQueryInterface;
  ***REMOVED***;

  return Tooltip;
***REMOVED***($, Popper$1);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0): popover.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Popover = function ($$$1) ***REMOVED***
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = 'popover';
  var VERSION = '4.0.0';
  var DATA_KEY = 'bs.popover';
  var EVENT_KEY = "." + DATA_KEY;
  var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
  var CLASS_PREFIX = 'bs-popover';
  var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
  var Default = _extends(***REMOVED******REMOVED***, Tooltip.Default, ***REMOVED***
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
  ***REMOVED***);
  var DefaultType = _extends(***REMOVED******REMOVED***, Tooltip.DefaultType, ***REMOVED***
    content: '(string|element|function)'
  ***REMOVED***);
  var ClassName = ***REMOVED***
    FADE: 'fade',
    SHOW: 'show'
  ***REMOVED***;
  var Selector = ***REMOVED***
    TITLE: '.popover-header',
    CONTENT: '.popover-body'
  ***REMOVED***;
  var Event = ***REMOVED***
    HIDE: "hide" + EVENT_KEY,
    HIDDEN: "hidden" + EVENT_KEY,
    SHOW: "show" + EVENT_KEY,
    SHOWN: "shown" + EVENT_KEY,
    INSERTED: "inserted" + EVENT_KEY,
    CLICK: "click" + EVENT_KEY,
    FOCUSIN: "focusin" + EVENT_KEY,
    FOCUSOUT: "focusout" + EVENT_KEY,
    MOUSEENTER: "mouseenter" + EVENT_KEY,
    MOUSELEAVE: "mouseleave" + EVENT_KEY
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  ***REMOVED***;

  var Popover =
  /*#__PURE__*/
  function (_Tooltip) ***REMOVED***
    _inheritsLoose(Popover, _Tooltip);

    function Popover() ***REMOVED***
      return _Tooltip.apply(this, arguments) || this;
    ***REMOVED***

    var _proto = Popover.prototype;

    // Overrides
    _proto.isWithContent = function isWithContent() ***REMOVED***
      return this.getTitle() || this._getContent();
    ***REMOVED***;

    _proto.addAttachmentClass = function addAttachmentClass(attachment) ***REMOVED***
      $$$1(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
    ***REMOVED***;

    _proto.getTipElement = function getTipElement() ***REMOVED***
      this.tip = this.tip || $$$1(this.config.template)[0];
      return this.tip;
    ***REMOVED***;

    _proto.setContent = function setContent() ***REMOVED***
      var $tip = $$$1(this.getTipElement()); // We use append for html objects to maintain js events

      this.setElementContent($tip.find(Selector.TITLE), this.getTitle());

      var content = this._getContent();

      if (typeof content === 'function') ***REMOVED***
        content = content.call(this.element);
      ***REMOVED***

      this.setElementContent($tip.find(Selector.CONTENT), content);
      $tip.removeClass(ClassName.FADE + " " + ClassName.SHOW);
    ***REMOVED***; // Private


    _proto._getContent = function _getContent() ***REMOVED***
      return this.element.getAttribute('data-content') || this.config.content;
    ***REMOVED***;

    _proto._cleanTipClass = function _cleanTipClass() ***REMOVED***
      var $tip = $$$1(this.getTipElement());
      var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

      if (tabClass !== null && tabClass.length > 0) ***REMOVED***
        $tip.removeClass(tabClass.join(''));
      ***REMOVED***
    ***REMOVED***; // Static


    Popover._jQueryInterface = function _jQueryInterface(config) ***REMOVED***
      return this.each(function () ***REMOVED***
        var data = $$$1(this).data(DATA_KEY);

        var _config = typeof config === 'object' ? config : null;

        if (!data && /destroy|hide/.test(config)) ***REMOVED***
          return;
        ***REMOVED***

        if (!data) ***REMOVED***
          data = new Popover(this, _config);
          $$$1(this).data(DATA_KEY, data);
        ***REMOVED***

        if (typeof config === 'string') ***REMOVED***
          if (typeof data[config] === 'undefined') ***REMOVED***
            throw new TypeError("No method named \"" + config + "\"");
          ***REMOVED***

          data[config]();
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***;

    _createClass(Popover, null, [***REMOVED***
      key: "VERSION",
      // Getters
      get: function get() ***REMOVED***
        return VERSION;
      ***REMOVED***
    ***REMOVED***, ***REMOVED***
      key: "Default",
      get: function get() ***REMOVED***
        return Default;
      ***REMOVED***
    ***REMOVED***, ***REMOVED***
      key: "NAME",
      get: function get() ***REMOVED***
        return NAME;
      ***REMOVED***
    ***REMOVED***, ***REMOVED***
      key: "DATA_KEY",
      get: function get() ***REMOVED***
        return DATA_KEY;
      ***REMOVED***
    ***REMOVED***, ***REMOVED***
      key: "Event",
      get: function get() ***REMOVED***
        return Event;
      ***REMOVED***
    ***REMOVED***, ***REMOVED***
      key: "EVENT_KEY",
      get: function get() ***REMOVED***
        return EVENT_KEY;
      ***REMOVED***
    ***REMOVED***, ***REMOVED***
      key: "DefaultType",
      get: function get() ***REMOVED***
        return DefaultType;
      ***REMOVED***
    ***REMOVED***]);
    return Popover;
  ***REMOVED***(Tooltip);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $$$1.fn[NAME] = Popover._jQueryInterface;
  $$$1.fn[NAME].Constructor = Popover;

  $$$1.fn[NAME].noConflict = function () ***REMOVED***
    $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
    return Popover._jQueryInterface;
  ***REMOVED***;

  return Popover;
***REMOVED***($);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0): scrollspy.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var ScrollSpy = function ($$$1) ***REMOVED***
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = 'scrollspy';
  var VERSION = '4.0.0';
  var DATA_KEY = 'bs.scrollspy';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
  var Default = ***REMOVED***
    offset: 10,
    method: 'auto',
    target: ''
  ***REMOVED***;
  var DefaultType = ***REMOVED***
    offset: 'number',
    method: 'string',
    target: '(string|element)'
  ***REMOVED***;
  var Event = ***REMOVED***
    ACTIVATE: "activate" + EVENT_KEY,
    SCROLL: "scroll" + EVENT_KEY,
    LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY
  ***REMOVED***;
  var ClassName = ***REMOVED***
    DROPDOWN_ITEM: 'dropdown-item',
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active'
  ***REMOVED***;
  var Selector = ***REMOVED***
    DATA_SPY: '[data-spy="scroll"]',
    ACTIVE: '.active',
    NAV_LIST_GROUP: '.nav, .list-group',
    NAV_LINKS: '.nav-link',
    NAV_ITEMS: '.nav-item',
    LIST_ITEMS: '.list-group-item',
    DROPDOWN: '.dropdown',
    DROPDOWN_ITEMS: '.dropdown-item',
    DROPDOWN_TOGGLE: '.dropdown-toggle'
  ***REMOVED***;
  var OffsetMethod = ***REMOVED***
    OFFSET: 'offset',
    POSITION: 'position'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  ***REMOVED***;

  var ScrollSpy =
  /*#__PURE__*/
  function () ***REMOVED***
    function ScrollSpy(element, config) ***REMOVED***
      var _this = this;

      this._element = element;
      this._scrollElement = element.tagName === 'BODY' ? window : element;
      this._config = this._getConfig(config);
      this._selector = this._config.target + " " + Selector.NAV_LINKS + "," + (this._config.target + " " + Selector.LIST_ITEMS + ",") + (this._config.target + " " + Selector.DROPDOWN_ITEMS);
      this._offsets = [];
      this._targets = [];
      this._activeTarget = null;
      this._scrollHeight = 0;
      $$$1(this._scrollElement).on(Event.SCROLL, function (event) ***REMOVED***
        return _this._process(event);
      ***REMOVED***);
      this.refresh();

      this._process();
    ***REMOVED*** // Getters


    var _proto = ScrollSpy.prototype;

    // Public
    _proto.refresh = function refresh() ***REMOVED***
      var _this2 = this;

      var autoMethod = this._scrollElement === this._scrollElement.window ? OffsetMethod.OFFSET : OffsetMethod.POSITION;
      var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
      var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;
      this._offsets = [];
      this._targets = [];
      this._scrollHeight = this._getScrollHeight();
      var targets = $$$1.makeArray($$$1(this._selector));
      targets.map(function (element) ***REMOVED***
        var target;
        var targetSelector = Util.getSelectorFromElement(element);

        if (targetSelector) ***REMOVED***
          target = $$$1(targetSelector)[0];
        ***REMOVED***

        if (target) ***REMOVED***
          var targetBCR = target.getBoundingClientRect();

          if (targetBCR.width || targetBCR.height) ***REMOVED***
            // TODO (fat): remove sketch reliance on jQuery position/offset
            return [$$$1(target)[offsetMethod]().top + offsetBase, targetSelector];
          ***REMOVED***
        ***REMOVED***

        return null;
      ***REMOVED***).filter(function (item) ***REMOVED***
        return item;
      ***REMOVED***).sort(function (a, b) ***REMOVED***
        return a[0] - b[0];
      ***REMOVED***).forEach(function (item) ***REMOVED***
        _this2._offsets.push(item[0]);

        _this2._targets.push(item[1]);
      ***REMOVED***);
    ***REMOVED***;

    _proto.dispose = function dispose() ***REMOVED***
      $$$1.removeData(this._element, DATA_KEY);
      $$$1(this._scrollElement).off(EVENT_KEY);
      this._element = null;
      this._scrollElement = null;
      this._config = null;
      this._selector = null;
      this._offsets = null;
      this._targets = null;
      this._activeTarget = null;
      this._scrollHeight = null;
    ***REMOVED***; // Private


    _proto._getConfig = function _getConfig(config) ***REMOVED***
      config = _extends(***REMOVED******REMOVED***, Default, config);

      if (typeof config.target !== 'string') ***REMOVED***
        var id = $$$1(config.target).attr('id');

        if (!id) ***REMOVED***
          id = Util.getUID(NAME);
          $$$1(config.target).attr('id', id);
        ***REMOVED***

        config.target = "#" + id;
      ***REMOVED***

      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    ***REMOVED***;

    _proto._getScrollTop = function _getScrollTop() ***REMOVED***
      return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
    ***REMOVED***;

    _proto._getScrollHeight = function _getScrollHeight() ***REMOVED***
      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    ***REMOVED***;

    _proto._getOffsetHeight = function _getOffsetHeight() ***REMOVED***
      return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
    ***REMOVED***;

    _proto._process = function _process() ***REMOVED***
      var scrollTop = this._getScrollTop() + this._config.offset;

      var scrollHeight = this._getScrollHeight();

      var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

      if (this._scrollHeight !== scrollHeight) ***REMOVED***
        this.refresh();
      ***REMOVED***

      if (scrollTop >= maxScroll) ***REMOVED***
        var target = this._targets[this._targets.length - 1];

        if (this._activeTarget !== target) ***REMOVED***
          this._activate(target);
        ***REMOVED***

        return;
      ***REMOVED***

      if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) ***REMOVED***
        this._activeTarget = null;

        this._clear();

        return;
      ***REMOVED***

      for (var i = this._offsets.length; i--;) ***REMOVED***
        var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

        if (isActiveTarget) ***REMOVED***
          this._activate(this._targets[i]);
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***;

    _proto._activate = function _activate(target) ***REMOVED***
      this._activeTarget = target;

      this._clear();

      var queries = this._selector.split(','); // eslint-disable-next-line arrow-body-style


      queries = queries.map(function (selector) ***REMOVED***
        return selector + "[data-target=\"" + target + "\"]," + (selector + "[href=\"" + target + "\"]");
      ***REMOVED***);
      var $link = $$$1(queries.join(','));

      if ($link.hasClass(ClassName.DROPDOWN_ITEM)) ***REMOVED***
        $link.closest(Selector.DROPDOWN).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
        $link.addClass(ClassName.ACTIVE);
      ***REMOVED*** else ***REMOVED***
        // Set triggered link as active
        $link.addClass(ClassName.ACTIVE); // Set triggered links parents as active
        // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor

        $link.parents(Selector.NAV_LIST_GROUP).prev(Selector.NAV_LINKS + ", " + Selector.LIST_ITEMS).addClass(ClassName.ACTIVE); // Handle special case when .nav-link is inside .nav-item

        $link.parents(Selector.NAV_LIST_GROUP).prev(Selector.NAV_ITEMS).children(Selector.NAV_LINKS).addClass(ClassName.ACTIVE);
      ***REMOVED***

      $$$1(this._scrollElement).trigger(Event.ACTIVATE, ***REMOVED***
        relatedTarget: target
      ***REMOVED***);
    ***REMOVED***;

    _proto._clear = function _clear() ***REMOVED***
      $$$1(this._selector).filter(Selector.ACTIVE).removeClass(ClassName.ACTIVE);
    ***REMOVED***; // Static


    ScrollSpy._jQueryInterface = function _jQueryInterface(config) ***REMOVED***
      return this.each(function () ***REMOVED***
        var data = $$$1(this).data(DATA_KEY);

        var _config = typeof config === 'object' && config;

        if (!data) ***REMOVED***
          data = new ScrollSpy(this, _config);
          $$$1(this).data(DATA_KEY, data);
        ***REMOVED***

        if (typeof config === 'string') ***REMOVED***
          if (typeof data[config] === 'undefined') ***REMOVED***
            throw new TypeError("No method named \"" + config + "\"");
          ***REMOVED***

          data[config]();
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***;

    _createClass(ScrollSpy, null, [***REMOVED***
      key: "VERSION",
      get: function get() ***REMOVED***
        return VERSION;
      ***REMOVED***
    ***REMOVED***, ***REMOVED***
      key: "Default",
      get: function get() ***REMOVED***
        return Default;
      ***REMOVED***
    ***REMOVED***]);
    return ScrollSpy;
  ***REMOVED***();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $$$1(window).on(Event.LOAD_DATA_API, function () ***REMOVED***
    var scrollSpys = $$$1.makeArray($$$1(Selector.DATA_SPY));

    for (var i = scrollSpys.length; i--;) ***REMOVED***
      var $spy = $$$1(scrollSpys[i]);

      ScrollSpy._jQueryInterface.call($spy, $spy.data());
    ***REMOVED***
  ***REMOVED***);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $$$1.fn[NAME] = ScrollSpy._jQueryInterface;
  $$$1.fn[NAME].Constructor = ScrollSpy;

  $$$1.fn[NAME].noConflict = function () ***REMOVED***
    $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
    return ScrollSpy._jQueryInterface;
  ***REMOVED***;

  return ScrollSpy;
***REMOVED***($);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0): tab.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Tab = function ($$$1) ***REMOVED***
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = 'tab';
  var VERSION = '4.0.0';
  var DATA_KEY = 'bs.tab';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
  var TRANSITION_DURATION = 150;
  var Event = ***REMOVED***
    HIDE: "hide" + EVENT_KEY,
    HIDDEN: "hidden" + EVENT_KEY,
    SHOW: "show" + EVENT_KEY,
    SHOWN: "shown" + EVENT_KEY,
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
  ***REMOVED***;
  var ClassName = ***REMOVED***
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active',
    DISABLED: 'disabled',
    FADE: 'fade',
    SHOW: 'show'
  ***REMOVED***;
  var Selector = ***REMOVED***
    DROPDOWN: '.dropdown',
    NAV_LIST_GROUP: '.nav, .list-group',
    ACTIVE: '.active',
    ACTIVE_UL: '> li > .active',
    DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
    DROPDOWN_TOGGLE: '.dropdown-toggle',
    DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  ***REMOVED***;

  var Tab =
  /*#__PURE__*/
  function () ***REMOVED***
    function Tab(element) ***REMOVED***
      this._element = element;
    ***REMOVED*** // Getters


    var _proto = Tab.prototype;

    // Public
    _proto.show = function show() ***REMOVED***
      var _this = this;

      if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $$$1(this._element).hasClass(ClassName.ACTIVE) || $$$1(this._element).hasClass(ClassName.DISABLED)) ***REMOVED***
        return;
      ***REMOVED***

      var target;
      var previous;
      var listElement = $$$1(this._element).closest(Selector.NAV_LIST_GROUP)[0];
      var selector = Util.getSelectorFromElement(this._element);

      if (listElement) ***REMOVED***
        var itemSelector = listElement.nodeName === 'UL' ? Selector.ACTIVE_UL : Selector.ACTIVE;
        previous = $$$1.makeArray($$$1(listElement).find(itemSelector));
        previous = previous[previous.length - 1];
      ***REMOVED***

      var hideEvent = $$$1.Event(Event.HIDE, ***REMOVED***
        relatedTarget: this._element
      ***REMOVED***);
      var showEvent = $$$1.Event(Event.SHOW, ***REMOVED***
        relatedTarget: previous
      ***REMOVED***);

      if (previous) ***REMOVED***
        $$$1(previous).trigger(hideEvent);
      ***REMOVED***

      $$$1(this._element).trigger(showEvent);

      if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) ***REMOVED***
        return;
      ***REMOVED***

      if (selector) ***REMOVED***
        target = $$$1(selector)[0];
      ***REMOVED***

      this._activate(this._element, listElement);

      var complete = function complete() ***REMOVED***
        var hiddenEvent = $$$1.Event(Event.HIDDEN, ***REMOVED***
          relatedTarget: _this._element
        ***REMOVED***);
        var shownEvent = $$$1.Event(Event.SHOWN, ***REMOVED***
          relatedTarget: previous
        ***REMOVED***);
        $$$1(previous).trigger(hiddenEvent);
        $$$1(_this._element).trigger(shownEvent);
      ***REMOVED***;

      if (target) ***REMOVED***
        this._activate(target, target.parentNode, complete);
      ***REMOVED*** else ***REMOVED***
        complete();
      ***REMOVED***
    ***REMOVED***;

    _proto.dispose = function dispose() ***REMOVED***
      $$$1.removeData(this._element, DATA_KEY);
      this._element = null;
    ***REMOVED***; // Private


    _proto._activate = function _activate(element, container, callback) ***REMOVED***
      var _this2 = this;

      var activeElements;

      if (container.nodeName === 'UL') ***REMOVED***
        activeElements = $$$1(container).find(Selector.ACTIVE_UL);
      ***REMOVED*** else ***REMOVED***
        activeElements = $$$1(container).children(Selector.ACTIVE);
      ***REMOVED***

      var active = activeElements[0];
      var isTransitioning = callback && Util.supportsTransitionEnd() && active && $$$1(active).hasClass(ClassName.FADE);

      var complete = function complete() ***REMOVED***
        return _this2._transitionComplete(element, active, callback);
      ***REMOVED***;

      if (active && isTransitioning) ***REMOVED***
        $$$1(active).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
      ***REMOVED*** else ***REMOVED***
        complete();
      ***REMOVED***
    ***REMOVED***;

    _proto._transitionComplete = function _transitionComplete(element, active, callback) ***REMOVED***
      if (active) ***REMOVED***
        $$$1(active).removeClass(ClassName.SHOW + " " + ClassName.ACTIVE);
        var dropdownChild = $$$1(active.parentNode).find(Selector.DROPDOWN_ACTIVE_CHILD)[0];

        if (dropdownChild) ***REMOVED***
          $$$1(dropdownChild).removeClass(ClassName.ACTIVE);
        ***REMOVED***

        if (active.getAttribute('role') === 'tab') ***REMOVED***
          active.setAttribute('aria-selected', false);
        ***REMOVED***
      ***REMOVED***

      $$$1(element).addClass(ClassName.ACTIVE);

      if (element.getAttribute('role') === 'tab') ***REMOVED***
        element.setAttribute('aria-selected', true);
      ***REMOVED***

      Util.reflow(element);
      $$$1(element).addClass(ClassName.SHOW);

      if (element.parentNode && $$$1(element.parentNode).hasClass(ClassName.DROPDOWN_MENU)) ***REMOVED***
        var dropdownElement = $$$1(element).closest(Selector.DROPDOWN)[0];

        if (dropdownElement) ***REMOVED***
          $$$1(dropdownElement).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
        ***REMOVED***

        element.setAttribute('aria-expanded', true);
      ***REMOVED***

      if (callback) ***REMOVED***
        callback();
      ***REMOVED***
    ***REMOVED***; // Static


    Tab._jQueryInterface = function _jQueryInterface(config) ***REMOVED***
      return this.each(function () ***REMOVED***
        var $this = $$$1(this);
        var data = $this.data(DATA_KEY);

        if (!data) ***REMOVED***
          data = new Tab(this);
          $this.data(DATA_KEY, data);
        ***REMOVED***

        if (typeof config === 'string') ***REMOVED***
          if (typeof data[config] === 'undefined') ***REMOVED***
            throw new TypeError("No method named \"" + config + "\"");
          ***REMOVED***

          data[config]();
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***;

    _createClass(Tab, null, [***REMOVED***
      key: "VERSION",
      get: function get() ***REMOVED***
        return VERSION;
      ***REMOVED***
    ***REMOVED***]);
    return Tab;
  ***REMOVED***();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) ***REMOVED***
    event.preventDefault();

    Tab._jQueryInterface.call($$$1(this), 'show');
  ***REMOVED***);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $$$1.fn[NAME] = Tab._jQueryInterface;
  $$$1.fn[NAME].Constructor = Tab;

  $$$1.fn[NAME].noConflict = function () ***REMOVED***
    $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
    return Tab._jQueryInterface;
  ***REMOVED***;

  return Tab;
***REMOVED***($);

var Util$2 = function () ***REMOVED***
  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */
  var transitionEnd = false;
  var _transitionEndSelector = "";
  var TransitionEndEvent = ***REMOVED***
    WebkitTransition: "webkitTransitionEnd",
    MozTransition: "transitionend",
    OTransition: "oTransitionEnd otransitionend",
    transition: "transitionend"
  ***REMOVED***;

  function transitionEndTest() ***REMOVED***
    if (window.QUnit) ***REMOVED***
      return false;
    ***REMOVED***

    var el = document.createElement("bmd");

    for (var name in TransitionEndEvent) ***REMOVED***
      if (el.style[name] !== undefined) ***REMOVED***
        return TransitionEndEvent[name]; // ***REMOVED*** end: TransitionEndEvent[name] ***REMOVED***
      ***REMOVED***
    ***REMOVED***

    return false;
  ***REMOVED***

  function setTransitionEndSupport() ***REMOVED***
    transitionEnd = transitionEndTest(); // generate a concatenated transition end event selector

    for (var name in TransitionEndEvent) ***REMOVED***
      _transitionEndSelector += " " + TransitionEndEvent[name];
    ***REMOVED***
  ***REMOVED***
  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */


  var Util = ***REMOVED***
    transitionEndSupported: function transitionEndSupported() ***REMOVED***
      return transitionEnd;
    ***REMOVED***,
    transitionEndSelector: function transitionEndSelector() ***REMOVED***
      return _transitionEndSelector;
    ***REMOVED***,
    isChar: function isChar(event) ***REMOVED***
      if (typeof event.which === "undefined") ***REMOVED***
        return true;
      ***REMOVED*** else if (typeof event.which === "number" && event.which > 0) ***REMOVED***
        return !event.ctrlKey && !event.metaKey && !event.altKey && event.which !== 8 && // backspace
        event.which !== 9 && // tab
        event.which !== 13 && // enter
        event.which !== 16 && // shift
        event.which !== 17 && // ctrl
        event.which !== 20 && // caps lock
        event.which !== 27 // escape
        ;
      ***REMOVED***

      return false;
    ***REMOVED***,
    assert: function assert($element, invalidTest, message) ***REMOVED***
      if (invalidTest) ***REMOVED***
        if (!$element === undefined) ***REMOVED***
          $element.css("border", "1px solid red");
        ***REMOVED***

        console.error(message, $element); // eslint-disable-line no-console

        throw message;
      ***REMOVED***
    ***REMOVED***,
    describe: function describe($element) ***REMOVED***
      if ($element === undefined) ***REMOVED***
        return "undefined";
      ***REMOVED*** else if ($element.length === 0) ***REMOVED***
        return "(no matching elements)";
      ***REMOVED***

      return $element[0].outerHTML.split(">")[0] + ">";
    ***REMOVED***
  ***REMOVED***;
  setTransitionEndSupport();
  return Util;
***REMOVED***(jQuery);

var Base = function ($$$1) ***REMOVED***
  var ClassName = ***REMOVED***
    BMD_FORM_GROUP: "bmd-form-group",
    IS_FILLED: "is-filled",
    IS_FOCUSED: "is-focused"
  ***REMOVED***;
  var Selector = ***REMOVED***
    BMD_FORM_GROUP: "." + ClassName.BMD_FORM_GROUP
  ***REMOVED***;
  var Default = ***REMOVED******REMOVED***;
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Base =
  /*#__PURE__*/
  function () ***REMOVED***
    /**
     *
     * @param element
     * @param config
     * @param properties - anything that needs to be set as this[key] = value.  Works around the need to call `super` before using `this`
     */
    function Base($element, config, properties) ***REMOVED***
      if (properties === void 0) ***REMOVED***
        properties = ***REMOVED******REMOVED***;
      ***REMOVED***

      this.$element = $element;
      this.config = $$$1.extend(true, ***REMOVED******REMOVED***, Default, config); // set properties for use in the constructor initialization

      for (var key in properties) ***REMOVED***
        this[key] = properties[key];
      ***REMOVED***
    ***REMOVED***

    var _proto = Base.prototype;

    _proto.dispose = function dispose(dataKey) ***REMOVED***
      this.$element.data(dataKey, null);
      this.$element = null;
      this.config = null;
    ***REMOVED***; // ------------------------------------------------------------------------
    // protected


    _proto.addFormGroupFocus = function addFormGroupFocus() ***REMOVED***
      if (!this.$element.prop("disabled")) ***REMOVED***
        this.$bmdFormGroup.addClass(ClassName.IS_FOCUSED);
      ***REMOVED***
    ***REMOVED***;

    _proto.removeFormGroupFocus = function removeFormGroupFocus() ***REMOVED***
      this.$bmdFormGroup.removeClass(ClassName.IS_FOCUSED);
    ***REMOVED***;

    _proto.removeIsFilled = function removeIsFilled() ***REMOVED***
      this.$bmdFormGroup.removeClass(ClassName.IS_FILLED);
    ***REMOVED***;

    _proto.addIsFilled = function addIsFilled() ***REMOVED***
      this.$bmdFormGroup.addClass(ClassName.IS_FILLED);
    ***REMOVED***; // Find bmd-form-group


    _proto.findMdbFormGroup = function findMdbFormGroup(raiseError) ***REMOVED***
      if (raiseError === void 0) ***REMOVED***
        raiseError = true;
      ***REMOVED***

      var mfg = this.$element.closest(Selector.BMD_FORM_GROUP);

      if (mfg.length === 0 && raiseError) ***REMOVED***
        $$$1.error("Failed to find " + Selector.BMD_FORM_GROUP + " for " + Util$2.describe(this.$element));
      ***REMOVED***

      return mfg;
    ***REMOVED***; // ------------------------------------------------------------------------
    // private
    // ------------------------------------------------------------------------
    // static


    return Base;
  ***REMOVED***();

  return Base;
***REMOVED***(jQuery);

var BaseInput = function ($$$1) ***REMOVED***
  var ClassName = ***REMOVED***
    FORM_GROUP: "form-group",
    BMD_FORM_GROUP: "bmd-form-group",
    BMD_LABEL: "bmd-label",
    BMD_LABEL_STATIC: "bmd-label-static",
    BMD_LABEL_PLACEHOLDER: "bmd-label-placeholder",
    BMD_LABEL_FLOATING: "bmd-label-floating",
    HAS_DANGER: "has-danger",
    IS_FILLED: "is-filled",
    IS_FOCUSED: "is-focused",
    INPUT_GROUP: "input-group"
  ***REMOVED***;
  var Selector = ***REMOVED***
    FORM_GROUP: "." + ClassName.FORM_GROUP,
    BMD_FORM_GROUP: "." + ClassName.BMD_FORM_GROUP,
    BMD_LABEL_WILDCARD: "label[class^='" + ClassName.BMD_LABEL + "'], label[class*=' " + ClassName.BMD_LABEL + "']" // match any label variant if specified

  ***REMOVED***;
  var Default = ***REMOVED***
    validate: false,
    formGroup: ***REMOVED***
      required: false
    ***REMOVED***,
    bmdFormGroup: ***REMOVED***
      template: "<span class='" + ClassName.BMD_FORM_GROUP + "'></span>",
      create: true,
      // create a wrapper if form-group not found
      required: true // not recommended to turn this off, only used for inline components

    ***REMOVED***,
    label: ***REMOVED***
      required: false,
      // Prioritized find order for resolving the label to be used as an bmd-label if not specified in the markup
      //  - a function(thisComponent); or
      //  - a string selector used like $bmdFormGroup.find(selector)
      //
      // Note this only runs if $bmdFormGroup.find(Selector.BMD_LABEL_WILDCARD) fails to find a label (as authored in the markup)
      //
      selectors: [".form-control-label", // in the case of horizontal or inline forms, this will be marked
      "> label" // usual case for text inputs, first child.  Deeper would find toggle labels so don't do that.
      ],
      className: ClassName.BMD_LABEL_STATIC
    ***REMOVED***,
    requiredClasses: [],
    invalidComponentMatches: [],
    convertInputSizeVariations: true
  ***REMOVED***;
  var FormControlSizeMarkers = ***REMOVED***
    "form-control-lg": "bmd-form-group-lg",
    "form-control-sm": "bmd-form-group-sm"
  ***REMOVED***;
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var BaseInput =
  /*#__PURE__*/
  function (_Base) ***REMOVED***
    _inheritsLoose(BaseInput, _Base);

    /**
     *
     * @param element
     * @param config
     * @param properties - anything that needs to be set as this[key] = value.  Works around the need to call `super` before using `this`
     */
    function BaseInput($element, config, properties) ***REMOVED***
      var _this;

      if (properties === void 0) ***REMOVED***
        properties = ***REMOVED******REMOVED***;
      ***REMOVED***

      _this = _Base.call(this, $element, $$$1.extend(true, ***REMOVED******REMOVED***, Default, config), properties) || this; // Enforce no overlap between components to prevent side effects

      _this._rejectInvalidComponentMatches(); // Enforce expected structure (if any)


      _this.rejectWithoutRequiredStructure(); // Enforce required classes for a consistent rendering


      _this._rejectWithoutRequiredClasses(); // Resolve the form-group first, it will be used for bmd-form-group if possible
      //   note: different components have different rules


      _this.$formGroup = _this.findFormGroup(_this.config.formGroup.required); // Will add bmd-form-group to form-group or create an bmd-form-group
      //  Performance Note: for those forms that are really performance driven, create the markup with the .bmd-form-group to avoid
      //    rendering changes once added.

      _this.$bmdFormGroup = _this.resolveMdbFormGroup(); // Resolve and mark the bmdLabel if necessary as defined by the config

      _this.$bmdLabel = _this.resolveMdbLabel(); // Signal to the bmd-form-group that a form-control-* variation is being used

      _this.resolveMdbFormGroupSizing();

      _this.addFocusListener();

      _this.addChangeListener();

      if (_this.$element.val() != "") ***REMOVED***
        _this.addIsFilled();
      ***REMOVED***

      return _this;
    ***REMOVED***

    var _proto = BaseInput.prototype;

    _proto.dispose = function dispose(dataKey) ***REMOVED***
      _Base.prototype.dispose.call(this, dataKey);

      this.$bmdFormGroup = null;
      this.$formGroup = null;
    ***REMOVED***; // ------------------------------------------------------------------------
    // protected


    _proto.rejectWithoutRequiredStructure = function rejectWithoutRequiredStructure() ***REMOVED***// implement
    ***REMOVED***;

    _proto.addFocusListener = function addFocusListener() ***REMOVED***
      var _this2 = this;

      this.$element.on("focus", function () ***REMOVED***
        _this2.addFormGroupFocus();
      ***REMOVED***).on("blur", function () ***REMOVED***
        _this2.removeFormGroupFocus();
      ***REMOVED***);
    ***REMOVED***;

    _proto.addChangeListener = function addChangeListener() ***REMOVED***
      var _this3 = this;

      this.$element.on("keydown paste", function (event) ***REMOVED***
        if (Util$2.isChar(event)) ***REMOVED***
          _this3.addIsFilled();
        ***REMOVED***
      ***REMOVED***).on("keyup change", function () ***REMOVED***
        // make sure empty is added back when there is a programmatic value change.
        //  NOTE: programmatic changing of value using $.val() must trigger the change event i.e. $.val('x').trigger('change')
        if (_this3.isEmpty()) ***REMOVED***
          _this3.removeIsFilled();
        ***REMOVED*** else ***REMOVED***
          _this3.addIsFilled();
        ***REMOVED***

        if (_this3.config.validate) ***REMOVED***
          // Validation events do not bubble, so they must be attached directly to the text: http://jsfiddle.net/PEpRM/1/
          //  Further, even the bind method is being caught, but since we are already calling #checkValidity here, just alter
          //  the form-group on change.
          //
          // NOTE: I'm not sure we should be intervening regarding validation, this seems better as a README and snippet of code.
          //        BUT, I've left it here for backwards compatibility.
          var isValid = typeof _this3.$element[0].checkValidity === "undefined" || _this3.$element[0].checkValidity();

          if (isValid) ***REMOVED***
            _this3.removeHasDanger();
          ***REMOVED*** else ***REMOVED***
            _this3.addHasDanger();
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***;

    _proto.addHasDanger = function addHasDanger() ***REMOVED***
      this.$bmdFormGroup.addClass(ClassName.HAS_DANGER);
    ***REMOVED***;

    _proto.removeHasDanger = function removeHasDanger() ***REMOVED***
      this.$bmdFormGroup.removeClass(ClassName.HAS_DANGER);
    ***REMOVED***;

    _proto.isEmpty = function isEmpty() ***REMOVED***
      return this.$element.val() === null || this.$element.val() === undefined || this.$element.val() === "";
    ***REMOVED***; // Will add bmd-form-group to form-group or create a bmd-form-group if necessary


    _proto.resolveMdbFormGroup = function resolveMdbFormGroup() ***REMOVED***
      var mfg = this.findMdbFormGroup(false);

      if (mfg === undefined || mfg.length === 0) ***REMOVED***
        if (this.config.bmdFormGroup.create && (this.$formGroup === undefined || this.$formGroup.length === 0)) ***REMOVED***
          // If a form-group doesn't exist (not recommended), take a guess and wrap the element (assuming no label).
          //  note: it's possible to make this smarter, but I need to see valid cases before adding any complexity.
          // this may be an input-group, wrap that instead
          if (this.outerElement().parent().hasClass(ClassName.INPUT_GROUP)) ***REMOVED***
            this.outerElement().parent().wrap(this.config.bmdFormGroup.template);
          ***REMOVED*** else ***REMOVED***
            this.outerElement().wrap(this.config.bmdFormGroup.template);
          ***REMOVED***
        ***REMOVED*** else ***REMOVED***
          // a form-group does exist, add our marker class to it
          this.$formGroup.addClass(ClassName.BMD_FORM_GROUP); // OLD: may want to implement this after all, see how the styling turns out, but using an existing form-group is less manipulation of the dom and therefore preferable
          // A form-group does exist, so add an bmd-form-group wrapping it's internal contents
          //fg.wrapInner(this.config.bmdFormGroup.template)
        ***REMOVED***

        mfg = this.findMdbFormGroup(this.config.bmdFormGroup.required);
      ***REMOVED***

      return mfg;
    ***REMOVED***; // Demarcation element (e.g. first child of a form-group)
    //  Subclasses such as file inputs may have different structures


    _proto.outerElement = function outerElement() ***REMOVED***
      return this.$element;
    ***REMOVED***; // Will add bmd-label to bmd-form-group if not already specified


    _proto.resolveMdbLabel = function resolveMdbLabel() ***REMOVED***
      var label = this.$bmdFormGroup.find(Selector.BMD_LABEL_WILDCARD);

      if (label === undefined || label.length === 0) ***REMOVED***
        // we need to find it based on the configured selectors
        label = this.findMdbLabel(this.config.label.required);

        if (label === undefined || label.length === 0) ***REMOVED***// no label found, and finder did not require one
        ***REMOVED*** else ***REMOVED***
          // a candidate label was found, add the configured default class name
          label.addClass(this.config.label.className);
        ***REMOVED***
      ***REMOVED***

      return label;
    ***REMOVED***; // Find bmd-label variant based on the config selectors


    _proto.findMdbLabel = function findMdbLabel(raiseError) ***REMOVED***
      if (raiseError === void 0) ***REMOVED***
        raiseError = true;
      ***REMOVED***

      var label = null; // use the specified selector order

      for (var _iterator = this.config.label.selectors, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) ***REMOVED***
        var _ref;

        if (_isArray) ***REMOVED***
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        ***REMOVED*** else ***REMOVED***
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        ***REMOVED***

        var _selector = _ref;

        if ($$$1.isFunction(_selector)) ***REMOVED***
          label = _selector(this);
        ***REMOVED*** else ***REMOVED***
          label = this.$bmdFormGroup.find(_selector);
        ***REMOVED***

        if (label !== undefined && label.length > 0) ***REMOVED***
          break;
        ***REMOVED***
      ***REMOVED***

      if (label.length === 0 && raiseError) ***REMOVED***
        $$$1.error("Failed to find " + Selector.BMD_LABEL_WILDCARD + " within form-group for " + Util$2.describe(this.$element));
      ***REMOVED***

      return label;
    ***REMOVED***; // Find bmd-form-group


    _proto.findFormGroup = function findFormGroup(raiseError) ***REMOVED***
      if (raiseError === void 0) ***REMOVED***
        raiseError = true;
      ***REMOVED***

      var fg = this.$element.closest(Selector.FORM_GROUP);

      if (fg.length === 0 && raiseError) ***REMOVED***
        $$$1.error("Failed to find " + Selector.FORM_GROUP + " for " + Util$2.describe(this.$element));
      ***REMOVED***

      return fg;
    ***REMOVED***; // Due to the interconnected nature of labels/inputs/help-blocks, signal the bmd-form-group-* size variation based on
    //  a found form-control-* size


    _proto.resolveMdbFormGroupSizing = function resolveMdbFormGroupSizing() ***REMOVED***
      if (!this.config.convertInputSizeVariations) ***REMOVED***
        return;
      ***REMOVED*** // Modification - Change text-sm/lg to form-group-sm/lg instead (preferred standard and simpler css/less variants)


      for (var inputSize in FormControlSizeMarkers) ***REMOVED***
        if (this.$element.hasClass(inputSize)) ***REMOVED***
          //this.$element.removeClass(inputSize)
          this.$bmdFormGroup.addClass(FormControlSizeMarkers[inputSize]);
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***; // ------------------------------------------------------------------------
    // private


    _proto._rejectInvalidComponentMatches = function _rejectInvalidComponentMatches() ***REMOVED***
      for (var _iterator2 = this.config.invalidComponentMatches, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) ***REMOVED***
        var _ref2;

        if (_isArray2) ***REMOVED***
          if (_i2 >= _iterator2.length) break;
          _ref2 = _iterator2[_i2++];
        ***REMOVED*** else ***REMOVED***
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref2 = _i2.value;
        ***REMOVED***

        var _otherComponent = _ref2;

        _otherComponent.rejectMatch(this.constructor.name, this.$element);
      ***REMOVED***
    ***REMOVED***;

    _proto._rejectWithoutRequiredClasses = function _rejectWithoutRequiredClasses() ***REMOVED***
      for (var _iterator3 = this.config.requiredClasses, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) ***REMOVED***
        var _ref3;

        if (_isArray3) ***REMOVED***
          if (_i3 >= _iterator3.length) break;
          _ref3 = _iterator3[_i3++];
        ***REMOVED*** else ***REMOVED***
          _i3 = _iterator3.next();
          if (_i3.done) break;
          _ref3 = _i3.value;
        ***REMOVED***

        var _requiredClass = _ref3;
        if (_requiredClass.indexOf("||") !== -1) ***REMOVED***
          var oneOf = _requiredClass.split("||");

          for (var _iterator4 = oneOf, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) ***REMOVED***
            var _ref4;

            if (_isArray4) ***REMOVED***
              if (_i4 >= _iterator4.length) break;
              _ref4 = _iterator4[_i4++];
            ***REMOVED*** else ***REMOVED***
              _i4 = _iterator4.next();
              if (_i4.done) break;
              _ref4 = _i4.value;
            ***REMOVED***

            var _requiredClass3 = _ref4;

            if (this.$element.hasClass(_requiredClass3)) ***REMOVED***
              break;
            ***REMOVED***
          ***REMOVED***
        ***REMOVED*** else if (this.$element.hasClass(_requiredClass)) ***REMOVED***
          
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***; // ------------------------------------------------------------------------
    // static


    return BaseInput;
  ***REMOVED***(Base);

  return BaseInput;
***REMOVED***(jQuery);

var BaseSelection = function ($$$1) ***REMOVED***
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var Default = ***REMOVED***
    label: ***REMOVED***
      required: false // Prioritized find order for resolving the label to be used as an bmd-label if not specified in the markup
      //  - a function(thisComponent); or
      //  - a string selector used like $bmdFormGroup.find(selector)
      //
      // Note this only runs if $bmdFormGroup.find(Selector.BMD_LABEL_WILDCARD) fails to find a label (as authored in the markup)
      //
      //selectors: [
      //  `.form-control-label`, // in the case of horizontal or inline forms, this will be marked
      //  `> label` // usual case for text inputs
      //]

    ***REMOVED***
  ***REMOVED***;
  var Selector = ***REMOVED***
    LABEL: "label"
  ***REMOVED***;
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var BaseSelection =
  /*#__PURE__*/
  function (_BaseInput) ***REMOVED***
    _inheritsLoose(BaseSelection, _BaseInput);

    function BaseSelection($element, config, properties) ***REMOVED***
      var _this;

      // properties = ***REMOVED***inputType: checkbox, outerClass: checkbox-inline***REMOVED***
      // '.checkbox|switch|radio > label > input[type=checkbox|radio]'
      // '.$***REMOVED***this.outerClass***REMOVED*** > label > input[type=$***REMOVED***this.inputType***REMOVED***]'
      _this = _BaseInput.call(this, $element, $$$1.extend(true, ***REMOVED******REMOVED***, Default, config), properties) || this;

      _this.decorateMarkup();

      return _this;
    ***REMOVED*** // ------------------------------------------------------------------------
    // protected


    var _proto = BaseSelection.prototype;

    _proto.decorateMarkup = function decorateMarkup() ***REMOVED***
      var $decorator = $$$1(this.config.template);
      this.$element.after($decorator); // initialize ripples after decorator has been inserted into DOM

      if (this.config.ripples !== false) ***REMOVED***
        $decorator.bmdRipples();
      ***REMOVED***
    ***REMOVED***; // Demarcation element (e.g. first child of a form-group)


    _proto.outerElement = function outerElement() ***REMOVED***
      // .checkbox|switch|radio > label > input[type=checkbox|radio]
      // label.checkbox-inline > input[type=checkbox|radio]
      // .$***REMOVED***this.outerClass***REMOVED*** > label > input[type=$***REMOVED***this.inputType***REMOVED***]
      return this.$element.parent().closest("." + this.outerClass);
    ***REMOVED***;

    _proto.rejectWithoutRequiredStructure = function rejectWithoutRequiredStructure() ***REMOVED***
      // '.checkbox|switch|radio > label > input[type=checkbox|radio]'
      // '.$***REMOVED***this.outerClass***REMOVED*** > label > input[type=$***REMOVED***this.inputType***REMOVED***]'
      Util$2.assert(this.$element, !this.$element.parent().prop("tagName") === "label", this.constructor.name + "'s " + Util$2.describe(this.$element) + " parent element should be <label>.");
      Util$2.assert(this.$element, !this.outerElement().hasClass(this.outerClass), this.constructor.name + "'s " + Util$2.describe(this.$element) + " outer element should have class " + this.outerClass + ".");
    ***REMOVED***;

    _proto.addFocusListener = function addFocusListener() ***REMOVED***
      var _this2 = this;

      // checkboxes didn't appear to bubble to the document, so we'll bind these directly
      this.$element.closest(Selector.LABEL).hover(function () ***REMOVED***
        _this2.addFormGroupFocus();
      ***REMOVED***, function () ***REMOVED***
        _this2.removeFormGroupFocus();
      ***REMOVED***);
    ***REMOVED***;

    _proto.addChangeListener = function addChangeListener() ***REMOVED***
      var _this3 = this;

      this.$element.change(function () ***REMOVED***
        _this3.$element.blur();
      ***REMOVED***);
    ***REMOVED***; // ------------------------------------------------------------------------
    // private


    return BaseSelection;
  ***REMOVED***(BaseInput);

  return BaseSelection;
***REMOVED***(jQuery);

//import File from './file'
//import Radio from './radio'
//import Textarea from './textarea'
//import Select from './select'

var Checkbox = function ($$$1) ***REMOVED***
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = "checkbox";
  var DATA_KEY = "bmd." + NAME;
  var JQUERY_NAME = "bmd" + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
  var JQUERY_NO_CONFLICT = $$$1.fn[JQUERY_NAME];
  var Default = ***REMOVED***
    template: "<span class='checkbox-decorator'><span class='check'></span></span>"
  ***REMOVED***;
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Checkbox =
  /*#__PURE__*/
  function (_BaseSelection) ***REMOVED***
    _inheritsLoose(Checkbox, _BaseSelection);

    function Checkbox($element, config, properties) ***REMOVED***
      if (properties === void 0) ***REMOVED***
        properties = ***REMOVED***
          inputType: NAME,
          outerClass: NAME
        ***REMOVED***;
      ***REMOVED***

      return _BaseSelection.call(this, $element, $$$1.extend(true, //***REMOVED***invalidComponentMatches: [File, Radio, Text, Textarea, Select]***REMOVED***,
      Default, config), properties) || this;
    ***REMOVED***

    var _proto = Checkbox.prototype;

    _proto.dispose = function dispose(dataKey) ***REMOVED***
      if (dataKey === void 0) ***REMOVED***
        dataKey = DATA_KEY;
      ***REMOVED***

      _BaseSelection.prototype.dispose.call(this, dataKey);
    ***REMOVED***;

    Checkbox.matches = function matches($element) ***REMOVED***
      // '.checkbox > label > input[type=checkbox]'
      if ($element.attr("type") === "checkbox") ***REMOVED***
        return true;
      ***REMOVED***

      return false;
    ***REMOVED***;

    Checkbox.rejectMatch = function rejectMatch(component, $element) ***REMOVED***
      Util$2.assert(this.$element, this.matches($element), component + " component element " + Util$2.describe($element) + " is invalid for type='checkbox'.");
    ***REMOVED***; // ------------------------------------------------------------------------
    // protected
    // ------------------------------------------------------------------------
    // protected
    // ------------------------------------------------------------------------
    // private
    // ------------------------------------------------------------------------
    // static


    Checkbox._jQueryInterface = function _jQueryInterface(config) ***REMOVED***
      return this.each(function () ***REMOVED***
        var $element = $$$1(this);
        var data = $element.data(DATA_KEY);

        if (!data) ***REMOVED***
          data = new Checkbox($element, config);
          $element.data(DATA_KEY, data);
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***;

    return Checkbox;
  ***REMOVED***(BaseSelection);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $$$1.fn[JQUERY_NAME] = Checkbox._jQueryInterface;
  $$$1.fn[JQUERY_NAME].Constructor = Checkbox;

  $$$1.fn[JQUERY_NAME].noConflict = function () ***REMOVED***
    $$$1.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
    return Checkbox._jQueryInterface;
  ***REMOVED***;

  return Checkbox;
***REMOVED***(jQuery);

var CheckboxInline = function ($$$1) ***REMOVED***
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = "checkboxInline";
  var DATA_KEY = "bmd." + NAME;
  var JQUERY_NAME = "bmd" + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
  var JQUERY_NO_CONFLICT = $$$1.fn[JQUERY_NAME];
  var Default = ***REMOVED***
    bmdFormGroup: ***REMOVED***
      create: false,
      // no bmd-form-group creation if form-group not present. It messes with the layout.
      required: false
    ***REMOVED***
  ***REMOVED***;
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var CheckboxInline =
  /*#__PURE__*/
  function (_Checkbox) ***REMOVED***
    _inheritsLoose(CheckboxInline, _Checkbox);

    function CheckboxInline($element, config, properties) ***REMOVED***
      if (properties === void 0) ***REMOVED***
        properties = ***REMOVED***
          inputType: "checkbox",
          outerClass: "checkbox-inline"
        ***REMOVED***;
      ***REMOVED***

      return _Checkbox.call(this, $element, $$$1.extend(true, ***REMOVED******REMOVED***, Default, config), properties) || this;
    ***REMOVED***

    var _proto = CheckboxInline.prototype;

    _proto.dispose = function dispose() ***REMOVED***
      _Checkbox.prototype.dispose.call(this, DATA_KEY);
    ***REMOVED***; //static matches($element) ***REMOVED***
    //  // '.checkbox-inline > input[type=checkbox]'
    //  if ($element.attr('type') === 'checkbox') ***REMOVED***
    //    return true
    //  ***REMOVED***
    //  return false
    //***REMOVED***
    //
    //static rejectMatch(component, $element) ***REMOVED***
    //  Util.assert(this.$element, this.matches($element), `$***REMOVED***component***REMOVED*** component element $***REMOVED***Util.describe($element)***REMOVED*** is invalid for type='checkbox'.`)
    //***REMOVED***
    // ------------------------------------------------------------------------
    // protected
    // ------------------------------------------------------------------------
    // protected
    // ------------------------------------------------------------------------
    // private
    // ------------------------------------------------------------------------
    // static


    CheckboxInline._jQueryInterface = function _jQueryInterface(config) ***REMOVED***
      return this.each(function () ***REMOVED***
        var $element = $$$1(this);
        var data = $element.data(DATA_KEY);

        if (!data) ***REMOVED***
          data = new CheckboxInline($element, config);
          $element.data(DATA_KEY, data);
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***;

    return CheckboxInline;
  ***REMOVED***(Checkbox);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $$$1.fn[JQUERY_NAME] = CheckboxInline._jQueryInterface;
  $$$1.fn[JQUERY_NAME].Constructor = CheckboxInline;

  $$$1.fn[JQUERY_NAME].noConflict = function () ***REMOVED***
    $$$1.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
    return CheckboxInline._jQueryInterface;
  ***REMOVED***;

  return CheckboxInline;
***REMOVED***(jQuery);

var CollapseInline = function ($$$1) ***REMOVED***
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = "collapseInline";
  var DATA_KEY = "bmd." + NAME;
  var JQUERY_NAME = "bmd" + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
  var JQUERY_NO_CONFLICT = $$$1.fn[JQUERY_NAME];
  var Selector = ***REMOVED***
    ANY_INPUT: "input, select, textarea"
  ***REMOVED***;
  var ClassName = ***REMOVED***
    IN: "in",
    COLLAPSE: "collapse",
    COLLAPSING: "collapsing",
    COLLAPSED: "collapsed",
    WIDTH: "width"
  ***REMOVED***;
  var Default = ***REMOVED******REMOVED***;
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var CollapseInline =
  /*#__PURE__*/
  function (_Base) ***REMOVED***
    _inheritsLoose(CollapseInline, _Base);

    // $element is expected to be the trigger
    //  i.e. <button class="btn bmd-btn-icon" for="search" data-toggle="collapse" data-target="#search-field" aria-expanded="false" aria-controls="search-field">
    function CollapseInline($element, config) ***REMOVED***
      var _this;

      _this = _Base.call(this, $element, $$$1.extend(true, ***REMOVED******REMOVED***, Default, config)) || this;
      _this.$bmdFormGroup = _this.findMdbFormGroup(true);
      var collapseSelector = $element.data("target");
      _this.$collapse = $$$1(collapseSelector);
      Util$2.assert($element, _this.$collapse.length === 0, "Cannot find collapse target for " + Util$2.describe($element));
      Util$2.assert(_this.$collapse, !_this.$collapse.hasClass(ClassName.COLLAPSE), Util$2.describe(_this.$collapse) + " is expected to have the '" + ClassName.COLLAPSE + "' class.  It is being targeted by " + Util$2.describe($element)); // find the first input for focusing

      var $inputs = _this.$bmdFormGroup.find(Selector.ANY_INPUT);

      if ($inputs.length > 0) ***REMOVED***
        _this.$input = $inputs.first();
      ***REMOVED*** // automatically add the marker class to collapse width instead of height - nice convenience because it is easily forgotten


      if (!_this.$collapse.hasClass(ClassName.WIDTH)) ***REMOVED***
        _this.$collapse.addClass(ClassName.WIDTH);
      ***REMOVED***

      if (_this.$input) ***REMOVED***
        // add a listener to set focus
        _this.$collapse.on("shown.bs.collapse", function () ***REMOVED***
          _this.$input.focus();
        ***REMOVED***); // add a listener to collapse field


        _this.$input.blur(function () ***REMOVED***
          _this.$collapse.collapse("hide");
        ***REMOVED***);
      ***REMOVED***

      return _this;
    ***REMOVED***

    var _proto = CollapseInline.prototype;

    _proto.dispose = function dispose() ***REMOVED***
      _Base.prototype.dispose.call(this, DATA_KEY);

      this.$bmdFormGroup = null;
      this.$collapse = null;
      this.$input = null;
    ***REMOVED***; // ------------------------------------------------------------------------
    // private
    // ------------------------------------------------------------------------
    // static


    CollapseInline._jQueryInterface = function _jQueryInterface(config) ***REMOVED***
      return this.each(function () ***REMOVED***
        var $element = $$$1(this);
        var data = $element.data(DATA_KEY);

        if (!data) ***REMOVED***
          data = new CollapseInline($element, config);
          $element.data(DATA_KEY, data);
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***;

    return CollapseInline;
  ***REMOVED***(Base);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $$$1.fn[JQUERY_NAME] = CollapseInline._jQueryInterface;
  $$$1.fn[JQUERY_NAME].Constructor = CollapseInline;

  $$$1.fn[JQUERY_NAME].noConflict = function () ***REMOVED***
    $$$1.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
    return CollapseInline._jQueryInterface;
  ***REMOVED***;

  return CollapseInline;
***REMOVED***(jQuery);

//import Radio from './radio'
//import Switch from './switch'
//import Text from './text'
//import Textarea from './textarea'
//import Select from './select'

var File = function ($$$1) ***REMOVED***
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = "file";
  var DATA_KEY = "bmd." + NAME;
  var JQUERY_NAME = "bmd" + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
  var JQUERY_NO_CONFLICT = $$$1.fn[JQUERY_NAME];
  var Default = ***REMOVED******REMOVED***;
  var ClassName = ***REMOVED***
    FILE: NAME,
    IS_FILE: "is-file"
  ***REMOVED***;
  var Selector = ***REMOVED***
    FILENAMES: "input.form-control[readonly]"
  ***REMOVED***;
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var File =
  /*#__PURE__*/
  function (_BaseInput) ***REMOVED***
    _inheritsLoose(File, _BaseInput);

    function File($element, config) ***REMOVED***
      var _this;

      _this = _BaseInput.call(this, $element, $$$1.extend(true, //***REMOVED***invalidComponentMatches: [Checkbox, Radio, Text, Textarea, Select, Switch]***REMOVED***,
      Default, config)) || this;

      _this.$bmdFormGroup.addClass(ClassName.IS_FILE);

      return _this;
    ***REMOVED***

    var _proto = File.prototype;

    _proto.dispose = function dispose() ***REMOVED***
      _BaseInput.prototype.dispose.call(this, DATA_KEY);
    ***REMOVED***;

    File.matches = function matches($element) ***REMOVED***
      if ($element.attr("type") === "file") ***REMOVED***
        return true;
      ***REMOVED***

      return false;
    ***REMOVED***;

    File.rejectMatch = function rejectMatch(component, $element) ***REMOVED***
      Util$2.assert(this.$element, this.matches($element), component + " component element " + Util$2.describe($element) + " is invalid for type='file'.");
    ***REMOVED***; // ------------------------------------------------------------------------
    // protected
    // Demarcation element (e.g. first child of a form-group)


    _proto.outerElement = function outerElement() ***REMOVED***
      // label.file > input[type=file]
      return this.$element.parent().closest("." + ClassName.FILE);
    ***REMOVED***;

    _proto.rejectWithoutRequiredStructure = function rejectWithoutRequiredStructure() ***REMOVED***
      // label.file > input[type=file]
      Util$2.assert(this.$element, !this.outerElement().prop("tagName") === "label", this.constructor.name + "'s " + Util$2.describe(this.$element) + " parent element " + Util$2.describe(this.outerElement()) + " should be <label>.");
      Util$2.assert(this.$element, !this.outerElement().hasClass(ClassName.FILE), this.constructor.name + "'s " + Util$2.describe(this.$element) + " parent element " + Util$2.describe(this.outerElement()) + " should have class ." + ClassName.FILE + ".");
    ***REMOVED***;

    _proto.addFocusListener = function addFocusListener() ***REMOVED***
      var _this2 = this;

      this.$bmdFormGroup.on("focus", function () ***REMOVED***
        _this2.addFormGroupFocus();
      ***REMOVED***).on("blur", function () ***REMOVED***
        _this2.removeFormGroupFocus();
      ***REMOVED***);
    ***REMOVED***;

    _proto.addChangeListener = function addChangeListener() ***REMOVED***
      var _this3 = this;

      // set the fileinput readonly field with the name of the file
      this.$element.on("change", function () ***REMOVED***
        var value = "";
        $$$1.each(_this3.$element.files, function (i, file) ***REMOVED***
          value += file.name + "  , ";
        ***REMOVED***);
        value = value.substring(0, value.length - 2);

        if (value) ***REMOVED***
          _this3.addIsFilled();
        ***REMOVED*** else ***REMOVED***
          _this3.removeIsFilled();
        ***REMOVED***

        _this3.$bmdFormGroup.find(Selector.FILENAMES).val(value);
      ***REMOVED***);
    ***REMOVED***; // ------------------------------------------------------------------------
    // private
    // ------------------------------------------------------------------------
    // static


    File._jQueryInterface = function _jQueryInterface(config) ***REMOVED***
      return this.each(function () ***REMOVED***
        var $element = $$$1(this);
        var data = $element.data(DATA_KEY);

        if (!data) ***REMOVED***
          data = new File($element, config);
          $element.data(DATA_KEY, data);
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***;

    return File;
  ***REMOVED***(BaseInput);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $$$1.fn[JQUERY_NAME] = File._jQueryInterface;
  $$$1.fn[JQUERY_NAME].Constructor = File;

  $$$1.fn[JQUERY_NAME].noConflict = function () ***REMOVED***
    $$$1.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
    return File._jQueryInterface;
  ***REMOVED***;

  return File;
***REMOVED***(jQuery);

//import File from './file'
//import Checkbox from './checkbox'
//import Switch from './switch'

var Radio = function ($$$1) ***REMOVED***
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = "radio";
  var DATA_KEY = "bmd." + NAME;
  var JQUERY_NAME = "bmd" + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
  var JQUERY_NO_CONFLICT = $$$1.fn[JQUERY_NAME];
  var Default = ***REMOVED***
    template: "<span class='bmd-radio'></span>"
  ***REMOVED***;
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Radio =
  /*#__PURE__*/
  function (_BaseSelection) ***REMOVED***
    _inheritsLoose(Radio, _BaseSelection);

    function Radio($element, config, properties) ***REMOVED***
      if (properties === void 0) ***REMOVED***
        properties = ***REMOVED***
          inputType: NAME,
          outerClass: NAME
        ***REMOVED***;
      ***REMOVED***

      return _BaseSelection.call(this, $element, $$$1.extend(true, //***REMOVED***invalidComponentMatches: [Checkbox, File, Switch, Text]***REMOVED***,
      Default, config), properties) || this;
    ***REMOVED***

    var _proto = Radio.prototype;

    _proto.dispose = function dispose(dataKey) ***REMOVED***
      if (dataKey === void 0) ***REMOVED***
        dataKey = DATA_KEY;
      ***REMOVED***

      _BaseSelection.prototype.dispose.call(this, dataKey);
    ***REMOVED***;

    Radio.matches = function matches($element) ***REMOVED***
      // '.radio > label > input[type=radio]'
      if ($element.attr("type") === "radio") ***REMOVED***
        return true;
      ***REMOVED***

      return false;
    ***REMOVED***;

    Radio.rejectMatch = function rejectMatch(component, $element) ***REMOVED***
      Util$2.assert(this.$element, this.matches($element), component + " component element " + Util$2.describe($element) + " is invalid for type='radio'.");
    ***REMOVED***; // ------------------------------------------------------------------------
    // protected
    //decorateMarkup() ***REMOVED***
    //  this.$element.after(this.config.template)
    //***REMOVED***
    // ------------------------------------------------------------------------
    // private
    // ------------------------------------------------------------------------
    // static


    Radio._jQueryInterface = function _jQueryInterface(config) ***REMOVED***
      return this.each(function () ***REMOVED***
        var $element = $$$1(this);
        var data = $element.data(DATA_KEY);

        if (!data) ***REMOVED***
          data = new Radio($element, config);
          $element.data(DATA_KEY, data);
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***;

    return Radio;
  ***REMOVED***(BaseSelection);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $$$1.fn[JQUERY_NAME] = Radio._jQueryInterface;
  $$$1.fn[JQUERY_NAME].Constructor = Radio;

  $$$1.fn[JQUERY_NAME].noConflict = function () ***REMOVED***
    $$$1.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
    return Radio._jQueryInterface;
  ***REMOVED***;

  return Radio;
***REMOVED***(jQuery);

var RadioInline = function ($$$1) ***REMOVED***
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = "radioInline";
  var DATA_KEY = "bmd." + NAME;
  var JQUERY_NAME = "bmd" + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
  var JQUERY_NO_CONFLICT = $$$1.fn[JQUERY_NAME];
  var Default = ***REMOVED***
    bmdFormGroup: ***REMOVED***
      create: false,
      // no bmd-form-group creation if form-group not present. It messes with the layout.
      required: false
    ***REMOVED***
  ***REMOVED***;
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var RadioInline =
  /*#__PURE__*/
  function (_Radio) ***REMOVED***
    _inheritsLoose(RadioInline, _Radio);

    function RadioInline($element, config, properties) ***REMOVED***
      if (properties === void 0) ***REMOVED***
        properties = ***REMOVED***
          inputType: "radio",
          outerClass: "radio-inline"
        ***REMOVED***;
      ***REMOVED***

      return _Radio.call(this, $element, $$$1.extend(true, ***REMOVED******REMOVED***, Default, config), properties) || this;
    ***REMOVED***

    var _proto = RadioInline.prototype;

    _proto.dispose = function dispose() ***REMOVED***
      _Radio.prototype.dispose.call(this, DATA_KEY);
    ***REMOVED***; // ------------------------------------------------------------------------
    // protected
    // ------------------------------------------------------------------------
    // protected
    // ------------------------------------------------------------------------
    // private
    // ------------------------------------------------------------------------
    // static


    RadioInline._jQueryInterface = function _jQueryInterface(config) ***REMOVED***
      return this.each(function () ***REMOVED***
        var $element = $$$1(this);
        var data = $element.data(DATA_KEY);

        if (!data) ***REMOVED***
          data = new RadioInline($element, config);
          $element.data(DATA_KEY, data);
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***;

    return RadioInline;
  ***REMOVED***(Radio);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $$$1.fn[JQUERY_NAME] = RadioInline._jQueryInterface;
  $$$1.fn[JQUERY_NAME].Constructor = RadioInline;

  $$$1.fn[JQUERY_NAME].noConflict = function () ***REMOVED***
    $$$1.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
    return RadioInline._jQueryInterface;
  ***REMOVED***;

  return RadioInline;
***REMOVED***(jQuery);

var BaseFormControl = function ($$$1) ***REMOVED***
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var Default = ***REMOVED***
    requiredClasses: ["form-control"]
  ***REMOVED***;
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var BaseFormControl =
  /*#__PURE__*/
  function (_BaseInput) ***REMOVED***
    _inheritsLoose(BaseFormControl, _BaseInput);

    function BaseFormControl($element, config) ***REMOVED***
      var _this;

      _this = _BaseInput.call(this, $element, $$$1.extend(true, Default, config)) || this; // Initially mark as empty

      if (_this.isEmpty()) ***REMOVED***
        _this.removeIsFilled();
      ***REMOVED***

      return _this;
    ***REMOVED***

    return BaseFormControl;
  ***REMOVED***(BaseInput);

  return BaseFormControl;
***REMOVED***(jQuery);

//import File from './file'
//import Radio from './radio'
//import Switch from './switch'
//import Text from './text'
//import Textarea from './textarea'

var Select = function ($$$1) ***REMOVED***
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = "select";
  var DATA_KEY = "bmd." + NAME;
  var JQUERY_NAME = "bmd" + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
  var JQUERY_NO_CONFLICT = $$$1.fn[JQUERY_NAME];
  var Default = ***REMOVED***
    requiredClasses: ["form-control||custom-select"]
  ***REMOVED***;
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Select =
  /*#__PURE__*/
  function (_BaseFormControl) ***REMOVED***
    _inheritsLoose(Select, _BaseFormControl);

    function Select($element, config) ***REMOVED***
      var _this;

      _this = _BaseFormControl.call(this, $element, $$$1.extend(true, //***REMOVED***invalidComponentMatches: [Checkbox, File, Radio, Switch, Text, Textarea]***REMOVED***,
      Default, config)) || this; // floating labels will cover the options, so trigger them to be above (if used)

      _this.addIsFilled();

      return _this;
    ***REMOVED***

    var _proto = Select.prototype;

    _proto.dispose = function dispose() ***REMOVED***
      _BaseFormControl.prototype.dispose.call(this, DATA_KEY);
    ***REMOVED***;

    Select.matches = function matches($element) ***REMOVED***
      if ($element.prop("tagName") === "select") ***REMOVED***
        return true;
      ***REMOVED***

      return false;
    ***REMOVED***;

    Select.rejectMatch = function rejectMatch(component, $element) ***REMOVED***
      Util$2.assert(this.$element, this.matches($element), component + " component element " + Util$2.describe($element) + " is invalid for <select>.");
    ***REMOVED***; // ------------------------------------------------------------------------
    // protected
    // ------------------------------------------------------------------------
    // private
    // ------------------------------------------------------------------------
    // static


    Select._jQueryInterface = function _jQueryInterface(config) ***REMOVED***
      return this.each(function () ***REMOVED***
        var $element = $$$1(this);
        var data = $element.data(DATA_KEY);

        if (!data) ***REMOVED***
          data = new Select($element, config);
          $element.data(DATA_KEY, data);
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***;

    return Select;
  ***REMOVED***(BaseFormControl);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $$$1.fn[JQUERY_NAME] = Select._jQueryInterface;
  $$$1.fn[JQUERY_NAME].Constructor = Select;

  $$$1.fn[JQUERY_NAME].noConflict = function () ***REMOVED***
    $$$1.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
    return Select._jQueryInterface;
  ***REMOVED***;

  return Select;
***REMOVED***(jQuery);

var Switch = function ($$$1) ***REMOVED***
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = "switch";
  var DATA_KEY = "bmd." + NAME;
  var JQUERY_NAME = "bmd" + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
  var JQUERY_NO_CONFLICT = $$$1.fn[JQUERY_NAME];
  var Default = ***REMOVED***
    template: "<span class='bmd-switch-track'></span>"
  ***REMOVED***;
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Switch =
  /*#__PURE__*/
  function (_Checkbox) ***REMOVED***
    _inheritsLoose(Switch, _Checkbox);

    function Switch($element, config, properties) ***REMOVED***
      if (properties === void 0) ***REMOVED***
        properties = ***REMOVED***
          inputType: "checkbox",
          outerClass: "switch"
        ***REMOVED***;
      ***REMOVED***

      return _Checkbox.call(this, $element, $$$1.extend(true, ***REMOVED******REMOVED***, Default, config), properties) || this; // selector: '.switch > label > input[type=checkbox]'
    ***REMOVED***

    var _proto = Switch.prototype;

    _proto.dispose = function dispose() ***REMOVED***
      _Checkbox.prototype.dispose.call(this, DATA_KEY);
    ***REMOVED***; // ------------------------------------------------------------------------
    // protected
    // ------------------------------------------------------------------------
    // private
    // ------------------------------------------------------------------------
    // static


    Switch._jQueryInterface = function _jQueryInterface(config) ***REMOVED***
      return this.each(function () ***REMOVED***
        var $element = $$$1(this);
        var data = $element.data(DATA_KEY);

        if (!data) ***REMOVED***
          data = new Switch($element, config);
          $element.data(DATA_KEY, data);
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***;

    return Switch;
  ***REMOVED***(Checkbox);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $$$1.fn[JQUERY_NAME] = Switch._jQueryInterface;
  $$$1.fn[JQUERY_NAME].Constructor = Switch;

  $$$1.fn[JQUERY_NAME].noConflict = function () ***REMOVED***
    $$$1.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
    return Switch._jQueryInterface;
  ***REMOVED***;

  return Switch;
***REMOVED***(jQuery);

//import File from './file'
//import Radio from './radio'
//import Switch from './switch'
//import Textarea from './textarea'
//import Select from './select'

var Text = function ($$$1) ***REMOVED***
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = "text";
  var DATA_KEY = "bmd." + NAME;
  var JQUERY_NAME = "bmd" + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
  var JQUERY_NO_CONFLICT = $$$1.fn[JQUERY_NAME];
  var Default = ***REMOVED******REMOVED***;
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Text =
  /*#__PURE__*/
  function (_BaseFormControl) ***REMOVED***
    _inheritsLoose(Text, _BaseFormControl);

    function Text($element, config) ***REMOVED***
      return _BaseFormControl.call(this, $element, $$$1.extend(true, //***REMOVED***invalidComponentMatches: [Checkbox, File, Radio, Switch, Select, Textarea]***REMOVED***,
      Default, config)) || this;
    ***REMOVED***

    var _proto = Text.prototype;

    _proto.dispose = function dispose(dataKey) ***REMOVED***
      if (dataKey === void 0) ***REMOVED***
        dataKey = DATA_KEY;
      ***REMOVED***

      _BaseFormControl.prototype.dispose.call(this, dataKey);
    ***REMOVED***;

    Text.matches = function matches($element) ***REMOVED***
      if ($element.attr("type") === "text") ***REMOVED***
        return true;
      ***REMOVED***

      return false;
    ***REMOVED***;

    Text.rejectMatch = function rejectMatch(component, $element) ***REMOVED***
      Util$2.assert(this.$element, this.matches($element), component + " component element " + Util$2.describe($element) + " is invalid for type='text'.");
    ***REMOVED***; // ------------------------------------------------------------------------
    // protected
    // ------------------------------------------------------------------------
    // private
    // ------------------------------------------------------------------------
    // static


    Text._jQueryInterface = function _jQueryInterface(config) ***REMOVED***
      return this.each(function () ***REMOVED***
        var $element = $$$1(this);
        var data = $element.data(DATA_KEY);

        if (!data) ***REMOVED***
          data = new Text($element, config);
          $element.data(DATA_KEY, data);
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***;

    return Text;
  ***REMOVED***(BaseFormControl);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $$$1.fn[JQUERY_NAME] = Text._jQueryInterface;
  $$$1.fn[JQUERY_NAME].Constructor = Text;

  $$$1.fn[JQUERY_NAME].noConflict = function () ***REMOVED***
    $$$1.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
    return Text._jQueryInterface;
  ***REMOVED***;

  return Text;
***REMOVED***(jQuery);

//import File from './file'
//import Radio from './radio'
//import Switch from './switch'
//import Text from './text'
//import Select from './select'

var Textarea = function ($$$1) ***REMOVED***
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = "textarea";
  var DATA_KEY = "bmd." + NAME;
  var JQUERY_NAME = "bmd" + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
  var JQUERY_NO_CONFLICT = $$$1.fn[JQUERY_NAME];
  var Default = ***REMOVED******REMOVED***;
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Textarea =
  /*#__PURE__*/
  function (_BaseFormControl) ***REMOVED***
    _inheritsLoose(Textarea, _BaseFormControl);

    function Textarea($element, config) ***REMOVED***
      return _BaseFormControl.call(this, $element, $$$1.extend(true, //***REMOVED***invalidComponentMatches: [Checkbox, File, Radio, Text, Select, Switch]***REMOVED***,
      Default, config)) || this;
    ***REMOVED***

    var _proto = Textarea.prototype;

    _proto.dispose = function dispose() ***REMOVED***
      _BaseFormControl.prototype.dispose.call(this, DATA_KEY);
    ***REMOVED***;

    Textarea.matches = function matches($element) ***REMOVED***
      if ($element.prop("tagName") === "textarea") ***REMOVED***
        return true;
      ***REMOVED***

      return false;
    ***REMOVED***;

    Textarea.rejectMatch = function rejectMatch(component, $element) ***REMOVED***
      Util$2.assert(this.$element, this.matches($element), component + " component element " + Util$2.describe($element) + " is invalid for <textarea>.");
    ***REMOVED***; // ------------------------------------------------------------------------
    // protected
    // ------------------------------------------------------------------------
    // private
    // ------------------------------------------------------------------------
    // static


    Textarea._jQueryInterface = function _jQueryInterface(config) ***REMOVED***
      return this.each(function () ***REMOVED***
        var $element = $$$1(this);
        var data = $element.data(DATA_KEY);

        if (!data) ***REMOVED***
          data = new Textarea($element, config);
          $element.data(DATA_KEY, data);
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***;

    return Textarea;
  ***REMOVED***(BaseFormControl);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $$$1.fn[JQUERY_NAME] = Textarea._jQueryInterface;
  $$$1.fn[JQUERY_NAME].Constructor = Textarea;

  $$$1.fn[JQUERY_NAME].noConflict = function () ***REMOVED***
    $$$1.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
    return Textarea._jQueryInterface;
  ***REMOVED***;

  return Textarea;
***REMOVED***(jQuery);

/* global Popper */

/**
 * This is a copy of the Bootstrap's original dropdown.js, with the only addition
 * of two new classes: 'showing' and 'hiding', used to handle animaitons.
 */
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.1.0): dropdown.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Dropdown = function ($$$1) ***REMOVED***
  /**
   * Check for Popper dependency
   * Popper - https://popper.js.org
   */
  if (typeof Popper === 'undefined') ***REMOVED***
    throw new Error('Bootstrap dropdown require Popper.js (https://popper.js.org)');
  ***REMOVED***
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME = 'dropdown';
  var VERSION = '4.1.0';
  var DATA_KEY = 'bs.dropdown';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

  var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key

  var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key

  var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key

  var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key

  var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

  var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
  var Event = ***REMOVED***
    HIDE: "hide" + EVENT_KEY,
    HIDDEN: "hidden" + EVENT_KEY,
    SHOW: "show" + EVENT_KEY,
    SHOWN: "shown" + EVENT_KEY,
    CLICK: "click" + EVENT_KEY,
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
    KEYDOWN_DATA_API: "keydown" + EVENT_KEY + DATA_API_KEY,
    KEYUP_DATA_API: "keyup" + EVENT_KEY + DATA_API_KEY,
    TRANSITION_END: 'transitionend webkitTransitionEnd oTransitionEnd animationend webkitAnimationEnd oAnimationEnd'
  ***REMOVED***;
  var ClassName = ***REMOVED***
    DISABLED: 'disabled',
    SHOW: 'show',
    SHOWING: 'showing',
    HIDING: 'hiding',
    DROPUP: 'dropup',
    MENURIGHT: 'dropdown-menu-right',
    MENULEFT: 'dropdown-menu-left'
  ***REMOVED***;
  var Selector = ***REMOVED***
    DATA_TOGGLE: '[data-toggle="dropdown"]',
    FORM_CHILD: '.dropdown form',
    MENU: '.dropdown-menu',
    NAVBAR_NAV: '.navbar-nav',
    VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled)'
  ***REMOVED***;
  var AttachmentMap = ***REMOVED***
    TOP: 'top-start',
    TOPEND: 'top-end',
    BOTTOM: 'bottom-start',
    BOTTOMEND: 'bottom-end'
  ***REMOVED***;
  var Default = ***REMOVED***
    placement: AttachmentMap.BOTTOM,
    offset: 0,
    flip: true
  ***REMOVED***;
  var DefaultType = ***REMOVED***
    placement: 'string',
    offset: '(number|string)',
    flip: 'boolean'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  ***REMOVED***;

  var Dropdown =
  /*#__PURE__*/
  function () ***REMOVED***
    function Dropdown(element, config) ***REMOVED***
      this._element = element;
      this._popper = null;
      this._config = this._getConfig(config);
      this._menu = this._getMenuElement();
      this._inNavbar = this._detectNavbar();

      this._addEventListeners();
    ***REMOVED*** // getters


    var _proto = Dropdown.prototype;

    // public
    _proto.toggle = function toggle() ***REMOVED***
      var _this = this;

      if (this._element.disabled || $$$1(this._element).hasClass(ClassName.DISABLED)) ***REMOVED***
        return;
      ***REMOVED***

      var parent = Dropdown._getParentFromElement(this._element);

      var isActive = $$$1(this._menu).hasClass(ClassName.SHOW);

      Dropdown._clearMenus();

      if (isActive) ***REMOVED***
        return;
      ***REMOVED***

      var relatedTarget = ***REMOVED***
        relatedTarget: this._element
      ***REMOVED***;
      var showEvent = $$$1.Event(Event.SHOW, relatedTarget);
      $$$1(parent).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) ***REMOVED***
        return;
      ***REMOVED***

      var element = this._element; // for dropup with alignment we use the parent as popper container

      if ($$$1(parent).hasClass(ClassName.DROPUP)) ***REMOVED***
        if ($$$1(this._menu).hasClass(ClassName.MENULEFT) || $$$1(this._menu).hasClass(ClassName.MENURIGHT)) ***REMOVED***
          element = parent;
        ***REMOVED***
      ***REMOVED***

      this._popper = new Popper(element, this._menu, this._getPopperConfig()); // if this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

      if ('ontouchstart' in document.documentElement && !$$$1(parent).closest(Selector.NAVBAR_NAV).length) ***REMOVED***
        $$$1('body').children().on('mouseover', null, $$$1.noop);
      ***REMOVED***

      this._element.focus();

      this._element.setAttribute('aria-expanded', true);

      $$$1(this._menu).one(Event.TRANSITION_END, function () ***REMOVED***
        $$$1(parent).trigger($$$1.Event(Event.SHOWN, relatedTarget));
        $$$1(_this._menu).removeClass(ClassName.SHOWING);
      ***REMOVED***);
      $$$1(this._menu).addClass(ClassName.SHOW + " " + ClassName.SHOWING);
      $$$1(parent).addClass(ClassName.SHOW);
    ***REMOVED***;

    _proto.dispose = function dispose() ***REMOVED***
      $$$1.removeData(this._element, DATA_KEY);
      $$$1(this._element).off(EVENT_KEY);
      this._element = null;
      this._menu = null;

      if (this._popper !== null) ***REMOVED***
        this._popper.destroy();
      ***REMOVED***

      this._popper = null;
    ***REMOVED***;

    _proto.update = function update() ***REMOVED***
      this._inNavbar = this._detectNavbar();

      if (this._popper !== null) ***REMOVED***
        this._popper.scheduleUpdate();
      ***REMOVED***
    ***REMOVED***; // private


    _proto._addEventListeners = function _addEventListeners() ***REMOVED***
      var _this2 = this;

      $$$1(this._element).on(Event.CLICK, function (event) ***REMOVED***
        event.preventDefault();
        event.stopPropagation();

        _this2.toggle();
      ***REMOVED***);
    ***REMOVED***;

    _proto._getConfig = function _getConfig(config) ***REMOVED***
      var elementData = $$$1(this._element).data();

      if (elementData.placement !== undefined) ***REMOVED***
        elementData.placement = AttachmentMap[elementData.placement.toUpperCase()];
      ***REMOVED***

      config = $$$1.extend(***REMOVED******REMOVED***, this.constructor.Default, $$$1(this._element).data(), config);
      Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);
      return config;
    ***REMOVED***;

    _proto._getMenuElement = function _getMenuElement() ***REMOVED***
      if (!this._menu) ***REMOVED***
        var parent = Dropdown._getParentFromElement(this._element);

        this._menu = $$$1(parent).find(Selector.MENU)[0];
      ***REMOVED***

      return this._menu;
    ***REMOVED***;

    _proto._getPlacement = function _getPlacement() ***REMOVED***
      var $parentDropdown = $$$1(this._element).parent();
      var placement = this._config.placement; // Handle dropup

      if ($parentDropdown.hasClass(ClassName.DROPUP) || this._config.placement === AttachmentMap.TOP) ***REMOVED***
        placement = AttachmentMap.TOP;

        if ($$$1(this._menu).hasClass(ClassName.MENURIGHT)) ***REMOVED***
          placement = AttachmentMap.TOPEND;
        ***REMOVED***
      ***REMOVED*** else if ($$$1(this._menu).hasClass(ClassName.MENURIGHT)) ***REMOVED***
        placement = AttachmentMap.BOTTOMEND;
      ***REMOVED***

      return placement;
    ***REMOVED***;

    _proto._detectNavbar = function _detectNavbar() ***REMOVED***
      return $$$1(this._element).closest('.navbar').length > 0;
    ***REMOVED***;

    _proto._getPopperConfig = function _getPopperConfig() ***REMOVED***
      var popperConfig = ***REMOVED***
        placement: this._getPlacement(),
        modifiers: ***REMOVED***
          offset: ***REMOVED***
            offset: this._config.offset
          ***REMOVED***,
          flip: ***REMOVED***
            enabled: this._config.flip
          ***REMOVED***
        ***REMOVED*** // Disable Popper.js for Dropdown in Navbar

      ***REMOVED***;

      if (this._inNavbar) ***REMOVED***
        popperConfig.modifiers.applyStyle = ***REMOVED***
          enabled: !this._inNavbar
        ***REMOVED***;
      ***REMOVED***

      return popperConfig;
    ***REMOVED***; // static


    Dropdown._jQueryInterface = function _jQueryInterface(config) ***REMOVED***
      return this.each(function () ***REMOVED***
        var data = $$$1(this).data(DATA_KEY);

        var _config = typeof config === 'object' ? config : null;

        if (!data) ***REMOVED***
          data = new Dropdown(this, _config);
          $$$1(this).data(DATA_KEY, data);
        ***REMOVED***

        if (typeof config === 'string') ***REMOVED***
          if (data[config] === undefined) ***REMOVED***
            throw new Error("No method named \"" + config + "\"");
          ***REMOVED***

          data[config]();
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***;

    Dropdown._clearMenus = function _clearMenus(event) ***REMOVED***
      if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) ***REMOVED***
        return;
      ***REMOVED***

      var toggles = $$$1.makeArray($$$1(Selector.DATA_TOGGLE));

      var _loop = function _loop(i) ***REMOVED***
        var parent = Dropdown._getParentFromElement(toggles[i]);

        var context = $$$1(toggles[i]).data(DATA_KEY);
        var relatedTarget = ***REMOVED***
          relatedTarget: toggles[i]
        ***REMOVED***;

        if (!context) ***REMOVED***
          return "continue";
        ***REMOVED***

        var dropdownMenu = context._menu;

        if (!$$$1(parent).hasClass(ClassName.SHOW)) ***REMOVED***
          return "continue";
        ***REMOVED***

        if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $$$1.contains(parent, event.target)) ***REMOVED***
          return "continue";
        ***REMOVED***

        var hideEvent = $$$1.Event(Event.HIDE, relatedTarget);
        $$$1(parent).trigger(hideEvent);

        if (hideEvent.isDefaultPrevented()) ***REMOVED***
          return "continue";
        ***REMOVED*** // if this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support


        if ('ontouchstart' in document.documentElement) ***REMOVED***
          $$$1('body').children().off('mouseover', null, $$$1.noop);
        ***REMOVED***

        toggles[i].setAttribute('aria-expanded', 'false');
        $$$1(dropdownMenu).addClass(ClassName.HIDING).removeClass(ClassName.SHOW);
        $$$1(parent).removeClass(ClassName.SHOW);
        $$$1(dropdownMenu).one(Event.TRANSITION_END, function () ***REMOVED***
          $$$1(parent).trigger($$$1.Event(Event.HIDDEN, relatedTarget));
          $$$1(dropdownMenu).removeClass(ClassName.HIDING);
        ***REMOVED***);
      ***REMOVED***;

      for (var i = 0; i < toggles.length; i++) ***REMOVED***
        var _ret = _loop(i);

        if (_ret === "continue") continue;
      ***REMOVED***
    ***REMOVED***;

    Dropdown._getParentFromElement = function _getParentFromElement(element) ***REMOVED***
      var parent;
      var selector = Util.getSelectorFromElement(element);

      if (selector) ***REMOVED***
        parent = $$$1(selector)[0];
      ***REMOVED***

      return parent || element.parentNode;
    ***REMOVED***;

    Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) ***REMOVED***
      if (!REGEXP_KEYDOWN.test(event.which) || /button/i.test(event.target.tagName) && event.which === SPACE_KEYCODE || /input|textarea/i.test(event.target.tagName)) ***REMOVED***
        return;
      ***REMOVED***

      event.preventDefault();
      event.stopPropagation();

      if (this.disabled || $$$1(this).hasClass(ClassName.DISABLED)) ***REMOVED***
        return;
      ***REMOVED***

      var parent = Dropdown._getParentFromElement(this);

      var isActive = $$$1(parent).hasClass(ClassName.SHOW);

      if (!isActive && (event.which !== ESCAPE_KEYCODE || event.which !== SPACE_KEYCODE) || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) ***REMOVED***
        if (event.which === ESCAPE_KEYCODE) ***REMOVED***
          var toggle = $$$1(parent).find(Selector.DATA_TOGGLE)[0];
          $$$1(toggle).trigger('focus');
        ***REMOVED***

        $$$1(this).trigger('click');
        return;
      ***REMOVED***

      var items = $$$1(parent).find(Selector.VISIBLE_ITEMS).get();

      if (!items.length) ***REMOVED***
        return;
      ***REMOVED***

      var index = items.indexOf(event.target);

      if (event.which === ARROW_UP_KEYCODE && index > 0) ***REMOVED***
        // up
        index--;
      ***REMOVED***

      if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) ***REMOVED***
        // down
        index++;
      ***REMOVED***

      if (index < 0) ***REMOVED***
        index = 0;
      ***REMOVED***

      items[index].focus();
    ***REMOVED***;

    _createClass(Dropdown, null, [***REMOVED***
      key: "VERSION",
      get: function get() ***REMOVED***
        return VERSION;
      ***REMOVED***
    ***REMOVED***, ***REMOVED***
      key: "Default",
      get: function get() ***REMOVED***
        return Default;
      ***REMOVED***
    ***REMOVED***, ***REMOVED***
      key: "DefaultType",
      get: function get() ***REMOVED***
        return DefaultType;
      ***REMOVED***
    ***REMOVED***]);
    return Dropdown;
  ***REMOVED***();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $$$1(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.MENU, Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API + " " + Event.KEYUP_DATA_API, Dropdown._clearMenus).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) ***REMOVED***
    event.preventDefault();
    event.stopPropagation();

    Dropdown._jQueryInterface.call($$$1(this), 'toggle');
  ***REMOVED***).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function (e) ***REMOVED***
    e.stopPropagation();
  ***REMOVED***);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $$$1.fn[NAME] = Dropdown._jQueryInterface;
  $$$1.fn[NAME].Constructor = Dropdown;

  $$$1.fn[NAME].noConflict = function () ***REMOVED***
    $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
    return Dropdown._jQueryInterface;
  ***REMOVED***;

  return Dropdown;
***REMOVED***(jQuery);

var BaseLayout = function ($$$1) ***REMOVED***
  var ClassName = ***REMOVED***
    CANVAS: "bmd-layout-canvas",
    CONTAINER: "bmd-layout-container",
    BACKDROP: "bmd-layout-backdrop"
  ***REMOVED***;
  var Selector = ***REMOVED***
    CANVAS: "." + ClassName.CANVAS,
    CONTAINER: "." + ClassName.CONTAINER,
    BACKDROP: "." + ClassName.BACKDROP
  ***REMOVED***;
  var Default = ***REMOVED***
    canvas: ***REMOVED***
      create: true,
      required: true,
      template: "<div class=\"" + ClassName.CANVAS + "\"></div>"
    ***REMOVED***,
    backdrop: ***REMOVED***
      create: true,
      required: true,
      template: "<div class=\"" + ClassName.BACKDROP + "\"></div>"
    ***REMOVED***
  ***REMOVED***;
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var BaseLayout =
  /*#__PURE__*/
  function (_Base) ***REMOVED***
    _inheritsLoose(BaseLayout, _Base);

    function BaseLayout($element, config, properties) ***REMOVED***
      var _this;

      if (properties === void 0) ***REMOVED***
        properties = ***REMOVED******REMOVED***;
      ***REMOVED***

      _this = _Base.call(this, $element, $$$1.extend(true, ***REMOVED******REMOVED***, Default, config), properties) || this;
      _this.$container = _this.findContainer(true);
      _this.$backdrop = _this.resolveBackdrop();

      _this.resolveCanvas();

      return _this;
    ***REMOVED***

    var _proto = BaseLayout.prototype;

    _proto.dispose = function dispose(dataKey) ***REMOVED***
      _Base.prototype.dispose.call(this, dataKey);

      this.$container = null;
      this.$backdrop = null;
    ***REMOVED***; // ------------------------------------------------------------------------
    // protected
    // Will wrap container in bmd-layout-canvas if necessary


    _proto.resolveCanvas = function resolveCanvas() ***REMOVED***
      var bd = this.findCanvas(false);

      if (bd === undefined || bd.length === 0) ***REMOVED***
        if (this.config.canvas.create) ***REMOVED***
          this.$container.wrap(this.config.canvas.template);
        ***REMOVED***

        bd = this.findCanvas(this.config.canvas.required);
      ***REMOVED***

      return bd;
    ***REMOVED***; // Find closest bmd-layout-container based on the given context


    _proto.findCanvas = function findCanvas(raiseError, context) ***REMOVED***
      if (raiseError === void 0) ***REMOVED***
        raiseError = true;
      ***REMOVED***

      if (context === void 0) ***REMOVED***
        context = this.$container;
      ***REMOVED***

      var canvas = context.closest(Selector.CANVAS);

      if (canvas.length === 0 && raiseError) ***REMOVED***
        $$$1.error("Failed to find " + Selector.CANVAS + " for " + Util$2.describe(context));
      ***REMOVED***

      return canvas;
    ***REMOVED***; // Will add bmd-layout-backdrop to bmd-layout-container if necessary


    _proto.resolveBackdrop = function resolveBackdrop() ***REMOVED***
      var bd = this.findBackdrop(false);

      if (bd === undefined || bd.length === 0) ***REMOVED***
        if (this.config.backdrop.create) ***REMOVED***
          this.$container.append(this.config.backdrop.template);
        ***REMOVED***

        bd = this.findBackdrop(this.config.backdrop.required);
      ***REMOVED***

      return bd;
    ***REMOVED***; // Find closest bmd-layout-container based on the given context


    _proto.findBackdrop = function findBackdrop(raiseError, context) ***REMOVED***
      if (raiseError === void 0) ***REMOVED***
        raiseError = true;
      ***REMOVED***

      if (context === void 0) ***REMOVED***
        context = this.$container;
      ***REMOVED***

      var backdrop = context.find("> " + Selector.BACKDROP);

      if (backdrop.length === 0 && raiseError) ***REMOVED***
        $$$1.error("Failed to find " + Selector.BACKDROP + " for " + Util$2.describe(context));
      ***REMOVED***

      return backdrop;
    ***REMOVED***; // Find closest bmd-layout-container based on the given context


    _proto.findContainer = function findContainer(raiseError, context) ***REMOVED***
      if (raiseError === void 0) ***REMOVED***
        raiseError = true;
      ***REMOVED***

      if (context === void 0) ***REMOVED***
        context = this.$element;
      ***REMOVED***

      var container = context.closest(Selector.CONTAINER);

      if (container.length === 0 && raiseError) ***REMOVED***
        $$$1.error("Failed to find " + Selector.CONTAINER + " for " + Util$2.describe(context));
      ***REMOVED***

      return container;
    ***REMOVED***; // ------------------------------------------------------------------------
    // private
    // ------------------------------------------------------------------------
    // static


    return BaseLayout;
  ***REMOVED***(Base);

  return BaseLayout;
***REMOVED***(jQuery);

var Drawer = function ($$$1) ***REMOVED***
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = "drawer";
  var DATA_KEY = "bmd." + NAME;
  var JQUERY_NAME = "bmd" + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
  var JQUERY_NO_CONFLICT = $$$1.fn[JQUERY_NAME];
  var Keycodes = ***REMOVED***
    ESCAPE: 27 //ENTER: 13,
    //SPACE: 32

  ***REMOVED***;
  var ClassName = ***REMOVED***
    IN: "in",
    DRAWER_IN: "bmd-drawer-in",
    DRAWER_OUT: "bmd-drawer-out",
    DRAWER: "bmd-layout-drawer",
    CONTAINER: "bmd-layout-container"
  ***REMOVED***;
  var Default = ***REMOVED***
    focusSelector: "a, button, input"
  ***REMOVED***;
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Drawer =
  /*#__PURE__*/
  function (_BaseLayout) ***REMOVED***
    _inheritsLoose(Drawer, _BaseLayout);

    // $element is expected to be the trigger
    //  i.e. <button class="btn bmd-btn-icon" for="search" data-toggle="drawer" data-target="#my-side-nav-drawer" aria-expanded="false" aria-controls="my-side-nav-drawer">
    function Drawer($element, config) ***REMOVED***
      var _this;

      _this = _BaseLayout.call(this, $element, $$$1.extend(true, ***REMOVED******REMOVED***, Default, config)) || this;
      _this.$toggles = $$$1("[data-toggle=\"drawer\"][href=\"#" + _this.$element[0].id + "\"], [data-toggle=\"drawer\"][data-target=\"#" + _this.$element[0].id + "\"]");

      _this._addAria(); // click or escape on the backdrop closes the drawer


      _this.$backdrop.keydown(function (ev) ***REMOVED***
        if (ev.which === Keycodes.ESCAPE) ***REMOVED***
          _this.hide();
        ***REMOVED***
      ***REMOVED***).click(function () ***REMOVED***
        _this.hide();
      ***REMOVED***); // escape on the drawer closes it


      _this.$element.keydown(function (ev) ***REMOVED***
        if (ev.which === Keycodes.ESCAPE) ***REMOVED***
          _this.hide();
        ***REMOVED***
      ***REMOVED***); // any toggle button clicks


      _this.$toggles.click(function () ***REMOVED***
        _this.toggle();
      ***REMOVED***);

      return _this;
    ***REMOVED***

    var _proto = Drawer.prototype;

    _proto.dispose = function dispose() ***REMOVED***
      _BaseLayout.prototype.dispose.call(this, DATA_KEY);

      this.$toggles = null;
    ***REMOVED***;

    _proto.toggle = function toggle() ***REMOVED***
      if (this._isOpen()) ***REMOVED***
        this.hide();
      ***REMOVED*** else ***REMOVED***
        this.show();
      ***REMOVED***
    ***REMOVED***;

    _proto.show = function show() ***REMOVED***
      if (this._isForcedClosed() || this._isOpen()) ***REMOVED***
        return;
      ***REMOVED***

      this.$toggles.attr("aria-expanded", true);
      this.$element.attr("aria-expanded", true);
      this.$element.attr("aria-hidden", false); // focus on the first focusable item

      var $focusOn = this.$element.find(this.config.focusSelector);

      if ($focusOn.length > 0) ***REMOVED***
        $focusOn.first().focus();
      ***REMOVED***

      this.$container.addClass(ClassName.DRAWER_IN); // backdrop is responsively styled based on bmd-drawer-overlay, therefore style is none of our concern, simply add the marker class and let the scss determine if it should be displayed or not.

      this.$backdrop.addClass(ClassName.IN);
    ***REMOVED***;

    _proto.hide = function hide() ***REMOVED***
      if (!this._isOpen()) ***REMOVED***
        return;
      ***REMOVED***

      this.$toggles.attr("aria-expanded", false);
      this.$element.attr("aria-expanded", false);
      this.$element.attr("aria-hidden", true);
      this.$container.removeClass(ClassName.DRAWER_IN);
      this.$backdrop.removeClass(ClassName.IN);
    ***REMOVED***; // ------------------------------------------------------------------------
    // private


    _proto._isOpen = function _isOpen() ***REMOVED***
      return this.$container.hasClass(ClassName.DRAWER_IN);
    ***REMOVED***;

    _proto._isForcedClosed = function _isForcedClosed() ***REMOVED***
      return this.$container.hasClass(ClassName.DRAWER_OUT);
    ***REMOVED***;

    _proto._addAria = function _addAria() ***REMOVED***
      var isOpen = this._isOpen();

      this.$element.attr("aria-expanded", isOpen);
      this.$element.attr("aria-hidden", isOpen);

      if (this.$toggles.length) ***REMOVED***
        this.$toggles.attr("aria-expanded", isOpen);
      ***REMOVED***
    ***REMOVED***; // ------------------------------------------------------------------------
    // static


    Drawer._jQueryInterface = function _jQueryInterface(config) ***REMOVED***
      return this.each(function () ***REMOVED***
        var $element = $$$1(this);
        var data = $element.data(DATA_KEY);

        if (!data) ***REMOVED***
          data = new Drawer($element, config);
          $element.data(DATA_KEY, data);
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***;

    return Drawer;
  ***REMOVED***(BaseLayout);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $$$1.fn[JQUERY_NAME] = Drawer._jQueryInterface;
  $$$1.fn[JQUERY_NAME].Constructor = Drawer;

  $$$1.fn[JQUERY_NAME].noConflict = function () ***REMOVED***
    $$$1.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
    return Drawer._jQueryInterface;
  ***REMOVED***;

  return Drawer;
***REMOVED***(jQuery);

var Ripples = function ($$$1) ***REMOVED***
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = "ripples";
  var DATA_KEY = "bmd." + NAME;
  var JQUERY_NAME = "bmd" + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
  var JQUERY_NO_CONFLICT = $$$1.fn[JQUERY_NAME];
  var ClassName = ***REMOVED***
    CONTAINER: "ripple-container",
    DECORATOR: "ripple-decorator"
  ***REMOVED***;
  var Selector = ***REMOVED***
    CONTAINER: "." + ClassName.CONTAINER,
    DECORATOR: "." + ClassName.DECORATOR //,

  ***REMOVED***;
  var Default = ***REMOVED***
    container: ***REMOVED***
      template: "<div class='" + ClassName.CONTAINER + "'></div>"
    ***REMOVED***,
    decorator: ***REMOVED***
      template: "<div class='" + ClassName.DECORATOR + "'></div>"
    ***REMOVED***,
    trigger: ***REMOVED***
      start: "mousedown touchstart",
      end: "mouseup mouseleave touchend"
    ***REMOVED***,
    touchUserAgentRegex: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i,
    duration: 500
  ***REMOVED***;
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Ripples =
  /*#__PURE__*/
  function () ***REMOVED***
    function Ripples($element, config) ***REMOVED***
      var _this = this;

      this.$element = $element; // console.log(`Adding ripples to $***REMOVED***Util.describe(this.$element)***REMOVED***`)  // eslint-disable-line no-console

      this.config = $$$1.extend(true, ***REMOVED******REMOVED***, Default, config); // attach initial listener

      this.$element.on(this.config.trigger.start, function (event) ***REMOVED***
        _this._onStartRipple(event);
      ***REMOVED***);
    ***REMOVED***

    var _proto = Ripples.prototype;

    _proto.dispose = function dispose() ***REMOVED***
      this.$element.data(DATA_KEY, null);
      this.$element = null;
      this.$container = null;
      this.$decorator = null;
      this.config = null;
    ***REMOVED***; // ------------------------------------------------------------------------
    // private


    _proto._onStartRipple = function _onStartRipple(event) ***REMOVED***
      var _this2 = this;

      // Verify if the user is just touching on a device and return if so
      if (this._isTouch() && event.type === "mousedown") ***REMOVED***
        return;
      ***REMOVED*** // Find or create the ripple container element


      this._findOrCreateContainer(); // Get relY and relX positions of the container element


      var relY = this._getRelY(event);

      var relX = this._getRelX(event); // If relY and/or relX are false, return the event


      if (!relY && !relX) ***REMOVED***
        return;
      ***REMOVED*** // set the location and color each time (even if element is cached)


      this.$decorator.css(***REMOVED***
        left: relX,
        top: relY,
        "background-color": this._getRipplesColor()
      ***REMOVED***); // Make sure the ripple has the styles applied (ugly hack but it works)

      this._forceStyleApplication(); // Turn on the ripple animation


      this.rippleOn(); // Call the rippleEnd function when the transition 'on' ends

      setTimeout(function () ***REMOVED***
        _this2.rippleEnd();
      ***REMOVED***, this.config.duration); // Detect when the user leaves the element to cleanup if not already done?

      this.$element.on(this.config.trigger.end, function () ***REMOVED***
        if (_this2.$decorator) ***REMOVED***
          // guard against race condition/mouse attack
          _this2.$decorator.data("mousedown", "off");

          if (_this2.$decorator.data("animating") === "off") ***REMOVED***
            _this2.rippleOut();
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***;

    _proto._findOrCreateContainer = function _findOrCreateContainer() ***REMOVED***
      if (!this.$container || !this.$container.length > 0) ***REMOVED***
        this.$element.append(this.config.container.template);
        this.$container = this.$element.find(Selector.CONTAINER);
      ***REMOVED*** // always add the rippleElement, it is always removed


      this.$container.append(this.config.decorator.template);
      this.$decorator = this.$container.find(Selector.DECORATOR);
    ***REMOVED***; // Make sure the ripple has the styles applied (ugly hack but it works)


    _proto._forceStyleApplication = function _forceStyleApplication() ***REMOVED***
      return window.getComputedStyle(this.$decorator[0]).opacity;
    ***REMOVED***;
    /**
     * Get the relX
     */


    _proto._getRelX = function _getRelX(event) ***REMOVED***
      var wrapperOffset = this.$container.offset();
      var result = null;

      if (!this._isTouch()) ***REMOVED***
        // Get the mouse position relative to the ripple wrapper
        result = event.pageX - wrapperOffset.left;
      ***REMOVED*** else ***REMOVED***
        // Make sure the user is using only one finger and then get the touch
        //  position relative to the ripple wrapper
        event = event.originalEvent;

        if (event.touches.length === 1) ***REMOVED***
          result = event.touches[0].pageX - wrapperOffset.left;
        ***REMOVED*** else ***REMOVED***
          result = false;
        ***REMOVED***
      ***REMOVED***

      return result;
    ***REMOVED***;
    /**
     * Get the relY
     */


    _proto._getRelY = function _getRelY(event) ***REMOVED***
      var containerOffset = this.$container.offset();
      var result = null;

      if (!this._isTouch()) ***REMOVED***
        /**
         * Get the mouse position relative to the ripple wrapper
         */
        result = event.pageY - containerOffset.top;
      ***REMOVED*** else ***REMOVED***
        /**
         * Make sure the user is using only one finger and then get the touch
         * position relative to the ripple wrapper
         */
        event = event.originalEvent;

        if (event.touches.length === 1) ***REMOVED***
          result = event.touches[0].pageY - containerOffset.top;
        ***REMOVED*** else ***REMOVED***
          result = false;
        ***REMOVED***
      ***REMOVED***

      return result;
    ***REMOVED***;
    /**
     * Get the ripple color
     */


    _proto._getRipplesColor = function _getRipplesColor() ***REMOVED***
      var color = this.$element.data("ripple-color") ? this.$element.data("ripple-color") : window.getComputedStyle(this.$element[0]).color;
      return color;
    ***REMOVED***;
    /**
     * Verify if the client is using a mobile device
     */


    _proto._isTouch = function _isTouch() ***REMOVED***
      return this.config.touchUserAgentRegex.test(navigator.userAgent);
    ***REMOVED***;
    /**
     * End the animation of the ripple
     */


    _proto.rippleEnd = function rippleEnd() ***REMOVED***
      if (this.$decorator) ***REMOVED***
        // guard against race condition/mouse attack
        this.$decorator.data("animating", "off");

        if (this.$decorator.data("mousedown") === "off") ***REMOVED***
          this.rippleOut(this.$decorator);
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***;
    /**
     * Turn off the ripple effect
     */


    _proto.rippleOut = function rippleOut() ***REMOVED***
      var _this3 = this;

      this.$decorator.off();

      if (Util$2.transitionEndSupported()) ***REMOVED***
        this.$decorator.addClass("ripple-out");
      ***REMOVED*** else ***REMOVED***
        this.$decorator.animate(***REMOVED***
          opacity: 0
        ***REMOVED***, 100, function () ***REMOVED***
          _this3.$decorator.trigger("transitionend");
        ***REMOVED***);
      ***REMOVED***

      this.$decorator.on(Util$2.transitionEndSelector(), function () ***REMOVED***
        if (_this3.$decorator) ***REMOVED***
          _this3.$decorator.remove();

          _this3.$decorator = null;
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***;
    /**
     * Turn on the ripple effect
     */


    _proto.rippleOn = function rippleOn() ***REMOVED***
      var _this4 = this;

      var size = this._getNewSize();

      if (Util$2.transitionEndSupported()) ***REMOVED***
        this.$decorator.css(***REMOVED***
          "-ms-transform": "scale(" + size + ")",
          "-moz-transform": "scale(" + size + ")",
          "-webkit-transform": "scale(" + size + ")",
          transform: "scale(" + size + ")"
        ***REMOVED***).addClass("ripple-on").data("animating", "on").data("mousedown", "on");
      ***REMOVED*** else ***REMOVED***
        this.$decorator.animate(***REMOVED***
          width: Math.max(this.$element.outerWidth(), this.$element.outerHeight()) * 2,
          height: Math.max(this.$element.outerWidth(), this.$element.outerHeight()) * 2,
          "margin-left": Math.max(this.$element.outerWidth(), this.$element.outerHeight()) * -1,
          "margin-top": Math.max(this.$element.outerWidth(), this.$element.outerHeight()) * -1,
          opacity: 0.2
        ***REMOVED***, this.config.duration, function () ***REMOVED***
          _this4.$decorator.trigger("transitionend");
        ***REMOVED***);
      ***REMOVED***
    ***REMOVED***;
    /**
     * Get the new size based on the element height/width and the ripple width
     */


    _proto._getNewSize = function _getNewSize() ***REMOVED***
      return Math.max(this.$element.outerWidth(), this.$element.outerHeight()) / this.$decorator.outerWidth() * 2.5;
    ***REMOVED***; // ------------------------------------------------------------------------
    // static


    Ripples._jQueryInterface = function _jQueryInterface(config) ***REMOVED***
      return this.each(function () ***REMOVED***
        var $element = $$$1(this);
        var data = $element.data(DATA_KEY);

        if (!data) ***REMOVED***
          data = new Ripples($element, config);
          $element.data(DATA_KEY, data);
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***;

    return Ripples;
  ***REMOVED***();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $$$1.fn[JQUERY_NAME] = Ripples._jQueryInterface;
  $$$1.fn[JQUERY_NAME].Constructor = Ripples;

  $$$1.fn[JQUERY_NAME].noConflict = function () ***REMOVED***
    $$$1.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
    return Ripples._jQueryInterface;
  ***REMOVED***;

  return Ripples;
***REMOVED***(jQuery);

var Autofill = function ($$$1) ***REMOVED***
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = "autofill";
  var DATA_KEY = "bmd." + NAME;
  var JQUERY_NAME = "bmd" + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
  var JQUERY_NO_CONFLICT = $$$1.fn[JQUERY_NAME];
  var Default = ***REMOVED******REMOVED***;
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Autofill =
  /*#__PURE__*/
  function (_Base) ***REMOVED***
    _inheritsLoose(Autofill, _Base);

    function Autofill($element, config) ***REMOVED***
      var _this;

      _this = _Base.call(this, $element, $$$1.extend(true, ***REMOVED******REMOVED***, Default, config)) || this;

      _this._watchLoading();

      _this._attachEventHandlers();

      return _this;
    ***REMOVED***

    var _proto = Autofill.prototype;

    _proto.dispose = function dispose() ***REMOVED***
      _Base.prototype.dispose.call(this, DATA_KEY);
    ***REMOVED***; // ------------------------------------------------------------------------
    // private


    _proto._watchLoading = function _watchLoading() ***REMOVED***
      var _this2 = this;

      // After 10 seconds we are quite sure all the needed inputs are autofilled then we can stop checking them
      setTimeout(function () ***REMOVED***
        clearInterval(_this2._onLoading);
      ***REMOVED***, 10000);
    ***REMOVED***; // This part of code will detect autofill when the page is loading (username and password inputs for example)


    _proto._onLoading = function _onLoading() ***REMOVED***
      setInterval(function () ***REMOVED***
        $$$1("input[type!=checkbox]").each(function (index, element) ***REMOVED***
          var $element = $$$1(element);

          if ($element.val() && $element.val() !== $element.attr("value")) ***REMOVED***
            $element.trigger("change");
          ***REMOVED***
        ***REMOVED***);
      ***REMOVED***, 100);
    ***REMOVED***;

    _proto._attachEventHandlers = function _attachEventHandlers() ***REMOVED***
      // Listen on inputs of the focused form
      //  (because user can select from the autofill dropdown only when the input has focus)
      var focused = null;
      $$$1(document).on("focus", "input", function (event) ***REMOVED***
        var $inputs = $$$1(event.currentTarget).closest("form").find("input").not("[type=file]");
        focused = setInterval(function () ***REMOVED***
          $inputs.each(function (index, element) ***REMOVED***
            var $element = $$$1(element);

            if ($element.val() !== $element.attr("value")) ***REMOVED***
              $element.trigger("change");
            ***REMOVED***
          ***REMOVED***);
        ***REMOVED***, 100);
      ***REMOVED***).on("blur", ".form-group input", function () ***REMOVED***
        clearInterval(focused);
      ***REMOVED***);
    ***REMOVED***; // ------------------------------------------------------------------------
    // static


    Autofill._jQueryInterface = function _jQueryInterface(config) ***REMOVED***
      return this.each(function () ***REMOVED***
        var $element = $$$1(this);
        var data = $element.data(DATA_KEY);

        if (!data) ***REMOVED***
          data = new Autofill($element, config);
          $element.data(DATA_KEY, data);
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***;

    return Autofill;
  ***REMOVED***(Base);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $$$1.fn[JQUERY_NAME] = Autofill._jQueryInterface;
  $$$1.fn[JQUERY_NAME].Constructor = Autofill;

  $$$1.fn[JQUERY_NAME].noConflict = function () ***REMOVED***
    $$$1.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
    return Autofill._jQueryInterface;
  ***REMOVED***;

  return Autofill;
***REMOVED***(jQuery);

/* globals Popper */
Popper.Defaults.modifiers.computeStyle.gpuAcceleration = false;
/**
 * $.bootstrapMaterialDesign(config) is a macro class to configure the components generally
 *  used in Material Design for Bootstrap.  You may pass overrides to the configurations
 *  which will be passed into each component, or you may omit use of this class and
 *  configure each component separately.
 */

var BootstrapMaterialDesign = function ($$$1) ***REMOVED***
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = "bootstrapMaterialDesign";
  var DATA_KEY = "bmd." + NAME;
  var JQUERY_NAME = NAME; // retain this full name since it is long enough not to conflict

  var JQUERY_NO_CONFLICT = $$$1.fn[JQUERY_NAME];
  /**
   * Global configuration:
   *  The global configuration hash will be mixed in to each components' config.
   *    e.g. calling $.bootstrapMaterialDesign(***REMOVED***global: ***REMOVED*** validate: true ***REMOVED*** ***REMOVED***) would pass `validate:true` to every component
   *
   *
   * Component configuration:
   *  - selector: may be a string or an array.  Any array will be joined with a comma to generate the selector
   *  - disable any component by defining it as false with an override. e.g. $.bootstrapMaterialDesign(***REMOVED*** autofill: false ***REMOVED***)
   *
   *  @see each individual component for more configuration settings.
   */

  var Default = ***REMOVED***
    global: ***REMOVED***
      validate: false,
      label: ***REMOVED***
        className: "bmd-label-static" // default style of label to be used if not specified in the html markup

      ***REMOVED***
    ***REMOVED***,
    autofill: ***REMOVED***
      selector: "body"
    ***REMOVED***,
    checkbox: ***REMOVED***
      selector: ".checkbox > label > input[type=checkbox]"
    ***REMOVED***,
    checkboxInline: ***REMOVED***
      selector: "label.checkbox-inline > input[type=checkbox]"
    ***REMOVED***,
    collapseInline: ***REMOVED***
      selector: '.bmd-collapse-inline [data-toggle="collapse"]'
    ***REMOVED***,
    drawer: ***REMOVED***
      selector: ".bmd-layout-drawer"
    ***REMOVED***,
    file: ***REMOVED***
      selector: "input[type=file]"
    ***REMOVED***,
    radio: ***REMOVED***
      selector: ".radio > label > input[type=radio]"
    ***REMOVED***,
    radioInline: ***REMOVED***
      selector: "label.radio-inline > input[type=radio]"
    ***REMOVED***,
    ripples: ***REMOVED***
      //selector: ['.btn:not(.btn-link):not(.ripple-none)'] // testing only
      selector: [".btn:not(.btn-link):not(.ripple-none)", ".card-image:not(.ripple-none)", ".navbar a:not(.ripple-none)", ".dropdown-menu a:not(.ripple-none)", ".nav-tabs a:not(.ripple-none)", ".pagination li:not(.active):not(.disabled) a:not(.ripple-none)", ".ripple" // generic marker class to add ripple to elements
      ]
    ***REMOVED***,
    select: ***REMOVED***
      selector: ["select"]
    ***REMOVED***,
    switch: ***REMOVED***
      selector: ".switch > label > input[type=checkbox]"
    ***REMOVED***,
    text: ***REMOVED***
      // omit inputs we have specialized components to handle - we need to match text, email, etc.  The easiest way to do this appears to be just omit the ones we don't want to match and let the rest fall through to this.
      selector: ["input:not([type=hidden]):not([type=checkbox]):not([type=radio]):not([type=file]):not([type=button]):not([type=submit]):not([type=reset])"]
    ***REMOVED***,
    textarea: ***REMOVED***
      selector: ["textarea"]
    ***REMOVED***,
    arrive: true,
    // create an ordered component list for instantiation
    instantiation: ["ripples", "checkbox", "checkboxInline", "collapseInline", "drawer", //'file',
    "radio", "radioInline", "switch", "text", "textarea", "select", "autofill"]
  ***REMOVED***;
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var BootstrapMaterialDesign =
  /*#__PURE__*/
  function () ***REMOVED***
    function BootstrapMaterialDesign($element, config) ***REMOVED***
      var _this = this;

      this.$element = $element;
      this.config = $$$1.extend(true, ***REMOVED******REMOVED***, Default, config);
      var $document = $$$1(document);

      var _loop = function _loop(component) ***REMOVED***
        // the component's config fragment is passed in directly, allowing users to override
        var componentConfig = _this.config[component]; // check to make sure component config is enabled (not `false`)

        if (componentConfig) ***REMOVED***
          // assemble the selector as it may be an array
          var selector = _this._resolveSelector(componentConfig); // mix in global options


          componentConfig = $$$1.extend(true, ***REMOVED******REMOVED***, _this.config.global, componentConfig); // create the jquery fn name e.g. 'bmdText' for 'text'

          var componentName = "" + (component.charAt(0).toUpperCase() + component.slice(1));
          var jqueryFn = "bmd" + componentName;

          try ***REMOVED***
            // safely instantiate component on selector elements with config, report errors and move on.
            // console.debug(`instantiating: $('$***REMOVED***selector***REMOVED***')[$***REMOVED***jqueryFn***REMOVED***]($***REMOVED***componentConfig***REMOVED***)`) // eslint-disable-line no-console
            $$$1(selector)[jqueryFn](componentConfig); // add to arrive if present and enabled

            if (document.arrive && _this.config.arrive) ***REMOVED***
              $document.arrive(selector, function () ***REMOVED***
                // eslint-disable-line no-loop-func
                $$$1(this)[jqueryFn](componentConfig);
              ***REMOVED***);
            ***REMOVED***
          ***REMOVED*** catch (e) ***REMOVED***
            var message = "Failed to instantiate component: $('" + selector + "')[" + jqueryFn + "](" + componentConfig + ")";
            console.error(message, e, "\nSelected elements: ", $$$1(selector)); // eslint-disable-line no-console

            throw e;
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***;

      for (var _iterator = this.config.instantiation, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) ***REMOVED***
        var _ref;

        if (_isArray) ***REMOVED***
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        ***REMOVED*** else ***REMOVED***
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        ***REMOVED***

        var component = _ref;

        _loop(component);
      ***REMOVED***
    ***REMOVED***

    var _proto = BootstrapMaterialDesign.prototype;

    _proto.dispose = function dispose() ***REMOVED***
      this.$element.data(DATA_KEY, null);
      this.$element = null;
      this.config = null;
    ***REMOVED***; // ------------------------------------------------------------------------
    // private


    _proto._resolveSelector = function _resolveSelector(componentConfig) ***REMOVED***
      var selector = componentConfig.selector;

      if (Array.isArray(selector)) ***REMOVED***
        selector = selector.join(", ");
      ***REMOVED***

      return selector;
    ***REMOVED***; // ------------------------------------------------------------------------
    // static


    BootstrapMaterialDesign._jQueryInterface = function _jQueryInterface(config) ***REMOVED***
      return this.each(function () ***REMOVED***
        var $element = $$$1(this);
        var data = $element.data(DATA_KEY);

        if (!data) ***REMOVED***
          data = new BootstrapMaterialDesign($element, config);
          $element.data(DATA_KEY, data);
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***;

    return BootstrapMaterialDesign;
  ***REMOVED***();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $$$1.fn[JQUERY_NAME] = BootstrapMaterialDesign._jQueryInterface;
  $$$1.fn[JQUERY_NAME].Constructor = BootstrapMaterialDesign;

  $$$1.fn[JQUERY_NAME].noConflict = function () ***REMOVED***
    $$$1.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
    return BootstrapMaterialDesign._jQueryInterface;
  ***REMOVED***;

  return BootstrapMaterialDesign;
***REMOVED***(jQuery);

/*
 * This is the main entry point.
 *
 * You can import other modules here, including external packages. When bundling using rollup you can mark those modules as external and have them excluded or, if they have a jsnext:main entry in their package.json (like this package does), let rollup bundle them into your dist file.
 *
 * at your application entry point.  This is necessary for browsers that do not yet support some ES2015 runtime necessities such as Symbol.  We do this in `index-iife.js` for our iife rollup bundle.
 */
// Bootstrap components

***REMOVED***)));
//# sourceMappingURL=bootstrap-material-design.js.map