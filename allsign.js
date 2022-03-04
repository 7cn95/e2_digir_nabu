//todo get data from Json

async function getData() {
    const sir = await fetch("../data/signs.json");
    const sur = await fetch("../data/sux.json");
    const signRes = await sir.json();
    const suxRes = await sur.json();
    return { signRes, suxRes }
}

//todo all sign page////
const allSigns = document.getElementById("signs")
const start = () => {
    getData().then((data) => {

        const { signRes, suxRes } = data;
        const cuneiforms = suxRes.cuneiform;
        const signs = signRes.signs

        signs.forEach(sign => {
            cuneiforms.forEach(cun => {
                if (sign.sign_name == cun.tag) {
                    let list = `<p class = "signItem">${cun.unicode} <br>  ${sign.sign_name}</p><br>
                    
                    `
                    allSigns.innerHTML += list;
                }
            })
        })
    })
}

start()