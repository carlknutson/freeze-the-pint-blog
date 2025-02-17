import { Client } from '@notionhq/client'
import { NotionToMarkdown } from "notion-to-md";

const notion = new Client({ auth: process.env.NOTION_KEY });
const n2m = new NotionToMarkdown({ notionClient: notion });

const getPost = await notion.pages.retrieve({ page_id: process.env.POST_ID});
const getContent = async (id) => {
    const mdblocks = await n2m.pageToMarkdown(id);
    return n2m.toMarkdownString(mdblocks).parent;
};

console.log('---')
console.log('title: "' + getPost.properties.Title.title[0].plain_text + '"')
console.log('description: "' + getPost.properties.Description.rich_text[0].plain_text + '"')
console.log('tags: ' + JSON.stringify(getPost.properties.Tags.multi_select.map(tag => tag.name)))
console.log('published: ' + getPost.properties.Published.date.start)
console.log('date: Last Modified')
console.log('---')
console.log(await getContent(process.env.POST_ID))
