# Load posts

> ## Success case

1. ✅ Receives a **GET** request on route **api/posts**
2. ✅ Returns **200**, with the all the posts saved

> ## Exceptions

1. ✅ Returns error **404** if API doesn't exist
2. ✅ Returns error **404** if there are no saved posts
3. ✅ Returns error **500** if any error happens trying to get the posts