FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY . .

# Fix mvnw permission
RUN chmod +x mvnw

# Build jar
RUN ./mvnw clean package -DskipTests

# Rename jar (avoids path issues)
RUN mv target/demo-0.0.1-SNAPSHOT.jar app.jar

# Run app
CMD ["java", "-jar", "app.jar"]