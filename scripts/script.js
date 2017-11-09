(function checkLuck () {
  let arr = [ 'new friend',
    'prosperity',
    'money',
    'travelling',
    'luck',
    'love',
    'health',
    'you will receive good news today',
    'joy',
    'the best friends are the pets.',
    'there is no matter who say the speech, but who promt it.',
    'surprice',
    'it\'s time to relax',
    'i had more problems with myself than with any other person',
    'Things can be tough, Times can be rough. But if you work hard enough, You will achieve triumph!',
    'Work hard and you will surely achieve success.',
    'Today you will be calm and happy. All turn the way you want it to be.' ]
  let randomLuck = ''
  let getLuck = setTimeout(() => {
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
        randomLuck = arr[Math.floor(Math.random() * arr.length)]
        window.localStorage.setItem('last-luck', randomLuck)
        window.localStorage.setItem('last-entrance', new Date())
        if (randomLuck.length > 20) {
          $('#current-luck').css('font-size', '40px')
        }
        $('#current-luck').addClass('newLuck')
      }
    } else {
      randomLuck = arr[Math.floor(Math.random() * arr.length)]
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
  }, 2000)
})()

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
