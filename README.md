# Blackjack
### Implementation by [Jaden Holladay](http://jadenholladay.com)
### About
To design and implement a [blackjack game for Mindfire Technology](https://www.mindfiretechnology.com/pages/blackjack).

### Building and running the project
*******************************
1. Install node dependencies
```sh
npm install
```
2. Run MongoDB
3. Setup `.env` file with database connection url. See `.env.example`
4. Run
```sh
npm run dev
```

### Technologies
*******************************
- [NodeJS](https://nodejs.org/)
	- [GraphQL](https://graphql.org/graphql-js/)
	- [GraphQL Compose](https://graphql-compose.github.io/en)
	- [ExpressJS](http://expressjs.com/)
	- [Mongoose](http://mongoosejs.com/)
	- [Babel](https://babeljs.io)
	- [Nodemon](http://nodemon.io/)
	- [Lodash](https://lodash.com/)
- [MongoDB Database](https://www.mongodb.com/)

### NoSQL Database ER Diagram
![Image of ERD](/blackjack_schema.png)


### Example GraphiQL
*******************************
```gql
mutation CreateUser {
  userCreate(record: {username: "Jaden"}) {
    recordId
  }
}

mutation CreateNewGame {
  gameCreate(userId: "ENTER_USER_ID") {
    ...FullGame
  }
}

query Game {
  gameById(_id: "ENTER_GAME_ID") {
    ...FullGame
  }
}

fragment FullGame on Game {
  _id
  status
  updatedAt
  createdAt
  hands {
    score
    player {
      username
    }
    cards {
      suit
      rank
    }
  }
  dealer {
    score(visibleOnly: false)
    cardsUp {
      suit
      rank
    }
    cardsDown {
      suit
      rank
    }
    deck {
      suit
      rank
    }
  }
}
```
