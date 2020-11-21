/** @param {number} timeout delay (ms) */
const sleep = timeout => new Promise(resolve => setTimeout(resolve, timeout))

const toggleOffDoNotFederate = async () => {
    const composerOptionMenu = document.querySelector('[title="高度な設定"]')
    const menuActive = composerOptionMenu.classList.contains('active')
    if (!menuActive) {
        composerOptionMenu.click()
        await sleep(200)
    }

    const toggleSwitch = document.querySelector('[data-index="do_not_federate"]')
    if (!toggleSwitch.classList.contains('active')) {
        toggleSwitch.click()
        await sleep(300)
    }

    if (!menuActive) {
        composerOptionMenu.click()
    }
}

const canToggleOff = () => {
    const counter = document.querySelector('.character-counter')
    return counter && counter.textContent === "500"
}

const waitAndToggleOff = async () => {
    while (true) {
        if (!canToggleOff()) {
            await sleep(100)
            continue
        }

        await toggleOffDoNotFederate()
        break
    }
}

const textarea = document.querySelector('.composer .autosuggest-textarea__textarea')
const publishButton = document.querySelector('.composer .composer--publisher > .button')

// 送信後にOFFになっているので、再度ONにする
textarea.addEventListener('keydown', e => {
    if (e.keyCode == 13 && (e.ctrlKey || e.metaKey)) { // Ctrl + Enter
        waitAndToggleOff()
    }
})
publishButton.addEventListener('click', () => { // 送信ボタンクリックもしくはフォーカス＋キー操作
    waitAndToggleOff()
})

// ページ読み込み時の最初もONにする
waitAndToggleOff()
