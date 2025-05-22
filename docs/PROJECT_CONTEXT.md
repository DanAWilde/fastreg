# Project Context and AI Interaction Guidelines

## Project Overview
FastReg - AI-Powered Contractor Registration Prototype


### Problem Statement
The current contractor registration process in Contractor Manager (existing SaaS product) is time-consuming and repetitive. Contractors must manually provide numerous details including:
- Insurance documents
- Professional licenses
- Work regions
- Services provided
- ISO information
- ABN and company details
- Contact details
- Transport details
- Client-specific questionnaire responses

### Solution Vision
Create a streamlined, AI-powered registration process that significantly reduces the time contractors spend on registration by automatically extracting and validating information from uploaded documents and web sources.

### How the AI Should Help
- The AI acts as a coding assistant and advisor.
- Its role is to help translate non-technical goals into working code.
- Do not assume the user has technical knowledge — explain all suggestions clearly and simply.
- When multiple approaches are available, recommend the clearest, safest, and most flexible option.


### Core Workflow
1. **Landing Page**
   - Minimal, focused interface
   - PDF document upload component (max 3 documents for prototype)
   - ChatGPT-powered chat interface
   - Built using existing components made with Next.js, shadcn, tailwind

2. **Document Upload & Initial Interaction**
   - Contractor uploads relevant documents (PDF only)
   - AI chat assists in document selection based on industry
   - Chat interaction helps gather additional company/contractor details

3. **Processing Phase**
   - Triggered by Submit CTA
   - Enhanced loading state UI
   - Background Processing:
     - ChatGPT analyzes uploaded documents
     - Reviews chat interaction history
     - Performs web searches for additional company information
     - Maps gathered information to client questionnaire
     - Generates pre-filled form responses

4. **Review & Completion**
   - Presents pre-filled form to contractor
   - Contractor reviews AI-generated answers
   - Contractor fills any remaining gaps
   - Final submission

### Technical Stack
- Frontend: Next.js
- UI Components: shadcn
- Styling: Tailwind CSS
- AI Integration: ChatGPT API
- Document Processing: [To be determined]

## AI Interaction Preferences

### Response Format
- All code changes should be presented with clear before/after context
- Changes should use the format:
  ```language:path/to/file
  // ... existing code ...
  [new/modified code]
  // ... existing code ...
  ```
- Address one topic or question at a time only.


### Project-Specific Guidelines
1. Any changes to this PROJECT_CONTEXT.md file must be explicitly confirmed before implementation
2. AI responses should align with the core workflow described above
3. AI should prioritize solutions that maintain a simple, intuitive user experience
4. When suggesting technical solutions, prefer established libraries and patterns
5. Do not switch UI libraries — continue using shadcn and tailwind

## Important Project Links
- [Add links to existing component repository]
- [Add ChatGPT API documentation]
- [Add other relevant resources]

## Notes
- This is a prototype project aimed at demonstrating the concept
- Focus on core functionality over extensive feature set
- Document upload limited to 3 PDFs for prototype phase

---
Last Updated: [22/05/2025] 
