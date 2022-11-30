# Problem 3
Use a parent property in a note class to manage related notes, which is null for top-level notes, and use subscriptions to ensure that deletion of a parent deletes child notes.

</br>

# My solution

![Sketch](/images/m1.png)
This is the overall look of the timer application and extra features have been added. As you can see in the image above, the background colour dropdown menu is replaced with a colour input palette. In addition, a new button shaped like a child is created which will create children notes.

Once you write content, choose a background colour and save the note, it gets uploaded to the local storage so that the note will still be there after you refresh the browser.

</br>

Default background           |  Changed background
:----------------------:|:-------------------------:
![Sketch](/images/m2.png)|![Sketch](/images/m3.png)

</br></br>

While editing          |  After saved
:----------------------:|:-------------------------:
![Sketch](/images/m4.png)|![Sketch](/images/m5.png)

</br></br>

![Sketch](/images/m6.png)
Once the child button is clicked, it creates a new child note which is identical to the parent note. It is possible to edit, delete and change the background of each note separately, however, all of the child notes will be deleted if the parent note is removed. 