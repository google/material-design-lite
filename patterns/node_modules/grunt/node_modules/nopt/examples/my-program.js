#!/usr/bin/env node

//process.env.DEBUG_NOPT = 1

// my-program.js
var nopt = require("../lib/nopt")
  , Stream = require("stream").Stream
  , path = require("path")
  , knownOpts = { "foo" : [String, null]
                , "bar" : [Stream, Number]
                , "baz" : path
                , "bloo" : [ "big", "medium", "small" ]
                , "flag" : Boolean
                , "pick" : Boolean
                }
  , shortHands = { "foofoo" : ["--foo", "Mr. Foo"]
                 , "b7" : ["--bar", "7"]
                 , "m" : ["--bloo", "medium"]
                 , "p" : ["--pick"]
                 , "f" : ["--flag", "true"]
                 , "g" : ["--flag"]
                 , "s" : "--flag"
                 }
  , description = { "foo" : "Something really foooooooo"
                  , "bar" : "A bar thing"
                  , "baz" : "More or less baz"
                  , "flag" : "Flag it as well"
                  , "pick" : "Or pick something"
                  }
  , defaults = { "foo" : null
               , "bar" : 42
               , "baz" : "/etc/passwd"
               , "bloo" : "small"
               , "pick" : false
               }
             // everything is optional.
             // knownOpts and shorthands default to {}
             // arg list defaults to process.argv
             // slice defaults to 2
  , parsed = nopt(knownOpts, shortHands, process.argv, 2)
  , usage = nopt.usage(knownOpts, shortHands, description, defaults)

console.log("parsed =\n"+ require("util").inspect(parsed))

console.log('\nUsage: ')
console.log(usage)
