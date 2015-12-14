

# Ruby on Rails
## DEEP IN THE CRUD
### DB TABLE

|   | A | B |
|---|---|---|
|1|Where can I get a good bite to eat?|Ash|
|2|My left arm is missing, but I don't care.|Bob|
|3|I just ate some delicious brains.|Jim|
|4|OMG, my fingers turned green. #FML|Ash|

## Hash - Series of key value pairs
### Single key & value
```ruby
b = { id: 3}
```
### Multiple keys & values
```ruby
b = { id: 3,
      status: "I just ate some delicious brains.",  
      zombie: "Jim" }

Hash Recipe: variable = { key: value }
```
### Hash - Read the value
```ruby
b = { id: 3,
      status: "I just ate some delicious brains.",  
      zombie: "Jim" }

b[:status]
# => "I just ate some delicious brains."
b[:zombie]
# => "Jim"
b[:zombie] + " said " + b[:status]
# => Jim said I just ate some delicious brains.
```


### .find()
```ruby
t = Tweet.find(3)
>>> { id: 3,
      status: "I just ate some delicious brains.",  
      zombie: "Jim" }
```

##### Accessing Tables
tweets (Lowercase & Plural Table Name)
|id| status | zombie |
|---|---|---|
|1|Where can I get a good bite to eat?|Ash|
|2|My left arm is missing, but I don't care.|Bob|
|3|I just ate some delicious brains.|Jim|
|4|OMG, my fingers turned green. #FML|Ash|

```ruby
t = Tweet.find(3)
# Singular & Uppercase Table Name
```

```ruby
puts t[:id]
=> 3
puts t[:status]
=> "I just ate some delicious brains."
puts t[:zombie]
=> "Jim"
```

##### Hash vs DOT SYNTAX
```ruby
puts t[:id]           puts t.id
puts t[:status]       puts t.status
puts t[:zombie]       puts t.zombie
```

### Create
```ruby
t = Tweet.new
t.status = "I <3 brains."
t.zombie = "Jim"
t.save
```
```ruby
t = Tweet.new(
  status: "I <3 brains.",
  zombie: "Jim"
)
t.save
```
```ruby
Tweet.create(
  status:"I <3 brains",
  zombie: "Jim"
)
```
Recipe
```ruby
t = TableName.new
t.key = value
t.save
```
```ruby
t = TableName.new(hash)
t.save
```
```ruby
TableName.create(hash)
```
### Read
```ruby
Tweet.find(2)
# Returns a single tweet with id of 2

Tweet.find(3, 4, 5)
# Returns an array of tweets, id of 3, 4, or 5

Tweet.first
# Returns the first tweet

Tweet.last
# Returns the last tweet

Tweet.all
# Returns all the tweets
```

### Recipes to Read
```ruby
Tweet.count
# Returns total number of tweets

Tweet.order(:zombie)
# Returns all tweets, ordered by zombies

Tweet.limit(10)
# Returns the first 10 tweets

Tweet.where(zombie: "ash")
# Returns all tweets from zombie named "ash"
```
### Method Chaining
```ruby
Tweet.where(zombie: "ash").order(:status).limit(10)
# Returns only tweets from zombie "ash" ordered by status only the first 10

Tweet.where(zombie: "ash").first
# Returns only tweets from "ash" just the first one
```

### Update
```ruby
t = Tweet.find(2)
t.zombie = "EyeballChomper"
t.save
```
```ruby
t = Tweet.find(2)
t.attributes = {
  status: "Can I munch your eyeballs?",
  zombie: "EyeballChomper"
}
t.save
```
```ruby
t = Tweet.find(2)
t.update(
  status: "Can I munch your eyeballs?",
  zombie: "EyeballChomper"
)
```
Recipe
```ruby
t = TableName.find(id)
t.key = value
t.save
```
```ruby
t = TableName.find(id)
t.attributes = hash
t.save
```
```ruby
t = Tweet.find(id)
t = TableName.update(hash)
```

### Delete
```ruby
t = Tweet.find(2)
t.destory
```
```ruby
Tweet.find(2).destroy
```
```ruby
Tweet.destroy_all
```
Recipe
```ruby
t = TableName.find(id)
t.destroy
```
```ruby
TableName.find(id).destroy
```
```ruby
TableName.destroy_all
```
## MODELS LIFEBLOOD OF THE APP
```ruby
t = Tweet.find(3)
```
=>
```ruby
# app/models/tweet.rb
class Tweet < ActiveRecord::Base

end
```
=> Maps the class to the table
tweets
|id| status | zombie |
|---|---|---|
|1|Where can I get a good bite to eat?|Ash|
|2|My left arm is missing, but I don't care.|Bob|
|3|I just ate some delicious brains.|Jim|
|4|OMG, my fingers turned green. #FML|Ash|

### Validations
```ruby
t = Tweet.new
t.save
```
=>
tweets
|id| status | zombie |
|---|---|---|
|1|Where can I get a good bite to eat?|Ash|
|2|My left arm is missing, but I don't care.|Bob|
|3|I just ate some delicious brains.|Jim|
|4|OMG, my fingers turned green. #FML|Ash|
|5| | |
<br>
<br>

``app/models/tweet.rb/``
```ruby
class Tweet < ActiveRecord::Base
  validates_presence_of :status
end
```
```
>> t = Tweet.new
=> #<Tweet id: nil, status: nil, zombie: nil>

>> t.save
=> false

>> t.errors.messages
=> {status:["can't be blank"]}

>> t.errors[:status][0]
=> "can't be blank"
```
```ruby
validates_presence_of :status
validates_numericality/of :fingers
validates_uniqueness_of :toothmarks
validates_confirmation_of :password
validates_acceptance_of :zombiefication
validates_length_of :password, minimum: 3
validates_format_of :email, with: /regex/i
validates_inclution_of :age, in:21..99
validates_exclusion_of :age, in:0...21, message: "Sorry you must be over 21."
```
```ruby
validates :status,
          presence: true,
          length: { minimum: 3}

          presence: true
          uniqueness: true
          numericality: true
          length: { minimum: 0, mazmum: 2000 }
          format: { with: /.*/ }
          acceptance: true
          confirmation: true
```
