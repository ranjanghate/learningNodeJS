NodeJS uses an event driven, non-blocking I/O model that makes it light weight and efficient.

**Now let's just focus on non blocking I O.**
What exactly I O stands is for input output (for example reading some data from a file on the file system) and your node application is gonna use I-O anytime it's trying to communicate with the outside world.

For example querying a database to fetch some records for a given user that's gonna be an I O operation and I O operations take time now with nodeJS we get non blocking I O.

That means that well your node application is waiting for a response. It can do other things. It can continue to process other code and make other requests.

Now non blocking is actually from the browser so non blocking I O started in the browser because otherwise the browser would completely freeze up whenever an IO operation was happening. So if I was trying to fetch some data to render it to a user well that data was being fetched the user wouldn't be able to do anything they wouldn't be able to click links or buttons and obviously that's a bad experience with non blocking I O it frees up the browser to allow the user to interact with the user interface.

Well those Io operations are running in the background and the same thing is true with node. We can continue to do other things while we're waiting for those long running Io operations to complete and this is a critical feature of what makes node so great.

**Non Blocking allows your node JS application to process multiple requests at the exact same time for multiple user.**

**What is event driven**
It is just that process of registering those callbacks and having them call when the IO operation is done.
