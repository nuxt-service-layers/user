# Nuxt User Service Layer

Thanks for viewing my project. This is my attempt to modularize the app buiding process using nuxt
layers.

This layer is intended to make using basic user funcitonality very quick. I would not recommend this
for large and complex situations, but for small sites and speedy development this would be ideal.
This implementation uses firestore for the database. If this is considered useful im happy to build
implementations that use different stack such as mongodb or sql.

You may notice I have not used many firebase features and this is intentional. To make this system
versatile it will eventually handle everything itself and be able to plug and play with any back end
system you prescribe. Firebase was just my first choice to get something shipped and see what you
all think.

### Getting Started

To add this layer to your project simply add the following to the `nuxt.config.ts`

```ts
extends: [
    ["github:codywakeford/nuxt-users#master",  {install: true }]
]
```

You will also need to provide your firebase variables into the .env file.

```ts
# FIREBASE CONNECTION #
apiKey=
authDomain=
projectId=
storageBucket=
messagingSenderId=
appId=
measurementId=
```

This will download and store the layer in your node modules and include the project as if it was in
your own when building. The `{ install: true }` option just tells nuxt to install all
subdependencies.

### Key points

Using some trickery I have made the `$User` pinia store globally available synchronously. Meaning
user data is available all the time (if they are logged in). This enables convinient usage
throughout throughout code base but can only be used in the nuxt context. See the example below:

To create an account simply use this anywhere in the code base

```ts
$User.register(email, password)
```

There are of course optional extras you can include such as roles, firstName and so on. For more
information I will list all key functions below.

This being the firebase version of the project we can of course use the db listener for live updates
to the user object.

### $User object

This is the global pinia store instance that holds all the funtions for creating and manipulating
the current user.

You may access any one of the User attributes with its provided getters. `$User.ATTRIBUTE_HERE` |
`$User.id` | `$User.email` and so on.

```ts
// How to get the users current data //
$User.get // Returns entire user object
$User.email
$User.id
$User.firstName
$User.lastName
$User.roles

interface User {
	id: string
	firstName: string
	lastName: string
	email: string
	roles: string[]
}
```

The key functions are as follows:

```ts
$User.register(email: string, password: string)
```

```ts
$User.login(email: string, password: string)
```

```ts
$User.logout()
```

```ts
/**Used for role based page access */
$User.addRole(role: string)
```

```ts
/**Used for role based page access */
$User.removeRole(role: string)
```

### $Users object

Much like the `$User` object this also is globally available. This has many of the same features of
the `$User` apart from this is querying all users. There are also some manipulations unique to this
object.

###### TODO:

-   Authentication with many platforms
-   passwordless login
-   email verification
-   middleware role handling
-   create adapters for other tech stacks
-   implement the emails service layer

#### Why Service Layers?

What are they? I imaging building a fleet of these layers to allow rapid open source development of
many different complex features. Some features may include notifications, emails, analytics and of
course user handling among many more.

The reason I think it should be done using nuxt layers is the fact that it can be modular. Allowing
to progressively add and remove functionality with a few lines of code and then giving you access to
global classes instantly. Nuxt layers provides us with the oppertunity to make building a web app
with complex functionality faster and more consistant. Consider it a meta meta framework built on
top of the nuxt meta framework.

NOTE: This project is not finished and I will work on it in my free time. Any help is much
appreciated.
