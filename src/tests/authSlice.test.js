import reducer, { logout, setApiKey } from "../app/auth-slice"


test("should return the initial state", () => {
  expect(reducer(undefined, {})).toEqual({
    api_key: null 
  });
})


test("set the api_key", ()=> {
  expect(reducer(undefined, setApiKey("34334-45454"))).toEqual({
    api_key : "34334-45454"
  })
})

test("should return the api_key null if logout", () => {
  expect(reducer(undefined, logout())).toEqual({
    api_key : null
  })
})

test("should return a null sessionStorage when logout",()=> {
  const res = window.sessionStorage.getItem("api_key")
  expect(res).toBe(null)
})
