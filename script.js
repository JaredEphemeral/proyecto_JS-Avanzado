const pokeCard = document.querySelector('[pokeCard]');
const pokeNombre = document.querySelector('[nombrePokemon]');
const pokeImg = document.querySelector('[imgPokemon]');
const pokeId = document.querySelector('[idPokemon]');
const pokeTipos = document.querySelector('[tiposPokemon]');
const pokeHp = document.querySelector('[pokemonHP]');
const PokeAtk = document.querySelector('[pokemonAtk]');
const pokeDef = document.querySelector('[pokemonDef]');
const PokeSp = document.querySelector('[pokemonSP]');
const PokeSd = document.querySelector('[pokemonSD]');
const PokeSpeed = document.querySelector('[pokemonSpeed]');

const URI = 'https://pokeapi.co/api/v2/pokemon/';
//CATALOGO DE COLORES
const catalogoColores = {
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    grass: '#4A9681',
    electric: '#FFEA70',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    fairy: '#FFC0CB',
    default: '#2A1A1F'

}
//CATALOGO DE TIPOS EN ESPAÑOL
const catalogoTipos = {
    normal: 'Normal',
    fire: 'Fuego',
    water: 'Agua',
    grass: 'Hierba',
    electric: 'Eléctrico',
    ice: 'Hielo',
    rock: 'Roca',
    flying: 'Volador',
    psychic: 'Psíquico',
    ghost: 'Fantasma',
    bug: 'Bicho',
    poison: 'Veneno',
    ground: 'Tierra',
    dragon: 'Dragón',
    steel: 'Metal',
    fairy: 'Hada',
    fighting: 'Luchador'
}
//VALORES DE POKEMON EN DEFAULT
function valoresDefault(){
    pokeImg.setAttribute('src', "./pika.png")
    pokeId.textContent = `#000`;
    
    pokeTipos.textContent = "NA/NA";
    pokeHp.textContent = `Vida: 00`;
    PokeAtk.textContent = `Atq: 00`;
    pokeDef.textContent = `Def: 00`;
    PokeSp.textContent = `Atq-Esp: 00`;
    PokeSd.textContent = `Def-Esp: 00`;
    PokeSpeed.textContent = `Velocidad: 00`;
    pokeImg.style.background = "";
}
//GENERA LOS COLORES DEL POKEMON SEGUN SU TIPO
function colorTipos(types){
    types.forEach(type => {
        var texto = document.createElement("div");
        texto.style.color = catalogoColores[type.type.name];
        texto.textContent = catalogoTipos[type.type.name];
        pokeTipos.appendChild(texto);
    });
}
//GENERA EL COLOR DE FONDO
function colorFondo(types){
    const colorPrincipal = catalogoColores[types[0].type.name];
    const colorSecundario = types[1] ? catalogoColores[types[1].type.name] : catalogoColores.default;

    pokeImg.style.background = `radial-gradient(${colorSecundario} 33%, ${colorPrincipal} 33%)`
    pokeImg.style.backgroundSize = ' 5px 5px ';
}
//AGREGA MAYUS AL INICIO
function mayusInicial(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
//CUANDO CARGA EL HTML SE EJECUTA ESTO
document.addEventListener("DOMContentLoaded",function(){
    dibujarPokemones();
})
//BUSCADOR DE POKEMONES
const buscarPokemon = async event =>{
    event.preventDefault();
    const { value } = event.target.pokeBusqueda;
    if(value == ""){
        pokeNombre.textContent = `Nombre: N/A`;
        valoresDefault();
    }
    else{
        const rest = await fetch(URI + value)
        if(rest.status === 200){
            const pokemon = await rest.json();
            informacionPokemon(pokemon);
        }
        else{
            pokeNombre.textContent = `Nombre: 404-Not found`;
            valoresDefault();
        }
    }
}

//CARGA EL POKEMON SELECCIONADO
async function obtenerPokemonSeleccionado(id){
    const rest = await fetch(URI + id)
    if(rest.status === 200){
        const pokemon = await rest.json();
        informacionPokemon(pokemon);
    }
    else{
        pokeNombre.textContent = `Nombre: 404-Not found`;
        valoresDefault();
    }

    window.scrollTo(0,0);
}

//LLENA LA CARD PRINCIPAL CON LA INFO DEL POKEMON BUSCADO
function informacionPokemon (data){
    const {stats, types, sprites} = data;
    pokeImg.setAttribute('src', sprites.front_default)

    pokeId.textContent = `# ${data.id}`;
    pokeNombre.textContent = `Nombre: ${mayusInicial(data.name)} `;

    pokeHp.textContent = `Vida: ${ stats[0].base_stat} `;
    PokeAtk.textContent = `Atq: ${ stats[1].base_stat} `;
    pokeDef.textContent = `Def: ${ stats[2].base_stat} `;
    PokeSp.textContent = `Atq-Esp: ${ stats[3].base_stat} `;
    PokeSd.textContent = `Def-Esp: ${ stats[4].base_stat} `;
    PokeSpeed.textContent = `Velocidad: ${ stats[5].base_stat} `;

    pokeTipos.innerHTML = "";

    colorTipos(types);
    colorFondo(types);
}
//CARGA EL LISTADO DE POKEMONS DEL 1 AL 151
const dibujarPokemones = async () =>{
    for( let i = 1; i<= 151; i++){
        await obtenerPokemones(i);
    }
}
//OBTIENE LA INFORMACIÓN DE LA LISTA DE POKEMON
const obtenerPokemones = async(id) =>{
    const resp = await fetch(URI + id);
    if(resp.status === 200){
        const pokemon = await resp.json();
        crearPokemon(pokemon,id);
    }
}
//CREA IMAGENES CON LOS POKEMONES
function  crearPokemon(pokemon, id){
    const {stats, types, sprites} = pokemon;

    let tipos = "";
    types.forEach(type => {
        tipos += `<div class="type" style = "color: ${catalogoColores[type.type.name]}">${catalogoTipos[type.type.name]}</div>`
    });

    const colorPrincipal = catalogoColores[types[0].type.name];
    const colorSecundario = types[1] ? catalogoColores[types[1].type.name] : catalogoColores.default;
    let styleBackground = `radial-gradient(${colorSecundario} 33%, ${colorPrincipal} 33%)`
	const name = mayusInicial(pokemon.name);
        let pokeInnerHTML = pokemonContainer.innerHTML;
        pokeInnerHTML += `
        <div class="col-4 col-xl-2 col-md-4 col-lg-4 col-sm-4 card border-dark" id = "${id}" >
            <div nombre > Nombre:</div>
            <div name>${name}</div>
            <div id>#${pokemon.id.toString()}</div>
                <img src="${sprites.front_default}" style="background: ${styleBackground}; background-size : 5px 5px "  alt="${name} "  onClick = "clickPokemon(this)"/>
            ${tipos}
        </div>
    `;

    pokemonContainer.innerHTML = pokeInnerHTML;
}


function clickPokemon(element){
    var parent = element.parentNode;
    obtenerPokemonSeleccionado(parent.id);
}