let words = []

const PURE_WORD_REGEX = /^[a-z]{3,}$/
const HARD_LETTERS = ["q", "z", "x", "j", "k", "v"]

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

    const limitValue = limitSelect.value
    const limit = limitValue === "all" ? Infinity : parseInt(limitValue, 10)

    let shown = 0
    let totalFound = 0
    const fragment = document.createDocumentFragment()

    if (modeSelect.value === "normal") {
      const value = input.value.toLowerCase()
      if (!value) return

      for (const word of words) {
        if (word.startsWith(value)) {
          totalFound++
          if (shown < limit) {
            fragment.appendChild(createItem(word))
            shown++
          }
        }
      }
    }

    if (modeSelect.value === "hard") {
      const end = endingInput.value.toLowerCase()
      if (!end) return

      const priority = [
        end,
        ...HARD_LETTERS.filter(l => l !== end)
      ]

      for (const letter of priority) {
        for (const word of words) {
          if (word.endsWith(letter)) {
            totalFound++
            if (shown < limit) {
              fragment.appendChild(createItem(word))
              shown++
            }
          }
        }
        if (totalFound > 0) break
      }
    }

    result.appendChild(fragment)

    if (limitValue === "all") {
      info.textContent = `${totalFound} words have been found!`
    }
  }, 120)
}

function createItem(text) {
  const li = document.createElement("li")
  li.textContent = text
  return li
}
