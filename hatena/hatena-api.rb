require 'open-uri'

open_uri = open 'https://blog.hatena.ne.jp/uraway/uraway.hatenablog.com/atom/entry'

puts open_uri.status
