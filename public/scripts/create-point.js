function populateUF() {
    const ufSelect = document.querySelector('select[name=uf]')
    
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then( (res) => {return res.json() })
    .then( states => {
        
        for(state of states) {
            ufSelect.innerHTML += `<option value='${state.id}'>${state.nome}</option>`
        }
        
    } )
}

populateUF()

function getCities(event) {
    const citySelect = document.querySelector('select[name=city]')
    const stateInput = document.querySelector('input[name=state]')
    
    const ufValue = event.target.value
    
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text
    
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    
    citySelect.innerHTML = "<option value>Selecione a cidade</option";
    citySelect.disabled = false
    
    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        for( const city of cities) {
            citySelect.innerHTML += `<option value='${city.nome}'>${city.nome}</option>`
            
        }
        citySelect.disabled = false
    } )
}

document
.querySelector('select[name=uf]')
.addEventListener('change', getCities)

//itens de coleta

//pegar todos os lis 
const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem);
}

const collectedItems = document.querySelector("input[name=items]");
let selectedItems = [];

function handleSelectedItem(event){
    const itemLi = event.target;

    //add ou remover uma classe com js (class="selected")
    itemLi.classList.toggle('selected');

    const itemId = itemLi.dataset.id;

    //verificar se existem items selecionados, se sim... pegá-los
    const alreadySelected = selectedItems.findIndex(function(item){
        const itemFound = item === itemId;
        return itemFound;
    })

    //se já estiver selecionado tirar da seleção
    if(alreadySelected >= 0){
        //remover da seleção.
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId;
            return itemIsDifferent; 
        })

        selectedItems = filteredItems
    } else {
        selectedItems.push(itemId);
    }

    // console.log(selectedItems);
    //att o campo escondido com items selecteds
    collectedItems.value = selectedItems;
}