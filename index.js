// === Селекторы ===
const startButton = document.querySelector('#start')
const gameZone = document.querySelector('#game')
const resultHeader = document.querySelector('#result-header')
const result = document.querySelector('#result')
const timeHeader = document.querySelector('#time-header')
const timeInput = document.querySelector('#game-time-input')
const time = document.querySelector('#time')

let score = 0
let isGameStarted = false
let timer = null

const clickSound = new Audio('https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg')

const hide = (el) => el.classList.add('hide')
const show = (el) => el.classList.remove('hide')
const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min)

function startGame() {
	score = 0
	isGameStarted = true

	hide(startButton)
	hide(resultHeader)
	show(timeHeader)

	gameZone.style.backgroundColor = '#fff'
	timeInput.disabled = true

	startTimer()
	renderBox()
}

function stopGame() {
	isGameStarted = false
	clearInterval(timer)

	result.textContent = score
	gameZone.innerHTML = ''
	gameZone.style.backgroundColor = '#ccc'

	hide(timeHeader)
	show(resultHeader)
	show(startButton)

	timeInput.disabled = false
}

function startTimer() {
	let seconds = parseFloat(timeInput.value)
	time.textContent = seconds.toFixed(1)

	timer = setInterval(() => {
		seconds -= 0.1
		time.textContent = seconds.toFixed(1)

		if (seconds <= 0) stopGame()
	}, 100)
}

function renderBox() {
	const colors = [
		'#CB356B',
		'#BD3F32',
		'#3A1C71',
		'#D76D77',
		'#283c86',
		'#45a247',
		'#8e44ad',
		'#155799',
		'#159957',
		'#000046',
		'#1CB5E0',
		'#2F80ED'
	]

	const oldBox = gameZone.querySelector('.box')
	if (oldBox) oldBox.remove()

	const box = document.createElement('div')
	const boxSize = getRandom(50, 100)
	const maxLeft = gameZone.clientWidth - boxSize
	const maxTop = gameZone.clientHeight - boxSize

	box.classList.add('box')
	box.dataset.box = 'true'
	box.style.width = box.style.height = `${boxSize}px`
	box.style.backgroundColor = colors[getRandom(0, colors.length)]
	box.style.left = `${getRandom(0, maxLeft)}px`
	box.style.top = `${getRandom(0, maxTop)}px`
	box.style.transform = 'scale(0.6)'
	box.style.opacity = '0'

	gameZone.insertAdjacentElement('afterbegin', box)

	requestAnimationFrame(() => {
		box.style.transform = 'scale(1)'
		box.style.opacity = '1'
	})
}

function handleBoxClick(event) {
	if (!isGameStarted) return

	if (event.target.dataset.box) {
		score++
		clickSound.currentTime = 0
		clickSound.play().catch(() => {})
		renderBox()
	}
}

function updateTimeHeader() {
	if (isGameStarted) return
	time.textContent = parseFloat(timeInput.value).toFixed(1)
	show(timeHeader)
	hide(resultHeader)
}

startButton.addEventListener('click', startGame)
gameZone.addEventListener('click', handleBoxClick)
timeInput.addEventListener('input', updateTimeHeader)
