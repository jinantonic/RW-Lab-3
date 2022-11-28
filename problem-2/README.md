# Problem 2
Implement a count down timer similar using RxJs. 
The UI would look something like the following (taken from timer-tab.com – you can ignore the colours etc from image – this
is just to get an idea of UI)

</br>

![Sketch](/images/t1.png)
- User is presented with (A) on page load, enters 2m 30s
- When he inserts a countdown time, the timer starts counting downwards (B)
- Finishes at 00 (C)

</br>

# My solution
![Sketch](/images/t2.png)
This is the overall look of the timer application.

</br>

![Sketch](/images/t3.png)
If a user wants to set a timer for an hour, just simply enter 1 for the hour and click the space outside of the timer. Then it will automatically fill up the minute and second input as 0s so that they won't need to enter 0s manually. 


</br>

![Sketch](/images/t4.png)
The same rule applies to the minute or second as well. 30 minutes timer, simply enter 30 to the minute space and click the space outside. Then 0s will be entered into the hour and second input fields. 

</br>

![Sketch](/images/t5.png)
Also, each time input boxes have up and down arrows so that you can increment / decrement the time and the minimum value would be 0 since it wouldn't make sense to have a negative value for the time.

</br>

Enter 70 mins           |  Convert to right format
:----------------------:|:-------------------------:
![Sketch](/images/t6.png)|![Sketch](/images/t7.png)

When the user enters second and minute inputs greater than 60, it will automatically convert them into the right format. For example, from 70 mins to 1 hour and 10 mins. 

</br>

![Sketch](/images/over60.png)
Converting those inputs greater than 60 to the correct format are executed by using this code above.

</br>

Enter time         |  Start the timer
:----------------------:|:-------------------------:
![Sketch](/images/t8.png)|![Sketch](/images/t9.png)

Let's say the user wants to set a 2m 30s timer and click the start button.

</br>

Stop the timer          |  Reset the timer
:----------------------:|:-------------------------:
![Sketch](/images/t10.png)|![Sketch](/images/t11.png)

Once the ticking starts, I changed the background colour of the input boxes so that it will be handy to see if the timer is still counting down or not. The user can click stop button to stop the timer or reset to erase the input contents. Once it gets reset, the timer is ready to accept new time inputs.

</br>

Time's up header   |  Original header
:----------------------:|:-------------------------:
![Sketch](/images/t12.png)|![Sketch](/images/t13.png)

The timer will finishes at 00 and will display the message saying time's up at the header. After 2 seconds, it will change the text of h1 element back to original.

</br>

![Sketch](/images/header.png)
Changing the headers are executed by using this code above.