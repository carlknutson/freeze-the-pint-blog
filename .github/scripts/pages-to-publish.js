import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_KEY });

const databaseId = process.env.NOTION_BLOG_ID;
const db = await notion.databases.query({
    database_id: databaseId,
    filter: {
        property: 'Draft',
        checkbox: { equals: false, },
    },
    sorts: [
        {
            property: 'Date',
            direction: 'descending',
        },
    ],
});

var pages = ''

for (var i = 0; i < db.results.length; i++) {
    console.log(db)
    pages = pages + ' ' + db.results[i].id
}

console.log(pages)