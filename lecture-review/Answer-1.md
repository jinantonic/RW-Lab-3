# Problem 1
Explain what is meant by the stream abstraction. 
What is the relationship between streams and the observer pattern? 
What are streams useful for modeling and when might you use them in Rich Web development?

</br>

# My solution
A **stream** is a sequence of data elements which is created, processed and consumed over time. An **abstract** represents a general idea than a specific thing. Streams are an abstraction used when reading or writing files, or communicating over network sockets. It is for some data which may or may not be present now, or in the future. So it comes in handy when you are not sure about the potential size of the data or when it will arrive in your application. In rich web app development, an **application for streams is an abstraction of asynchronous events**. Instead of writing one program to deal with specific sequences, we can write a program to deal with the abstract of those sequences.

Streams implement a design pattern called an **observer pattern**. A subject maintains a list of observers and they get notified whenever there is an update. An **observable** is an object that has a function, in other words, the subject being subscribed to. You can subscribe to an **observable(stream)** and get updates on changes on the observable. For example, in RxJS, we can create an instance of the Observabable and use the method subscribe(observer) which will return the subscription. 

</br>

![Sketch](/images/obs.png)

sd

