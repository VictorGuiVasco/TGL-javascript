(function (DOM, doc) {
  'use strict'

  var app = (() => {
    return {

      init: function init() {
        this.initEvents()
      },

      initEvents: function initEvents() {
        DOM('[data-js="lotofacil-button"]').on('click', function(){
          console.log('lotofacil')
        }, false)
        DOM('[data-js="mega-sena-button"]').on('click', function(){
          console.log('mega')
        }, false)
        DOM('[data-js="lotomania-button"]').on('click', function(){
          console.log('mania')
        }, false)
      }
    }
  })

  app().init()

})(window.DOM, document)