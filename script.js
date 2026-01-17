let words = []

const PURE_WORD_REGEX = /^[a-z]{3,}$/
const HARD_PRIORITY = ["x", "q", "v", "z", "j", "k"]

fetch("wordlistr.txt")
  .then(res => res.text())
  .then(text => {
    words = text
      .toLowerCase()
      .split("\n")
      .map(w => w.trim())
      .filter(w => PURE_WORD_REGEX.test(w))
      .filter(w => w[0] !== w[1])
  })

const input = document.getElementById("search")
const result = document.getElementById("result")
const limitSelect = document.getElementById("limitSelect")
const modeSelect = document.getElementById("modeSelect")
const endingInput = document.getElementById("endingInput")
const info = document.getElementById("info")

let debounceTimer = null

modeSelect.addEventListener("change", () => {
  endingInput.style.display =
    modeSelect.value === "hard" ? "block" : "none"
  runSearch()
})

input.addEventListener("input", runSearch)
endingInput.addEventListener("input", runSearch)
limitSelect.addEventListener("change", runSearch)

function runSearch() {
  clearTimeout(debounceTimer)

  debounceTimer = setTimeout(() => {
    result.innerHTML = ""
    info.textContent = ""

    const value = input.value.toLowerCase()
    if (!value) return

    const limitValue = limitSelect.value
    const limit = limitValue === "all" ? Infinity : parseInt(limitValue, 10)

    let shown = 0
    let totalFound = 0
    const fragment = document.createDocumentFragment()

    if (modeSelect.value === "normal") {
      for (const word of words) {
        if (word.startsWith(value)) {
          totalFound++
          if (shown < limit) {
            fragment.appendChild(makeItem(word))
            shown++
          }
        }
      }
    }

    if (modeSelect.value === "hard") {
      let matched = false

      for (const letter of HARD_PRIORITY) {
        for (const word of words) {
          if (word.startsWith(value) && word.endsWith(letter)) {
            totalFound++
            if (shown < limit) {
              fragment.appendChild(makeItem(word))
              shown++
            }
            matched = true
          }
        }
        if (matched) break
      }

      if (!matched) {
        for (const word of words) {
          if (word.startsWith(value)) {
            totalFound++
            if (shown < limit) {
              fragment.appendChild(makeItem(word))
              shown++
            }
          }
        }
      }
    }

    result.appendChild(fragment)

    if (limitValue === "all") {
      info.textContent = `${totalFound} words have been found!`
    }
  }, 120)
}

function makeItem(text) {
  const li = document.createElement("li")
  li.textContent = text
  return li
}
