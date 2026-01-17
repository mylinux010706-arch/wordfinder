let words = []

// hanya huruf murni, minimal 3 huruf
const PURE_WORD_REGEX = /^[a-z]{3,}$/

fetch("wordlistr.txt")
  .then(res => res.text())
  .then(text => {
    words = text
      .toLowerCase()
      .split("\n")
      .map(w => w.trim())
      .filter(w => PURE_WORD_REGEX.test(w))   // buang angka & simbol
      .filter(w => w[0] !== w[1])             // buang aa, aaaa, bb, bbbb
  })

const input = document.getElementById("search")
const result = document.getElementById("result")
const limitSelect = document.getElementById("limitSelect")

let debounceTimer = null

input.addEventListener("input", runSearch)
limitSelect.addEventListener("change", runSearch)

function runSearch() {
  clearTimeout(debounceTimer)

  debounceTimer = setTimeout(() => {
    const value = input.value.toLowerCase()
    result.innerHTML = ""

    if (!value) return

    const limit = parseInt(limitSelect.value, 10)
    const fragment = document.createDocumentFragment()
    let shown = 0

    for (const word of words) {
      // buang kata dengan huruf awal berulang
      if (
        word.startsWith(value) &&
        word[0] !== word[1]
      ) {
        const li = document.createElement("li")
        li.textContent = word
        fragment.appendChild(li)
        shown++

        if (shown >= limit) break
      }
    }

    result.appendChild(fragment)
  }, 120)
}
