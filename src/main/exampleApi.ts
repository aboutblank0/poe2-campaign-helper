interface ExampleAPI {
  getRandomNumber: () => number
}

const exampleApi: ExampleAPI = {
  getRandomNumber: () => Math.random()
}

export { exampleApi }
export type { ExampleAPI }
