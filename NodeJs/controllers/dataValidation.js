/*
    The file is used to validate data using schemas crated in AJV ( https://www.npmjs.com/package/ajv )
     1.RegSchema - registration schema used to verify user creationg data
     2.LogSchema - login schema  used to verify login data

*/

import Ajv from 'ajv'

const ajv = new Ajv()

//creating Schemas
// 1. Registration schema
const RegSchema = {
    type: "object",
    properties: {
        name: { type: "string"},
        email: { type: "string", pattern: '[a-z0-9]+@[a-z]+\.[a-z]{2,3}$' },
        password: { type: "string", pattern: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$' },
        passwordRepeat: { type: "string", pattern: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$' }
    },
    required: ["name","email", "password", "passwordRepeat"],
}

// 2. Login Schema

const LogSchema = {
    type: "object",
    properties: {
        email: { type: "string", pattern: '[a-z0-9]+@[a-z]+\.[a-z]{2,3}$' },
        password: { type: "string", pattern: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$' },
    },
    required: ["email", "password"],
}

// creating validation functions

const validateLog = ajv.compile(LogSchema)
const validateReg = ajv.compile(RegSchema)

// Registration Function

let RegValidation = (data) => {
    const valid = validateReg(data)
    const PassCompare = data.password === data.passwordRepeat
    console.log('valid', valid, 'compare =', PassCompare)
    return (valid && PassCompare)
}
// Login Function
let LogValidation = (data) => {
    const valid = validateLog(data)
    return valid
}

// Exporting functions

export default RegValidation
export { LogValidation }