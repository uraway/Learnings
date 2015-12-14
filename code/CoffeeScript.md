<!-- TOC depth:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [[CoffeeScript](http://coffeescript.org/)](#coffeescripthttpcoffeescriptorg)
	- [The CoffeeScript Compiler](#the-coffeescript-compiler)
			- [Install](#install)
	- [Command Line Examples](#command-line-examples)
	- [Basic Syntax](#basic-syntax)
			- [Variables](#variables)
<<<<<<< HEAD
- [No semicolons](#no-semicolons)
=======
>>>>>>> origin/master
			- [functions](#functions)
			- [Returning a String](#returning-a-string)
			- [Function Parameters](#function-parameters)
			- [Default Parameters](#default-parameters)
	- [Applied jQuery](#applied-jquery)
			- [Object Simplicity](#object-simplicity)
			- [A Complex Example](#a-complex-example)
			- [Mind Bending Comprehensions](#mind-bending-comprehensions)
	- [Condition & Operators](#condition-operators)
			- [If Statement](#if-statement)
			- [If Else Statement](#if-else-statement)
			- [Operators](#operators)
				- [Examples](#examples)
			- [Chained Comparisons](#chained-comparisons)
			- [Switch Statements](#switch-statements)
			- [Existential Operators](#existential-operators)
	- [Arrays, Objects, Iteration](#arrays-objects-iteration)
			- [Arrays](#arrays)
			- [Loops](#loops)
			- [List Comprehensions](#list-comprehensions)
			- [Splats -for a variable number of arguments](#splats-for-a-variable-number-of-arguments)
			- [Objects](#objects)
			- [Functions in Objects](#functions-in-objects)
			- [Functions in Objects with Conditions](#functions-in-objects-with-conditions)
			- [Complex Objects](#complex-objects)
			- [Object Iteration with of](#object-iteration-with-of)
	- [Object Orientation](#object-orientation)
			- [Constructor & Properties](#constructor-properties)
			- [Inheritance](#inheritance)
			- [The Fat Arrow](#the-fat-arrow)
			- [Using a Class for Encapsulation](#using-a-class-for-encapsulation)

<!-- /TOC -->


[![IMAGE ALT TEXT](http://img.youtube.com/vi/mNkr8XPjdrk/0.jpg)](https://www.youtube.com/watch?v=OZbKZ6cPcbw&list=PLFvzBwXlguwy-J1vO-M0LdD4XDZ7Mh6il "CoffeeScript")


# [CoffeeScript](http://coffeescript.org/)

 - シンプルな記述
 - 読みやすく理解しやすい
 - 保守が簡単
 - JavaScriptにコンパイルが必要
 - PythonやRubyを意識した文体。インデントに注意

## The CoffeeScript Compiler

#### Install
```
$ npm install -g coffee-script
```

## Command Line Examples

Create test.js compiled JavaScript into.
```
$ coffee -c test.coffee
```
Every time test.coffee is updated re-compile.
```
$ coffee -cw test.coffee
```
Compile all .coffee files in the src dir into the js dir
```
$ coffee -c src -o js
```
Every time a file is updated re-compile.
```
$ coffee -wc src -o js
```

## Basic Syntax
#### Variables

JavaScript
```javascript
var message;
message = "Coffee";
alert(message);
```
CoffeeScript
```coffeescript
message = "Coffee"
alert(message)
No variable declarations
#No semicolons
```


#### functions

Javascript
```javascript
//Named Functions
function coffee() {
    return confirm("Coffee");
}

//Function Expressions
var coffee = function() {
    return confirm("Coffee");
}

//Both called with
coffee();
```

CoffeeScript
```coffeescript
#Only use Function Expressions
coffee = ->
  confirm "Coffee"
```

#### Returning a String

JavaScript
```javascript
var coffee;
coffee = function() {
  var answer;
  answer = confirm("Coffee or Tea?");
  return "Your answer is " + answer;
}
```

CoffeeScript
```coffeescript
coffee = ->
  answer = confirm "Coffee or Tea?"
  "Your answer is #{answer}"
```

#### Function Parameters

JavaScript
```javascript
var coffee;
coffee = function(message) {
  var answer;
  answer = confirm(message);
  return "Your answer is" + answer;
}
```

CoffeeScript
```coffeescript
coffee = (message) ->
  answer = confirm message
  "Your answer is #{answer}"
```

#### Default Parameters

CoffeeScript
```coffeescript
coffee = (message="Coffee or Tea?") ->
  answer = confirm message
  "Your answer is {answer}"

alert coffee()
#this will alert "Coffee or Tea?"
alert coffee("Want some Decaf?")
#this will alert "Want some Decaf?"
```

## Applied jQuery

JavaScript
```javascript
jQuery(function($) {

  function changeTab(e) {
    e.preventDefault();
    $("#tabs li a.active").removeClass("active");
    $(this).addClass("active");
  }

  $("#tab ul li a").click(changeTab);
});
```

CoffeeScript
```coffeescript
$ ->
  changeTab = (e) ->
    e.preventDefault()
    $("#tabs li a.active").removeClass "active"
    $(@).addClass "active"

  $("#tabs ul li a").click changeTab
```

#### Object Simplicity
JavaScript
```javascript
$("#tabs ul li a").bind({
  click: changeTab,
  mouseenter: showNumebrOfFlights,
  mouseleave: hideNumberOfFlights
});
```

CoffeeScript
```coffeescript
$('#tabs ul li a').bind
  click: changeTab
  mouseenter: showNumebrOfFlights
  mouseleave: hideNumberOfFlights
```

#### A Complex Example
JavaScript
```javascript
function showFlights(activeDiv) {
  $("#tabs div").hide();

  if (fetchingFlights) {
    fetchingFlights.abort();
  }

  fetchingFlights = $.ajax('/flights', {
    data: { date: activeDiv },
    cache: false,
    error: function(result) {
      if (result.statusText != "abort") {
        $('#tabs #error').show();
      }
    }
  });
}
```

CoffeeScript
```coffeescript
showFlights = (activeDiv) ->
  $('#tabs div').hide()

  if fetchingFlights
    fetchingFlights.abort()

  fetchingFlights = $.ajax './flights'
    data:
      date: activeDiv
    cache: false
    error: (result) ->
      if result.statusText isnt "abort"
        $('#tabs #error').show()
```

#### Mind Bending Comprehensions
JavaScript
```javascript
var filteredFlights = [];

$.each(currentFlights, funcion(index, flight) {
  if (stops == '2+' || flight.routing == 0) {
    filteredFlights.push(flight);
  }
});
```

CoffeeScript
```coffeescript
filteredFlights = []

$.each currentFlights, (index, flight) ->
  if stops is '2+' or flight.routing is 0
    filteredFlights.push flight

#same as...
filteredFlights =
  (flight for flight in currentFlights when stops is '2+' or flight.routing is 0)

```

## Condition & Operators

#### If Statement

JavaScript
```javascript
if (age < 18) {
  alert('Under age');
}
```

CoffeeScript
```coffeescript
if age < 18
  alert 'Under age'
#or...
alert 'Under age' if age < 18
#or...
if age < 18 then alert 'Under age'
```

#### If Else Statement

JavaScript
```javascript
if (age < 18) {
  alert('Under age');
} else {
  alert('of age');
}
```

CoffeeScript
```coffeescript
if age < 18
  alert 'Under age'
else
  alert 'of age'
#or...
if age < 18 then alert 'Under age' else alert 'of age'
```

#### Operators
| CoffeeScript | JavaScript |
|--------		|--------   |
|== is			|===		|
|!== isnt		|!== 		|
|not			|!			|
|and			|&&			|
|or				|&#124;&#124;|
|true yes on	|true		|
|false no off	|false		|

##### Examples

JavaScript
```javascript
if (paid() && coffee() === true) {
  pour();
}
```

CoffeeScript
```coffeescript
if paid() and coffee() is on then pour()
```

#### Chained Comparisons

JavaScript
```javascript
if (2 < newLevel && newLevel < 5) {
  alert("In Range!");
}
```

CoffeeScript
```coffeescript
if 2 < newLevel < 5
  alert "In Range!"
```

#### Switch Statements

JavaScript
```javascript
var message = (function() {
  switch (cupsOfCoffee) {
    case 0:
      return 'Asleep';
    case 1:
      return 'Eyes Open';
    case 2:
      return 'Buzzed';
    default:
      return 'Dangerous';
  }
})();
```

CoffeeScript
```coffeescript
message = switch cupsOfCoffee
  when 0 then 'Asleep'
  when 1 then 'Eyes Open'
  when 2 then 'Buzzed'
  else 'Dangerous'
```

#### Existential Operators

How do we check to see that ```cupsOfCoffee``` isnt defined and isnt null?
JavaScript
```javascript
if (typeof cupsOfCoffee !== "undefined" && cupsOfCoffee !== null) {
  alert('it exists');
}
```

CoffeeScript
```coffeescript
if cupsOfCoffee?
  alert 'it exists!'
#or...
alert 'it exists!' if cupsOfCoffee?
```

Set ```cupsOfCoffee``` to Zero unless previously set

```coffeescript
if not cupsOfCoffee?
  cupsOfCoffee = 0
#or...
cupsOfCoffee = 0 unless cupsOfCoffee?
#or...
cupsOfCoffee ?= 0
```

Call ```brew()``` on ```coffeePot``` only if it exists

```coffeescript
if coffeePot?
  coffeePot.brew()
#or...
coffeePot?.brew()
```

Only call function if it exists
```coffeescript
vehicle.start_engine?().shift_gear?()
#in Ruby "try()"
```

## Arrays, Objects, Iteration
JavaScript
```javascript
var range = [1,2,3,4]
```
CoffeeScript
```coffeescript
range = [1..4]
range = [1...5]
```

CoffeeScript
```coffeescript
start = 5
end = 10

range = [start.end]
#[5,6,7,8,9,10]
range[1..4]
#[6,7,8,9]
range[1...range.length]
range[1..-1]
#[6,7,8,9,10]
```

#### Arrays
CoffeeScript
```coffeescript
storeLocations = ['Orlando','Winter Park', 'Sanford']
#or...
storeLocations = [
  'Orlando'
  'Winter Park'
  'Sanford'
]
````

#### Loops
JavaScript
```javascript
storeLocations.forEach(function(location, index) {
  return alert("Location: " + location)
});
```

CoffeeScript
```coffeescript
storeLocations.forEach (location, index) ->
  alert "Location: #{location}"
#or...
for location in storeLocations
  alert "Location: #{location}"
#or...a list comprehension
alert "Location: #{location}" for location in storeLocations
```

#### List Comprehensions
CoffeeScript
```coffeescript
storeLocations = ['Orlando', 'Winter Park', 'Sanford']

# Add ",FL" to each storeLocation
# ['Orlando, FL', 'Winter Park, FL', 'Sanford, FL']
"{loc}, FL" for loc in storeLocations
#or...
storeLocations = ("#{loc}, FL" for loc in storeLocations)

#"when" works as filter
geoLocate(loc) for loc in storeLocations when loc isnt 'Sanford'
```

Create new array without Sanford
```coffeescript
storeLocations = ['Orlando', 'Winter Park', 'Sanford']

newLocs = []
for loc in storeLocations
  newLocs.push loc if loc isnt 'Sanford'
#or...
newLocs = (loc for loc in storeLocations when loc isnt 'Sanford')
```

#### Splats -for a variable number of arguments
CoffeeScript
```coffeescript
searchLocations = (brand, cities...) ->
  "looking for #{brand} in #{cities.join(',')}"

#calling...
searchLocations 'Starducks', 'Orlando'
#returns 'looking for Starducks in Orlando'

searchLocations 'Starducks', 'Orlando', 'Winter Park'
#returns 'looking for Starducks in Orlando, Winter Park'
#same as...
params = ['Starducks', 'Orlando', 'Winter Park']
searchLocations(params...)
```

#### Objects
```coffeescript
coffee = {name: 'French', strength: 1 }
#same as...
coffee = name: 'French', strength: 1
#same as...
coffee =
  name: 'French'
  strength: 1
```

#### Functions in Objects
JavaScript
```javascript
var coffee = {
  name: 'French',
  strength: 1,
  brew: function() {
    return alert("brewing " + this.name);
  }
};
```

CoffeeScript
```coffeescript
coffee =
  name: 'French'
  strength: 1,
  brew: ->
    alert("brewing #{@name}")
```

#### Functions in Objects with Conditions
JavaScript
```javascript
var coffee = {
  name:'French',
  strength: 1,
  brew: funcion() {
    return alert("brewing " + this.name)
  }
  pour: function(amount) {
    if (amount == null) amount= 1;
    if (amount === 1) {
      return "Poured a single cup";
    } else {
      return "Poured " + amount + " cups";
    }
  }
};
```

CoffeeScript
```coffeescript
coffee =
  name: 'French'
  strength: 1
  brew: ->
    alert("brewing #{@name}")
  pour: (amount = 1) ->
    if amount is 1
      "Poured a single cup"
    else
      "Poured #{amount} cups"
```

#### Complex Objects
JavaScript
```javascript
var coffees = {
  french: {
    strength: 1,
    in_stock: 20
  },
  italian: {
    strength: 2,
    in_stock: 12
  },
  decaf: {
    strength: 0,
    in_stock: 0
  }
};
```

CoffeeScript
```coffeescript
coffees =
  french:
    strength: 1
    in_stock: 20
  italian:
    strength: 2
    in_stock: 12
  decaf:
    strength: 0
    in_stock: 0

coffees.italian.in_stock
#12
```

#### Object Iteration with of
````coffeescript
coffees =
  french:
    strength: 1
    in_stock: 20
  italian:
    strength: 2
    in_stock: 12
  decaf:
    strength: 0
    in_stock: 0

# for KEY, VALUE of OBJECTS
"#{coffee} has #{attrs.in_stock}" for coffee, attrs of coffees
#same as...
for coffee, attrs of cooffees
  '#{coffee} has #attrs.in_stock'

to_print = for coffee, attrs of coffees when attrs.in_stock > 0
  '#{coffee} has #{attrs.in_stock}'
to_print.join ", "
#"french has 20, italian has 12"
```

## Object Orientation

#### Constructor & Properties
```coffeescript
class Coffee

  constructor: (name, strength=1) ->
    @name = name
    @strength = strength

#same as...
class Coffee

  constructor: (@name, @strength=1) ->
```

```coffeescript
class Coffee

  constructor: (@name, @strength=1) ->

  brew: -> alert "brewing #{@name}"
  pour: (amount=1) ->
    if amount is 1
      "Poured a single cup"
    else
      "Poured #{amount} cups"

fetch = new Coffee("French", 2)

fetch.brew()
# brewing French
```

#### Inheritance

```coffeescript
class Coffee

  constructor: (@name, @strength=1) ->

  brew: -> alert "brewing #{@name}"


class MaxgoodHouse extends Coffee
  constructor: (@name, @strength=0) ->
    @brand = "Maxgood House"


boring = new MaxgoodHouse("Boring")

boring.brew()
#says brewing Boring    
```

```coffeescript
class MaxgoodHouse extends Coffee
  constructor: (@name, @strength=0) ->
    @brand = "Maxgood House"

  brew: -> alert "Brewing #{@brand} #{@name}"


boring = new MaxgoodHouse("Boring")

boring.brew()
#says Brewing Maxgood House Boring
```

```coffeescript
class MaxgoodHouse extends Coffee
  constructor: (@name, @strength=0) ->
    @brand = "Maxgood House"

  brew: -> alert "Brewing #{@brand} #{@name}"
  pour: (amount=1) ->
    "#{super(amount)}, but it sucks"

boring = new MaxgoodHouse("Boring")

boring.pour()
#says Poured a single cup but it sucks
```

#### The Fat Arrow
```coffeescript
class Coffee
  constructor: (@name, @strength=1, @inventry=0) ->

  pourClick: ->
    $("#pour-#{@name}").click (event) ->
      if @inventry isnt 0
        @inventry -= 1
        alert "Poured a cup of #{@name}"
```
Error!
Looking for property of the dom element called ```@inventry``` and ```@name```

```coffee-script
class Coffee
  constructor: (@name, @strength=1, @inventry=0) ->

  pourClick: ->
    $("#pour-#{name}").click (event) =>
      if @inventry isnt 0
        @inventry -= 1
        alert "Poured a cup of #{@name}"
```
Binds to current value of 'this'

#### Using a Class for Encapsulation
JavaScript
```js
var selectFlights = {
  fetchingFlights: null,

  init : function() {
    $("#tabs ul li a").bind({
      click: this.changeTab
    });

    $("#tabs #error a").click(function (event){
      e.preventDefault();
      this.showFlights($("#tabs li a.active").attr("href"));
    });
  },

  showFlights : function(activeDiv) { },
  changeTab : function(event) { }
};
```

CoffeeScript
```coffeescript
class selectFlights
  constructor: (@fetchingFlights=null) ->

    $("#tabs ul li a").bind
      click: @changeTab

    $("#tabs #error a").click (event) =>
      event.preventDefault()
      @showFlights $("#tabs li a.active").attr("herf")

  showFlights: (activeDiv) ->
  changeTab: (event) =>
```
