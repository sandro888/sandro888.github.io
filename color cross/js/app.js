let cont = document.querySelector('.container');
for (let i = 0; i < 36; i++) {
    let divs = document.createElement("div")
    cont.appendChild(divs)

}
for (let i = 3; i <= 36; i += 6) {
    for (let i = 2; i < 36; i += 6) {
        let node = cont.children[i];
        node.style.backgroundColor = '#8e44ad'
        // cont.children[i].style.backgroundColor = '#8e44ad'

    }
    cont.children[i].style.backgroundColor = '#8e44ad'

}
for (let x = 12; x < 24; x++) {
    let node2 = cont.children[x]
    node2.style.backgroundColor = '#3498db'
    if (x == 15 || x == 20) {
        node2.style.backgroundColor = '#8e44ad'
    }
}