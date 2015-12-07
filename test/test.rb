#!/usr/bin/env ruby
result = `sass app.scss app.css`
raise result unless $?.to_i == 0
raise "When compiled the module should output some CSS" unless File.exists?('app.css')
puts "Regular compile worked successfully"
