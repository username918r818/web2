docker image rm web2 -f
mvn clean package
cp target/web2297-5.war /home/username918r818/docker_test/web2
docker build --tag=web2 /home/username918r818/docker_test/web2/
docker run -it -p 8080:8080 web2
