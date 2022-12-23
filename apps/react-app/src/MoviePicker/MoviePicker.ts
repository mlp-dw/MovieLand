import { MoviePickRepo } from './MoviePickRepo';
import { UserMoviePick } from './UserMoviePick';

export class MoviePicker {
    private moviePickRepo: UserMoviePick;

    constructor(moviepick: UserMoviePick) {
        this.moviePickRepo = moviepick
    }   

    public async pick(title: string): Promise<{}> {
        if (title === '')
            throw new EmptyMovieTitleError();
        if ((await this.moviePickRepo.getByFirstLetter(title[0]))) throw new MoviePickAlreadyExistError();

        await this.moviePickRepo.put(title);

        return this.getPicks() as {};
    }

    public async getPicks(): Promise<{}| undefined> {
        return this.moviePickRepo.getAll();
    }
}

export class MoviePickAlreadyExistError extends Error {
    constructor() {
        super("A movie has already been selected for this letter")
    }
}

export class EmptyMovieTitleError extends Error {
    constructor() {
        super("Movie's title cannot be empty")
    }
}
