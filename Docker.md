```text
$ cd ~/environment/generic-http-server/
$ docker --version
Docker version 19.03.12, build 48a66213fe
$ docker build --tag patrice1972/generic-http-server:0.1.0 .
...
Successfully built 9e1186ab5e80
Successfully tagged patrice1972/generic-http-server:0.1.0
$ docker images
REPOSITORY                                        TAG                 IMAGE ID            CREATED             SIZE
patrice1972/generic-http-server                   0.1.0               9e1186ab5e80        33 seconds ago      172MB
...
docker run --publish 8080:8080 --detach patrice1972/generic-http-server:0.1.0
0fa6e060beaea958520210af54833c7594e5c15573275d59d8b43450b7cabfbc
$ docker ps
CONTAINER ID        IMAGE                                   COMMAND                  CREATED             STATUS              PORTS                       NAMES
0fa6e060beae        patrice1972/generic-http-server:0.1.0   "docker-entrypoint.s…"   15 seconds ago      Up 14 seconds       0.0.0.0:8080->8080/tcp      eloquent_johnson
$ docker logs 0fa6e060beae --follow
[INFO_] generic-http-server (0.1.0) will implement GET /hello
Running on http://0.0.0.0:8080
$ curl localhost:8080/hello
{"message":"Hello from GET /hello","internalInfo":{"serviceName":"generic-http-server","version":"0.1.0","path":"/hello","hostname":{"configured":"0.0.0.0","fromOS":"0fa6e060beae"},"port":8080,"headers":{"host":"localhost:8080","user-agent":"curl/7.58.0","accept":"*/*"}}}
$ docker rm --force 0fa6e060beae
0fa6e060beae
$ docker login
...
Login Succeeded
$ docker push patrice1972/generic-http-server:0.1.0
...
0.1.0: digest: sha256:19329b2de1620392cd834872e54ee77fabed188e2705ef89dc3a56196392d36d size: 2202
```
