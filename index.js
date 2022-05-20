window.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('.input__input')
  const button = document.querySelector('.input__button')
  const nameDay = document.querySelector('.input__header')
  const notes = document.querySelector('.input__subtitle')

  let dateFocus = 0
  let notesObj = {}

  if (getFromLocalStorage('locObj')) {
    notesObj = getFromLocalStorage('locObj')
  }

  // WORK ////

  const defaultMonth = getDefaultMonth()
  createScelet(42, '.calendar__main')
  const firstDay = getFirstDay(defaultMonth)
  const lastDay = getLastDays(defaultMonth)
  fillingCalendar(firstDay, lastDay, defaultMonth)
  decorate(firstDay, lastDay, defaultMonth) //стартовая из local storage

  focusedStyle('.point', 'focus')
  getGlobalDate('.point')
  chanegeHeader('.point')
  showNotes('.point')
  getValue()

  function getValue() {
    button.addEventListener('click', () => {
      notesObj[dateFocus] = input.value
      sendToLocalStorage('locObj', notesObj)
      decorate(firstDay, lastDay, defaultMonth)
      notes.textContent = input.value
      input.value = ''
    })
  }
  // WORK ////

  // FUNCTION //
  function sendToLocalStorage(key, value) {
    const json = JSON.stringify(value)
    localStorage.setItem(key, json)
  }
  function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key))
  }
  function focusedStyle(style, styleFocus) {
    const allActiveElement = document.querySelectorAll(style)
    allActiveElement.forEach((item) => {
      item.addEventListener('click', (e) => {
        allActiveElement.forEach((el) => {
          el.classList.remove(styleFocus)
        })
        e.target.classList.add(styleFocus)
      })
    })
  }

  // заполняем календарь числами, даем класс point, добовляем аттрибут data-global
  function fillingCalendar(fDay, lDay, objectDate) {
    for (let i = 1; i <= lDay; i++) {
      const elem = getMainItem(fDay + i - 1)
      elem.setAttribute(
        'data-global',
        `${objectDate.getFullYear()}-${objectDate.getMonth() + 1}-${i}`
      )
      elem.classList.add('point')
      elem.textContent = i
    }
  }
  //помеченые дни закрашиваем красным
  function decorate(fDay, lDay, objectDate) {
    for (let i = 1; i <= lDay; i++) {
      const elem = getMainItem(fDay + i - 1)
      if (
        Object.keys(notesObj).includes(
          `${objectDate.getFullYear()}-${objectDate.getMonth() + 1}-${i}`
        )
      ) {
        elem.classList.add('happy')
      }
    }
  }

  function getGlobalDate(clas) {
    const arrayEl = document.querySelectorAll(clas)
    arrayEl.forEach((item) => {
      item.addEventListener('click', (e) => {
        const globValue = e.target.getAttribute('data-global')
        dateFocus = globValue
      })
    })
  }
  function chanegeHeader(clas) {
    const arrayEl = document.querySelectorAll(clas)
    arrayEl.forEach((item) => {
      item.addEventListener('click', (e) => {
        const timeDate = new Date(e.target.getAttribute('data-global'))
        const headerText = `${fromNumToDayWeek(
          timeDate.getDay()
        )} ${timeDate.getDate()}`
        nameDay.textContent = headerText
      })
    })
  }

  function showNotes(clas) {
    const arrayEl = document.querySelectorAll(clas)
    arrayEl.forEach((item) => {
      item.addEventListener('click', (e) => {
        const dataGlobalOfFocusItem = e.target.getAttribute('data-global')
        if (notesObj[dataGlobalOfFocusItem]) {
          notes.textContent = notesObj[dataGlobalOfFocusItem]
        } else {
          notes.textContent = 'заметок нет'
        }
      })
    })
  }

  function getMainItem(fdp) {
    return document.querySelector(`[data-day='${fdp}']`)
  }

  function getFirstDay(date) {
    const dayWeek = date.getDay()
    if (dayWeek === 0) {
      return 7
    }
    return dayWeek - 1
  }

  function getLastDays(date) {
    const year = date.getFullYear()
    const month = date.getMonth()

    for (let i = 27; i < 34; i++) {
      if (new Date(year, month, i).getMonth() !== month) {
        return i - 1
      }
    }
  }

  function createScelet(num, parentClass) {
    const parent = document.querySelector(parentClass)
    for (let i = 1; i <= num; i++) {
      const el = document.createElement('div')
      el.classList.add('calendar__main__item')
      el.setAttribute('data-day', i)
      parent.append(el)
    }
  }

  function getDefaultMonth() {
    let now = new Date()
    let year = now.getFullYear()
    let month = now.getMonth()
    return new Date(year, month)
  }

  function fromNumToDayWeek(num) {
    switch (num) {
      case 0:
        return 'Неділя'
      case 1:
        return 'Понеділок'
      case 2:
        return 'Вівторок'
      case 3:
        return 'Середа'
      case 4:
        return 'Четверг'
      case 5:
        return "П'ятниця"
      case 6:
        return 'Субота'
    }
  }
  // FUNCTION //
})
