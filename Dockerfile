FROM ruby:2.7-alpine as jekyll

RUN apk add --no-cache build-base gcc bash cmake git

# install both bundler 1.x and 2.x
RUN gem install bundler -v "~>1.0" && gem install bundler jekyll

EXPOSE 4000

WORKDIR /site

ENTRYPOINT [ "jekyll" ]

CMD [ "--help" ]

FROM jekyll

COPY docker-entrypoint.sh /usr/local/bin/

# on every container start, check if Gemfile exists and warn if it's missing
ENTRYPOINT [ "docker-entrypoint.sh" ]

CMD [ "bundle", "exec", "jekyll", "serve", "--force_polling", "-H", "0.0.0.0", "-P", "4000" ]