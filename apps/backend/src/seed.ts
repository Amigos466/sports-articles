import { AppDataSource } from "./db";
import { SportsArticle } from "./entity";

const NUMBER_OF_ARTICLES = 50;

const seed = async () => {
    await AppDataSource.initialize();
    const repo = AppDataSource.getRepository(SportsArticle);

    const count = await repo.count();
    if (count > 0) {
        console.log("Database already seeded");
        process.exit(0);
    }

    console.log("Seeding database...");
    const articles = [];
    for (let i = 1; i <= NUMBER_OF_ARTICLES; i++) {
        articles.push({
            title: `Sports Article ${i}`,
            content: `This is the content for sports article number ${i}. It creates some dummy text to fill the space.`,
            imageUrl: `https://picsum.photos/718/400?random=${i}`,
            createdAt: new Date(Date.now() - i * 1000 * 60 * 60) // Staggered times
        });
    }

    await repo.save(articles);
    console.log(`Seeded ${NUMBER_OF_ARTICLES} articles`);
    process.exit(0);
};

seed().catch(err => {
    console.error(err);
    process.exit(1);
});
