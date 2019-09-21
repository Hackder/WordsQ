document.onloadend = function () {
    // get the lection checkboxes
    let lection_checkboxes = [];
    for (let i = 1; i <= 6; i++) {
        lection_checkboxes.push(document.getElementById("lection" + i));
        console.log("lection" + i)
    }

    console.log(lection_checkboxes);
}

