desc 'Build the site and upload to S3'
task :deploy do
  sh 'bundle exec jekyll build'
  sh 'bundle exec s3_website push'
end
