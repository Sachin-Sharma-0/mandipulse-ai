# 🌱 MandiPulse AI
**Hyper-local Market Intelligence for Everyday Street Vendors**

MandiPulse AI is an empathetic, AI-driven decision dashboard designed specifically for street vendors, hawkers, and local market sellers. It protects their margins by analyzing sudden environmental shocks (like heavy rains, extreme heatwaves, or unexpected power cuts) and providing instant distress pricing and perishability strategies. 

Powered by **Google Gemini 1.5 Flash**, MandiPulse turns crisis into calculated action, even generating hyper-local "Gully-Marketing" broadcast texts for immediate community sales via WhatsApp.

---

## ✨ Key Features

- **⚡ Zero-Friction Multi-Step Wizard:** A frictionless React-driven form designed for non-technical users to input their location, environmental shock, and current inventory.
- **🧠 AI Decision Dashboard:** Analyzes micro-market dynamics using Gemini 2.5 Flash to predict footfall drops.
- **🚨 Perishability Matrix:** Color-coded (Red/Yellow/Green) risk analysis indicating exactly how many hours items have before spoilage, alongside suggested "distress prices".
- **💬 Gully-Marketing Generation:** Automatically crafts a highly engaging, hyper-local marketing text in Hinglish packed with emojis. Includes a 1-click "Copy Broadcast Text" button for instant WhatsApp blasts.
- **🌐 Seamless Bilingual Localization:** Output dashboard seamlessly toggles between **English** and **हिन्दी (Hindi)** with zero page reloads, providing clear, translated technical tooltips for complex metrics.
- **🛡️ Resilient Error Handling:** Built-in safeguards that catch API rate limits or 503 "High Demand" errors, providing clean UI feedback instead of application crashes.

## 🛠️ Tech Stack

- **Frontend Core:** [Next.js 14](https://nextjs.org/) (App Router) & [React 18](https://react.dev/)
- **Styling & UI:** [Tailwind CSS v4](https://tailwindcss.com/) & [Lucide React](https://lucide.dev/) icons
- **AI Integration:** Official [`@google/genai`](https://www.npmjs.com/package/@google/genai) SDK
- **LLM Engine:** Google `gemini-1.5-flash` with strict JSON schema adherence
- **Typography:** `next/font/google` (Poppins for structural UI, Noto Sans Devanagari for Hindi readability)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Sachin-Sharma-0/mandipulse-ai.git
cd mandipulse-ai
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure your Environment Variables
Create a `.env.local` file in the root of the project and add your Google Gemini API key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```
*(You can get your API key from [Google AI Studio](https://aistudio.google.com/app/apikey))*

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

---

## 🎨 Design System Philosophy

The UI is intentionally designed to avoid "techy" dark modes. It utilizes a **Warm, Organic & Human-Centric** theme:
- **Background:** Light, premium cream (`#FAF9F5`)
- **Containers:** Clean white cards with elegant borders (`#EAE6DA`)
- **Accents:** Rich, organic emerald greens (`#047857`) representing fresh produce and market sustainability.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Sachin-Sharma-0/mandipulse-ai/issues).

## 📝 License

This project is licensed under the MIT License.
