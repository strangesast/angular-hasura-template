from node as builder

workdir /usr/src/app
copy client/package*.json ./
run npm install
copy client/ .
run ./node_modules/.bin/ng build --prod


from nginx

copy --from=builder /usr/src/app/dist/app /usr/share/nginx/html/
copy nginx/default.conf.template /etc/nginx/templates/
