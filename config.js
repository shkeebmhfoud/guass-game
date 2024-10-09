let tryDivsCont = document.getElementsByClassName("trys-and-checks")[0]
let hintNums = 2,
  tryNum = 1,
  inputWord = '',
  numberOfCorrect = 0
let letters = "QWERTYUIOPASDFGHJKLZXCVBNM"
letters = Array.from(letters)
let word = []
for (let i of [1, 2, 3, 4, 5]) {
  let tryDiv = document.createElement("div")
  let className = document.createAttribute("class"), tryDivId = document.createAttribute("id")
  tryDivId.value = "try-" + i
  className.value = "try"
  tryDiv.setAttributeNode(className)
  tryDiv.setAttributeNode(tryDivId)
  let span = document.createElement("span")
  span.innerHTML = "Try " + i
  let classNameSpan = document.createAttribute("class")
  classNameSpan.value = "try-num"
  span.setAttributeNode(classNameSpan)
  tryDiv.appendChild(span)
  if (i == 1) {
    tryDiv.classList.add("active-try")
  } else {
    tryDiv.classList.add("inactive-try")
  }
  for (let j of [1, 2, 3, 4, 5]) {
    let input = document.createElement("input")
    let classNameInput = document.createAttribute("class")
    input.type = "text"
    classNameInput.value = "letter-input"
    input.setAttributeNode(classNameInput)
    input.maxLength = "1"
    if (i > 1) {
      input.disabled = true
    } else {
      input.id = 'in' + j
    }
    tryDiv.appendChild(input)
  }
  tryDivsCont.appendChild(tryDiv)
}
let buttonsDiv = document.createElement("div"),
  checkButton = document.createElement("button"),
  hintButton = document.createElement("button"),
  hintSpan = document.createElement("span"),
  spanId = document.createAttribute("id"),
  spanResult = document.createElement('span')
buttonsDiv.classList.add("buttons", 'result')
checkButton.classList.add("check")
checkButton.innerHTML = "check"
hintButton.classList.add("hint")
spanId.value = "hint-num"
hintSpan.setAttributeNode(spanId)
hintSpan.innerHTML = String(hintNums)
hintButton.appendChild(hintSpan)
hintButton.append(" hint")
hintButton.onclick = updateHintNumber
checkButton.onclick = checkValidty
spanResult.className = 'result-game'
buttonsDiv.appendChild(spanResult)
buttonsDiv.appendChild(checkButton)
buttonsDiv.appendChild(hintButton)
tryDivsCont.appendChild(buttonsDiv)

for (let i of [1, 2, 3, 4, 5]) {
  word.push(letters[letters.length - 1])
  shuffling(letters)
}
console.log(word)
function checkValidty() {
  let inputs = document.querySelectorAll('.active-try input')
  for (let i of inputs) {
    inputWord += i.value.toUpperCase()
  }
  console.log(inputWord, word.join(''))
  for (let i = 0; i < word.length; i++) {
    if (word[i] == inputWord[i]) {
      numberOfCorrect++
      inputs[i].style.backgroundColor = 'green';
    } else if (word.find(e => e == inputWord[i])) {
      inputs[i].style.backgroundColor = 'orange';
    } else {
      inputs[i].style.backgroundColor = 'red';
    }
    inputs[i].style.color = 'white'
    inputs[i].style.borderBottom = 'none'
    inputs[i].id = ''
  }
  if (numberOfCorrect == word.length) {
    checkButton.style.display = 'none'
    hintButton.style.display = 'none'
    let spanResult = document.querySelector('.buttons .result-game')
    spanResult.style.display = 'flex'
    spanResult.textContent = 'You win after ' + tryNum + ' trys'
    setTimeout(() => {
      window.location.reload()
    }, 2000)
  } else if (numberOfCorrect != word.length && tryNum < 5) {
    numberOfCorrect = 0
    inputWord = ''
    tryNum++
    document.getElementsByClassName('active-try')[0].classList.remove('active-try')
    document.getElementById('try-' + tryNum).classList.add('active-try')
    document.getElementById('try-' + tryNum).classList.remove('inactive-try')
    let inputs = document.querySelectorAll('.active-try input')
    for (let i = 1; i <= 5; i++) {
      inputs[i - 1].disabled = false
      inputs[i - 1].id = 'in' + i
    }
  } else {
    checkButton.style.display = 'none'
    hintButton.style.display = 'none'
    let spanResult = document.querySelector('.buttons .result-game')
    spanResult.style.display = 'flex'
    spanResult.textContent = 'You loss'
  }
}
let j = 1
function updateHintNumber() {
  if (hintNums != 0) {
    hintNums--
    hintSpan.innerHTML = hintNums
    let input = document.getElementById('in' + j)
    input.value = word[j - 1]
    input.readOnly = true
    input.style.cssText = 'background-color:green;color:white;border-bottom:none'
    j++
  }
}

function shuffling(squares) {
  let currentInd = squares.length
  while (currentInd != 0) {
    currentInd--
    let randomInd = Math.floor(Math.random() * currentInd);
    [squares[currentInd], squares[randomInd]] = [squares[randomInd], squares[currentInd]]
  }

}