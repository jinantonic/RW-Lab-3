# Problem 1
Convert your notes application from worksheet 1 to use RxJS streams to handle the
mouse events instead of the method you originally used (most likely event handlers)

</br>

# My solution
![Sketch](/images/n1.png)
The overall look is identical to my previous note application since the given task only requires converting plain JavaScript to RxJS streams to handle the mouse events. A user can add, edit, delete notes and change the background colour. Each memo has a top bar which has a dropdown menu for colour choice, edit / save and delete buttons at the right top corner. The user can select the background colour or use the default beige colour without changing it.

</br>


While editing               |  After saved
:-------------------------:|:-------------------------:
![Sketch](/images/n2.png)|![Sketch](/images/n3.png)
In the scenario of the user chosing the green background colour as green and still editing the memo. Once it's done, the user can click the pencil button at the right top corner to save it, and click that button again for editing. So the pencil button works as an edit and save button. Once the note is saved, you can see that it has a bit more padding on the top.
