```text
$ cd ~/environment/generic-http-server/
$ docker --version
Docker version 19.03.12, build 48a66213fe
$ docker build --tag patrice1972/generic-http-server:0.1.0 .
...
Successfully built 7e3338105a41
Successfully tagged patrice1972/generic-http-server:0.1.0
$ docker images
REPOSITORY                                        TAG                 IMAGE ID            CREATED             SIZE
patrice1972/generic-http-server                   0.1.0               7e3338105a41        28 hours ago        172MB
...
$ docker run --publish 8080:8080 --detach patrice1972/generic-http-server:0.1.0
2c898cfdaacdd33f86c2ea864329e4099e73b9e69c79ae89a776b13013049a50
$ docker ps
CONTAINER ID        IMAGE                                   COMMAND                  CREATED             STATUS              PORTS                       NAMES
2c898cfdaacd        patrice1972/generic-http-server:0.1.0   "docker-entrypoint.s…"   24 seconds ago      Up 23 seconds       0.0.0.0:8080->8080/tcp      tender_hawking
$ docker logs 2c898cfdaacd --follow
[INFO_] SERVICE_HOSTNAME: 0.0.0.0
[INFO_] SERVICE_PORT: 8080
[INFO_] SERVICE_NAME: generic-http-server
[INFO_] SERVICE_VERSION: 0.1.0
[INFO_] API_GET_PATHS: /hello;/hi
[INFO_] generic-http-server (0.1.0) will implement GET /hello
[INFO_] generic-http-server (0.1.0) will implement GET /hi
[INFO_] Running on http://0.0.0.0:8080
$ curl localhost:8080/hello
{"message":"Hello from GET /hello","debug":{"serviceName":"generic-http-server","serviceVersion":"0.1.0","path":"/hello","hostname":{"configured":"0.0.0.0","fromOS":"2c898cfdaacd"},"port":8080,"headers":{"host":"localhost:8080","user-agent":"curl/7.58.0","accept":"*/*"}}}
$ docker rm --force 2c898cfdaacd
2c898cfdaacd
$ docker login
...
Login Succeeded
$ docker push patrice1972/generic-http-server:0.1.0
...
0.1.0: digest: sha256:997bae8c7caaba794717121c4137da0dddb327a9fb1bdaa4d6cdd6ba5bd3f64d size: 2202
```
