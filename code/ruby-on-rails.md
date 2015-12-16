

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

## RELATIONSHIPS
tweets
|id| status | zombie |
|---|---|---|
|1|Where can I get a good bite to eat?|Ash|
|2|My left arm is missing, but I don't care.|Bob|
|3|I just ate some delicious brains.|Jim|
|4|OMG, my fingers turned green. #FML|Ash|
=>
tweets
|id| status | zombie_id |
|---|---|---|
|1|Where can I get a good bite to eat?|1|
|2|My left arm is missing, but I don't care.|2|
|3|I just ate some delicious brains.|3|
|4|OMG, my fingers turned green. #FML|1|

|id|name|graveyard|
|1|Ash|Glen Haven Memorial Cemetery|
|2|Bob|Chapel Hill Cemetery|
|3|Jim|My Father's Basement|

a Zombie *HAS MANY* Tweets
``app/models/zombie.rb``
```ruby
class Zombie < ActiveRecord::Base
  has_many :tweets
            # Plural
end
```

a Tweet *BELONGS TO* a Zombie
``app/models/tweet.rb``
```ruby
class Tweet < ActiveRecord::Base
  belongs_to :zombie
              # Singular
end
```

#### Using RELATIONSHIPS
```
> ash = Zombie.find(1)
=> #<Zombie id: 1, name: "Ash", graveyard: "Glen Haven Memorial Cemetery">

> t = Tweet.create(status: "Your eyelids taste like bacon.", zombie: ash)
=> #<Tweet id: 5, status: "Your eyelids taste like bacon.", zombie_id: 1>

> ash.tweets.count
=> 3

> ash.tweets
=> [#<Tweet id: 1, status: "Where can I get a good bite to eat?", zombie_id: 1>,
    #<Tweet id: 4, status: "OMG, my fingers turned green. #FML", zombie_id: 1>,
    #<Tweet id: 5, status: "Your eyelids taste like bacon.", zombie_id: 1>]

```

```
> t = Tweet.find(5)
=> #<Tweet id: 5, status: "Your eyelids taste like bacon.", zombie_id: 1>

> t.zombie
=> #<Zombie id:1,
            name: "Ash",
            graveyard: "Glen Haven Memorial Cemetery"

> t.zombie.name
=> "Ash"
```

## VIEW VISUAL REPRESENTATION
View...User Interface. What we see.

Embedded Ruby
```
zombie_twitter
      |___app
           |___views
                 |___zombies
                 |___tweets
                        |___index.html.erb
                        |___show.html.erb

```

#### Show a tweet
Evaluate Ruby: <% ... %> <br>
Evaluate Ruby & Print Result: <%= ... %>

``/app/view/tweets/show.html.erb``
```html
<!DOCTYPE html>
<html>
  <head><title>Twitter for Zombies</title>
  <body>
    <header>...</header>

    <% tweet = Tweet.find(1) %>
    <h1><%= tweet.status %></h1>
    <p>Posted by <%= tweet.zombie.name %></p>
  </body>
</html>
```

##### separate the file
``/app/view/layouts/application.html.erb``
```html
<!DOCTYPE html>
<html>
  <head><title>Twitter for Zombies</title>
  <body>
    <header>...</header>

    <%= yield %>
  </body>
</html>
```

``/app/views/tweets/show.html/erb``
```html
<% tweet = Tweet.find(1) %>
<h1><%= tweet.status %></h1>
<p>Posted by <%= link_to tweet.zombie.name, tweet.zombie %></p>
```

Link Recipe
```html
<%= link_to text_to_show, object_to_show %>
```

#### Options for ``link_to``

1. Look in the source.(Open your editor and search for ``def link_to``)
2. Look at api.rubyonrails.org(and search for ``link_to``)
<br>
<br>

``/app/views/tweets/show.html/erb``
```html
<% tweet = Tweet.find(1) %>
<h1><%= tweet.status %></h1>
<p>Posted by
<%= link_to tweet.zombie.name,
            tweet.zombie,
            confirm: "Are you sure?" %></p>
```
<br>

```
zombie_twitter
      |___app
           |___views
                 |___layouts
                 |      |___application.html.erb
                 |___zombies
                 |___tweets
                        |___index.html.erb
                        |___show.html.erb
```

#### List tweets
``/app/views/tweets/index.html.erb``
```html
<h1>Listing tweets</h1>
<table>
  <tr>
    <th>Status</th>
    <th>Zombie</th>
  </tr>
<% Tweet.all.each do |tweet| %>
  <tr>
    <td><%= tweet.status %></td>
    <td><%= tweet.zombie.name %></td>
  </tr>
<% end %>
</table>
```
Listing tweets<br>
Status &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Zombie<br>
Twitter is for the living... for now.&nbsp;&nbsp; Jim<br>
Such Hunger. Munch Brains.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Bob<br>
This code tastes like rotted brains.&nbsp;Ash<br>

#### Empty Table?
```html
<% tweets = Tweet.all %>
<% tweets.each do |tweet| %>
...
<% end %>
<%= if tweets.size == 0 %>
 <em>No tweets found</em>
<% end %>
```

#### Edit & Delete Links
```html
<% tweets.each do |tweet| %>
 <tr>
 <td><%= link_to tweet.status, tweet %></td>
 <td><%= link_to tweet.zombie.name, tweet.zombie %></td>
 </tr>
<% end %>
<td><%= link_to "Edit", edit_tweet_path(tweet) %></td>
<td><%= link_to "Delete", tweet, :method => :delete %></td>
```

#### All Links For tweets
|Action         |Code           |The URL    |
|------         |----           |-------    |
|List all tweets|tweets.path    |/tweets    |
|New tweet form |new_tweet_path |/tweets/new|
```ruby
tweet = Tweet.find(1)
```
|Action         |Code                       |The URL        |
|------         |----                       |-------        |
|Show a tweet   |tweet                      |/tweets/1      |
|Edit a tweet   |edit_tweet_path(tweet)     |/tweets/1/edit |
|Delete a tweet |tweet, :method => :delete  |/tweets/1      |

Link Recipe
```
<%= link_to text_to_show, code %>
```

## CONTROLLERS BRAINS OF THE APP
#### Request
``/app/controllers/tweets_controller.rb``
```ruby
class TweetsController < ApplicationController
  ...
end
```
``app/views/tweets/show.html.erb``
```html
<% tweet = Tweet.find(1) %>
<h1><%= tweet.status %></h1>
<p>Posted by <%= tweet.zombie.name %></p>
```
<br>
=>
<br>
``/app/controllers/tweets_controller.rb``
```ruby
class TweetsController < ApplicationController
  def show
    tweet = Tweet.find(1)
  end
end
```
``app/views/tweets/show.html.erb``
```html
<h1><%= tweet.status %></h1>
<p>Posted by <%= tweet.zombie.name %></p>
```
<br>
=>
<br>
Instance Variable: grants view access to variables wtih ``@``
``/app/controllers/tweets_controller.rb``
```ruby
class TweetsController < ApplicationController
  def show
    @tweet = Tweet.find(1)
  end
end
```
``app/views/tweets/show.html.erb``
```html
<h1><%= @tweet.status %></h1>
<p>Posted by <%= @tweet.zombie.name %></p>
```
<br>
=>
<br>
#### Rendering a Different View
``/app/controllers/tweets_controller.rb``
```ruby
class TweetsController < ApplicationController
  def show
    @tweet = Tweet.find(1)
    render action: 'status'
  end
end
```
``app/views/tweets/show.html.erb``
```html
<h1><%= @tweet.status %></h1>
<p>Posted by <%= @tweet.zombie.name %></p>
```
<br>
=>
<br>
#### Accepting Parameters
```ruby
Params Recipe: params = { id: "1"}
```
``/app/controllers/tweets_controller.rb``
```ruby
class TweetsController < ApplicationController
  def show
    @tweet = Tweet.find(params[:id])
  end
end
```
``app/views/tweets/show.html.erb``
```html
<h1><%= @tweet.status %></h1>
<p>Posted by <%= @tweet.zombie.name %></p>
```

#### Parameters
/tweets?/status=I'm dead
params = { status: "I'm dead" }
```ruby
@tweet = Tweet.create(staus: params[:status])
```
<br>
/tweets?tweet[status]=I'm dead
params = { tweet: {status: "I'm dead" }}
```ruby
@tweet = Tweet.create(status: params[:tweet][:status])
# Alternate Syntax
# But it is a rotten code. Users might be able to set any attributes.
@tweet = Tweet.create(params[:tweet])
```

#### Strong Parameters
We need to specify the parameter key we require
```ruby
require(:tweet)
```
And the attributes we will permit to be set
```ruby
permit(:status)
```
<br>
/tweets?tweet[status]=I'm dead
params = { tweet: {status: "I'm dead" }}
```ruby
@tweet = Tweet.create(params.require(:tweet).permit(:status))
```
If there were multiple things we needed to permit, we could use an array.
```ruby
params.require(:tweet).permit([:status, :location])
```
Strong Params Required only when CREATING or UPDATING with MULTIPLE Attributes.
```ruby
@tweet = Tweet.create(params[:tweet])
```

#### Respond with XML or JSON?
/tweets/1
```XML
<? xml version="1.0" encoding="UTF-8"?>
<tweet>
  <id type="integer">1</id>
  <status>Where can I get a good bite to eat?</status>
  <zombie-id type="integer">1</zombie-id>
</tweet>
```
```JSON
{"tweet":{"id":1,
          "status":"Where can I get a good bite to eat?",
          "zombie_id":1}}
```

#### Respond with HTML or JSON
/tweets/1.json
``/app/controllers/tweets_controller.rb``
```ruby
class TweetsController < ApplicationController
  def show
    @tweet = Tweet.find(params[:id])
    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @tweet }
    end
  end
end
```

#### Respond with HTML. JSON. XML
/tweets/1.xml
``/app/controllers/tweets_controller.rb``
```ruby
class TweetsController < ApplicationController
  def show
    @tweet = Tweet.find(params[:id])
    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @tweet }
      format.xml { render xml: @tweet }
    end
  end
end
```

#### Controller Actions
=> Views
``/app/controllers/tweets_controller.rb``
```ruby
class TweetsController < ApplicationController
  def index   List all tweets
  def show    Show a single tweet
  def new     Show a new tweet form
  def edit    Show an edit tweet form
  def create  Create a new tweet
  def update  Update a tweet
  def destroy Delete a tweet
end
```

#### The Edit Action
``/app/controllers/tweets_controller.rb``
```ruby
def edit
  @tweet = Tweet.find(params[:id])
end
```

#### Redirect and Flash
``/app/controllers/tweets_controller.rb``
```ruby
class TweetsController < ApplicationController
  def edit
    @tweet = Tweet.find(params[:id])
    if session[:zombie_id] != @tweet.zombie_id
      flash[:notice] = "Sorry, you can't edit this tweet"
      redirect_to(tweets_path)
    end
  end
end
```
|Recipe          |Works                         |
|------          |-----                         |
|session         | Works like a per user hash   |
|flash[:notice]  | To send messages to the Users|
|redirect <path> | To redirect the request      |

```ruby
Alternative Recipe: redirect_to(tweets_path, :notice => "Sorry, you can't edit this tweet")
```

#### Notice for layouts
``app/views/layouts/application.html.erb``
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Twitter for Zombies</title>
  </head>
  <body>
    <img src="/images/twitter.png" />
    <%= yield %>
  </body>
</html>
```
<br>
=>
<br>
``app/views/layouts/application.html.erb``
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Twitter for Zombies</title>
  </head>
  <body>
    <img src="/images/twitter.png" />
    <% if flash[:notice] %>
      <div id="notice"><%= flash[:notice] %></div>
    <% end %>
    <%= yield %>
  </body>
</html>
```

#### Adding Some Authorization
``/app/controllers/tweets_controller.rb``
```ruby
class TweetsController < ApplicationController
  def index   List all tweets
  def show    Show a single tweet
  def new     Show a new tweet form
  def edit    Show an edit tweet form   <-
  def create  Create a new tweet
  def update  Update a tweet    <-
  def destroy Delete a tweet    <- #Need Authorization
end
```

#### Before Actions
REQUEST
``/app/controllers/tweets_controller.rb``
```ruby
class TweetsController < ApplicationController
  def edit
    @tweet = Tweet.find(params[:id])
    ...
  end
  def update
    @tweet = Tweet.find(params[:id])
    ...
  end
  def destroy
    @tweet = Tweet.find(params[:id])
    ...
  end
end
```
BEFORE ACTION
``/app/controllers/tweets_controller.rb``
```ruby
class TweetsController < ApplicationController
  before_action :get_tweet , only: [:edit, :update, :destroy]
  def get_tweet
    @tweet = Tweet.find(params[:id])
  end
  def edit
    @tweet = Tweet.find(params[:id])
    ...
  end
  def update
    @tweet = Tweet.find(params[:id])
    ...
  end
  def destroy
    @tweet = Tweet.find(params[:id])
    ...
  end
end
```
``/app/controllers/tweets_controller.rb``
```ruby
class TweetsController < ApplicationController
  before_action :get_tweet , :only => [:edit, :update, :destroy]
  before_action :check_auth , :only => [:edit, :update, :destroy]
  def get_tweet
    @tweet = Tweet.find(params[:id])
  end
  def check_auth
    if session[:zombie_id] != @tweet.zombie_id
      flash[:notice] = "Sorry, you can't edit this tweet"
      redirect_to tweets_path
    end
  end
  def edit
  def update
  def destroy
end
```

<br>
<br>
CONTROLLER BEFORE ACTION
Add a before_action that calls a method to check if a Zombie has tweets. Redirect to zombies_path if the zombie doesn't have tweets, only on show.

```ruby
class ZombiesController < ApplicationController
  before_action :find_zombie
  before_action :check_tweets, only: :show
  def show
    render action: :show
  end

  def find_zombie
    @zombie = Zombie.find params[:id]
  end

  def check_tweets
    if @zombie.tweet.size == 0
      redirect_to zombies_path
    end
  end
end
```

## ROUTING THROUGH RAILS

Application Stack

```
Views -> Models -> Controllers -> Routes
```

#### In order to properly find these paths...
```html
<% link_to "<link text>", <code> %>
```

|Action         |Code           |The URL Generated  |
|---            |---            |---                |
|List all tweets|tweets_path    |/tweets            |
|New tweet form |new_tweet_path |/tweets/new        |

```ruby
tweet = Tweet.find(1) #These paths need a tweet
```

|Action         |Code                     |The URL Generated|
|---            |---|---|
|Show a tweet   |tweet                    |/tweets/1        |
|Edit a tweet   |edit_tweet_path(tweet)   |/tweets/1/edit   |
|Delete a tweet |tweet, :method => :delete|/tweets/1        |

#### and these actions...
``/app/controllers/tweets_controller.rb``
```ruby
class TweetsController < ApplicationController
  def index   List all tweets
  def show    Show a single tweet
  def new     Show a new tweet form
  def edit    Show an edit tweet form   
  def create  Create a new tweet
  def update  Update a tweet   
  def destroy Delete a tweet    
end
# -> Views
```

#### We need to define Routes
Creating what we like to call a "REST"FULL resources
<br>
``zombie_twitter/config/routes.rb``
```ruby
ZombieTwitter::Application.routes.draw do
  resources :tweets
end
```
|Code           |The URL          |TweetsController |
|---            |---              |---              |
|tweets_path    |/tweets          |def index        |
|tweet          |/tweet/<id>      |def show         |
|new_tweet_path |/tweets/new      |def new          |
|edit_tweet_path|/tweets/<id>/edit|def edit         |

#### Custom Routes
http://localhost:3000/new_tweet render -> http://localhost/tweets/new
|Function   |name   |
|---        |---    |
|Controller |Tweets |
|Action     |new    |

``/config/routes.rb``
```ruby
ZombieTwitter::Application.routes.draw do
  resources :tweets
  get '/new_tweet' => 'tweets#new'
end
```
```ruby
get 'Path' => 'Controller#Action'
```

#### Named Routes
http://localhost:3000/all render -> http://localhost:3000/tweets
|Function   |name   |
|---        |---    |
|Controller |Tweets |
|Action     |index  |
``/config/routes.rb``
```ruby
get '/all' => 'tweets#index'
```
```html
<!-- View -->
<%= link_to "All Tweets", ???? %>
<!-- tweets_path wouldn't work -->
```

```ruby
get '/all' => 'tweets#index', as: 'all_tweets'
```
```html
<!-- View -->
<%= link_to "All Tweets", all_tweets_path %>
```

#### Redirect
What if out tweets used to be found at /all but now our definitive URL is /tweets<br>
<br>
http://localhost:3000/all redirect -> http://location:3000/tweets
```ruby
get '/all' => redirect('/tweets')
```
```ruby
get '/google' => redirect('http://www.google.com/')
```

#### Root Routes
http://localhost:3000/ render -> http://localhost3000/tweets
```ruby
root to: "tweets#index"
```
```html
<%= link_to "All Tweets", root_path %>
```

#### Route Parameters
``/app/controllers/tweets_controller.rb``
```ruby
def index
  if params[:zipcode]
    @tweets = Tweet.where(zipcode: params[:zipcode])
  elsif
    @tweets = Tweet.all
  end
  respond_to do |format|
    format.html #index.html.erb
    format.xml { render xml: @tweets }
  end
end
```
```ruby
get `/local_tweets/:zipcode` => 'tweets#index'
```
```ruby
get '/local_tweets/:zipcode' => 'tweets#index', as: 'local_tweets'
```
```html
<%= link_to "Tweets in 32828", local_tweets_path(32828) %>
```
