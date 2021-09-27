import { Err, isErr, isOk, Ok } from "."

describe("Result", () => {
  describe("ok", () => {
    it("Ok", async () => {
      const promise = new Promise<number>(resolve => resolve(10))
      const result = await promise.then(v => Ok(v)).catch(e => Err(e))
      expect(result).toStrictEqual(Ok(10))
    })
    it("Err", async () => {
      const promise = new Promise<number>((_, reject) => reject(10))
      const result = await promise.then(v => Ok(v)).catch(e => Err(e))
      expect(result).toStrictEqual(Err(10))
    })
    it('isOk', async () => {
      const okCb = jest.fn()
      const errCb = jest.fn()
      const promise = new Promise<number>(resolve => resolve(10))
      const result = await promise.then(v => Ok(v)).catch(e => Err(e))
      if (isOk(result)) {
        okCb(result.value)
      }
      if (isErr(result)) {
        errCb(result.value)
      }
      expect(okCb.mock.calls.length).toBe(1)
      expect(okCb.mock.calls[0][0]).toBe(10)
      expect(errCb.mock.calls.length).toBe(0)
    })
  })
})
