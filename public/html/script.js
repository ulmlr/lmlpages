function prepareMain() {
    var main = document.body
    main.insertAdjacentHTML('afterbegin' ,'\n<div class="toggle" onclick="change_theme()"><div class="toggleIndicator"></div></div>')
}

prepareMain()

/* declarations */
const root = document.querySelector(':root')
const style = getComputedStyle(root)
const toggleIndicator = document.querySelector('.toggleIndicator').style

const dark = style.getPropertyValue('--dark-main')
const darkCONT = style.getPropertyValue('--dark-contrast')
const darkOUT = style.getPropertyValue('--dark-outline')

const light = style.getPropertyValue('--light-main')
const lightCONT = style.getPropertyValue('--light-contrast')
const lightOUT = style.getPropertyValue('--light-outline')

if (localStorage.getItem('mode') == null) {
    var current_theme = 1
    localStorage.setItem('mode', String(current_theme))
}
else {
    var current_theme = parseInt(localStorage.getItem('mode'))
}



if (typeof current_theme != 'number'){
    console.log(current_theme)
    current_theme = 1
}

/* functions */
/* changing theme */

function change_theme() {
    /* flips the value of current theme and saves it */
    current_theme *= -1
    localStorage.setItem('mode', String(current_theme))

    check_theme()

}



function check_theme(should_transition = true){
    /* checks if a transition should be played when changing the bg color */
    if (should_transition) {
        root.style.setProperty('--transition-time', '1s')
    }

    else {
        root.style.setProperty('--transition-time', '0s')
    }
    /* checks the value of current theme and modifies the page accordingly */
    if (current_theme == 1){
        light_mode()
    }
    else {
        dark_mode()
    }
}



function light_mode () {
    root.style.setProperty('--main-theme', light)
    root.style.setProperty('--contrast-theme', lightCONT)
    root.style.setProperty('--outline-theme', lightOUT)
    toggleIndicator.left = '100%'
    toggleIndicator.transform = 'translateX(-100%)'
}



function dark_mode () {
    root.style.setProperty('--main-theme', dark)
    root.style.setProperty('--contrast-theme', darkCONT)
    root.style.setProperty('--outline-theme', darkOUT)
    toggleIndicator.left = '0%'
    toggleIndicator.transform = 'translateX(0%)'
}

check_theme(false)