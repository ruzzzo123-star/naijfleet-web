const { Anthropic } = require('@anthropic-ai/sdk');
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
async function main() {
    const response = await anthropic.models.list();
    console.log(response.data.map(m => m.id));
}
main();
