# Magutils
[![npm version](https://badge.fury.io/js/magutils.svg)](https://badge.fury.io/js/magutils)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Node.js typesafe utilities

## Features
### Rust like results
```ts
import { Result, Ok, Err, isErr } from 'magutils'

function Something(): Result<Foo> {
  // Do something...
    
  if (err) {
    // Get error
    return Err({ message: err.message })
  }
  // OK!!
  return Ok(value)
}

var res = Something()
if (isErr(res)) 
{
  // catch your error
}
// get result value
console.log(res.value)
```