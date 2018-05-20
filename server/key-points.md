## 13 Type Relations
- resolve() is in charge of getting data

# Get book's author

1. add authorId to fakeBookData
2. add author to BookType
3. able to get authorId from author.resolve parent
4. use _.find to get author data of particular book

## 14 GraphQL Lists

- realize args is not needed for type relation

- Explain why he did 

# Get author's list of books

1. import graphQLList from graphql lib
2. add books under AuthorType and then set type as new graphQLList(BookType)
3. add resolve(parent, args) just like prev lesson

