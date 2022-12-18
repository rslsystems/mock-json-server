# Mock API Server  
Based on [json-server](https://github.com/typicode/json-server)

## Getting Started
There is a couple of environment variables that can be set if you want to over-ride the defaults

| Name          | Description                     | Default          |
|---------------|---------------------------------|------------------|
| SERVER_NAME   | Prefix for the docker conatiner | mock-json-server |
| SERVER_PORT   | Exposed port for the sever      | 3000             | 
| SERVER_PREFIX | Prefix for the urls             | v1               |

If you want to change these, copy the _.env.example_ file to _.env_ and set the values  
```shell
cp .env.example .env
```

Once your environment is set, bring up the container like you would any docker-compose poroject;
```shell
docker-compose build
docker-compose up -d
```
and
```shell
docker-compose down
```
when you are done.

## Managing Your Data
Your data is stored in _json_ files located in the `app/data` folder.  
Example:  
```json
[
  { "id": 1, "name": "wibble", "age": "20" },
  { "id": 2, "name": "wabble", "age": "30" },
  { "id": 3, "name": "wubble", "age": "40" }
]
```
This setup works by automatically reading all the json files in the data folder.  
You can add/edit them without bringing down the container.

N.B. These files are more of a seed in concept.  
If you use a `POST` route, the new data will not show up in the file.

To see the whole database at any time just hit up the database endpoint.
```shell
GET /db
```

For more information see the json-server [docs](https://github.com/typicode/json-server#getting-started)
## Managing your routes
As per the standard [json-server](https://github.com/typicode/json-server#routes), routes are automatically created based on the names of the data files.  
So a data file called `posts.json`, will have the endpoints;
```shell
GET    /posts
GET    /posts/1
POST   /posts
PUT    /posts/1
PATCH  /posts/1
DELETE /posts/1
```

They are also available using the environment prefix variable.  
```shell
GET    /v1/posts
GET    /v1/posts/1
POST   /v1/posts
PUT    /v1/posts/1
PATCH  /v1/posts/1
DELETE /v1/posts/1
```

You can add your own custom routes in the `data/routes.js` file.  
See the main [json-server](https://github.com/typicode/json-server#add-custom-routes) documentation for more details.

# Have fun
