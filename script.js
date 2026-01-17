let words = []

// hanya huruf a-z & minimal 3 huruf
const PURE_WORD_REGEX = /^[a-z]{3,}$/

fetch("wordlistr.txt")
  .then(res => res.text())
  .then(text => {
    words = text
      .toLowerCase()
      .split("\n")
      .map(w => w.trim())
      .filter(w => PURE_WORD_REGEX.test(w)) // no angka/simbol
      .filter(w => w[0] !== w[1])           // no aa, aaaa, bb, bbbb
  })

const input = document.getElementById("search")
const result = document.getElementById("result")
const limitSelect = document.getElementById("limitSelect")
const info = document.getElementById("info")

let debounceTimer = null

input.addEventListener("input", runSearch)
limitSelect.addEventListener("change", runSearch)

function runSearch() {
  clearTimeout(debounceTimer)

  debounceTimer = setTimeout(() => {
    const value = input.value.toLowerCase()
    result.innerHTML = ""
    info.textContent = ""

    if (!value) return

    const limitValue = limitSelect.value
    const limit = limitValue === "all" ? Infinity : parseInt(limitValue, 10)

    const fragment = document.createDocumentFragment()
    let shown = 0
    let totalFound = 0

    for (const word of words) {
      if (word.startsWith(value)) {
        totalFound++

        if (shown < limit) {
          const li = document.createElement("li")
          li.textContent = word
          fragment.appendChild(li)
          shown++
        }
      }
    }

    result.appendChild(fragment)

    // tampilkan info HANYA jika Show All
    if (limitValue === "all") {
      info.textContent = `${totalFound} words have been found!`
    }
  }, 120)
}
