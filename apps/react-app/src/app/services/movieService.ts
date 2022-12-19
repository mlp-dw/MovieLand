import { apikey } from "../../environments/environment";

class MovieServices {
    private API_KEY: string = apikey;


    public getAll(query: string = '') : Promise<Response>
    {
        return fetch(`https://omdbapi.com/?s=${query}&apikey=${this.API_KEY}`)
    }

    public getById(imdbID: string = '') : Promise<Response>
    {
        return fetch(`https://omdbapi.com/?i=${imdbID}&apikey=${this.API_KEY}`)
    }
}

export default new MovieServices();