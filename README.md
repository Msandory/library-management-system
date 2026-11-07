## Schema Decisions

**Why Book references Genre instead of embedding it.** Genre is its own model and `Book` points to it through a `genreId` foreign key (`@relation`). Embedding the genre inside each book would copy the same genre data into many rows, so renaming a genre or fixing a typo would mean updating every book, and the copies could drift apart. With a reference, each genre is stored once, books are guaranteed to use a valid genre (the database enforces it), and queries like "all books in Science Fiction" or "how many books per genre" are simple joins on an indexed column.

**Role enum.** `User.role` uses a `Role` enum (`PATRON`, `LIBRARIAN`), so only valid roles can be stored and the default is `PATRON`.

**Review (stretch).** `Review` links a `User` to a `Book` with a rating and optional comment, giving a many-to-many relation between users and books through an explicit model.

**Prisma vs. a document database.** In a document database I would naturally nest related data inside one document. In Prisma I model each entity separately, declare the relations in the schema, and fetch related data explicitly with `include`, with the database enforcing integrity.
EOF
