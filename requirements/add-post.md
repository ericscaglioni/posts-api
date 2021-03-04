# Add post

> ## Success case

1. ❌ Receives a **POST** request on route **api/posts**
2. ❌ Validate required fields: **title** and **text**
3. ❌ **Save** a post with the given data
4. ❌ Returns **201**, with the post + **id**

> ## Exceptions

1. ❌ Returns error **404** if API doesn't exist
2. ❌ Returns error **400** if **title** and/or **text** were not provided
3. ❌ Returns error **500** if any error happens trying to save the post