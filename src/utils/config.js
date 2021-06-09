import axios from "axios"

export const Genres = [
    'All',
    'Action',
    'Adventure',
    'Animation',
    'Biography',
    'Comedy',
    'Crime',
    'Documentary',
    'Drama',
    'Family',
    'Fantasy',
    'Film-Noir',
    'History',
    'Horror',
    'Music',
    'Musical',
    'Mystery',
    'Romance',
    'Sci-Fi',
    'Short',
    'Sport',
    'Thriller',
    'War',
    'Western'
]

export const Sorts = [
    'Trending',
    'Popularity',
    'Rating',
    'Year'
]

export const type = [
    'movies',
    'shows'
]

const prodUrl = "https://api.firdausyusof.com";
// const prodUrl = "https://project-time.herokuapp.com"
const stagingUrl = "http://localhost:5000"

export const GetData = (context, setContext, setIsLoading, isLoadMore = false, isFilter = false) => {
    // console.log(context[`${type[context.isActive].slice(0, -1)}Page`])
    axios.get(`${prodUrl}/${type[context.isActive]}/${isFilter ? 1 : context[`${type[context.isActive].slice(0, -1)}Page`]}?sort=${context.sort}&genre=${context.genre}&keywords=${context.search ? context.search : ''}`, {
        headers: {
            'content-type': 'application/json',
            // 'Access-Control-Allow-Origin': '*'
            // 'Access-Control-Allow-Origin': true,
            // 'User-Agent': 'PostmanRuntime/7.26.10',
            // 'Accept': '*/*',
        }
    })
    .then(res => {
        // setIsLoading(false)
        if (isLoadMore) {
            var data = context[type[context.isActive]]
    
            res.data.data.forEach(d => {
                var check = data.filter(a => a.title === d.title).length
    
                if(!check) {
                    data.push(d)
                }
            })
    
            setContext(state => ({...state, [type[context.isActive]]: data, [`${type[context.isActive].slice(0, -1)}Page`]: state[`${type[context.isActive].slice(0, -1)}Page`]+1}))
        } else {
            setIsLoading(false)
            setContext(state => ({...state, [type[context.isActive]]: res.data.data, [`${type[context.isActive].slice(0, -1)}Page`]: isFilter ? 1 : state[`${type[context.isActive].slice(0, -1)}Page`]+1}))
        }
    })
    .catch(err => {
        setIsLoading(false)
        console.log(err)
    })
}