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

const files = ["Installation_0.html", "Console_1.html", "Print_2.html", "Strings, Ints and Floats_3.html"]
const sidebar = document.getElementById('sidebar')

root.style.setProperty('--amount-of-files', String(files.length))

try {
    var current_theme = parseInt(localStorage.getItem('mode'))
}
catch{
    var current_theme = 1
    localStorage.setItem('mode', String(current_theme))
}

console.log(current_theme)



if (typeof current_theme != 'number'){
    console.log(current_theme)
    current_theme = 1
}

/* functions */
/* sets all the links on the sidebar */
function setLinks() {
    for (var index = 0; index < files.length; index++) {
        var lesson = '<div><a class="lessons" href=""></a></div>'

        sidebar.innerHTML += lesson
        var lesson = document.getElementsByClassName('lessons')[index]

        if (index == parseInt(getFileIndex())) {
            lesson.id = 'current'
        }

        lesson.setAttribute('href', files[index])
        lesson.innerHTML = files[index].split("_")[0]

        
    }

    var index = parseInt(getFileIndex())
    document.getElementById("next").setAttribute('href', files[index + 1])
}

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

/* gets the index that i set for the file that is being displayed */

function getFileIndex() {
    var path = window.location.pathname;

    page = path.split('/').pop();
    page = page.split('_').pop();
    page = page.split('.');
    page.pop()
    page = page[0]
    
    root.style.setProperty('--file-index', page)
    return page
}

/* gets the progress position of the progress bar on the left hand side */

function setProgressPosition(){
    var currentProgressPos = style.getPropertyValue('--progress-pos')

    try {
        var lastProgressPos = localStorage.getItem('lastProgressPos')
    }

    catch {
        var lastProgressPos = '0'
    }

    root.style.setProperty('--progress-start-pos', lastProgressPos)
    localStorage.setItem('lastProgressPos', String(currentProgressPos))
}

/* matches the buttons that sey copy with their corresponding texts */

function createCopyIds() {
    var getIdTXT = document.getElementsByClassName("copyText")

    for (var index = 0; index < getIdTXT.length; index++) {
        getIdTXT[index].id = String(index + "_copyTextIndex")
    }

    var getIdBTN = document.getElementsByClassName("copyButton")

    for (var index = 0; index < getIdBTN.length; index++) {
        getIdBTN[index].id = String(index + "_copyButtonIndex")
    }
}



function copyText (pressedButton) {
    var target = String(pressedButton.split("_")[0] + "_copyTextIndex")
    var text = document.getElementById(target).innerText

    alert("Text Copied")
    navigator.clipboard.writeText(text)
}

/* running the functions */

setLinks()
check_theme(false)
getFileIndex()
setProgressPosition()
createCopyIds()