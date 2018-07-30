"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function t(t,e){for(var i=0;i<e.length;i++){var r=e[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,i,r){return i&&t(e.prototype,i),r&&t(e,r),e}}();function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var FILTER=function(){function t(e){_classCallCheck(this,t),_initialiseProps.call(this);var i=e.displayFilter,r=e.displayFilterItem,n=e.filter,s=e.holder,l=e.searchInput,a=e.filterList;this.displayFilter=i||"filter-box--active",this.displayFilterItem=r||"filter-box__item--inactive",this.filter=document.querySelector(n),this.filterHolder=this.filter.querySelector(s),this.filterItems=a,this.searchBox=document.querySelector(l),this.events(),this.filterHolder.innerHTML=this.templet(this.filterItems)}return _createClass(t,[{key:"events",value:function(){this.searchBox.addEventListener("click",this.openEvt,!1),this.searchBox.addEventListener("keyup",this.filterEvt,!1),document.body.addEventListener("click",this.closeEvt,!1),this.filterHolder.addEventListener("click",this.changeCopy,!1)}}]),t}(),_initialiseProps=function(){var t=this;this.keyList=[38,40,37,39,13,91],this.templet=function(t){return t.map(function(t){return"<button data-val="+t+">"+t+"</button>"}).join("")},this.changeCopy=function(e){e.target.matches("button")&&(t.searchBox.value=e.target.innerHTML)},this.openEvt=function(e){e.stopPropagation(),t.filter.classList.add(t.displayFilter)},this.closeEvt=function(e){t.filter.classList.remove(t.displayFilter)},this.filterEvt=function(e){var i=e.which,r=e.currentTarget.value.toLowerCase();t.keyList.indexOf(i)<0&&(t.filterHolder.innerHTML=t.templet(t.filterDisplay(r)))},this.filterDisplay=function(e){return t.filterItems.filter(function(t){return t.toLowerCase().substring(0,e.length)===e})}};exports.default=FILTER;