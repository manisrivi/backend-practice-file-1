// import mogodb driver
const { MongoClient } = require('mongodb');

const mongo = {
    // db initiallized
    db_1: null,
    db_2: null,

    // db_1 collection export
    comments: null,
    posts: null,
    users: null,

    // db_2 collection export
    codekata: null,
    company_drives: null,

    // mongodb connection
    async connect(){
        // connected to mongodb url
        const client = new MongoClient(process.env.MONGO_DB_URL);
        await client.connect();
        console.log(`mongodb connected successfully url: ${process.env.MONGO_DB_URL}`);
        
        // db_1 initillized
        this.db_1 = await client.db(process.env.MONGO_DB_NAME_1);
        console.log(`db name is ${process.env.MONGO_DB_NAME_1}`);

        // db_1 collection initillized
        this.comments = this.db_1.collection('comments');
        this.posts = this.db_1.collection('posts');
        this.users = this.db_1.collection('users');
        console.log(`${process.env.MONGO_DB_NAME_1} collection initiallized`);

        // db_2 initiallized
        this.db_2 = await client.db(process.env.MONGO_DB_NAME_2);
        console.log(`db name is ${process.env.MONGO_DB_NAME_2}`);

        // db_2 collection initillized
        this.codekata = this.db_2.collection('codekata');
        this.company_drives = this.db_2.collection('company_drives');
        console.log(`${process.env.MONGO_DB_NAME_2} collection initiallized`);
    }
}

module.exports = mongo;
