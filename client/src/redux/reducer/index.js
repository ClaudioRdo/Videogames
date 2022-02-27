import {
    GET_VIDEOGAMES,
    GET_GENRES,
    FILTERED_VIDEOGAMES,
    FILTER_CURRENT_VIDEOGAMES,
    GET_VIDEOGAME_BY_NAME,
    GET_VIDEOGAME_BY_ID,
    ORDER_VIDEOGAMES,
    CLEAR_VIDEOGAME_DETAIL,
    CREATE_VIDEOGAME
} from "../actions/actionsTypes";

const initialState = {
    videogames: [],
    genres: [],
    filteredVideogames: [],
    videogameDetail: {}
}

const rootReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case GET_VIDEOGAMES:
            const vg = [...payload].map(p=>Number.isInteger(p['id'])
                ?p
                :{...p, 
                    genres: p.genres.map(g=> g.name)                
                }
            )
           
            return {
                ...state,
                videogames: vg,
                filteredVideogames: vg
            }

        case GET_GENRES:
            return {
                ...state,
                genres: payload.map(g => (
                    {
                        id: g.id,
                        name:g.name
                    })
                )
            }
        
        case GET_VIDEOGAME_BY_NAME:
            return {
                ...state,
                filteredVideogames: payload
        }

        case GET_VIDEOGAME_BY_ID:
            return {
                ...state,
                videogameDetail: payload

            }

        case FILTERED_VIDEOGAMES:
            const keyFilter = payload.key;
            const valuesFilter = payload.values;
            let filtered = []
            if(valuesFilter==='All'){
                filtered = state.videogames;
            }else{
                //hacer map de vaues filter
                console.log(valuesFilter)
                valuesFilter.map(value =>(
                        filtered = [...state.videogames].filter(v => {
                            return v[keyFilter].includes(value)
                        })  
                    )
                )
                
            }
            return {
                ...state,
                filteredVideogames: filtered
            }

        case FILTER_CURRENT_VIDEOGAMES:
            const keyCurrent = payload.key;
            const valueCurrent = payload.value;
            let filter = [];
            if(valueCurrent==='All'){
                filter = state.videogames
            }else{
                if(valueCurrent === 'Api'){
                    filter = state.videogames.filter(v=>{
                        return Number.isInteger(v[keyCurrent])
                    })
                }else{
                    filter = state.videogames.filter(v=>{
                        return Number.isInteger(v[keyCurrent])
                    })
                }
            }
            return  {
                ...state,
                filteredVideogames: filter
            }

        case ORDER_VIDEOGAMES:
            const keyOrder = payload.key;
            const valueOrder = payload.order;
            const orderVideogames = [...state.filteredVideogames];
            const compare = (a, b) => {
                if (valueOrder === 'Ascending') {
                    if (a[keyOrder] < b[keyOrder]) return -1;
                    if (a[keyOrder] > b[keyOrder]) return 1;
                    return 0;
                }else{
                    if (a[keyOrder] > b[keyOrder]) return -1;
                    if (a[keyOrder] < b[keyOrder]) return 1;
                    return 0;
                }
            }
            orderVideogames.sort(compare)
            return {
                ...state,
                filteredVideogames: orderVideogames
            }

        case CLEAR_VIDEOGAME_DETAIL:
            return {
                ...state,
                videogameDetail: {}
            }
        
        case CREATE_VIDEOGAME:
            return {
                ...state,
                videogameDetail: payload
            }

        default:
            return state;
    }
}

export default rootReducer;