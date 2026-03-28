export type ExampleAPI = {
  getRandomNumber: () => number
}

export const exampleApi: ExampleAPI = {
  getRandomNumber: () => Math.random()
}
