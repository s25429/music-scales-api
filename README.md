# music-scales-api
University project for 7th semester. API for quick access to music scales and other helpful tools for music.

run `docker compose up --build --no-cache` to run dev mode or `docker compose build --no-cache & docker compose up`

? `docker-compose rm -f` | `docker-compose down && docker-compose build --no-cache && docker-compose up`

`docker compose up --watch`

### login do mongo:
> docker > exec \
> mongosh "mongodb://overlord:ENV.PWD@localhost:27017/maindb?authSource=admin"
> or
> monhosh -u overlord -p ENV.PWD

### knowledge
- [rest caching](https://restfulapi.net/caching/)
- [rest versioning](https://restfulapi.net/versioning/)


npm jest package uses outdated packages Glob@7.2.3 and inflight@1.0.6, consider using an alternative to jest

node --inspect might be a security vulnerability when exposed with 0.0.0.0:port: https://nodejs.org/en/learn/getting-started/debugging#exposing-the-debug-port-publicly-is-unsafe
node --nolazy is so that breakpoints and debugging on IDEs work with async/await

compile grpc protobufs to ts types example (has to be in powershell or cmd):
```
protoc --plugin=protoc-gen-ts_proto=".\\node_modules\\.bin\\protoc-gen-ts_proto.cmd" --ts_proto_out=. ./src/proto/note.proto
```

npm install with deps as `@graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-resolvers` generates these deprecated warnings:
- inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests 
by a key value, which is much more comprehensive and powerful.
- glob@7.2.3: Glob versions prior to v9 are no longer supported
- @babel/plugin-proposal-class-properties@7.18.6: This proposal has been merged to the ECMAScript standard and thus this plugin is no longer maintained. Please use @babel/plugin-transform-class-properties instead.
- @babel/plugin-proposal-object-rest-spread@7.20.7: This proposal has been merged to the ECMAScript standard and thus this plugin is no longer maintained. Please 
use @babel/plugin-transform-object-rest-spread instead.

```
Request<Params, ResBody, ReqBody, Query>
Response<ResBody, Locals>
```

status codes
```
GET
- 200 OK: Use when the request is successful, and the resource data is returned in the response body.
- 204 No Content: Use when the request is successful, but there is no content to return (less common for GET requests; usually applicable for searches that yield no results).
- 404 Not Found: Use when the requested resource does not exist.
- 400 Bad Request: Use when the query parameters or request structure are invalid.
- 403 Forbidden: Use when the client is authenticated but does not have permission to access the resource.

POST
- 201 Created: Use when a new resource is successfully created. Include a Location header pointing to the newly created resource's URI, if applicable.
- 200 OK: Use when a POST request processes data but does not create a new resource (e.g., processing a file upload or running a command).
- 204 No Content: Use when the request is successful, and no content is returned (e.g., an operation acknowledgment).
- 400 Bad Request: Use when the request body is malformed or invalid.
- 422 Unprocessable Entity: Use when the syntax is correct, but the server cannot process the instructions due to validation errors.
- 409 Conflict: Use when the request conflicts with the current state of the server (e.g., trying to create a resource that already exists).

PUT
- 200 OK: Use when the resource is updated and the updated resource is returned in the response body.
- 204 No Content: Use when the resource is successfully updated but the response body is empty.
- 201 Created: Use when the PUT request creates a new resource (less common but possible in REST).
- 404 Not Found: Use when the resource to be updated does not exist.
- 400 Bad Request: Use when the request body is invalid or missing required fields.

PATCH
- 200 OK: Use when the resource is successfully updated, and the updated resource is returned in the response body.
- 204 No Content: Use when the resource is successfully updated but the response body is empty.
- 404 Not Found: Use when the resource to be updated does not exist.
- 400 Bad Request: Use when the request is malformed or invalid.
- 422 Unprocessable Entity: Use when the request syntax is correct but the server cannot process the instructions due to semantic issues (e.g., invalid field values).

DELETE
- 200 OK: Use when the resource is successfully deleted, and additional information is returned in the response body (e.g., details about the deletion).
- 204 No Content: Use when the resource is successfully deleted, and the response body is empty.
- 404 Not Found: Use when the resource to be deleted does not exist.
- 403 Forbidden: Use when the server understands the request but refuses to authorize it (e.g., insufficient permissions).
```