const fs = require('fs');
const path = require('path');
const axios = require('axios');

async function downloadImage(url, outputPath) {
    try {
        const response = await axios({
            url,
            responseType: 'stream',
        });
        const writer = fs.createWriteStream(outputPath);
        response.data.pipe(writer);
        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
    } catch (error) {
        console.error(`Failed to download ${url}:`, error);
    }
}

function extractImageDetails(markdown) {
    const imageRegex = /!\[(.*?)\]\((.*?)\)/g;
    let matches;
    let images = [];
    
    while ((matches = imageRegex.exec(markdown)) !== null) {
        images.push({ altText: matches[1] || 'image', url: matches[2] });
    }
    
    return images;
}

async function saveImagesAndUpdateMarkdown(filePath) {
    try {
        let markdownContent = fs.readFileSync(filePath, 'utf-8');
        const images = extractImageDetails(markdownContent);
        
        for (const { altText, url } of images) {
            const outputPath = path.join(path.dirname(filePath), altText);
            
            await downloadImage(url, outputPath);
            console.log(`Saved: ${outputPath}`);
            
            markdownContent = markdownContent.replace(url, outputPath);
        }
        
        fs.writeFileSync(filePath, markdownContent, 'utf-8');
        console.log(`Updated Markdown file: ${filePath}`);
    } catch (error) {
        console.error('Error processing file:', error);
    }
}

const filePath = process.argv[2];

if (!filePath) {
    console.error('Usage: node script.js <markdown-file>');
    process.exit(1);
}

saveImagesAndUpdateMarkdown(filePath);
