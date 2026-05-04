# Etapa 1: Construcción
FROM maven:3.9.2-eclipse-temurin-19 AS build
WORKDIR /app
# Copiamos el pom y el código fuente
COPY pom.xml .
COPY src ./src
# Compilamos el proyecto saltando los tests
RUN mvn clean package -DskipTests

# Etapa 2: Ejecución
FROM eclipse-temurin:19-jdk-jammy
WORKDIR /app
# Traemos el archivo .jar que se generó en la etapa 1
COPY --from=build /app/target/demo-0.0.1-SNAPSHOT.jar app.jar
# Exponemos el puerto
EXPOSE 8080
# Comando para encender el servidor
ENTRYPOINT ["java", "-jar", "app.jar"]