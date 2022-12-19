import IMovie from "../interfaces/IMovie";

class MovieModel implements IMovie {

    public Actors: string
    public Awards: string
    public BoxOffice:string
    public Country:string
    public DVD:string
    public Director:string
    public Genre:string
    public Language:string
    public Metascore:string
    public Plot:string
    public Poster :string
    public Production:string
    public Rated:string
    public Ratings: Array<{Source: string , Value: string }>
    public Released:string
    public Response:string
    public Runtime:string
    public Title:string
    public Type:string
    public Website:string
    public Writer:string
    public Year:string
    public imdbID:string
    public imdbRating:string
    public imdbVotes:string 
    
    public constructor(movie: IMovie) {
        this.Actors =  movie.Actors ?? ''
        this.Awards =  movie.Awards ?? ''
        this.BoxOffice = movie.BoxOffice ?? ''
        this.Country = movie.Country ?? ''
        this.DVD = movie.DVD ?? ''
        this.Director = movie.Director ?? ''
        this.Genre = movie.Genre ?? ''
        this.Language = movie.Language ?? ''
        this.Metascore = movie.Metascore ?? ''
        this.Plot = movie.Plot ?? ''
        this.Poster =   movie.Poster ?? ''
        this.Production = movie.Production ?? ''
        this.Rated = movie.Rated ?? ''
        this.Ratings =  movie.Ratings ?? ''
        this.Released = movie.Released ?? ''
        this.Response = movie.Response ?? ''
        this.Runtime = movie.Runtime ?? ''
        this.Title = movie.Title ?? ''
        this.Type =  movie.Type ?? ''
        this.Website = movie.Website ?? ''
        this.Writer = movie.Writer ?? ''
        this.Year = movie.Year ?? ''
        this.imdbID =  movie.imdbID ?? ''
        this.imdbRating = movie.imdbRating ?? ''
        this.imdbVotes = movie.imdbVotes ?? ''
    }
} 

export default MovieModel;