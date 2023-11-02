import { makeAutoObservable } from "mobx"

class Clicker {
  clicks = 0

  constructor() {
    makeAutoObservable(this)
  }

  increment = () => {
    this.clicks = this.clicks + 1
  }
}

const clickerStore = new Clicker()

export default clickerStore
