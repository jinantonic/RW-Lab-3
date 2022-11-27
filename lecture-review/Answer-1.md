# Problem 1
Explain what is meant by the stream abstraction. 
What is the relationship between streams and the observer pattern? 
What are streams useful for modelling and when might you use them in Rich Web development?

</br>

# My solution
A **stream** is a sequence of data elements which is created, processed and consumed over time. An **abstract** represents a general idea than a specific thing. 

Streams are an abstraction used when reading or writing files, or communicating over network sockets. It is for some data which may or may not be present now, or in the future. So it comes in handy when you are not sure about the potential size of the data or when it will arrive in your application. In rich web app development, an **application for streams is an abstraction of asynchronous events**. Instead of writing one program to deal with specific sequences, we can write a program to deal with the abstract of those sequences.

Streams implement a design pattern called an **observer pattern**. A subject maintains a list of observers and they get notified whenever there is an update. An **Observable** is an object that has a function, in other words, the subject being subscribed to. You can subscribe to an **Observable (stream)** and get updates on changes on the Observable. For example, in RxJS, we can create an instance of the Observabable and use the method subscribe (Observer) which will return the subscription. 

</br>

![Sketch](/images/obs.png)
As you can see in the screenshot above, we can create a new Observable type instance (myObservable) and myObservable.subscribe() will return a subscription object. 

</br>

A **reactive stream model** provides modelling synchronous and asynchronous boundaries, handling features following the given principles and getting all benefits of reasoning with APIs. Streams ensure a balance between data flowing from the producer and demand flowing from the user. You can envision a use case as streams of data flowing through channels and being transformed through a set of operators. The use case can be modelled as a series of conversions and the reactive stream would be the  modelling abstraction. This model will make a flow of first-class abstraction, by such means separating the operators from the concerns of when data arrives or leaves them. Data can be processed asynchronously while the operators have no clue about this. This will makes your model more modular because the operators are decoupled from the data flow, so that both can develop and scale independently within your model. 



