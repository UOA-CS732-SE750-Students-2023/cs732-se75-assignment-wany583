# Product management system (Back-end)

## Main Tech/Tools in back-end
* Springboot Framework
* Mybatis-plus
* MySql - (AWS)
* Postman

## Getting Started
These instructions will help you get a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites
What things you need to install:

* JDK 1.8+
* Maven 3+
* IDEA (Recommend!), Eclipse, Vscode(Sometimes does not work)

## Install and start the back-end project

### Step 1. Build the project using Maven

```bash```mvn clean install

**Make sure there is no error(no red label) in "/pom.xml", 
sometimes some dependencies can not download successfully, restart the IDE/VScode may work.**

Sometimes you need to set Maven in IDE: Maven home path, setting file, local repository. 

**If you are the first time to use maven, it may take several minutes to download all the dependencies.**

* If you use command line, skip to the step 2.
* If you use IDEA, just run the project.
* If you use VSCode, please click the file "PsmBackendApplication.java". 
Here is the path: "src/main/java/com/example/psmbackend/PsmBackendApplication.java"
Then in the top right of VSCode, there is a triangular start button. Click it to run the project. 

![44571681030561_ pic](https://user-images.githubusercontent.com/87680634/230778206-6f1f6a5f-6f40-4f7f-a616-bbf60a4682f3.jpg)


### Step 2. Build the project
```bash``` mvn clean package

After building, mvn will generate a "/target" folder. You can get the **jar file** in this folder. 

![image](https://user-images.githubusercontent.com/87680634/230778347-51d7f765-ead2-4551-ab1d-624bc61baaec.png)



### Step 3. Run the project

```bash``` java -jar PsmBackend-0.0.1-SNAPSHOT.jar

Notice: the .jar file name may be different, but the position is fixed. 



## About MySql Database 

To avoid developer to config local Mysql database, I build the remote database on AWS.
I will keep running the EC2. 


## API test case by Postman
In /Postman-test-case folder, File, "ProductManagementSystem-API.postman_collection.json", contains all the API of this back-end project.
You can import it in postman to make the back-end API test. 


### Reference Documentation

For further reference, please consider the following sections:

* [Official Apache Maven documentation](https://maven.apache.org/guides/index.html)
* [Spring Boot Maven Plugin Reference Guide](https://docs.spring.io/spring-boot/docs/2.7.11-SNAPSHOT/maven-plugin/reference/html/)
* [Create an OCI image](https://docs.spring.io/spring-boot/docs/2.7.11-SNAPSHOT/maven-plugin/reference/html/#build-image)
* [Spring Web](https://docs.spring.io/spring-boot/docs/2.7.11-SNAPSHOT/reference/htmlsingle/#web)
* [MyBatis Framework](https://mybatis.org/spring-boot-starter/mybatis-spring-boot-autoconfigure/)

### Guides

The following guides illustrate how to use some features concretely:

* [Building a RESTful Web Service](https://spring.io/guides/gs/rest-service/)
* [Serving Web Content with Spring MVC](https://spring.io/guides/gs/serving-web-content/)
* [Building REST services with Spring](https://spring.io/guides/tutorials/rest/)
* [MyBatis Quick Start](https://github.com/mybatis/spring-boot-starter/wiki/Quick-Start)
* [Accessing data with MySQL](https://spring.io/guides/gs/accessing-data-mysql/)
