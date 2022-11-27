# Problem 2
Assume that you are building an interface to an API in your Rich Web App. 
Describe in detail how you could use the RxJS library to handle asynchronous network responses to API requests. 
In your opinion, what are the benefits to using a streams library for networking over, say, promises? And what do you think are the downsides?

</br>

# My solution
**Asynchronous environment** is a single process thread runs all the time, but it may, for event-driven reasons, switch from one function to another.
By default, JavaScript follows a single-threaded approach. In that context of JS in the browser, asynchronous programming is how we allow execution to proceed, even when we are waiting for responses from relatively long-running requests. Asynchronous programming can work through the use of callback functions or callbacks.

**RxJS** is a library for reactive programming using Observables, which makes it easier to implement asynchronous responses or callback functions and manage problems that manifest in asynchronous programming. Reactive programming helps us to deal with asynch operations easily by treating thhose as streams of data.
As it was mentioned previously, streams implement a design pattern called the observable pattern and an observable helps to work with asynchronous functionalities. The most common asynchronous actions are **Events**, **Async Server Requests** and **Animations**. Observables are capable of modelling all of these actions and can compose them together by using RxJS. By using Operators, Observables and all of those functions, I will be able to handle asynchronous network responses to API requests efficiently. 

Promises and Observables represent a result from aync operation and both deal with data that is not available but will come in the future. While Primises represent a particular case of async operation, Observable represents a stream of data. Instead of deal with a singular operation (Promises), it would be more efficient to deal with multiple events (Observable Streams). The comparison of these 2 are listed below.

1. Observables are lazily evaluated than Promises. For example, when we have Promise or Observable wrapped HTTP requests, Promises will emit the value if they have any waiting customers or not. While Observables will emit only if are subscribed to them. I'd say this is the most significant downside of using Observables. Promises should be used over Observables for the case when the event has to be immediately subscribed and handled since the code will be executed no matter what. In addition to that, the situation wehre one subscription is one event handelling. If there will be only one event from the source so the future response and the completetion is the same event, then Promise will be more useful.  
2. Observables can be unsubscribed whereas Promises can't be canceled. unsubscribe() function will release or disposes resources held by the subscription, or cancel Observable executions and you can also unsubscribe multiple subscriptions which will come in handy in some situations.
3. It is easy to prevent race conditions with Observables whereas it is really hard with Promises. Mostly, we expect to get the first network request rendered and then the second one. But in real life, it might not be possible because of network latecy. We might get the second response earlier than the first one so that the user gets inappropriate result displayed. In Observable, by using concatMap operator, we can prevent this situation sot that the next request will executed after the previous one is executed first.



RxJS's Observable streams allows us to create streams, listen to their events, handle their errors and situations. Most of operators operate on an Observable and return an Observable. These operators can mimic any async stream behaviour and the examples are listed below.