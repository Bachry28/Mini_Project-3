const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedData() {
  try {
    // Seed users
    const { count: userCount } = await prisma.user.createMany({
      data: [
        { first_name: 'John', last_name: 'Doe', username: 'john_doe', password: 'password123', foto: 'john.jpg' },
        { first_name: 'Jane', last_name: 'Doe', username: 'jane_doe', password: 'password456', foto: 'jane.jpg' },
        // Add more users as needed
      ],
    });

    console.log('Users seeded successfully:', userCount);

    // Fetch created users
    const users = await prisma.user.findMany();

    // Seed posts
    const { count: postCount } = await prisma.post.createMany({
      data: [
        { user_id: users[0].user_id, title: 'First Post', description: 'This is the first post.', image: 'first_post.jpg' },
        { user_id: users[1].user_id, title: 'Second Post', description: 'This is the second post.', image: 'second_post.jpg' },
        // Add more posts as needed
      ],
    });

    console.log('Posts seeded successfully:', postCount);

    // Fetch created posts
    const posts = await prisma.post.findMany();

    // Seed comments
    const comments = await prisma.comment.createMany({
      data: [
        { user_id: users[0].user_id, post_id: posts[0].post_id, comment: 'This is a comment on the first post.' },
        { user_id: users[1].user_id, post_id: posts[1].post_id, comment: 'This is a comment on the second post.' },
        // Add more comments as needed
      ],
    });

    console.log('Comments seeded successfully:', comments);
    
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedData();
