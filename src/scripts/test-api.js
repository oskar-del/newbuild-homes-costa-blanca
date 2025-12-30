const Anthropic = require('@anthropic-ai/sdk').default;

async function test() {
  try {
    const anthropic = new Anthropic();
    
    console.log('Testing API connection...');
    console.log('API Key starts with:', process.env.ANTHROPIC_API_KEY?.substring(0, 20) + '...');
    
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 100,
      messages: [{ role: 'user', content: 'Say hello in 5 words or less.' }],
    });
    
    console.log('SUCCESS! Response:', response.content[0].text);
  } catch (error) {
    console.log('ERROR TYPE:', error.constructor.name);
    console.log('ERROR MESSAGE:', error.message);
    if (error.status) console.log('STATUS:', error.status);
    if (error.error) console.log('ERROR DETAILS:', JSON.stringify(error.error, null, 2));
  }
}

test();
