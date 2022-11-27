# Problem 3
Consider three asynchronous tasks, A,B & C. What are the consequences of these functions sharing global state? 
What is a good practice to alleviate any problems associated with this?

</br>

# My solution
Global variables are declared ourside of the function so it comes in handy to use for situations like when its value can be accessed and changed throughout the program However, in JavaScript programming, it is recommended to avoid global variables. In Asynchronous tasks, everything in the page runs in the same scope, and scripts included after global variable can make those variables overwritten in case they have the same name. Modifiying a variable on one thread and reading it on another will become hard to know what the functions will return as it is hard to know what the current state oh the input variables are. So we can prevent and protect the variables by adding them to object literals, a comma separated list of name value pairs. Or we could try creating a single namespace object to contain my global variables and all of my methods, or simply use local variable.