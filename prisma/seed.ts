import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const catalog: Record<string, { title: string; author: string; publishedYear: number }[]> = {
    Fiction: [
        { title: 'To Kill a Mockingbird', author: 'Harper Lee', publishedYear: 1960 },
        { title: 'Things Fall Apart', author: 'Chinua Achebe', publishedYear: 1958 },
        { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', publishedYear: 1925 },
        { title: 'Americanah', author: 'Chimamanda Ngozi Adichie', publishedYear: 2013 },
    ],
    'Science Fiction': [
        { title: 'Dune', author: 'Frank Herbert', publishedYear: 1965 },
        { title: 'Neuromancer', author: 'William Gibson', publishedYear: 1984 },
        { title: 'The Left Hand of Darkness', author: 'Ursula K. Le Guin', publishedYear: 1969 },
        { title: 'Foundation', author: 'Isaac Asimov', publishedYear: 1951 },
    ],
    Technology: [
        { title: 'Clean Code', author: 'Robert C. Martin', publishedYear: 2008 },
        { title: 'The Pragmatic Programmer', author: 'Andrew Hunt & David Thomas', publishedYear: 1999 },
        { title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann', publishedYear: 2017 },
        { title: 'Refactoring', author: 'Martin Fowler', publishedYear: 1999 },
    ],
    History: [
        { title: 'Sapiens', author: 'Yuval Noah Harari', publishedYear: 2011 },
        { title: 'Long Walk to Freedom', author: 'Nelson Mandela', publishedYear: 1994 },
        { title: 'Guns, Germs, and Steel', author: 'Jared Diamond', publishedYear: 1997 },
        { title: 'The Fate of Africa', author: 'Martin Meredith', publishedYear: 2005 },
    ],
};

async function main() {
    await prisma.review.deleteMany();
    await prisma.book.deleteMany();
    await prisma.genre.deleteMany();

    for (const [name, books] of Object.entries(catalog)) {
        await prisma.genre.create({ data: { name, books: { create: books } } });
    }

    console.log(`Seeded ${await prisma.genre.count()} genres and ${await prisma.book.count()} books`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());