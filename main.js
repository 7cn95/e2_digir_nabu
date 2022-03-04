const input = document.querySelector("#input");
const output = document.querySelector("#output");
const outputAra = document.querySelector("#outputAra");
const inputSubmit = document.querySelector("#inputSubmit");

const ur = document.querySelector("#ur");
const assyrian = document.querySelector("#assyrian");
const noto = document.querySelector("#noto");
const babylon = document.querySelector("#babylon");


//! ///////////
inputSubmit.addEventListener("click", inputChack);
ur.addEventListener("click", urLang)
assyrian.addEventListener("click", assyrianLang)
noto.addEventListener("click", notoLang)
babylon.addEventListener("click", babylonLang)
    //! ///////////
    //todo get data from Json

async function getData() {
    const sir = await fetch("./data/signs.json");
    const sur = await fetch("./data/sux.json");
    const signRes = await sir.json();
    const suxRes = await sur.json();
    return { signRes, suxRes };
}


function inputChack() {
    const iv = input.value.toLowerCase();
    const inputValue = iv.split(" ");


    getData().then((data) => {
        const { signRes, suxRes } = data;
        const cuneiforms = suxRes.cuneiform;
        const signs = signRes.signs;
        let rv = ''
        let counter = 0;
        inputValue.forEach(inputV => {
            for (let i = 0; i < signs.length; i++) {
                let signValues = signs[i].sign_value.split(", ");
                //!
                for (let j = 0; j < signValues.length; j++) {
                    if (inputV == "as")
                        inputV = 'az'
                    if (inputV == "aq")
                        inputV = 'ak'
                    if (inputV == signValues[j] || inputV == signs[i].sign_name.toLowerCase()) {
                        rv += signs[i].sign_name + " ";
                        counter++;
                        break;
                    }
                }
            }
        })
        setter(rv, cuneiforms)
    })
}

function setter(signName, cuneiforms) {
    let signAfterCon = convertL(signName);
    const sign = signAfterCon.split(" ")
    output.innerHTML = "";
    outputAra.innerHTML = "";
    let delSign = sign.indexOf("Borger:");
    if (delSign >= 0)
        sign.splice(delSign - 1, 2);
    console.log(sign);
    for (let i = 0; i < sign.length; i++) {
        for (let j = 0; j < cuneiforms.length; j++) {
            if (cuneiforms[j].tag == sign[i]) {
                output.innerHTML += cuneiforms[j].unicode;
                outputAra.innerHTML = input.value.toLowerCase();
                break
            }
        };
    }
}

function urLang() {
    output.style.fontFamily = "ur3"
}

function assyrianLang() {
    output.style.fontFamily = "assyrian"
}

function notoLang() {
    output.style.fontFamily = "noto"
}

function babylonLang() {
    output.style.fontFamily = "babylon"
}

function addSign(l) {
    input.value += l;
}

function convertL(l) {
    let rl = '';

    let litter = l.toUpperCase().split('');
    for (let i = 0; i < litter.length; i++) {
        switch (litter[i]) {
            case 'š':
            case 'Š':
                litter[i] = 'SH'
                break;
            case 'ḫ':
            case 'Ḫ':
                litter[i] = 'H'
                break;
        }
    }
    rl = ''
    for (let i = 0; i < litter.length; i++) {
        rl += litter[i]

    }
    return rl;
}