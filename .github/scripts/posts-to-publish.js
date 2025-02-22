import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_KEY });

const databaseId = process.env.NOTION_BLOG_ID;
const db = await notion.databases.query({
    database_id: databaseId,
    filter: {
        property: 'Publish',
        checkbox: { equals: true, },
    },
});

var pages = ''

for (var i = 0; i < db.results.length; i++) {
    pages = pages + 
            ' ' + 
            db.results[i].properties.Title.title[0].plain_text
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '') +
            ',' +
            db.results[i].id
}

console.log(pages.trim())