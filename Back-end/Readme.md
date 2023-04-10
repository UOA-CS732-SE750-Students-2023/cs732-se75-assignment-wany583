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

* JDK 1.8
* IDEA (Recommend!)/ Vscode/ Eclipse
Notice: 
I leave the "/mvn/warpper/maven-wrapper.jar" in the git remote repository, It can developer to run this project without installing maven at first. 

## Install and start the back-end project (After that, come to front-end and run it)


### In VScode
1. Let the back-end as root folder, and open it in VScode. 
2. Find out the "PsmBackendApplication.java", the path is **"src/main/java/com/example/psmbackend/PsmBackendApplication.java"**
3. Open it. Then in the top right of VSCode, there is a triangular start button. Click it to run the project. 

![image](https://user-images.githubusercontent.com/87680634/230805273-8bfd2393-d442-4563-8c00-c39c78e50911.png)

Notice: 
* If you have not install java jdk, the VScode will show the install recommadation automaticly, **please choose jdk8**.
* If it can not run, please run the following command to install mvn.
```bash``` mvn clean install
* If there are some unexpected bug, please restart the VScode. It always works, Thank you!

### In IDEA
1. Let the back-end as root folder, and open it in IDEA. 
2. Run the following command to install mvn. Or use the maven component in IDEA.
```bash``` mvn clean install
![image](https://user-images.githubusercontent.com/87680634/230805801-78b05955-e05b-467c-9c6a-e86614ea8769.png)
3. Run the project
![image](https://user-images.githubusercontent.com/87680634/230805868-780689fc-2539-451a-8040-0240e214d6d4.png)

Notice:
* If there is no sever start config button. Please make sure the following setting
![image](https://user-images.githubusercontent.com/87680634/230805997-2dac6c5d-ea49-431c-9cc2-19d7e3bbbd4d.png)
* If there are some unexpected bug, please restart the VScode. It always works, Thank you!



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
