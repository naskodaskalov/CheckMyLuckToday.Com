"use strict";

$('document').ready(function () {
  let randomLuck = ''

  const baseUrl = 'https://checkmylucktodaydb.firebaseio.com/.json'
  $.get(baseUrl)
    .then((data) => {
      let dbData = data['-KzhT0e5SZV7NK4tpGL5']
      let dbLenght = dbData.length
      if (window.localStorage.getItem('last-entrance')) {
        let timeNow = new Date()
        let lastEntranceTime = window.localStorage.getItem('last-entrance')
        let lastLuck = window.localStorage.getItem('last-luck')
        let nextDay = addDays(lastEntranceTime, 1)

        if (timeNow < nextDay) {
          $('.luck-of-the-day h2').css('display', 'none')
          randomLuck = 'You can check your luck just one time a day. Come back after:'
          $('#clockdiv').css('display', 'block')
          $('.last-luck').css('display', 'block')
          $('#last-luck').text(lastLuck).addClass('newLuck')
          initializeClock('clockdiv', nextDay)
        } else {
          let randomNumber = Math.floor(Math.random() * dbLenght)
          if (randomNumber < 1) {
            randomNumber = 1
          }
          randomLuck = dbData[randomNumber]

          console.log(randomLuck)
          window.localStorage.setItem('last-luck', randomLuck)
          window.localStorage.setItem('last-entrance', new Date())
          if (randomLuck.length > 20) {
            $('#current-luck').css('font-size', '40px')
          }
          $('#current-luck').addClass('newLuck')
        }
      } else {
        let randomNumber = Math.floor(Math.random() * dbLenght)
        if (randomNumber < 1) {
          randomNumber = 1
        }
        randomLuck = dbData[randomNumber]
        window.localStorage.setItem('last-luck', randomLuck)
        window.localStorage.setItem('last-entrance', new Date())
        if (randomLuck.length > 20) {
          $('#current-luck').css('font-size', '40px')
        }
        $('#current-luck').addClass('newLuck')
      }
      $('.intro').css('display', 'none')
      $('#current-luck').text(randomLuck)
      $('.luck-of-the-day').css('display', 'block')
    })
    .catch((err) => {
      console.log(err)
    })
})

function addDays (date, days) {
  var result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

function getTimeRemaining (endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date())
  var seconds = Math.floor((t / 1000) % 60)
  var minutes = Math.floor((t / 1000 / 60) % 60)
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24)
  // var days = Math.floor(t / (1000 * 60 * 60 * 24))
  return {
    'total': t,
    // 'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  }
}

function initializeClock (id, endtime) {
  var clock = document.getElementById(id)
  // var daysSpan = clock.querySelector('.days')
  var hoursSpan = clock.querySelector('.hours')
  var minutesSpan = clock.querySelector('.minutes')
  var secondsSpan = clock.querySelector('.seconds')

  function updateClock () {
    var t = getTimeRemaining(endtime)

    // daysSpan.innerHTML = t.days
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2)
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2)
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2)

    if (t.total <= 0) {
      clearInterval(timeinterval)
    }
  }

  updateClock()
  var timeinterval = setInterval(updateClock, 1000)
}
