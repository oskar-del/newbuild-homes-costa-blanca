#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join } from 'path';

const API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiN2JmZDUyMWY1N2NkZTgxZDUzZDAwMTA2YzBiMjAxYzJiOTBjOTFlNjE1OWQxYjVmYmUwNTZiYmMyNGQ4MDQ1Y2VkZDBlZjc5ZDQxNGJiYmUiLCJpYXQiOjE3NzEzNDU3NzkuOTA3OTAxLCJuYmYiOjE3NzEzNDU3NzkuOTA3OTA0LCJleHAiOjQ5MjcwMTkzNzkuODk2MzEsInN1YiI6IjIxMzI5ODIiLCJzY29wZXMiOltdfQ.wiLakDmT5jreGlCSxatLdkqGZ4sP-yVGLlix3MmQWZMgQrL_jESxJpwLspGVuZSSmOkmPbMPI8twujS3cr2JwYHg7z3Kyxwz1NKlmzKphvqwkXcdUBCeQKO1Up-6ZsveZiO1LDKWljofnr0bddiJ0xnKdrw8Wb1NvoGKEPmU1YGnPib7Do6UlrjQvXJKvTo06U3KPTZRE_-2KRo2MVHPaJiTCvfHm5GsKhb2-YIQxv8vjKUAy2XilKb7bl9fjzI89-WB9IJaTMBnU-1tuGwhZD_u6ReVqDA_nbQ7Fwgkz_17hrskPO3mzvEH6hNkdXHTxiSwz26VOVYhAI-JXF-kfqtXLdnst2KVjBl_KWdTtetKxfnlmo51juyZs0X5cFXHirwgxPrsn0HGc4yJCJwjz_xHoInEFqIXxFHxRUE5TaNITUHvlCSzRgYguVVsb1F22xqYKny11hLh6Ja4EkfiudiY5pPe_yGpvy_MnrDMiJ5iH6fMqMzi4vse5YcalIIyZ0Mc_G_qhrckaWrYSpEvheHRn3LWfKLl1yV1twtEbmOEpu-dwOGudZENy5kQ61gy1vXHVICSXo1rKHTv-_HpCVMZhOOb9gj9kZQdpXDVyuzpltNBngXeQyudhlhpsvOcb0_R5Ni9JD_1sOod_pVfDiUWe7opF9EV5BIw8fzzTSc';

const emailHtml = readFileSync(join(process.cwd(), 'emails', 'welcome-email.html'), 'utf-8');
console.log('✅ Loaded updated email template');
console.log('📋 Template length:', emailHtml.length, 'characters');
console.log('\n📧 Now go to MailerLite:');
console.log('   1. Open the automation "Welcome Email - New Subscribers"');
console.log('   2. Click on the "Send email" step');
console.log('   3. Click "Design email" → "Start from scratch" → "Custom HTML"');
console.log('   4. Paste the HTML from: emails/welcome-email.html');
console.log('   5. Save and activate the automation');
console.log('\n✅ The HTML is ready to paste. Open the file and copy it.');
