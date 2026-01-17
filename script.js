let words = []

const PRIORITY = ["x", "q", "v", "z", "j", "k"]
const VALID = /^[a-z]{3,}$/

fetch("wordlistr.txt")
  .then(r => r.text())
  .then(t => {
    words = t
      .toLowerCase()
      .split("\n")
      .map(w => w.trim())
      .filter(w => VALID.test(w))
      .filter(w => w[0] !== w[1])
  })

const search = document.getElementById("search")
const result = document.getElementById("result")
const mode = document.getElementById("mode")
const limitSel = document.getElementById("limit")
const info = document.getElementById("info")

let timer = null

search.addEventListener("input", run)
mode.addEventListener("change", run)
limitSel.addEventListener("change", run)

function run() {
  clearTimeout(timer)

  timer = setTimeout(() => {
    result.innerHTML = ""
    info.textContent = ""

    const value = search.value.toLowerCase()
    if (!value) return

    const limitVal = limitSel.value
    const limit = limitVal === "all" ? Infinity : parseInt(limitVal, 10)

    const collected = []
    const used = new Set()

    if (mode.value === "hard") {
      for (const end of PRIORITY) {
        for (const word of words) {
          if (
            word.startsWith(value) &&
            word.endsWith(end) &&
            !used.has(word)
          ) {
            collected.push(word)
            used.add(word)
            if (collected.length >= limit) break
          }
        }
        if (collected.length >= limit) break
      }
    }

    for (const word of words) {
      if (
        word.startsWith(value) &&
        !used.has(word)
      ) {
        collected.push(word)
        used.add(word)
        if (collected.length >= limit) break
      }
    }

    const frag = document.createDocumentFragment()
    for (const w of collected) {
      const li = document.createElement("li")
      li.textContent = w
      frag.appendChild(li)
    }

    result.appendChild(frag)

    if (limitVal === "all") {
      info.textContent = collected.length + " words have been found!"
    }
  }, 120)
}
