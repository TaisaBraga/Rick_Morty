//criando objetos personagens acessando via id
const characterImage1 = document.getElementById('character-image1');
const characterImage2 = document.getElementById('character-image2');
const characterImage3 = document.getElementById('character-image3');
const characterImage4 = document.getElementById('character-image4');
const characterName1 = document.getElementById('character-name1');
const characterName2 = document.getElementById('character-name2');
const characterName3 = document.getElementById('character-name3');
const characterName4 = document.getElementById('character-name4');
const characterStatus1 = document.getElementById('character-status1');
const characterStatus2 = document.getElementById('character-status2');
const characterStatus3 = document.getElementById('character-status3');
const characterStatus4 = document.getElementById('character-status4');
const refreshButton = document.getElementById('refresh-button');

//a API fornece todos os 671 personagens
//retorna um personagem aleatorio
randomCharacter = () => {
    return Math.floor(Math.random() * 671);
}

//retorna uma sequência de personagens separados por vírgula
//ex: 230,50,150,25
characters = () => {
    let character1 = randomCharacter();
    let character2 = randomCharacter();
    let character3 = randomCharacter();
    let character4 = randomCharacter();
    return `${character1},${character2},${character3},${character4}`;
}

//chama a API, pega uma lista json
getCharacters = () => {
    return fetch(`https://rickandmortyapi.com/api/character/${characters()}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            "Content-type": 'application/json'
        }
        //resposta da API
    }).then((response) => response.json()).then((data) => {
        //com os dados json em mãos salva cada posição em um result
        //cada result corresponde a um personagem
        let result1 = data[0];
        let result2 = data[1];
        let result3 = data[2];
        let result4 = data[3];

        //chama a função que atribui os valores de cada personagem
        setContent(result1, result2, result3, result4);
    });
}

//com os dados de cada personagem em mãos atribui os valores
setContent = (result1, result2, result3, result4) => {
    characterImage1.src = result1.image;
    characterImage1.alt = result1.name;
    characterName1.textContent = result1.name;
    characterStatus1.textContent = "Status: " + characterStatusTranslate(result1.status);

    characterImage2.src = result2.image;
    characterImage2.alt = result2.name;
    characterName2.textContent = result2.name;
    characterStatus2.textContent = "Status: " + characterStatusTranslate(result2.status);

    characterImage3.src = result3.image;
    characterImage3.alt = result3.name;
    characterName3.textContent = result3.name;
    characterStatus3.textContent = "Status: " + characterStatusTranslate(result3.status);

    characterImage4.src = result4.image;
    characterImage4.alt = result4.name;
    characterName4.textContent = result4.name;
    characterStatus4.textContent = "Status: " + characterStatusTranslate(result4.status);
}

//função para traduzir o status dos personagens
characterStatusTranslate = (status) => {
    if (status == "Dead") {
        return "Morto";
    } else if (status == "Alive") {
        return "Vivo";
    } else {
        return "Desconhecido";
    }
}

//evento de click para atualizar a página
refreshButton.onclick = function () {
    getCharacters();
}

//carrega as informações na primeira abertura da página
getCharacters();