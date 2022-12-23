import { MoviePickRepo } from "./MoviePickRepo";

export class UserMoviePick implements MoviePickRepo {

  async getByFirstLetter(firstLetter: string) {
    let json: string|null = localStorage.getItem('favorite')
    if (json) {
      let data :{} = JSON.parse(json) as {};
      return data[firstLetter] ?? false
    }
  }

  async getAll() {
    let json: string|null = localStorage.getItem('favorite')
    if (json) {
      let data :{} = JSON.parse(json) as {};
      return data
    }
  }

  async put(title: string) {
      
      if(title.length) {
          let favoriteList = await this.getAll()
          localStorage.setItem('favorite', JSON.stringify({...favoriteList, [title.charAt(0)] : title}));
      }
  }
}

