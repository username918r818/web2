mvn clean package
echo >target/dockerfile "FROM quay.io/wildfly/wildfly"
echo >>target/dockerfile "COPY web2-1.war /opt/jboss/wildfly/standalone/deployments"
docker build --tag=zakusov_web2 target/
docker run -it -p 8080:8080 zakusov_web2
docker image rm zakusov_web2 -f