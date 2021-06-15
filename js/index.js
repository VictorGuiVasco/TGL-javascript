(function (DOM, doc) {
  'use strict'

  var numbersSelectedLength = 0
  var numbersSelected = []

  var app = (() => {
    var rules = {}
    var lotofacil
    var megasena
    var lotomania

    return {

      init: function init() {
        this.openConnection()
        this.initEvents()
      },

      initEvents: function initEvents() {
        DOM('[data-js="lotofacil-button"]').on('click', this.handleClickBetButton, false)
        DOM('[data-js="mega-sena-button"]').on('click', this.handleClickBetButton, false)
        DOM('[data-js="lotomania-button"]').on('click', this.handleClickBetButton, false)        
      },

      initButtonsEvents: function initButtonsEvents(){
        DOM('.complete-game').on('click', this.c, false)
        DOM('.clear-game').on('click', this.handleClickClearGame, false)
        DOM('.cart-button').on('click', this.c, false)
      },

      initNumbersEvents: function initNumbersEvents() {
        DOM('.number-card').on('click', this.handleClickBetNumber, false)
      },

      handleClickClearGame: function handleClickBetNumber() {
        numbersSelected = []
      },

      c: function c() {
        console.log(this.textContent)
      },

      openConnection: function openConnection() {
        var ajax = new XMLHttpRequest()
        ajax.open('GET', '../games.json', true)
        ajax.send()

        ajax.addEventListener('readystatechange', this.getBetData, false)
      },

      getBetData: function getBetData() {
        var data
        try {
          rules = JSON.parse(this.responseText)
        } catch (error) {
          rules = null
        }

        if (rules) {
          lotofacil = rules.types[0]
          megasena = rules.types[1]
          lotomania = rules.types[2]
        }
      },

      handleClickBetButton: function handleClickBetButton() {
        numbersSelected = []
        if ('Lotofácil' === this.textContent) app().showBetInfo(lotofacil)
        if ('Mega-Sena' === this.textContent) app().showBetInfo(megasena)
        if ('Lotomania' === this.textContent) app().showBetInfo(lotomania)
      },

      showBetInfo: function showBetInfo(game) {
        var {['max-number']: maxNumber} = game
        numbersSelectedLength = maxNumber

        var $titleContainer = doc.getElementsByClassName('title')[0]
        var $titleGameOld = doc.getElementsByClassName('game-name')[0]

        var $rulesContainer = doc.getElementsByClassName('rules')[0]
        var $oldParagraph = doc.getElementsByClassName('paragraph')[0]

        var $bettingSheetContent = doc.getElementsByClassName('betting-sheet')[0]
        var $oldCard = doc.getElementsByClassName('card')[0]
        var $oldCard2 = doc.getElementsByClassName('card')[1]
        var $oldCard3 = doc.getElementsByClassName('card')[2]
        var $card = doc.createElement('div')
        var $card2 = doc.createElement('div')
        var $card3 = doc.createElement('div')

        var $buttonContainer = doc.getElementsByClassName('button-container')[0]
        var $cartButton = doc.createElement('button')
        var $cartButtonText = doc.createTextNode('Add to cart')
        var $img = doc.createElement('img')

        $cartButton.className = 'cart-button'
        $img.src = 'images/icons/shopping-cart.svg'

        $cartButton.appendChild($img)
        $cartButton.appendChild($cartButtonText)

        $card.className = 'card'
        $card2.className = 'card'
        $card3.className = 'card'

        for (var i = 1; i <= game.range; i++) {
          $card.appendChild(app().createCardNumber(i))
          $card2.appendChild(app().createCardNumber(i))
          $card3.appendChild(app().createCardNumber(i))
        }


        if ($titleGameOld) {
          $titleContainer.replaceChild(this.createtitleContainer(game.type), $titleGameOld)
          $rulesContainer.replaceChild(this.createRulesParagraph(game.description), $oldParagraph)
          $bettingSheetContent.replaceChild($card, $oldCard)
          $bettingSheetContent.replaceChild($card2, $oldCard2)
          $bettingSheetContent.replaceChild($card3, $oldCard3)

          app().initNumbersEvents()
        }
        else {
          $titleContainer.appendChild(this.createtitleContainer(game.type))
          $rulesContainer.appendChild(this.createRulesTitle())
          $rulesContainer.appendChild(this.createRulesParagraph(game.description))
          $bettingSheetContent.replaceChild($card, $oldCard)
          $bettingSheetContent.replaceChild($card2, $oldCard2)
          $bettingSheetContent.replaceChild($card3, $oldCard3)
          $buttonContainer.appendChild(this.createButtonContainer())
          $buttonContainer.appendChild($cartButton)

          app().initNumbersEvents()
          app().initButtonsEvents()
        }
      },

      createtitleContainer: function createtitleContainer() {
        var $titleGameName = doc.createElement('h1')
        $titleGameName.className = 'game-name'
        $titleGameName.textContent = `FOR ${arguments[0]}`

        return $titleGameName
      },

      createRulesTitle: function createRulesTitle() {
        var $ruleTitle = doc.createElement('h1')
        $ruleTitle.textContent = 'Fill your bet'
        return $ruleTitle
      },

      createRulesParagraph: function createRulesParagraph() {
        var $paragraph = doc.createElement('p')
        $paragraph.className = 'paragraph'
        $paragraph.textContent = arguments[0]
        return $paragraph
      },

      createCardNumber: function createCardNumber(number) {
        var $numberCard = doc.createElement('button')
        $numberCard.className = 'number-card'
        $numberCard.textContent = number;

        return $numberCard
      },

      createButtonContainer: function createButtonContainer() {
        var $div = doc.createElement('div')
        var $completeGame = doc.createElement('button')
        var $clearGame = doc.createElement('button')

        $completeGame.className = 'complete-game'
        $completeGame.textContent = 'Complete game'
        $clearGame.className = 'clear-game'
        $clearGame.textContent = 'Clear game'

        $div.appendChild($completeGame)
        $div.appendChild($clearGame)

        return $div
      },

      handleClickBetNumber: function handleClickBetNumber() {
        if(numbersSelected.length === numbersSelectedLength){
          console.log('array cheio')
        }
        else{
          numbersSelected.push(this.textContent)
        }
        console.log(numbersSelected)
      }
    }
  })

  app().init()

})(window.DOM, document)