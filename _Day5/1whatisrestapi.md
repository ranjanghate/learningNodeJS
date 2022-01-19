
# What is Rest API?

Representational State Transfer Application Programming Interface

## What exactly Application Programming Interface is?

An API is set of tool that allows two applications to talk to each other.

Now in this case the Rest API we are creating is also going to provide a set of tools allowing other software to communicate with the software we will create.

## What is representational state transfer?

Rest API allows client to access and manipulate resources using a set of predefined operations.
**Resource** --> Database models/ tables.
**Predefined operations** --> ex:- To create a new row/document in db.

**Representational** means we are getting and working with the representations of our data that is stored in our database.
*A representation of a resource is a document of a certain media type, such as HTML or JSON*

**State Transfer** means you share information related to resource.

 In REST applications, each request must contain all of the information necessary to be understood by the server, rather than be dependent on the server remembering prior requests. Storing session state on the server violates the stateless constraint of the REST architecture.
