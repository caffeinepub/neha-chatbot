# Neha Chatbot

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- A friendly Hinglish chatbot named "Neha" with a warm, conversational personality
- Chat interface with Neha's profile avatar, name, and online status indicator
- Chat bubbles for both Neha (left) and user (right)
- Text input field with send button
- Pre-written response logic: keyword/intent matching to pick from a library of friendly Hinglish responses
- Response categories: greetings, how-are-you, feelings (sad, happy, bored), compliments, farewells, questions about Neha, motivational, and a default fallback
- Typing indicator animation (dots) before Neha's response appears
- Message timestamps
- Soft warm color palette (peach, rose, cream tones)

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan
1. Generate Neha avatar image (warm illustrated portrait)
2. Generate Motoko backend to store chat sessions/messages
3. Build React frontend:
   - Chat layout: header with Neha's avatar + name + status, scrollable message list, fixed input bar
   - User messages: right-aligned, colored bubble
   - Neha messages: left-aligned with avatar, warm-toned bubble
   - Typing indicator (animated dots) before response renders
   - Pre-written Hinglish response engine in frontend: keyword matching on user input
   - Response library: 50+ responses across categories (greetings, emotions, compliments, farewells, about-Neha, motivation, default)
   - Timestamps on each message
   - Auto-scroll to latest message
   - Enter key to send, send button
   - data-ocid markers on all interactive surfaces
