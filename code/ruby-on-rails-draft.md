### VIEW VISUAL REPRESENTATION
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
